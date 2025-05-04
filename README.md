# VoteUp - Community-Driven Content Ranking Platform

VoteUp is a dynamic web application that empowers communities to create, share, and evaluate content through a democratic voting system. Built with Next.js, it provides a modern and responsive platform for users to engage with topics they care about.

## Key Features

### 1. User Authentication

- Secure registration and login system
- User profile management
- Session-based authentication with Auth.js

### 2. Topic Creation and Management

- Create new discussion topics
- Categorize topics with tags
- Browse topics by popularity or recency
- Search functionality for finding specific topics

### 3. Interactive Comments

- Rich text comment submission
- Support for URLs and formatted text
- Real-time comment updates
- Nested comment threads for organized discussions

### 4. Advanced Voting System

- Upvote (↑) and downvote (↓) capabilities
- Real-time score tracking
- Vote count display
- User reputation system based on contribution quality

### 5. Search and Filtering

- Full-text search functionality
- Tag-based filtering system
- Advanced sorting options (newest, most voted, trending)
- Category-based navigation

### 6. Smart Pagination

- Efficient loading of large comment threads
- "Load more" functionality
- Page size customization
- Maintains scroll position during navigation

### 7. Detailed Comment Metadata

- Author information
- Timestamp with relative time display
- Content type indicators
- Achievement badges and user reputation display

### 8. User Interaction Features

- Comment management (edit, delete)
- Content moderation tools
- Report/flag system for inappropriate content
- User mentions and notifications

## Tech Stack

- **Frontend Framework**: [Next.js](https://nextjs.org/) with TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) for beautiful and accessible components
- **Database**: [PostgreSQL](https://www.postgresql.org/) hosted on [Supabase](https://supabase.com/)
- **ORM**: [Prisma](https://www.prisma.io/) for type-safe database access
- **Deployment**: Optimized for Vercel deployment

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18.17 or later
- PostgreSQL (local development)
- npm or yarn or pnpm

## Getting Started

1. Clone the repository

```bash
git clone <repository-url>
cd voteup
```

2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables

```bash
cp .env.example .env
```

Fill in your environment variables in the `.env` file:

- Database URL
- Supabase credentials
- Auth.js secret and providers

4. Set up the database

```bash
npx prisma generate
npx prisma db push
```

5. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a custom font family.

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Auth.js Documentation](https://authjs.dev/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Make sure to:

1. Set up your environment variables in Vercel
2. Configure your Supabase database
3. Set up your Auth.js providers

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License
