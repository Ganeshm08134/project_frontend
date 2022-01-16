import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Base from "../core/Base";
import { authenticate, isAuthenticated, signin } from "../auth/helper";


const Signin = () => {
    const [values, setValues]=useState({
        name:"",
        email:"ten@ganesh.com",
        password:"12345",
        error:"",
        success: false,
        loading: false,
        didRedirect:false,

    })
    const {name, email, password, error, success, loading, didRedirect} = values;

    const handelChange = (name) => (event) =>{
        setValues({...values, error: false, [name]: event.target.value });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error:false, loading:true})
       
       
        signin({ email, password })
        .then((data)=> {
            console.log("DATA", data);
            if(data.token){
                //let sessionToken = data.token;
                authenticate(data, () => {
                    console.log("TOKKEN ADDED")
                    setValues({
                        ...values,
                        didRedirect: true,
                    });
                });
            }
            else{
                setValues({
                    ...values,
                    loading:false,
                });
            }
        })
        .catch((e) => console.log(e));

    };


        const performRedirect = () => {
            console.log(isAuthenticated())
            if(isAuthenticated){
            return <Redirect to="/" />;
            }
        };

        const lodingMessage = () => {
            return(
                loading && (
                    <div className="alert alert-info">
                        <h2>Loading...</h2>
                    </div>
                )
            );
        };



    const successMessage = () => {
        return(
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <div
              className="alert alert-success"
              style={{display: success ? "": "none"}}>
                New account createdsuccessfully. please 
                <Link to="/signin">login now.</Link>
              </div>
            </div>
          </div>
        );
      };
  
      const errorMessage = () => {
        return(
          <div className="row">
            <div className="col-md-6 offset-sm-3 test-left">
              <div
              className="alert alert-danger"
              style={{display: error ? "": "none"}}>
                Check all fields again
              </div>
            </div>
          </div>
        );
      };
  
      const signInForm = () => {
          return(
              <div className="row">
                  <div className="col-md-6 offset-sm-3 text-left">
                      <form>
                          
                          <div className="form-group">
                          <label className="text-light">Email</label>
                          <input name="email" className="form-control"
                          value={email}
                          onChange={handelChange("email")}
                          type="text"/>
                          </div>
  
                          <div className="form-group">
                          <label className="text-light">password</label>
                          <input
                          name="password"
                          className="form-control"
                          value={password}
                          onChange={handelChange("password")}
                          type="password"/>
                          </div>
                          <button 
                          onClick={onSubmit}
                          className="btn btn-success btn-block"
                          >
                              Submit
                              </button>
                      </form>
                  </div>
              </div>
          );
      };
  




    return(
        <Base title="Welcome to sign in page" description="A t-shirt store">
            {lodingMessage()}

        
            {signInForm()}
        <p className="text-center">
            {JSON.stringify(values)}
        </p>
        {performRedirect()}
        </Base>
    );

};

export default Signin;