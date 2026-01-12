import axios from "axios";

const BASE_URL = "http://localhost:3001/contracts";

export const getAll = async (page = 1, limit = 6) => {
    try {
        const response = await axios.get(`${BASE_URL}?_page=${page}&_limit=${limit}`);
        return {
            data: response.data,
            pages: Math.ceil(parseInt(response.headers['x-total-count']) / limit)
        };
    } catch (error) {
        console.error("Error fetching contracts:", error);
        return { data: [], pages: 0 };
    }
};

export const findById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error finding contract:", error);
        return null;
    }
};

export const create = async (contract) => {
    try {
        const response = await axios.post(BASE_URL, contract);
        return response.data;
    } catch (error) {
        console.error("Error creating contract:", error);
        return null;
    }
};

