import React ,{useState}  from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import  Alert  from "react-bootstrap/Alert";
import {setAuthUser} from "../../helper/Storage.js"

const Register =()=>{
  const Navigate = useNavigate();
  const [register,setRegister]=useState({
   email:"",
   password : "",
   name : "",
   phone : "",
   loading : false,
   err : null,
  });

  const RegisterFun = (e)=>{
    e.preventDefault();
    setRegister({...register,loading:true,err:[]})
    axios.post("http://localhost:6004/register",{
      email : register.email,
      password : register.password,
      name : register.name,
      phone : register.phone,
    })
    .then((resp)=>{
      setRegister({...register,loading:true,err:[]})
      setAuthUser(resp.data);
      Navigate("/");

    })
    .catch((errors)=>{
      setRegister({...register,loading:true,err:"This service is down now, or you enter invalid data."});
    })
  };

    return(

    <div className="login-container">
    <h1>Registration Form</h1>

    {register.err && (
      <Alert  variant="danger" className="p-1">
               {register.err}
               </Alert>
    )}

    <Form onSubmit={RegisterFun}>
    <Form.Group className="mb-3">
        <Form.Control type="text" placeholder="Full Name" 
          required
         value = {register.name}
         onChange={(e)=>
         setRegister({...register, name:e.target.value}) 
        }
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control type="text" placeholder="Phone Number" 
          required
         value = {register.phone}
         onChange={(e)=>
         setRegister({...register, phone:e.target.value}) 
        }
        />
      </Form.Group>

     <Form.Group className="mb-3">
        <Form.Control type="email" placeholder="Email"
         required
         value = {register.email}
         onChange={(e)=>
         setRegister({...register, email:e.target.value}) 
        }
         />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control type="password" placeholder="Password" 
          required
         value = {register.password}
         onChange={(e)=>
         setRegister({...register, password :e.target.value}) 
        }
        />
      </Form.Group>
      <Button className="btn btn-dark" variant="primary" type="submit" disabled={register.loading===true}>
        Sign Up
      </Button>
      </Form>
    </div>
    );
};

export default Register;