import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const MyComponent = () => {
 const [data, setData] = useState(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);

 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://randomuser.me/api/?page=1&results=1&seed=abc");
        const firstName = response.data.results[0].name.first;
        const lastName = response.data.results[0].name.last;
        const gender = response.data.results[0].gender;
        const phone = response.data.results[0].phone;
        const image = response.data.results[0].picture.large;
        setData({ firstName, lastName, gender, phone, image });
        console.log('Fetched data:', { firstName, lastName, gender, phone, image });
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
 }, []);

 if (loading) return <div>Loading...</div>;
 if (error) return <div>Error: {error}</div>;

 return (
    <div className='App'>
      {data && (
        <div className='card'>
          <div className='card-img'>
            <img src={data.image} alt='profile' />
          </div>
          <div className='card-text'>
          <p>{data.firstName} {data.lastName}</p>
          <p>{data.gender}</p>
          <p>{data.phone}</p>
          </div>
        </div>
      )}
    </div>
 );
};

export default MyComponent;
