import axios from "axios";

const endpoint = 'http://localhost:3001';
export const add = async (soccerPlayer1) => {
    try {
        return (await axios.post(`${endpoint}/players`, soccerPlayer1)).status === 201;
    } catch (error) {
        console.log(error);
    }
    return false

}


export const remove = async (id) => {
    try {
        const result = await axios.delete(`${endpoint}/players/${id}`);
        return result.status === 200;
    } catch (error) {
        console.log(error);
    }
    return false;
}

export const findAll = async (page = 1, perPage = 5) => {
    try {
        return (await axios.get(`${endpoint}/players?_page=${page}&_per_page=${perPage}`)).data;
    } catch (error) {
        console.log(error);
    }
    return []
}


export const findById = async (id) => {
    try {
        return (await axios.get(`${endpoint}/players/${id}`)).data;
    } catch (error) {
        console.log(error);
    }
    return {};
}


export const update = async (id, player) => axios.patch(`${endpoint}/players/${id}`, player);