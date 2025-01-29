import crypto from "node:crypto";

const algorithm = "aes-256-cbc";
const secretPassphrase = process.env.SECRET_PASSPHRASE || "";

export function encrypt(text: string): string {
	const iv = crypto.randomBytes(16);
	const salt = crypto.randomBytes(16); // Unique salt for each encryption
	const key = crypto.scryptSync(secretPassphrase, salt, 32);
	const cipher = crypto.createCipheriv(algorithm, key, iv);
	let encrypted = cipher.update(text, "utf8", "hex");
	encrypted += cipher.final("hex");
	return `${iv.toString("hex")}:${salt.toString("hex")}:${encrypted}`;
}

export function decrypt(text: string): string {
	const [ivHex, saltHex, encryptedHex] = text.split(":");
	const iv = Buffer.from(ivHex, "hex");
	const salt = Buffer.from(saltHex, "hex");
	const key = crypto.scryptSync(secretPassphrase, salt, 32);
	const decipher = crypto.createDecipheriv(algorithm, key, iv);
	let decrypted = decipher.update(encryptedHex, "hex", "utf8");
	decrypted += decipher.final("utf8");
	return decrypted;
}
