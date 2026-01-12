import axios from "axios";

export const findAll = async () => {
    const res = await axios.get("http://localhost:3001/extraServices");
    return res.data
}