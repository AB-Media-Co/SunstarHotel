// src/PhoneAuth.js
import { useState } from "react";
import { auth, RecaptchaVerifier } from "../services/firebase";
import { signInWithPhoneNumber } from "firebase/auth";

function PhoneAuth() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            console.log("reCAPTCHA solved", response);
          },
        }
      );
    }
  };
  

  const sendOtp = () => {
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phone, appVerifier)
      .then((confirmationResult) => {
        setConfirmationResult(confirmationResult);
        alert("OTP sent!");
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to send OTP.");
      });
  };

  const verifyOtp = () => {
    if (!confirmationResult || otp.length !== 6) return;

    confirmationResult
      .confirm(otp)
      .then((result) => {
        alert("OTP Verified!");
        console.log("User signed in:", result.user);
      })
      .catch((error) => {
        console.error(error);
        alert("Invalid OTP.");
      });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>OTP Verification</h2>
      <div id="recaptcha-container"></div>

      {!confirmationResult ? (
        <>
          <input
            type="tel"
            placeholder="+91XXXXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button onClick={sendOtp}>Send OTP</button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}
    </div>
  );
}

export default PhoneAuth;
