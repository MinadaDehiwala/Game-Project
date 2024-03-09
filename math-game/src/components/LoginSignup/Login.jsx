import React from "react";
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';



function Login() {
  return (
    <div className='login template d-flex justify-content-center align-items-center vh-100 bg-primary'>
      
      <div className="form_container p-5 rounded bg-white">
        <form>
          <h2 className="text-center ">Login In</h2>
          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control"
            />
          </div>
          <div className="d-grid">
            <button className="btn btn-primary">Sign In</button>  
          </div>
          <p className="text-end mt-2">
  No Account? <Link to="/signup" className="mt-2">Sign-Up</Link>
</p>
          </form>

      </div>
     
    </div>
  );
}

export default Login;
