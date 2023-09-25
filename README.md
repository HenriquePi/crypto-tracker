# Crypto Token Tracker

## Description

- This project displays the top coins on coingecko, by default the user can see the top 10 coins the the platform, and can view up to 110 tokens
- the call to get the top tokens also gets any favorited coins, to ensure users favorites aren't cleared int he event a tracked token falls below the top 10
- Users can use a search bar to search the list by symbol or name
- user can select favorites from the list of top tokens. favorites are saved in local storage
- when returning or refreshing the site, the users can view all their tracked/favorite tokens,

## Limitations

- the free API has some constrains, to ensure the favorites call and the top token call don't interfere with eachother, there is a 1 second delate on the favorites call
- on occasion, if the api is hit too frequently, the calls will break for at most 1 minute. 

## Run on local

- npm run dev 

## Hosted

- you can find the site hosted [here](https://crypto-tracker.voxeldigital.ca/)



This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
