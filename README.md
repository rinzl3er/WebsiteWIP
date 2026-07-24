# Chintan Patel Lighting & Acoustics Solutions Website

A modern, responsive and high-performance company website built using **Next.js**, **React**, **TypeScript**, **Tailwind CSS** and **Framer Motion**. The project showcases the company's lighting and acoustics expertise while providing a scalable foundation for future tools, calculators and additional services.

---

## Overview

This website was developed with a strong focus on performance, maintainability and user experience. Unlike traditional website builders, this is a fully custom-coded application, allowing complete control over the design, functionality and future expansion of the website.

The codebase is modular, making it easy to add new pages, update content, integrate APIs or develop new calculators without affecting the rest of the application.

---

## Key Features

- Modern and responsive design
- Optimized for desktop, tablet and mobile devices
- Fast page loading using Next.js App Router
- Smooth animations powered by Framer Motion
- Type-safe development with TypeScript
- Reusable React component architecture
- SEO-friendly structure and metadata
- Easily maintainable and scalable codebase
- Ready for future expansion with additional tools and calculators
- Optimized image handling and asset management

---

## Technology Stack

| Technology | Purpose |
|------------|---------|
| Next.js | React framework and routing |
| React | User interface development |
| TypeScript | Static typing and improved code quality |
| Tailwind CSS | Styling and responsive layouts |
| Framer Motion | Animations and transitions |
| ESLint | Code quality and linting |
| npm | Package management |

---

## Prerequisites

Before running this project, make sure the following software is installed on your computer:

- Node.js (LTS version recommended)
- npm (installed automatically with Node.js)
- Visual Studio Code (recommended editor)
- Git (optional but recommended for version control)

You can verify your installation by running the following commands in a terminal:

```bash
node -v
npm -v
git --version
```

If each command returns a version number, your system is ready to run the project.

---

## Project Goals

This project has been designed with the following objectives:

- Deliver a premium digital experience for clients.
- Maintain excellent performance and accessibility.
- Keep the code organized and easy to maintain.
- Allow future developers to extend the project with minimal effort.
- Support the addition of new pages, services and interactive tools without major structural changes.

The following sections explain how to install, run, understand and maintain the project.
## Installation

### 1. Clone or Download the Repository

If the project is hosted on GitHub, clone it using Git:

```bash
git clone <repository-url>
```

Alternatively, download the project as a ZIP file and extract it to a convenient location on your computer.

Move into the project directory:

```bash
cd <project-folder>
```

### 2. Install Dependencies

Install all required packages by running:

```bash
npm install
```

This command reads the `package.json` file and automatically downloads every library required for the project.

> **Note:** This step only needs to be performed once when setting up the project, or whenever project dependencies are updated.

### 3. Start the Development Server

Run the following command:

```bash
npm run dev
```

After a few seconds, you should see output similar to:

```text
▲ Next.js
✓ Ready in 2.3s
Local:   http://localhost:3000
```

Open your preferred web browser and navigate to:

```
http://localhost:3000
```

The website should now be running locally.

### 4. Stopping the Development Server

To stop the local server, return to the terminal where it is running and press:

```
Ctrl + C
```

---

## Available Scripts

The project includes several useful npm scripts:

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts the local development server. |
| `npm run build` | Creates an optimized production build. |
| `npm run start` | Runs the production build locally. |
| `npm run lint` | Checks the project for linting issues. |

---

## Project Structure

The project follows the standard Next.js App Router structure.

```text
.
├── app/                # Application pages and routing
├── components/         # Reusable React components
├── public/             # Static assets (images, icons, fonts)
├── lib/                # Utility functions and shared helpers
├── hooks/              # Custom React hooks
├── styles/             # Global styling (if applicable)
├── package.json        # Project configuration and dependencies
├── tsconfig.json       # TypeScript configuration
├── next.config.ts      # Next.js configuration
└── README.md           # Project documentation
```

> The exact folder structure may evolve as new features and tools are added to the project.

---

## Development Workflow

A typical development workflow looks like this:

1. Pull the latest changes from the repository.
2. Run `npm install` if dependencies have changed.
3. Start the development server using `npm run dev`.
4. Make your changes.
5. Verify everything works as expected.
6. Run `npm run lint` to check for issues.
7. Build the project using `npm run build`.
8. Commit and push your changes.
9. Deploy the updated application.

Following this workflow helps maintain a stable and consistent codebase.
## Deployment

This project can be deployed to any platform that supports Next.js applications. For the best compatibility and easiest deployment process, **Vercel** is the recommended hosting platform.

### Production Build

Before deploying, create a production build to ensure there are no build-time errors:

```bash
npm run build
```

If the build completes successfully, you can preview the production version locally:

```bash
npm run start
```

Testing the production build before deployment helps identify issues that may not appear during development.

---

## Updating Website Content

Most website content can be updated by editing the appropriate files within the project. Depending on the section you wish to modify, updates may include:

- Text content
- Images
- Project information
- Services
- Contact details
- Navigation links
- Metadata
- Calculator data

After making changes, save the file and refresh the browser. The development server will automatically reload the updated content.

---

## Best Practices

To keep the project organized and maintainable, follow these recommendations:

- Use reusable components whenever possible.
- Avoid duplicating code.
- Keep file and folder names consistent.
- Use meaningful commit messages.
- Test changes on both desktop and mobile devices.
- Run `npm run lint` before committing changes.
- Verify that `npm run build` completes successfully before deployment.
- Optimize images before adding them to the project.
- Keep third-party dependencies up to date.

---

## Troubleshooting

### `npm` is not recognized

**Cause:** Node.js is not installed correctly or is not available in your system PATH.

**Solution:** Reinstall the latest LTS version of Node.js and restart your computer.

---

### Port 3000 is already in use

Another application may already be using the default development port.

Run the project on a different port:

```bash
npm run dev -- -p 3001
```

Then open:

```
http://localhost:3001
```

---

### Module Not Found

If you receive a "Module not found" error after pulling new changes:

```bash
npm install
```

If the issue persists, delete the `node_modules` folder and reinstall all dependencies:

```bash
npm install
```

---

### Build Fails but Development Works

Some errors only appear during production builds because Next.js performs additional validation.

Run:

```bash
npm run build
```

Review the first reported error carefully, resolve it, and rebuild the project.

---

### Images Are Not Displaying

Check the following:

- The image exists in the correct location.
- The file name matches exactly, including capitalization.
- The file extension is correct (`.png`, `.jpg`, `.webp`, etc.).
- The image path is correct.

---

### Changes Are Not Appearing

Try the following:

- Save all modified files.
- Refresh the browser.
- Restart the development server.
- Clear the browser cache if necessary.

---

## Frequently Asked Questions

### Do I need to run `npm install` every time?

No. Run it only when setting up the project for the first time or after project dependencies have changed.

### Which Node.js version should I use?

The latest **LTS (Long-Term Support)** version is recommended unless the project specifies otherwise.

### Can I use Yarn or pnpm instead of npm?

Yes, but this project is configured and documented using **npm**, so using npm is recommended for consistency.

### Where are the images stored?

Most static assets are located inside the `public/` directory.

### Where should I add new pages?

New pages should be created inside the `app/` directory following the Next.js App Router conventions.

### Why does the website automatically refresh while I'm editing?

This is a built-in Next.js feature called **Hot Reload**, which updates the browser whenever changes are saved.

### Why does the project work locally but fail after deployment?

Common causes include build errors, missing environment variables, incorrect asset paths, or case-sensitive file names that behave differently on Linux-based hosting platforms.

---

## License

This project is the property of **Chintan Patel Lighting & Acoustics Solutions** unless otherwise specified.

Unauthorized distribution, reproduction or commercial use of this codebase without permission may be restricted.

---

## Acknowledgements

This project is built using several open-source technologies, including:

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Node.js
- npm

Special thanks to the open-source community for developing and maintaining these excellent tools.

---

For questions, bug reports or future improvements, please contact the project maintainer or create an issue in the project repository (if available).
