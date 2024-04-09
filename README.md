This is a [Next.js](https://nextjs.org/) and [ElysiaJS](https://elysia.com) project.

## Tech Stack

1. [Next.js](https://nextjs.org/) - React Framework.
2. [ElysiaJS](https://elysiajs.com) - API Framework.
3. [Lucia](https://lucia-auth.com) - Authentication library.
4. [Prisma](https://www.prisma.io/) - Database Toolkit.
5. [SWR](https://swr.vercel.app/) - React Hooks library for data fetching.
6. [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework.
7. [Bun](https://bun.id.vn) - Development Environment.

## Getting Started

First, add the following to your `.env.local` file:

```bash
# .env.local
DATABASE_URL=""
```

Then, run the following commands to create the database and run the migrations:

```bash
# Elysia only runs on Bun
bun dev
```

If you want to add more environment variables, you can add them to the `.env.local` file and remember to config in `env.mjs`:

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
And open [http://localhost:3000/api/elysia/docs](http://localhost:3000/api/elysia/docs) to see the API documentation.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Documentation](https://tiesen.id.vn/blog/next-elysia) - my blog post about this project.
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Elysia Documentation](https://elysiajs.com) - learn about Elysia features and API.
