# Simple EJS Blog Website

This is a basic blog website built with Node.js, Express, and EJS templating. Users can create, update, and delete blog posts. All data is stored in memory (not in a database), so posts will reset when the server restarts.

## Features

- Create a new blog post with a title and content
- View all blog posts on the homepage
- Update or delete existing blog posts
- Responsive and clean UI with basic styling

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine

### Installation

1. **Clone the repository or download the project folder.**

2. **Open a terminal in the project directory and install dependencies:**
   ```
   npm install
   ```

3. **Start the server using nodemon (recommended for development):**
   ```
   npx nodemon index.js
   ```
   Or, if you have nodemon installed globally:
   ```
   nodemon index.js
   ```

   Alternatively, you can run with plain Node.js:
   ```
   node index.js
   ```

4. **Open your browser and go to:**
   ```
   http://localhost:3000
   ```

## Project Structure

```
├── public/
│   └── styles.css
├── views/
│   ├── index.ejs
│   ├── update.ejs
│   └── partials/
│       ├── header.ejs
│       └── footer.ejs
├── index.js
├── package.json
```

## Notes

- All blog data is stored in memory. Restarting the server will clear all posts.
- You can customize the styles in `public/styles.css`.

---

Enjoy blogging!