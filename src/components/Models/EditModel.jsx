import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  FormControl,
  TextField,
  InputLabel,
  Stack,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { useFormik } from "formik";
import dayjs from "dayjs";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { editClass, fetchData } from "../../Utils/helper";
import moment from "moment";

const EditModal = ({ open, handleClose, row, onSuccess }) => {
  const [instructors, setInstructors] = useState([]);
  const formattedStartDate = row?.startDate
    ? moment(row?.startDate).format("MM-DD-YYYY")
    : null;

  const formattedEndDate = row?.endDate
    ? moment(row?.endDate).format("MM-DD-YYYY")
    : null;
  useEffect(() => {
    const getData = async () => {
      const response = await fetchData();
      setInstructors(response?.teacher);
    };

    if (open) {
      getData();
    }
  }, [open]);

  const formik = useFormik({
    initialValues: {
      instructor: row?.teacher?._id || "",
      className: row?.room || "",
      classType: row?.classType || "",
      startDate: row?.startDate
        ? dayjs(formattedStartDate, "MM-DD-YYYY")
        : null,
      endDate: row?.endDate ? dayjs(formattedEndDate, "MM-DD-YYYY") : null,
      startTime: row?.startTime ? dayjs(row?.startTime, "hh:mm A") : null,
      endTime: row?.endTime ? dayjs(row?.endTime, "hh:mm A") : null,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      className: Yup.string().required("Class Name is required"),
      instructor: Yup.string().required("Instructor is required"),
      classType: Yup.string().required("Class Type is required"),
      startDate: Yup.date()
        .nullable()
        .required("Start Date is required")
        .test(
          "is-before-end-date",
          "End Date must be greater than Start Date",
          function (value) {
            const { endDate } = this.parent;
            return !endDate || value <= endDate;
          }
        ),
      endDate: Yup.date()
        .nullable()
        .required("End Date is required")
        .test(
          "is-after-start-date",
          "End Date must be greater than Start Date",
          function (value) {
            const { startDate } = this.parent;
            return !startDate || value >= startDate;
          }
        ),
      startTime: Yup.date()
        .nullable()
        .required("Start Time is required")
        .test(
          "is-before-end-time",
          "End Time must be greater than Start Time",
          function (value) {
            const { endTime } = this.parent;
            return !endTime || value <= endTime;
          }
        ),
      endTime: Yup.date()
        .nullable()
        .required("End Time is required")
        .test(
          "is-after-start-time",
          "End Time must be greater than Start Time",
          function (value) {
            const { startTime } = this.parent;
            return !startTime || value >= startTime;
          }
        ),
    }),
    onSubmit: async (values) => {
      try {
        const updatedData = {};
        if (values.instructor !== row?.teacher?._id) {
          updatedData.teacher = values.instructor;
        }
        if (values.className !== row?.room) {
          updatedData.room = values.className;
        }
        if (values.classType !== row?.classType) {
          updatedData.classType = values.classType;
        }
        const formattedValueStartDate = values.startDate
          ? dayjs(values.startDate).format("YYYY-MM-DD")
          : null;
        const formattedRowStartDate = row?.startDate
          ? dayjs(row?.startDate).format("YYYY-MM-DD")
          : null;
        const formattedValueEndDate = values.endDte
          ? dayjs(values.startDate).format("YYYY-MM-DD")
          : null;
        const formattedRowEndDate = row?.endDte
          ? dayjs(row?.startDate).format("YYYY-MM-DD")
          : null;
        const formattedValueStartTime = values?.startTime
          ? dayjs(values.startTime).format("hh:mm A")
          : null;

        const formattedValueEndTime = values?.endTime
          ? dayjs(values.endTime).format("hh:mm A")
          : null;

        if (
          formattedValueStartDate !== formattedRowStartDate ||
          formattedValueEndDate !== formattedRowEndDate ||
          formattedValueEndTime !== row?.endTime ||
          row?.startTime !== formattedValueStartTime
        ) {
          updatedData.startDate = values.startDate
            ? values.startDate.format("DD-MM-YYYY")
            : null;
          updatedData.endDate = values.endDate
            ? values.endDate.format("DD-MM-YYYY")
            : null;
          updatedData.startTime = values.startTime
            ? values.startTime.format("hh:mm A")
            : null;
          updatedData.endTime = values.endTime
            ? values.endTime.format("hh:mm A")
            : null;
        }

        const response = await editClass(row?._id, updatedData);
        if (response) {
          formik.resetForm();
          toast.success(response?.message);
          onSuccess();
          handleClose();
        } else {
          toast.error(response?.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Failed To Edit Class!");
      }
    },
  });
  useEffect(() => {
    if (!open) {
      formik.resetForm();
    }
  }, [open, formik]);
  console.log(formik?.errors);
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>{"Edit Class"}</DialogTitle>
          <DialogContent>
            <form onSubmit={formik.handleSubmit}>
              <Stack
                display={"flex"}
                direction={"row"}
                spacing={2}
                marginTop={2}
                sx={{
                  marginRight: {
                    xs: 0,
                    lg: 2,
                    xl: 2,
                  },
                }}
              >
                <TextField
                  fullWidth
                  name="className"
                  placeholder="Class Name or Room no"
                  value={formik.values.className}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Stack>
              {
                <div
                  style={{
                    color: "red",
                    fontSize: "10px",
                    display: "block",
                    margin: "5px",
                  }}
                >
                  {formik.errors.className}
                </div>
              }
              <Stack
                display={"flex"}
                direction={"row"}
                spacing={2}
                marginTop={2}
                sx={{
                  marginRight: {
                    xs: 0,
                    lg: 2,
                    xl: 2,
                  },
                }}
              >
                <FormControl fullWidth margin="normal">
                  <InputLabel id="classType-label">Class Type</InputLabel>
                  <Select
                    labelId="classType-label"
                    name="classType"
                    value={formik.values.classType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value="In Class">In Class</MenuItem>
                    <MenuItem value="Online">Online</MenuItem>
                    <MenuItem value="In-Drive">In-Drive</MenuItem>
                  </Select>
                  {
                    <div
                      style={{
                        color: "red",
                        fontSize: "10px",
                        display: "block",
                        margin: "5px",
                      }}
                    >
                      {formik.errors.classType}
                    </div>
                  }
                </FormControl>
              </Stack>

              <Stack
                display={"flex"}
                direction={"row"}
                spacing={2}
                marginTop={2}
                sx={{
                  marginRight: {
                    xs: 0,
                    lg: 2,
                    xl: 2,
                  },
                }}
              >
                <FormControl fullWidth margin="normal">
                  <InputLabel id="instructor-label">Teacher</InputLabel>
                  <Select
                    labelId="instructor-label"
                    name="instructor"
                    value={formik.values.instructor}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    {instructors?.map((inst) => (
                      <MenuItem key={inst._id} value={inst._id}>
                        {inst.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {
                    <div
                      style={{
                        color: "red",
                        fontSize: "10px",
                        display: "block",
                        margin: "5px",
                      }}
                    >
                      {formik.errors.instructor}
                    </div>
                  }
                </FormControl>
              </Stack>
              <Stack
                display={"flex"}
                direction={"row"}
                spacing={2}
                marginTop={2}
              >
                <div>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="Start Date"
                      value={formik.values.startDate}
                      onChange={(value) =>
                        formik.setFieldValue("startDate", value)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          margin="normal"
                          onBlur={formik.handleBlur}
                        />
                      )}
                    />
                  </DemoContainer>
                  {
                    <div
                      style={{
                        color: "red",
                        fontSize: "10px",
                        display: "block",
                        margin: "5px",
                      }}
                    >
                      {formik.errors.startDate}
                    </div>
                  }
                </div>
                <div>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="End Date"
                      value={formik.values.endDate}
                      onChange={(value) =>
                        formik.setFieldValue("endDate", value)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          margin="normal"
                          onBlur={formik.handleBlur}
                        />
                      )}
                    />
                  </DemoContainer>
                  {
                    <div
                      style={{
                        color: "red",
                        fontSize: "10px",
                        display: "block",
                        margin: "5px",
                      }}
                    >
                      {formik.errors.endDate}
                    </div>
                  }
                </div>
              </Stack>
              <Stack
                display={"flex"}
                direction={"row"}
                spacing={2}
                marginTop={2}
              >
                <div>
                  <DemoContainer components={["TimePicker"]}>
                    <TimePicker
                      label="Start Time"
                      value={formik.values.startTime}
                      onChange={(value) =>
                        formik.setFieldValue("startTime", value)
                      }
                      renderInput={(params) => (
                        <TextField {...params} fullWidth margin="normal" />
                      )}
                    />
                  </DemoContainer>
                  {
                    <div
                      style={{
                        color: "red",
                        fontSize: "10px",
                        display: "block",
                        margin: "5px",
                      }}
                    >
                      {formik.errors.startTime}
                    </div>
                  }
                </div>
                <div>
                  <DemoContainer components={["TimePicker"]}>
                    <TimePicker
                      label="End Time"
                      value={formik.values.endTime}
                      onChange={(value) =>
                        formik.setFieldValue("endTime", value)
                      }
                      renderInput={(params) => (
                        <TextField {...params} fullWidth margin="normal" />
                      )}
                    />
                  </DemoContainer>
                  {
                    <div
                      style={{
                        color: "red",
                        fontSize: "10px",
                        display: "block",
                        margin: "5px",
                      }}
                    >
                      {formik.errors.endTime}
                    </div>
                  }
                </div>
              </Stack>
              <DialogActions sx={{ marginTop: 2 }}>
                <Button onClick={handleClose} type="button" color="error">
                  Cancel
                </Button>
                <Button type="submit" variant="contained">
                  {"Edit"}
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </LocalizationProvider>
      <ToastContainer />
    </>
  );
};

EditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  row: PropTypes.object,
  onSuccess: PropTypes.func.isRequired,
};

export default EditModal;
