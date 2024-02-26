import axios from 'axios';

const fetchData = async (url, setterFunction) => {
  try {
    const response = await axios.get(url);
    const jsonData = response.data;
    setterFunction(jsonData);
  } catch (err) {
    console.error(err.message);
  }
};

export default fetchData;