import axios from 'axios';

const BASE_URL = 'https://delivery-app-bain-efd4d44cbf7b.herokuapp.com';

export const postConsult = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/consult/`, data);
    return response.data;
  } catch (error) {
    console.error('Error posting consult:', error);
    throw error;
  }
};

export const getConsults = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/consult/`);
    return response.data;
  } catch (error) {
    console.error('Error getting consult:', error);
    throw error;
  }
}; 