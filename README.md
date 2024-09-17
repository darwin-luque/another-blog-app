# Another Blog App

**Another Blog App** is a feature-rich blogging platform built to demonstrate my proficiency with modern web technologies such as **Next.js**, **tRPC**, **TailwindCSS**, and **Drizzle ORM**. The app allows users to create and manage blogs, with additional features like categories, bookmarks, and a rich text editor for post formatting. While the project is still in development, multiple features have been implemented, and more exciting functionalities are planned.

## 🚀 Technologies Used

- **Next.js** – React framework for building server-side rendered applications
- **tRPC** – Type-safe APIs between client and server
- **TailwindCSS** – Utility-first CSS framework for responsive design
- **Drizzle ORM** – SQL ORM for TypeScript and JavaScript
- **PostgreSQL** – Relational database for storing user and post data
- **TipTap** – Rich text editor with customizable extensions
- **React Hook Form** – Library for managing form state and validation
- **React Query** – Data fetching and caching for server state management
- **shadcn/ui** – Accessible UI components built with TailwindCSS
- **Lucide Icons** – Open-source icon library
- **Uploadthing** – File and image uploading utility
- **Clerk** – Authentication and user management platform

## 🌟 Features

- **User Authentication**: Secure user authentication with **Clerk**, supporting sign-up, login, password reset, and account management.
- **Blog Creation**: Rich blog post creation with formatting options, images, and categories.
- **Bookmarking**: Users can bookmark blog posts and easily access them later.
- **Categories**: Admins can organize blog posts by categories to help users find relevant content.
- **Text Formatting**: Supports rich text formatting with bold, italic, lists, links, and more via **TipTap**.
- **Image Uploading**: Users can upload images directly into their blog posts, stored securely on the server.
- **Dark Mode**: Switch seamlessly between light and dark themes.
- **Responsive Design**: Fully responsive and optimized for all screen sizes.

## 🔐 User Authentication

The app uses **Clerk** for a fully integrated authentication system. Users can sign up, log in, and manage their accounts easily. Clerk also offers a user dashboard for managing profile details and security settings.

## ✍️ Blog Creation

Users can create blog posts with a rich text editor powered by **TipTap**. The editor supports various text formatting options and allows users to add images and categorize their posts.

## 📚 Bookmarking

Blog posts can be bookmarked by users for future reference, making it easy to keep track of interesting content.

## 🗂️ Categories

Admins can create and manage categories, providing an organized structure for blog posts. This helps users filter content based on their interests.

## 📝 Text Formatting

The editor offers full text formatting capabilities, including bold, italics, lists, and links, giving users flexibility in styling their blog posts.

## 📸 Image Uploading

Users can upload and manage images for their blog posts, enhancing their content with visuals. Images are securely stored on the server.

## 🌙 Dark Mode

The app includes a user-friendly dark mode toggle, giving users the ability to switch between light and dark themes.

## 📱 Responsive Design

The entire application is optimized for all devices, ensuring a seamless experience on mobile, tablet, and desktop.

## 🚧 Future Features

- Search functionality for finding posts by keywords
- Comment system for user engagement
- Like and reaction system for posts
- Personalized "For You" feed
- Notifications for new posts and interactions
- User profiles with customizable settings
- Admin panel for managing content and users
- SEO optimization for improved search engine visibility
- Performance improvements and bug fixes

## 🛠️ Getting Started

To set up the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/darwin-luque/another-blog-app
   cd another-blog-app
   ```

2. Install the dependencies:

   ```bash
   pnpm install
   ```

3. Create a `.env` file using the provided `.env.example` as a template.

4. Run the development server:

   ```bash
   pnpm dev
   ```

## 📅 Roadmap

- Continue adding more features like comments, likes, and notifications.
- Enhance performance and SEO optimization.
- Build an admin panel for full content management.
