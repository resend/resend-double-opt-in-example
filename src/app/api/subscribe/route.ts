import { NextResponse } from "next/server";
import { encrypt } from "@/app/lib/crypto";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
	const { email } = await request.json();

	// Add to audience as unsubscribed
	await resend.contacts.create({
		email,
		unsubscribed: true,
		audienceId: process.env.RESEND_AUDIENCE_ID as string,
	});

	// Generate a token with encrypted email and timestamp
	const tokenData = `${email}:${Date.now()}`;
	const token = encrypt(tokenData);

	const confirmationLink = `${process.env.NEXT_PUBLIC_APP_URL}/confirm?token=${encodeURIComponent(token)}`;

	// Send confirmation email
	await resend.emails.send({
		from: process.env.RESEND_SEND_FROM_EMAIL as string,
		to: email,
		subject: "Confirm your subscription",
		html: `<p>Please click <a href="${confirmationLink}">here</a> to confirm your subscription.</p>`,
	});

	return NextResponse.json({ message: "Confirmation email sent" });
}
