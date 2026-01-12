import axios from "axios";

const BASE_URL = "http://localhost:3001/customers";

export const getAll = async (page = 1, limit = 6) => {
    try {
        const response = await axios.get(`${BASE_URL}?_page=${page}&_limit=${limit}`);
        return {
            data: response.data,
            pages: Math.ceil(parseInt(response.headers['x-total-count']) / limit)
        };
    } catch (error) {
        console.error("Error fetching customers:", error);
        return { data: [], pages: 0 };
    }
};

export const findById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error finding customer:", error);
        return null;
    }
};

export const create = async (customer) => {
    try {
        const response = await axios.post(BASE_URL, customer);
        return response.data;
    } catch (error) {
        console.error("Error creating customer:", error);
        return null;
    }
};

export const update = async (id, customer) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, customer);
        return response.data;
    } catch (error) {
        console.error("Error updating customer:", error);
        return null;
    }
};

export const deleteById = async (id) => {
    try {
        await axios.delete(`${BASE_URL}/${id}`);
        return true;
    } catch (error) {
        console.error("Error deleting customer:", error);
        return false;
    }
};

