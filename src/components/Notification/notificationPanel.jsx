import { Box, Button, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NotificationCard from "./notificationCard";
import { Check } from "@mui/icons-material";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { markRead } from "../../Utils/helper";

const NotificationsPanel = ({
  notifications,
  onClose,
  totalCount,
  id,
  onSuccess,
}) => {
  const allRead = async () => {
    const response = await markRead(id);
    if (response) {
      toast.success(response?.message);
      onSuccess();
    } else {
      toast.error(response?.message);
    }
  };
  return (
    <Box
      sx={{
        position: "fixed",
        top: "64px",
        right: "16px",
        width: "480px",
        height: "420px",
        backgroundColor: "#fff",
        boxShadow: "0px 2px 8px rgba(0,0,0,0.2)",
        borderRadius: "8px",
        zIndex: 1300,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Typography variant="h6" fontWeight="bold" color="grey">
          Notifications
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      {totalCount > 0 && (
        <Button sx={{ mb: 1 }} onClick={allRead}>
          <Check sx={{ mr: 1 }} /> Mark as Read
        </Button>
      )}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          padding: "16px",
        }}
      >
        {notifications?.length > 0 ? (
          notifications &&
          notifications?.map((notification) => (
            <NotificationCard
              key={notification._id}
              notification={notification}
            />
          ))
        ) : (
          <Typography textAlign={"center"}>No Notification Found!</Typography>
        )}
      </Box>
    </Box>
  );
};
NotificationsPanel.propTypes = {
  notifications: PropTypes.array,
  onClose: PropTypes.func,
  totalCount: PropTypes.number,
  id: PropTypes.string,
  onSuccess: PropTypes.func,
};
export default NotificationsPanel;
