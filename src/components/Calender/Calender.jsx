/* eslint-disable react-hooks/exhaustive-deps */
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  fetchClasses,
  fetchStudentClasses,
  fetchTeacherClasses,
} from "../../Utils/helper";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ClassesTable from "../Table/ClassTable";
import { Filters } from "./filter";

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const [events, setEvents] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const [classType, setClassType] = useState("");
  const [room, setRoom] = useState("");
  const [subject, setSubject] = useState("");
  const fetchClassData = async () => {
    try {
      let response;

      const params = {};

      if (classType) params.classType = classType;
      if (room) params.room = room;
      if (subject) params.subject = subject;
      if (user?.role === "Admin") {
        response = await fetchClasses();
      } else if (user?.role === "Teacher") {
        response = await fetchTeacherClasses(user?._id, params);
      } else if (user?.role === "Student") {
        response = await fetchStudentClasses(user?._id, params);
      }

      if (response?.data) {
        setEvents(response.data);
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchClassData();
    }
  }, [user, room, subject, classType]);

  const formattedEvents = events?.map((event) => ({
    title: `${event?.subject}`,
    start: moment(
      `${event?.startDate} ${event?.startTime}`,
      "YYYY-MM-DD hh:mm A"
    ).toDate(),
    end: moment(
      `${event?.endDate} ${event?.endTime}`,
      "YYYY-MM-DD hh:mm A"
    ).toDate(),
    description: `
      Teacher: ${event?.teacher?.name}
      Room: ${event?.room}
      Duration: ${event?.duration}
      Type: ${event?.classType}`,
  }));

  const eventStyleGetter = () => {
    const style = {
      backgroundColor: "#4caf50",
      color: "white",
      borderRadius: "5px",
      padding: "5px",
    };
    return { style };
  };
  const onSuccess = async () => {
    fetchClassData();
  };

  return (
    <>
      {user?.role !== "Admin" && (
        <>
          <Filters
            classType={classType}
            setClassType={setClassType}
            setRoom={setRoom}
            room={room}
            subject={subject}
            role={user?.role}
            setSubject={setSubject}
          />
        </>
      )}
      <div style={{ height: "500px", margin: "20px" }}>
        <Calendar
          localizer={localizer}
          events={formattedEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          eventPropGetter={eventStyleGetter}
          tooltipAccessor="description"
        />
      </div>
      {user?.role === "Admin" && <ClassesTable onFetchClasses={onSuccess} />}{" "}
    </>
  );
};

export default CalendarComponent;
