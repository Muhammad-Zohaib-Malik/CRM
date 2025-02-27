import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

const fetcher = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data.data;
  } catch (error) {
    throw new Error(error);
  }
};

export default fetcher;
