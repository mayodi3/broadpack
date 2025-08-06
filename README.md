This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Pinecone Assistant Integration

This project uses [Pinecone Assistant](https://docs.pinecone.io/guides/assistant/quickstart) for smart chatbot responses.

### Setup

1. **Install dependencies** (already done):

   ```sh
   pnpm add @pinecone-database/pinecone
   ```

2. **Get a Pinecone API Key:**

   - Sign up or log in at [Pinecone Console](https://app.pinecone.io/).
   - Create an API key.

3. **Set your API key:**

   - Create a `.env.local` file in the project root (if not present).
   - Add:
     ```env
     NEXT_PUBLIC_PINECONE_API_KEY=your-pinecone-api-key-here
     ```

4. **(Optional) Upload documents to the assistant** for RAG (retrieval-augmented generation). See Pinecone docs for file upload examples.

5. **Run your app:**

   ```sh
   pnpm dev
   ```

6. **Chatbot widget** will now use Pinecone Assistant for responses.

---

For more, see [Pinecone Assistant Quickstart](https://docs.pinecone.io/guides/assistant/quickstart).
