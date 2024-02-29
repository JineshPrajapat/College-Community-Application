// import axios from 'axios';

// const fetchData = async (url, setterFunction) => {
//   try {
//     const response = await axios.get(url);
//     const jsonData = response.data;
//     setterFunction(jsonData);
//   } catch (err) {
//     console.error(err.message);
//   }
// };

// export default fetchData;


import axios from 'axios';

const fetchData = async (url, setterFunction) => {
  try {
    // Assuming you have stored the authentication token in localStorage
    const authToken = localStorage.getItem('authToken');
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });
    const jsonData = response.data;
    setterFunction(jsonData);
  } catch (err) {
    console.error(err.message);
  }
};

export default fetchData;
