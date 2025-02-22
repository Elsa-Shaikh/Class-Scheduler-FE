import axios from "axios";
import api from "./api";

export const fetchData = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/auth/get/user");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const fetchClasses = async () => {
  try {
    const response = await api.get("/classes/read");
    return response.data;
  } catch (error) {
    console.error("Error fetching classes:", error);
    throw error;
  }
};

export const addClass = async (classData) => {
  try {
    const response = await api.post("/classes/create", classData);
    return response.data;
  } catch (error) {
    console.error("Error adding class:", error);
    throw error;
  }
};

export const editClass = async (id, classData) => {
  try {
    const response = await api.put(`/classes/edit/${id}`, classData);
    return response.data;
  } catch (error) {
    console.error("Error editing class:", error);
    throw error;
  }
};

export const deleteClass = async (id) => {
  try {
    const response = await api.delete(`/classes/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting class:", error);
    throw error;
  }
};

export const fetchTeacherClasses = async (id, params = {}) => {
  try {
    const response = await api.get(`/classes/get/${id}`, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching classes:", error);
    throw error;
  }
};

export const fetchStudentClasses = async (id, params = {}) => {
  try {
    const response = await api.get(`/classes/read/${id}`, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching classes:", error);
    throw error;
  }
};

export const fetchNotifications = async (id) => {
  try {
    const response = await api.get(`/notifications/get/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching classes:", error);
    throw error;
  }
};

export const markRead = async (id) => {
  try {
    const response = await api.put(`/notifications/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error editing class:", error);
    throw error;
  }
};
