import axios from 'axios';


const API_URL = 'http://localhost:8000/api/quotes';



export const getRandomQuote = async () => {
  try {
    const response = await axios.get(`${API_URL}/random`);
    return response.data;
  } catch (error) {
    console.error('Error fetching random quote:', error);
    throw error;
  }
};


export const searchQuotesByAuthor = async (author) => {
  try {
    const response = await axios.get(`${API_URL}/author`, {
      params: { author },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error searching quotes by author:', error);
    throw error;
  }
};


export const postQuote = async (quoteData) => {
  try {
    const response = await axios.post(`${API_URL}`, quoteData);
    return response.data;
  } catch (error) {
    console.error('Error posting new quote:', error);
    throw error;
  }
};
