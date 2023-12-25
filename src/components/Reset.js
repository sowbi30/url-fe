import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function Reset() {
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  // Use the useParams hook to get parameters from the URL
  const { userId, token } = useParams();

  function handleSubmit(e) {
    e.preventDefault();

    console.log(password);
    fetch(`http://localhost:8000/reset-password/${userId}/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        password,
        confirmpassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status === "ok") {
          alert("Password reset successfully");
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("resetpassword", true);

          window.location.href = "http://localhost:8000";
        }
      })
      .catch((error) => {
        console.error("Error during password reset:", error);
      });
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3>Reset Password</h3>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="********"
              onChange={(e) => setConfirmpassword(e.target.value)}
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
