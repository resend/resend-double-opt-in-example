import { readFile, writeFile } from "node:fs/promises";
import { randomBytes } from "node:crypto";

async function writeSecretKeyToEnv() {
  let env;
  try {
    env = await readFile(".env", { encoding: "utf-8" });
  } catch (error) {
    try {
      env = await readFile(".env.example", { encoding: "utf-8" });
    } catch (error) {
      console.error("Couldn't find .env.example");
    }
  }
  const secretKey = randomBytes(32).toString("hex");
  const newEnv = env.replace(/^(SECRET_PASSPHRASE=)(.*)$/m, `$1${secretKey}`);
  await writeFile(".env", newEnv, { encoding: "utf-8" });
}

await writeSecretKeyToEnv();
