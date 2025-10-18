# Anonify 🎭

[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.17.1-2D3748)](https://www.prisma.io/)
[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)

**Anonify** - Where your identity remains a secret. A modern anonymous feedback platform that allows users to send and receive messages without revealing their identity.

## 🌟 Features

- **Anonymous Messaging**: Send messages to users without revealing your identity
- **User Authentication**:
  - Credentials-based authentication (email/username & password)
  - OAuth integration (Google & GitHub)
  - Secure password hashing with bcryptjs
- **Message Management**:
  - Toggle message acceptance on/off
  - View and manage received messages
  - Delete unwanted messages
  - Real-time message updates
- **AI-Powered Suggestions**: Get AI-generated message suggestions using Google's Generative AI
- **User Dashboard**:
  - Manage your profile
  - Copy and share your profile URL
  - Track all received messages
- **Responsive Design**: Beautiful UI that works seamlessly on desktop and mobile
- **Dark Mode**: Theme switching with next-themes
- **Type-Safe**: Built with TypeScript and Zod validation

## 🚀 Tech Stack

### Frontend

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://reactjs.org/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Styling
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[React Hook Form](https://react-hook-form.com/)** - Form management
- **[TanStack Query](https://tanstack.com/query)** - Data fetching and caching
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications

### Backend

- **[NextAuth.js 5](https://next-auth.js.org/)** - Authentication
- **[Prisma](https://www.prisma.io/)** - Database ORM
- **[PostgreSQL](https://www.postgresql.org/)** - Database
- **[Google Generative AI](https://ai.google.dev/)** - AI-powered message suggestions

### Validation & Utilities

- **[Zod](https://zod.dev/)** - Schema validation
- **[bcryptjs](https://github.com/dcodeIO/bcrypt.js)** - Password hashing
- **[clsx](https://github.com/lukeed/clsx)** & **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Class management

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **pnpm** (recommended) or npm/yarn
- **PostgreSQL** database
- **Git**

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/lra8dev/anonify.git
   cd anonify
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/anonify"
   DIRECT_URL="postgresql://user:password@localhost:5432/anonify"

   # NextAuth
   AUTH_SECRET="your-secret-key-here" # Generate with: openssl rand -base64 32
   AUTH_TRUST_HOST=true

   # OAuth Providers
   AUTH_GITHUB_ID="your-github-oauth-id"
   AUTH_GITHUB_SECRET="your-github-oauth-secret"

   AUTH_GOOGLE_ID="your-google-oauth-id"
   AUTH_GOOGLE_SECRET="your-google-oauth-secret"

   # Google AI
   GOOGLE_AI_API_KEY="your-google-ai-api-key"
   ```

4. **Set up the database**

   ```bash
   pnpm db:generate
   pnpm db:migrate
   ```

5. **Run the development server**

   ```bash
   pnpm dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Available Scripts

```bash
pnpm dev          # Start development server with Turbopack
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm db:generate  # Generate Prisma client
pnpm db:migrate   # Run database migrations
pnpm db:deploy    # Deploy migrations to production
pnpm db:reset     # Reset database
pnpm db:studio    # Open Prisma Studio
```

## 🗂️ Project Structure

```
anonify/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Authentication pages (sign-in, sign-up)
│   ├── (landing)/           # Landing page
│   ├── api/                 # API routes
│   ├── dashboard/           # User dashboard
│   ├── u/[username]/        # Public user profile pages
│   └── globals.css          # Global styles
├── auth/                     # NextAuth configuration
├── components/               # Reusable React components
│   ├── ui/                  # UI components (shadcn/ui)
│   ├── navbar/              # Navigation component
│   └── oauth-signin/        # OAuth authentication component
├── constants/               # App constants
├── context/                 # React context providers
├── icons/                   # Custom icon components
├── lib/                     # Utility libraries
│   ├── db/                  # Database clients
│   ├── validators/          # Zod schemas
│   └── bcrypt-methods/      # Password hashing utilities
├── prisma/                  # Prisma schema and migrations
├── types/                   # TypeScript type definitions
└── utils/                   # Helper functions
```

## 🔐 Authentication Setup

### OAuth Providers

1. **GitHub OAuth**

   - Go to [GitHub Developer Settings](https://github.com/settings/developers)
   - Create a new OAuth App
   - Set callback URL to: `http://localhost:3000/api/auth/callback/github`
   - Copy Client ID and Client Secret to `.env`

2. **Google OAuth**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Set callback URL to: `http://localhost:3000/api/auth/callback/google`
   - Copy Client ID and Client Secret to `.env`

### Google AI API

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create an API key
3. Add it to `.env` as `GOOGLE_AI_API_KEY`

## 🎯 Usage

1. **Sign Up**: Create an account using email/username and password, or use OAuth (Google/GitHub)
2. **Enable Messages**: Toggle message acceptance in your dashboard
3. **Share Your Link**: Copy your unique profile URL and share it with others
4. **Receive Messages**: Users can send you anonymous messages through your profile link
5. **Manage Messages**: View, read, and delete messages from your dashboard
6. **Send Messages**: Visit any user's profile to send them anonymous messages

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**lra8dev**

- GitHub: [@lra8dev](https://github.com/lra8dev)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Vercel](https://vercel.com/) for hosting and deployment
- All contributors and supporters of this project

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

Made with ❤️ by [lra8dev](https://github.com/lra8dev)
