
# GEMINI.md

This file provides guidance for the Gemini AI to assist with development in this project.

## Project Overview

This project is a blog built with Next.js and microCMS. It fetches blog posts and categories from the microCMS API and renders them as static pages.

## Coding Style

- **Language:** TypeScript
- **Formatting:** Follow the rules defined in `.eslintrc.mjs` and `prettier.config.js`. Code is automatically formatted on save.
- **Naming Conventions:**
    - **Components:** PascalCase (e.g., `BlogCard.tsx`)
    - **Variables and Functions:** camelCase (e.g., `getBlogPosts`)
    - **CSS Modules:** camelCase (e.g., `BlogCard.module.css`)
    - **Files:** Use kebab-case for all files except for React components.

## Libraries and Frameworks

- **Framework:** [Next.js](https://nextjs.org/)
- **UI Library:** [React](https://reactjs.org/)
- **Styling:**
    - [Tailwind CSS](https://tailwindcss.com/): For global styles and utility classes.
    - [CSS Modules](https://github.com/css-modules/css-modules): For component-level styles.
- **API Client:** [microCMS JS SDK](https://github.com/microcmsio/microcms-js-sdk) for fetching data from the microCMS headless CMS.
- **HTML Parsing:** [Cheerio](https://cheerio.js.org/) for parsing HTML, especially for creating the table of contents.
- **Date Formatting:** [Day.js](https://day.js.org/) for formatting dates.

## Architecture

The project follows a directory structure that separates concerns into `src/commons`, `src/features`, `src/infra`, `src/libs`, and `src/pages`.

- **`src/pages`**: Contains the main pages of the application, following Next.js's file-system based routing.
- **`src/commons`**: Contains reusable components, layouts, and utility functions that are shared across the application.
- **`src/features`**: Contains components and logic related to specific features of the application, such as the blog.
- **`src/infra`**: Contains the infrastructure layer, which is responsible for communicating with external services like microCMS. This includes API clients and data repositories.
- **`src/libs`**: Contains libraries and utility functions that are not specific to the application's domain.

## How to get data from microCMS

The project uses the `microcms-js-sdk` to fetch data from microCMS. The client is initialized in `src/libs/microCMS/utils/client.ts`.

To fetch data, use the repository functions in `src/infra/microCMS/repositories`. For example, to get a list of blog posts, use the `getBlogs` function from `src/infra/microCMS/repositories/blog.ts`.

## Testing

[Instructions on how to run tests will be added here.]

