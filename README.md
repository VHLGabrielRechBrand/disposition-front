# 📄 Disposition Frontend

**Disposition** is a web platform that extracts structured data from unstructured documents (PDFs, images) using OCR and AI.

This is the **frontend** of the project, built with **Vite**, **React**, and **JavaScript**, enabling users to upload, visualize, tag, and search scanned documents through an intuitive UI.

## 🌐 Live Project

👉 [GitHub Repository](https://github.com/VHLGabrielRechBrand/disposition-front)

---

## 🧱 Project Structure

```
src/
├── assets/         # Static assets (images, icons, etc.)
├── components/     # Reusable React components
├── config/         # App-wide configuration files
├── hooks/          # Custom React hooks
├── pages/          # Page-level components for routing
├── service/        # API service modules (e.g., file and auth services)
├── utils/          # Utility functions and helpers
```

---

## 🚀 Getting Started

### 📦 Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm (comes with Node) or [pnpm](https://pnpm.io/) if preferred

### ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/VHLGabrielRechBrand/disposition-front.git

# Navigate into the project
cd disposition-front

# Install dependencies
npm install
```

### ▶️ Running the Development Server

```bash
npm run dev
```

This will start the Vite development server. The app should be available at:

```
http://localhost:5173
```

---

## 📦 Building for Production

```bash
npm run build
```

This will generate a `dist/` folder with the production-ready static files.

To preview the production build locally:

```bash
npm run preview
```


---

## 🛠 Tech Stack

- **React 19** – UI library
- **Vite** – Build tool and dev server
- **React Router DOM** – Routing
- **Radix UI** – Accessible UI primitives
- **React Select** – Enhanced dropdowns
- **JWT Decode** – JWT parsing
- **Sonner** – Toast notifications
- **ESLint** – Code linting

---

## 🤖 Features

- 📤 Upload and scan documents (PDFs/images)
- 🔍 View, filter, and search by tags or collections
- 🧠 Select which AI model to process documents
- 🏷️ Tag and manage documents with ease
- 📂 Group documents into logical collections

---

## 📬 Contributing

Contributions are welcome! Feel free to fork the repository, create a new branch, and open a pull request.

---

## 📄 License

This project is private and currently not distributed under an open license.

---

## 👨‍💻 Author

Made with 💡 by [Gabriel Rech Brand](https://github.com/VHLGabrielRechBrand)