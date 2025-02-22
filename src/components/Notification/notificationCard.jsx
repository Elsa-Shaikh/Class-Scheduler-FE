import { Card, Typography, Box } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import moment from "moment";
import PropTypes from "prop-types";
const NotificationCard = ({ notification }) => {
  return (
    <Card
      sx={{
        width: "385px",
        height: "100px",
        display: "flex",
        alignItems: "center",
        padding: "16px",
        marginBottom: "10px",
        boxShadow: notification?.isRead
          ? "none"
          : "0px 2px 8px rgba(0,0,0,0.3)",
        backgroundColor: notification?.isRead ? "none" : "#f5f5f5",
        border: notification?.isRead ? "1px solid grey" : "none",
        borderLeft: notification?.isRead ? "4px solid grey" : "4px solid #1976d2",
      }}
    >
      <Box
        sx={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          backgroundColor: "#e3f2fd",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: "16px",
        }}
      >
        <NotificationsIcon color="primary" />
      </Box>
      <Box>
        <Typography variant="body1" fontWeight="bold" color="text.primary">
          {notification?.message}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginTop: "8px" }}
        >
          {moment(notification?.createdAt).format(
            "ddd DD MMMM YYYY [at] hh:mm A"
          )}
        </Typography>
      </Box>
    </Card>
  );
};
NotificationCard.propTypes = {
  notification: PropTypes.array,
};
export default NotificationCard;
