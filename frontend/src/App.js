import { useState } from 'react';
import './App.css';

function App() {

  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: ""
  })
  const [loggedin, setLoggedin] = useState(false)
  const [showError, setShowError] = useState(false)
  const [accessToken, setAccessToken] = useState(null)
  const [refreshToken, setRefreshToken] = useState(null)


  const handleLoginForm = (e) => {
    const { name, value } = e.target
    setLoginDetails((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleLogin = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDetails),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();

      console.log(data);
      setAccessToken(data["access_token"])
      setRefreshToken(data["refresh_token"])
      setLoggedin(true)

      return data;
  } catch (error) {
    console.error("Error:", error);
    setShowError(true)
  }
  }


  return (
    <div className="App">

      {
        loggedin ?
        <>
        </>
        :
      <>
      <div className='card'>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
          <input 
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={loginDetails.username}
            onChange={handleLoginForm}
            />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password"
          className="form-control"
          id="password"
          name="password"
          value={loginDetails.password}
          onChange={handleLoginForm}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleLogin}>Submit</button>
      </div>

      <div>
        {showError ? <p style={{ color: "red" }}>ERROR WITH LOGIN DETAILS</p> : null}
      </div>
      </>
      }

    </div>
    
  );
}

export default App;
