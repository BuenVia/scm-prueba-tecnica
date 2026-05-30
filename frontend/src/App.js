import { useState } from 'react';
import './App.css';

function App() {

  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: ""
  })
  const [formData, setFormData] = useState({
    field: "",
    operator: "",
    value: ""
  });
  const [searchResults, setSearchResults] = useState([])
  const [loggedin, setLoggedin] = useState(false)
  const [showError, setShowError] = useState(false)
  const [accessToken, setAccessToken] = useState(null)
  const [refreshToken, setRefreshToken] = useState(null)
  const [searchError, setSearchError] = useState(false)


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

      setAccessToken(data["access_token"])
      setRefreshToken(data["refresh_token"])
      setLoggedin(true)

      return data;
  } catch (error) {
    console.error("Error:", error);
    setShowError(true)
  }
  }

  const handleLogout = () => {
    setLoggedin(false)
    setSearchResults([])
    setShowError(false)
    setAccessToken(null)
    setRefreshToken(null)
  }

  const handleSelectChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

     try {
      const payload = {
        "filters": [
          {
            "field": formData.field,
            "operator": formData.operator,
            "value": formData.value
          }
        ]
      }

      const response = await fetch("http://127.0.0.1:8000/items/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `bearer ${accessToken}`
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Search failed");
      }

      const data = await response.json();
      setSearchResults(data)


      return data;
  } catch (error) {
    setSearchError("Error in search.")
    console.error("Error:", error);
  }
  };

  


  return (
    <div className="App">

      {
        loggedin ?
        <>
          <div className="card p-4 shadow-sm">
      <h5 className="card-title mb-4">Items Search</h5>

      <form onSubmit={handleSubmit}>
        <div className="row g-3 align-items-end">
          <div className="col-md-4">
            <label className="form-label">Field</label>

            <select
              className="form-select"
              name="field"
              value={formData.field}
              onChange={handleSelectChange}
            >
              <option value="">Select field</option>
              <option value="sku">SKU</option>
              <option value="status">Status</option>
              <option value="warehouse_id">Warehouse</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">Operator</label>

            <select
              className="form-select"
              name="operator"
              value={formData.operator}
              onChange={handleSelectChange}
            >
              <option value="">Select operator</option>
              <option value="eq">Equals</option>
              <option value="neq">Does Not Equal</option>
              <option value="gt">Greater than</option>
              <option value="gte">Greater than or equal to</option>
              <option value="lt">Less than</option>
              <option value="lte">Less than or equal to</option>
              <option value="like">Like</option>
              <option value="in">In</option>
              <option value="is_null">Is null</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">Value</label>

            <input
              type="text"
              className="form-control"
              name="value"
              value={formData.value}
              onChange={handleSelectChange}
              placeholder="Enter value"
            />
          </div>
        </div>

        <div className="mt-4">
          <button type="submit" className="btn btn-primary">
            Submit Filter
          </button>
        </div>
      </form>
    </div>
    {searchResults ? 
    <div className="card p-4 shadow-sm">
      {searchResults.map(result => {
        return(
          <div key={result["id"]} className='card'>
            <p>{result["id"]}</p>
            <p>{result["sku"]}</p>
            <p>{result["warehouse_id"]}</p>
            <p>{result["status"]}</p>
          </div>
        )
      })}
    </div>
    
    : null}

    <div className='m-3'>
      <button className='btn btn-primary' onClick={handleLogout}>Logout</button>
    </div>
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
