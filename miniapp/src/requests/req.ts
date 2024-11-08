/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-shadow */
import { useEffect, useState } from 'react';
import axios from 'axios';

const ExampleComponent = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Make the Axios GET request
    axios
      .post('http://localhost:3333/users') // Replace with your API endpoint
      .then(response => {
        // Assuming the response structure is like { message: { ... } }
        setUserData(response.data.message); // Save the user data to state
        setLoading(false); // Set loading to false after receiving the data
      })
      .catch(error => {
        setError(error); // Set any error that occurs
        setLoading(false); // Set loading to false after an error
      });
  }, []); // Run this effect only once, when the component mounts
};

export default ExampleComponent;
