import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Paper,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import PropTypes from "prop-types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ViewModal from "../Models/ViewModel";
import DeleteConfirmModal from "../Models/ConfirmModel";
import moment from "moment";
import { deleteClass, fetchClasses } from "../../Utils/helper.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddModal from "../Models/AddModel.jsx";
import EditModal from "../Models/EditModel.jsx";

const ClassesTable = ({ onFetchClasses }) => {
  const [classes, setClasses] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const [selectedRow, setSelectedRow] = useState(null);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const loadClasses = async () => {
    try {
      const response = await fetchClasses();
      setClasses(response?.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  useEffect(() => {
    loadClasses();
  }, []);

  const onSuccess = async () => {
    loadClasses();
    onFetchClasses();
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (row = null) => {
    setSelectedRow(row);
    setEditModalOpen(true);
  };

  const openDeleteModal = (row) => {
    setSelectedRow(row);
    setDeleteModalOpen(true);
  };

  const openViewModal = (row) => {
    setSelectedRow(row);
    setViewModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (selectedRow) {
        const response = await deleteClass(selectedRow?._id);
        if (response) {
          toast.success(response.message || "Class deleted successfully!");
          onSuccess();
          setDeleteModalOpen(false);
        } else {
          toast.error(response.message || "Failed to delete class!");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed To Delete Class!");
    }
  };

  const handleAdd = () => {
    setAddModalOpen(true);
  };

  return (
    <>
      <Typography variant="h5" sx={{ margin: 5, textAlign: "center" }}>
        {" "}
        Manage Classes
      </Typography>

      <Paper
        sx={{
          marginLeft: "auto",
          marginRight: "auto",
          padding: 2,
          width: "80%",
        }}
      >
        <Stack direction={"row"} justifyContent={"flex-end"}>
          <Button
            variant="contained"
            color="warning"
            sx={{ m: 2 }}
            onClick={handleAdd}
          >
            Add Class
          </Button>
        </Stack>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Subject</TableCell>
                <TableCell>Teacher</TableCell>
                <TableCell>Class Type</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>Class Timing</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {classes
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell>{row.subject}</TableCell>
                    <TableCell>{row?.teacher?.name}</TableCell>
                    <TableCell>{row.classType}</TableCell>
                    <TableCell>
                      {moment(row?.startDate).format("ddd, DD MMMM YYYY") ||
                        "Wed, 07 January 2025"}
                    </TableCell>
                    <TableCell>
                      {row?.startTime} - {row?.endTime}
                    </TableCell>
                    <TableCell>{row?.duration}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(row)}
                        title="Edit"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => openDeleteModal(row)}
                        title="Delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        style={{ color: "green" }}
                        onClick={() => openViewModal(row)}
                        title="View"
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={classes?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <AddModal
        open={addModalOpen}
        handleClose={() => setAddModalOpen(false)}
        onSuccess={onSuccess}
      />
      <EditModal
        open={editModalOpen}
        row={selectedRow}
        handleClose={() => setEditModalOpen(false)}
        onSuccess={onSuccess}
      />
      <DeleteConfirmModal
        open={deleteModalOpen}
        handleClose={() => setDeleteModalOpen(false)}
        onDelete={handleDeleteConfirm}
      />
      <ViewModal
        open={viewModalOpen}
        row={selectedRow}
        handleClose={() => setViewModalOpen(false)}
      />
      <ToastContainer />
    </>
  );
};
ClassesTable.propTypes = {
  onFetchClasses: PropTypes.func.isRequired,
};

export default ClassesTable;
