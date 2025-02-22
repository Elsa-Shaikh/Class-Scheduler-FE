import * as Yup from "yup";

const addValidationSchema = Yup.object({
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
});

const editValidationSchema = Yup.object({
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
});

export { addValidationSchema, editValidationSchema };
