import React from "react";
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className='login template d-flex justify-content-center align-items-center'>
      <div className="form_container p-5 rounded bg-white">
        <form>
          <h1 className="text-center mb-4">Login In</h1>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" placeholder="Enter Email" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Enter Password" />
          </div>
          <button type="submit" className="btn btn-primary d-block w-100 mb-3">Sign In</button>
          <p className="text-end">
            No Account? <Link to="/signup" className="mt-2">Sign-Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
