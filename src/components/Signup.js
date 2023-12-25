import React, { useState } from "react";



export default function SignUp() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [secretKey, setSecretKey] = useState("");


   // State variables for errors
   const [fnameError, setFnameError] = useState("");
   const [lnameError, setLnameError] = useState("");
   const [emailError, setEmailError] = useState("");
   const [passwordError, setPasswordError] = useState("");
  const [secretKeyError, setSecretKeyError] = useState("");
  
  const handleSubmit = (e) => {
    if (userType == "Admin" && secretKey != "AdarshT") {
      e.preventDefault();
      alert("Invalid Admin");
    } else {
      e.preventDefault();

      // Reset errors
    setFnameError("");
    setLnameError("");
    setEmailError("");
    setPasswordError("");
      setSecretKeyError("");
      
      // Validation logic
    let isValid = true;

    if (!fname) {
      setFnameError("First name is required");
      isValid = false;
    }

    if (!lname) {
      setLnameError("Last name is required");
      isValid = false;
    }

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    }

    if (userType === "Admin" && !secretKey) {
      setSecretKeyError("Secret key is required for Admin");
      isValid = false;
    }

    // If form is valid, proceed with submission
    if (isValid) {
      console.log("Form is valid. Proceeding with submission...");
      // Add your fetch logic here
    }
  };

      console.log(fname, lname, email, password);
      fetch("http://localhost:8000/register", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          fname,
          email,
          lname,
          password,
          userType,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userRegister");
          if (data.status == "ok") {
            alert("Registration Successful");
          } else {
            alert("Something went wrong");
          }
        });
    }

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3>Sign Up</h3>
          <div>
            <span>Register As</span>
            <br />
            <input
              type="radio"
              name="UserType"
              value="User"
              onChange={(e) => setUserType(e.target.value)}
              style={{ marginLeft: "1rem" }}
            />
            User
            <input
              type="radio"
              name="UserType"
              value="Admin"
              onChange={(e) => setUserType(e.target.value)}
              style={{ marginLeft: "1rem" }}
            />
            Admin
          </div>
          {userType === "Admin" ? (
            <div className="mb-3">
              <label>Secret Key</label>
              <input
                type="text"
                className={`form-control ${secretKeyError ? "is-invalid" : ""}`}
                placeholder="Secret Key"
                onChange={(e) => setSecretKey(e.target.value)}
              />
              <div className="invalid-feedback">{secretKeyError}</div>
            </div>
          ) : null}

          <div className="mb-3">
            <label>First name</label>
            <input
              type="text"
              className={`form-control ${fnameError ? "is-invalid" : ""}`}
              placeholder="First name"
              onChange={(e) => setFname(e.target.value)}
            />
            <div className="invalid-feedback">{fnameError}</div>
          </div>

          <div className="mb-3">
            <label>Last name</label>
            <input
              type="text"
              className={`form-control ${lnameError ? "is-invalid" : ""}`}
              placeholder="Last name"
              onChange={(e) => setLname(e.target.value)}
            />
            <div className="invalid-feedback">{lnameError}</div>
          </div>

          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className={`form-control ${emailError ? "is-invalid" : ""}`}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="invalid-feedback">{emailError}</div>
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className={`form-control ${passwordError ? "is-invalid" : ""}`}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="invalid-feedback">{passwordError}</div>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
          <p className="forgot-password text-right">
            Already registered <a href="/sign-in">sign in?</a>
          </p>
        </form>
      </div>
    </div>
  );
}