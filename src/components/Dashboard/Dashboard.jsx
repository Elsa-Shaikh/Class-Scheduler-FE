/* eslint-disable react-hooks/exhaustive-deps */
import NavbarComponent from "../Navbar/NavbarComponent";
import CalendarComponent from "../Calender/Calender";
import { useSelector } from "react-redux";
import { fetchNotifications } from "../../Utils/helper";
import { useState } from "react";
import { useEffect } from "react";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const [data, setData] = useState([]);

  const fetchNoti = async () => {
    try {
      const response = await fetchNotifications(user?._id);
      setData(response);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };
  useEffect(() => {
    if (user) {
      fetchNoti();
    }
  }, [user]);
  const onSuccess = async () => {
    fetchNoti();
  };

  return (
    <>
      {" "}
      <NavbarComponent
        totalCount={data?.unreadCount}
        notifications={data?.data}
        onSuccess={onSuccess}
      />
      <CalendarComponent />
    </>
  );
};

export default Dashboard;
