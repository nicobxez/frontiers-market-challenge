# Frontiers Market Challenge ([Nicolas Baez](https://github.com/nicobxez))

This is a project initialized with [Next.js](https://nextjs.org/docs)
using [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)
with [TypeScript](https://www.typescriptlang.org/), [Firebase](https://firebase.google.com/) and [Material UI](https://mui.com/material-ui/getting-started/).

### Key Features

- **CI/CD with GitHub Actions**: The project is configured with CI/CD pipelines using GitHub Actions for automated deployments to **Firebase Hosting**.
- **Google Sign-In**: Users can sign in using their Google account. This feature is implemented and ready to use.
- **Email Sign-In**: Users can sign in using their email and password. Note: Currently, no authorized email accounts are available for testing.
- **Dynamic Views**: Sections of the website dynamically update based on user interactions and login status.
- **Responsive Design**: The application is fully responsive and adapts seamlessly to any device, providing an optimal user experience on desktops, tablets, and mobile phones.
- **Faithful Recreation**: The **Login** and **Home** pages are recreated as faithfully as possible to the official [Frontiers website](https://frontiersmarket.com/).
- **Custom 404 Page**: A personalized 404 error page is displayed when users navigate to a non-existent route.
- **Private Routes**: The feature for private routes is implemented and configured, although it is not yet utilized.

---

## How to use it

You can clone the repository [or visit the website](https://frontiers-market-challenge.web.app/):

Install the dependencies and start the local server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Useful Links

It is required to have [NodeJS](https://nodejs.org/es) in its LTS version installed.

To learn more about this project:

- [Next.js](https://nextjs.org/docs)
- [TypeScript](https://www.typescriptlang.org/)
- [Firebase](https://firebase.google.com/)
- [Material UI](https://mui.com/material-ui/getting-started/)
- [Jest](https://jestjs.io/)

---

## Requirements

Please recreate the homepage [https://frontiersmarket.com/](https://frontiersmarket.com/) on your server (preferably firebase) as a static website and create a chat widget (design it yourself) that will overlay the website.

The chat widget should display the ongoing conversations with the chatbot or a real person. There can be only one ongoing conversation per user. Please use firestore to store the conversations. Chat can be connected to any chatbots api of your choice.

As an extra activity you can design a sign in functionality that will allow users to sign in with their google account based on firebase authentication.
The website and the chat should be written in typescript.

#### Features that will be evaluated:

- Website translation
- Chat design
- Loading speed
- Chat response time
- API integrations with third party
- Data model for storing conversations for signed in and guest users

---

Made by [Nicolas Baez](https://github.com/nicobxez) ©2024
