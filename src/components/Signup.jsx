import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";

const Signup = ({ session }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async () => {
    if (!(email == "" || password == "")) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Successfully Logged in");
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Enter both fields");
    }
  };
  const submitHandler = async () => {
    if (!(email == "" || password == "")) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Successfully Signed");
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Enter both fields");
    }
  };
  const logoutHandler = async () => {
    try {
      await signOut(auth);
      alert("Successfully Logged out");
    } catch (error) {
      console.error(error);
    }
  };
  const googleSubmitHandler = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Successfully Signed");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "300px",
        gap: "1rem",
      }}
    >
      {!session && (
        <>
          <input
            type="text"
            name="email"
            className="focus:outline-none border border-zinc-400 px-3 py-1"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            className="focus:outline-none border border-zinc-400 px-3 py-1"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </>
      )}
      {!session && (
        <>
          <button
            className="border border-black bg-black text-white p-1 rounded-lg font-semibold"
            onClick={loginHandler}
          >
            Log in
          </button>
          {/* <button
            className="border border-black bg-black text-white p-1 rounded-lg font-semibold"
            onClick={submitHandler}
          >
            Sign up
          </button> */}
          <button
            className="border border-black bg-black text-white p-1 rounded-lg font-semibold"
            onClick={googleSubmitHandler}
          >
            Sign up with Google
          </button>
        </>
      )}
      {session && (
        <button
          onClick={logoutHandler}
          style={{ color: "white", backgroundColor: "red" }}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Signup;
