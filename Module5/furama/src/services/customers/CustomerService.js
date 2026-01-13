import axios from "axios";

const BASE_URL = "http://localhost:3001/customers";
const API = "http://localhost:8080/api/v1/customers"

export const getAll = async (page = 0, limit = 6) => {
    const response = await axios.get(`${API}?page=${page}&size=${limit}`);
    return response.data;

};

export const findById = async (id) => {
    try {
        const response = await axios.get(`${API}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error finding customer:", error);
        return null;
    }
};

export const create = async (customer) => {
    try {
        const response = await axios.post(API, customer);
        return response.status === 200;
    } catch (error) {
        console.error("Error creating customer:", error);
        return false;
    }
};

export const update = async (id, customer) => {
    try {
        const response = await axios.patch(`${API}/${id}`, customer);
        return response.status === 200;
    } catch (error) {
        console.error("Error updating customer:", error);
        return false;
    }
};

export const deleteById = async (id) => {
    try {
        const response = await axios.delete(`${API}/${id}`);
        return response.status === 200;
    } catch (error) {
        console.error("Error deleting customer:", error);
        return false;
    }
};

