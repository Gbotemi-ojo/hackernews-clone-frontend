"use client";
import { useState } from "react";
export default function AuthPage() {
  const signupEndpoint = "http://localhost:3001/signup";
  const signinEndpoint = "http://localhost:3001/signin";
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const handleSignUp = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const formBody = new URLSearchParams();
    formBody.append("username", signUpUsername);
    formBody.append("password", signUpPassword);
    const response = await fetch(signupEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody.toString(),
    });
    const data: { access_token: string } = await response.json();
    localStorage.setItem("access_token", data.access_token);
  };

  const handleSignIn = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const formBody = new URLSearchParams();
    formBody.append("username", signUpUsername);
    formBody.append("password", signUpPassword);
    const response = await fetch(signinEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody.toString(),
    });
    const data: { access_Token: string } = await response.json();
    localStorage.setItem("access_token", data.access_Token);
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div>
          <label>
            Username:
            <input
              type="text"
              value={signUpUsername}
              onChange={(e) => setSignUpUsername(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={signUpPassword}
              onChange={(e) => setSignUpPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Sign Up</button>
      </form>

      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <div>
          <label>
            Username:
            <input
              type="text"
              value={signInUsername}
              onChange={(e) => setSignInUsername(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={signInPassword}
              onChange={(e) => setSignInPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
