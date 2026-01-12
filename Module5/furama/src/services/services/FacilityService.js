import axios from "axios";

const URL = "http://localhost:3001"

export const getAll = async (page = 1, perPage = 6) => {
    const response = await axios.get(`${URL}/services?_page=${page}&_per_page=${perPage}`);
    return response.data;
}

export const removeById = async (id) => {
    const res = await axios.delete(`${URL}/services/${id}`);
    if (res.status === 200) {
        return true;
    }
    return false
}

export const findById = async (id) => {
    const res = await axios.get(`${URL}/services/${id}`);
    console.log(res);
    if (res.data != null) {
        return res.data;
    } else return null;
}

export const update = async (id, data) => {
    const res = await axios.put(`${URL}/services/${id}`, data);
    return res.status === 200;
}

export const add = async (data) => {
    const res = await axios.post(`${URL}/services`, data);
    return res.status === 201;
}

export const deleteById = async (id) => {
    const res = await axios.delete(`${URL}/services/${id}`);
    return res.status === 200;
}