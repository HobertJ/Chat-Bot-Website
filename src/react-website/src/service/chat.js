import axios from 'axios';

const API_URL = 'localhost:5000';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const chatService = {
  async postQuestion(question, algo) {
    try {
      const response = await axiosInstance.get(`/chat` , {question, algo});
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch data');
    }
  },
};