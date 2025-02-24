import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './signup.css'
import { useStateValue } from '../../utility/stateprovider'
import axios from '../../utility/axios';
import About from '../../components/about/About';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
const [{user }, dispatch] = useStateValue();
  const [form, setForm] = useState({});
  const [errors, setError] = useState({});
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
const [showPassword, setShowPassword] = useState(false);
const [conPassword, setConPassword] = useState(false);
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
  };
  const contogglePasswordVisibility = () => {
      setConPassword(!conPassword);
  };

   const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });

    if (errors[field]) {
      setError({
        ...errors,
        [field]: null,
      });
    }
  };
 const validateForm = () => {
    if (form.password == form.c_password) {
      return true;
    } else {
      return false;
    }
  }
   
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (validateForm()) {
      try {
        const response = await axios.post(`/api/users/createuser`, form);
        // Assuming `response` is the actual data returned from server
        // Handle success response here, if needed
        navigate('/login');
      } catch (error) {
        if (error.message) {
          setMessage(error.message);
          console.error('Error authenticating user:', error.message);
        } else {
          setMessage('Network Error: Unable to reach the server');
          console.error('Network Error:', error);
        }
      }
    } else {
      setMessage("Passwords don't match");
    }
  };
















   return (
    <div className="container-fluid sign_page">
      <div className="container d-md-flex mx-auto py-5 align-items-center">
        <div className="form_wrapper col-12 col-md-6 me-md-2 p-5 d-flex flex-column">
          <p className="p11">Join the network</p>
          <p className="p22 lorem">
            Already have an account?
            <Link to="/login" className="a11">
              Sign in
            </Link>
          </p>
           <form
             onSubmit={handleSubmit}
           >
            
            <div className="FLname d-flex">
              <input
                className="in11 me-1"
                name="firstName"
                onChange={(e) => setField('firstName', e.target.value)}
                type="text"
                placeholder="First Name"
               />
               <input
                className="in11 me-1"
                name="middleName"
                onChange={(e) => setField('middleName', e.target.value)}
                type="text"
                placeholder="Middle Name"
              />

              <input
                className="in11 ms-1"
                name="lastName"
                onChange={(e) => setField('lastName', e.target.value)}
                type="text"
                placeholder="Last Name"
              />
             </div>
             

            <input
              className="in11 ms-1"
              name="otherName"
              onChange={(e) => setField('otherName', e.target.value)}
              type="text"
              placeholder="Other Name"
             />
             <input               className={`in11 mr-1 ${message && "error"}`}
              name="email"
              onChange={(e) => setField('email', e.target.value)}
              type="email"
              placeholder="Email"
             />
             
             <input
                className={`in11 ${message && "error"}`}

                name="password"
                type={showPassword ? "text" : "password"}
                onChange={(e) => setField("password", e.target.value)}
                placeholder=" Password"
              />
              <span className="showHide2" onClick={togglePasswordVisibility}>
                {showPassword ? (
                  <FaEyeSlash
                    style={{ width: "24px", height: "24px", cursor: "pointer" }}
                  />
                ) : (
                  <FaEye
                    style={{ width: "24px", height: "24px", cursor: "pointer" }}
                  />
                )}
             </span>
             <br />
             <input
               className={`in11 ${message && "error"}`}

               name="c_password"
               type={conPassword ? "text" : "password"}
              onChange={(e) => setField('c_password', e.target.value)}
              placeholder="confim Password"
            />
            <span className="showHide2" onClick={contogglePasswordVisibility}>
                {conPassword ? (
                  <FaEyeSlash
                    style={{ width: "24px", height: "24px", cursor: "pointer" }}
                  />
                ) : (
                  <FaEye
                    style={{ width: "24px", height: "24px", cursor: "pointer" }}
                  />
                )}
               
             </span><br />
             <small className="error__msg">{message}</small>

            <button className="btnSign">Agree and Join</button>
          </form>
          <p className="mt-md-5 mt-sm-5 text-center texttag">
            I agree to the
            <Link to="" className="a22">
              privacy policy
            </Link>
            and
            <Link to="" className="a22">
              terms of serivice.
            </Link>
          </p>

          <Link to="/login" className="a33 text-center">
            Already have an account?
          </Link>
        </div>
         <About />
      </div>
    </div>
  );
}

export default Signup