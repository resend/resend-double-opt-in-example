# Resend with Double Opt-In

This is a simple example of how to use Resend with double opt-in for an Audience. It uses the [Next.js App Router](https://nextjs.org/docs/app) and [Resend](https://resend.com) audiences.

## Deploy your own

Deploy the example using [Vercel](https://vercel.com):

<!-- TODO: add link -->

## Instructions

1. Define environment variables in `.env` file.

```sh
cp .env.example .env
```

> [!NOTE]
> `SECRET_PASSPHRASE` is a string of your choosing. Make it unique and complex.

2. Install dependencies:

```sh
npm install
# or
yarn
```

3. Run Next.js locally:

```sh
npm run dev
```

4. Sign up using the form on the homepage.

The form will add the user to the audience as an unsubscribed contact and send a confirmation email.

5. Check your inbox for a confirmation email.

Confirming the subscription will change the user to a subscribed contact.

## License

MIT License
