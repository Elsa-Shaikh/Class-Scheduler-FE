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
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { addClass, fetchData } from "../../Utils/helper";

const AddModal = ({ open, handleClose, onSuccess }) => {
  const [instructors, setInstructors] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetchData();
      setInstructors(response?.teacher);
      setStudents(response?.student);
    };

    if (open) {
      getData();
    }
  }, [open]);

  const formik = useFormik({
    initialValues: {
      subject: "",
      instructor: "",
      className: "",
      student: [],
      classType: "",
      startDate: null,
      endDate: null,
      startTime: null,
      endTime: null,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      subject: Yup.string().required("Subject is required"),
      className: Yup.string().required("Class Name is required"),
      instructor: Yup.string().required("Instructor is required"),
      student: Yup.array().min(1, "At least one student is required"),
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
        const formattedValues = {
          subject: values?.subject,
          teacher: values?.instructor,
          room: values?.className,
          startDate: values.startDate.format("MM-DD-YYYY"),
          endDate: values.endDate.format("MM-DD-YYYY"),
          startTime: values.startTime.format("hh:mm A"),
          endTime: values.endTime.format("hh:mm A"),
          studentIDs: values.student,
          classType: values.classType,
        };
        const response = await addClass(formattedValues);
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
        toast.error(error.response?.data?.message || "Failed To Add Class!");
      }
    },
  });
  useEffect(() => {
    if (!open) {
      formik.resetForm();
    }
  }, [open, formik]);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>{"Add Class"}</DialogTitle>
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
                  <InputLabel id="subject-label">Subject</InputLabel>
                  <Select
                    labelId="subject-label"
                    name="subject"
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
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
                  {
                    <div
                      style={{
                        color: "red",
                        fontSize: "10px",
                        display: "block",
                        margin: "5px",
                      }}
                    >
                      {formik.errors.subject}
                    </div>
                  }
                </FormControl>

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
                    <MenuItem value="In Drive">In Drive</MenuItem>
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

                <FormControl fullWidth margin="normal">
                  <InputLabel id="student-label">Student</InputLabel>
                  <Select
                    labelId="student-label"
                    name="student"
                    multiple
                    value={formik.values.student}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    renderValue={(selected) =>
                      selected
                        ?.map(
                          (id) => students.find((stu) => stu._id === id)?.name
                        )
                        .join(", ")
                    }
                  >
                    {students?.map((stu) => (
                      <MenuItem key={stu._id} value={stu._id}>
                        {stu.name}
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
                      {formik.errors.student}
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
                  {"Add"}
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

AddModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default AddModal;
