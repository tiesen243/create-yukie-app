This is a [Next.js](https://nextjs.org/) and [ElysiaJS](https://elysia.com) project.

## Tech Stack

1. [Next.js](https://nextjs.org/) - React Framework.
2. [ElysiaJS](https://elysiajs.com) - API Framework.
3. [Lucia](https://lucia-auth.com) - Authentication library.
4. [Prisma](https://www.prisma.io/) - Database ORM.
5. [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework.

## Getting Started

First, add the following to your `.env` file:

```bash
# .env.local
DATABASE_URL=""
```

Then, run the following commands to create the database and run the migrations:

```bash
# Elysia only runs on Bun
bun db:push
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

If you want to add more environment variables, you can add them to the `.env.local` file and remember to add it in `env.mjs`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Documentation](https://tiesen.id.vn/blog/next-elysia) - my blog post about this project.
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Elysia Documentation](https://elysiajs.com) - learn about Elysia features and API.
