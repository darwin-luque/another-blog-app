# Another Blog App

This is an application to demonstrate my abilities with Next.js, tRPC, TailwindCSS, and Drizzle ORM (among other technologies). The project is a simple blog app. However, I did add multiple features such as categories, bookmarks, and a complete blog creation with text formatting etc. The project is still in development and I will be adding more features in the future.

## Technologies Used

- Next.js
- tRPC
- TailwindCSS
- Drizzle ORM
- PostgreSQL
- TipTap
- React Hook Form
- React Query
- shadcn/ui
- Lucide Icons
- Uploadthing
- Clerk

## Features

- User Authentication
- Blog Creation
- Bookmarking
- Categories
- Text Formatting
- Image Uploading
- Dark Mode
- Responsive Design

### User Authentication

The app uses Clerk for user authentication. Clerk is a no-code authentication solution that provides a complete user management system. It allows users to sign up, log in, and reset their password. It also provides a dashboard for users to manage their account.

### Blog Creation

Users can create a blog post with a title, content, and category. The content editor is powered by TipTap, a rich text editor for Vue.js. Users can format their text, add images, and more.

### Bookmarking

Users can bookmark blog posts. Bookmarked posts are saved to the user's account and can be accessed from the sidebar.

### Categories

Admins can create categories for their blog posts. Categories are used to organize posts and make it easier for users to find content.

### Text Formatting

The content editor supports text formatting such as bold, italic, underline, and more. Users can also add links, images, and lists.

### Image Uploading

Users can upload images to include in their blog posts. Images are stored on the server and can be accessed from the content editor.

### Dark Mode

The app supports dark mode. Users can switch between light and dark mode using the toggle in the header.

### Responsive Design

The app is fully responsive and works on all devices. The layout adjusts to fit the screen size, and elements are rearranged to provide the best user experience.

### Future Features

- Search
- Comments
- Likes
- For You Feed
- Notifications
- User Profiles
- Admin Panel
- SEO Optimization
- Performance Improvements
- Bug Fixes

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/darwin-luque/another-blog-app
cd another-blog-app
```

2. Install the dependencies:

```bash
pnpm install
```

3. Create a `.env` file in the root of the project using the `.env.example` file as a template:

4. Run the development server:

```bash
pnpm dev
```
