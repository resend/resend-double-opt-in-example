"use client";
import { useState } from "react";

const SubscribeForm = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setMessage("Sending confirmation email...");

    const response = await fetch("/api/subscribe", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (response.ok && "message" in data) {
      setEmail("");
      setMessage(data.message);
    } else {
      setMessage("");
      setError(data.error);
    }
  };

  return (
    <div>
      <h1>Subscribe to our newsletter</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
        />
        <button type="submit">Subscribe</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};
export default SubscribeForm;
