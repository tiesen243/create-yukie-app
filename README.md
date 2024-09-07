# Next Elysia

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-t3-app`](https://create.t3.gg/). It includes a simple example of how to use [ElysiaJS](https://elysiajs.com) with [Lucia](https://lucia-auth.com) and [Prisma](https://prisma.io).

## Tech Stack

- [Next.js](https://nextjs.org)
- [EkysiaJS](https://next-elysiajs.com)
- [Lucia](https://lucia-auth.com)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)

## Getting Started

First, clone the repository:

```bash
git clone git@github.com:tiesen243/next-elysia.git
```

Then, install the dependencies:

```bash
bun install
```

Next, create a `.env` file in the root of the project and add the following environment variables:

```bash
cp .env.example .env
```

Then, run the development server:

```bash
bun db:push
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
