import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './App.css';
import SimpleScatterChart from './ScatterChart';

function App() {
  const [data, setData] = useState([]);
  const [email, setEmail] = useState(Cookies.get('email') || ''); // Get email from cookie
  const [variety, setVariety] = useState(Cookies.get('variety') || ''); // Get variety from cookie
  const [loggedIn, setLoggedIn] = useState(!!Cookies.get('token')); // Check cookie for token

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', { email });
      setVariety(response.data.variety);
      Cookies.set('token', response.data.token, { expires: 1 }); // Set token in cookies
      Cookies.set('email', email, { expires: 1 }); // Set email in cookies
      Cookies.set('variety', response.data.variety, { expires: 1 }); // Set variety in cookies
      setLoggedIn(true);
      fetchData(response.data.token);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const token = Cookies.get('token');
      await axios.post('http://localhost:5000/logout', {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      Cookies.remove('token'); // Remove token from cookies
      Cookies.remove('email'); // Remove email from cookies
      Cookies.remove('variety'); // Remove variety from cookies
      setLoggedIn(false);
      setData([]);
      setVariety('');
      setEmail('');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const fetchData = async (authToken) => {
    try {
      const response = await axios.get('http://localhost:5000/data', {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      setData(response.data);
    } catch (error) {
      console.error('Fetching data failed:', error);
    }
  };

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      fetchData(token);
      setEmail(Cookies.get('email')); // Read email from cookie
      setVariety(Cookies.get('variety')); // Read variety from cookie
    }
  }, [loggedIn]);

  return (
    <div>
      {!loggedIn ? (
        <div className="login">
          <h2>Login to IRIS APP</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div>
          <button onClick={handleLogout}>Logout</button>
          <h2>Welcome, {email}</h2>
          <h3>Accessing data for variety: {variety}</h3>
          <div>
            {data.length > 0 ? (
              <div className="charts-container">
                <SimpleScatterChart data={data} xAxis="sepal.length" yAxis={["sepal.width", "petal.length", "petal.width"]} />
                <SimpleScatterChart data={data} xAxis="petal.length" yAxis={["sepal.width", "sepal.length", "petal.width"]} />
              </div>
            ) : (
              <p>Loading data...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
