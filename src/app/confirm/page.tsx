"use client";

import { Suspense } from "react";
import ConfirmationUI from "../components/Confirmation";

export default function ConfirmPage() {
	return (
		<>
			<h1>Subscription Confirmation</h1>
			<Suspense fallback={<p>Confirming your subscription...</p>}>
				<ConfirmationUI/>
			</Suspense>
		</>
	);
}
