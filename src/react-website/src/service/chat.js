import axios from 'axios';

const API_URL = 'https://api.example.com';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const chatService = {
  async postQuestion(question, algo) {
    try {
      const response = await axiosInstance.post(`/chat` , {question, algo});
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch data');
    }
  },
};