import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import PropTypes from "prop-types";
export const Filters = ({
  classType,
  setClassType,
  setRoom,
  room,
  subject,
  role,
  setSubject,
}) => {
  const isAnyFilterActive = classType || room || subject;
  const handleReset = () => {
    setClassType("");
    setRoom("");
    setSubject("");
  };

  return (
    <>
      {" "}
      <Stack
        display="flex"
        direction="row"
        justifyContent={"center"}
        spacing={2}
        margin={2}
      >
        <FormControl fullWidth margin="normal" sx={{ width: "300px" }}>
          <InputLabel id="classType-label">Class Type</InputLabel>
          <Select
            labelId="classType-label"
            name="classType"
            value={classType}
            onChange={(e) => setClassType(e.target.value)}
          >
            <MenuItem value="In Class">In Class</MenuItem>
            <MenuItem value="Online">Online</MenuItem>
            <MenuItem value="In Drive">In Drive</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal" sx={{ width: "300px" }}>
          <InputLabel id="room-label">Room Number</InputLabel>
          <Select
            labelId="room-label"
            name="room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          >
            <MenuItem value="Room 1">Room 1</MenuItem>
            <MenuItem value="Room 2">Room 2</MenuItem>
            <MenuItem value="Room 3">Room 3</MenuItem>
            <MenuItem value="Room 4">Room 4</MenuItem>
            <MenuItem value="Room 5">Room 5</MenuItem>
            <MenuItem value="Room 6">Room 6</MenuItem>
            <MenuItem value="Room 7">Room 7</MenuItem>
            <MenuItem value="Room 8">Room 8</MenuItem>
            <MenuItem value="Room 9">Room 9</MenuItem>
          </Select>
        </FormControl>
        {role === "Student" && (
          <FormControl fullWidth margin="normal" sx={{ width: "300px" }}>
            <InputLabel id="subject-label">Subject</InputLabel>
            <Select
              labelId="subject-label"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <MenuItem value="Math">Math</MenuItem>
              <MenuItem value="Science">Science</MenuItem>
              <MenuItem value="English">English</MenuItem>
              <MenuItem value="Physics">Physics</MenuItem>
              <MenuItem value="Chemistry">Chemistry</MenuItem>
              <MenuItem value="Computer">Computer</MenuItem>
              <MenuItem value="History">History</MenuItem>
              <MenuItem value="Biology">Biology</MenuItem>
            </Select>
          </FormControl>
        )}
      </Stack>
      {isAnyFilterActive && (
        <div
          style={{
            color: "red",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            cursor: "pointer",
          }}
          onClick={handleReset}
        >
          <span>Clear filters </span>
          <Close />
        </div>
      )}
    </>
  );
};
Filters.propTypes = {
  setClassType: PropTypes.func,
  setSubject: PropTypes.func,
  setRoom: PropTypes.func,
  room: PropTypes.string,
  subject: PropTypes.string,
  classType: PropTypes.string,
  role: PropTypes.string,
};
