import axios from "axios";

const endpoint = "http://localhost:3001";
export const findAll = () => axios.get(`${endpoint}/clubs`);