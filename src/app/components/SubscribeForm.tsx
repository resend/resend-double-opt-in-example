"use client";
import { useState } from "react";

const SubscribeForm = () => {
	const [message, setMessage] = useState("");
	const [email, setEmail] = useState("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setMessage("Sending confirmation email...");

		await fetch("/api/subscribe", {
			method: "POST",
			body: JSON.stringify({ email }),
		});
		setEmail("");
		setMessage("Confirmation email sent. Check your inbox.");
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
		</div>
	);
};
export default SubscribeForm;
