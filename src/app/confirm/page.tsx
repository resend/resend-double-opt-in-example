"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ConfirmPage() {
	const [message, setMessage] = useState("Confirming your subscription...");
	const searchParams = useSearchParams();

	useEffect(() => {
		const confirmEmail = async () => {
			const token = searchParams.get("token");
			if (!token) {
				setMessage("Invalid confirmation link");
				return;
			}

			const response = await fetch(
				`/api/confirm?token=${encodeURIComponent(token)}`,
			);

			if (!response.ok || response.status !== 200) {
				return setMessage("An error occurred during confirmation");
			}

			setMessage("Email confirmed successfully! You are now subscribed.");
		};

		confirmEmail();
	}, [searchParams]);

	return (
		<>
			<h1>Subscription Confirmation</h1>
			<p>{message}</p>
		</>
	);
}
