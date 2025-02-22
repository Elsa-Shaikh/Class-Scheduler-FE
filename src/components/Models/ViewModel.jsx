import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import PropTypes from "prop-types";
const ViewModal = ({ open, handleClose, row }) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Class Details</DialogTitle>
      <DialogContent>
        <Stack
          display={"flex"}
          justifyContent={"space-between"}
          flexDirection={"row"}
        >
          <Typography fontWeight={"bolder"}>Room Number</Typography>
          <Typography>{row?.room}</Typography>
        </Stack>
        <Stack
          display={"flex"}
          justifyContent={"space-between"}
          flexDirection={"row"}
        >
          <Typography fontWeight={"bolder"}>Teacher</Typography>
          <Typography>{row?.teacher?.name}</Typography>
        </Stack>
        <Stack
          display={"flex"}
          justifyContent={"space-between"}
          flexDirection={"row"}
        >
          <Typography fontWeight={"bolder"}>End Date</Typography>
          <Typography>
            {" "}
            {moment(row?.endDate).format("ddd, DD MMMM YYYY") ||
              "Wed, 07 January 2025"}
          </Typography>
        </Stack>
        <Stack display={"flex"} flexDirection={"column"}>
          <Typography fontWeight={"bolder"}>Student List</Typography>
          <Stack direction="row" flexWrap="wrap" spacing={2}>
            {row?.studentIDs &&
              row.studentIDs.map((student, index) => (
                <Box
                  key={student._id}
                  display="flex"
                  alignItems="center"
                  width="33%"
                  sx={{ listStyleType: "disc", marginLeft: "10px" }}
                >
                  <Typography>
                    {" "}
                    {index + 1}. {student?.name}
                  </Typography>
                </Box>
              ))}
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
ViewModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  row: PropTypes.object.isRequired,
};
export default ViewModal;
