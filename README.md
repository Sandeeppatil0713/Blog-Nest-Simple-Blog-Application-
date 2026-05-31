# 📸 Snapboard

A full-stack photo sharing web application where users can upload images with captions and browse all shared posts. Built with a modern dark neon UI, client-side routing, and cloud image storage.

---

## 🚀 Live Features

- 📤 Upload photos with captions
- 🖼️ Browse all posts in a responsive grid
- ☁️ Images stored on ImageKit CDN
- 🗄️ Post data persisted in MongoDB Atlas
- 🌐 Client-side routing with clean URLs (`/posts`, `/create-post`)
- 🎨 Dark neon UI with animated background orbs
- 📱 Fully responsive on mobile and desktop

---

## 🛠️ Tech Stack

### Frontend
| Tech | Purpose |
|------|---------|
| React 19 | UI framework |
| Vite | Build tool & dev server |
| React Router DOM | Client-side routing |
| CSS (custom) | Styling with neon design system |

### Backend
| Tech | Purpose |
|------|---------|
| Node.js | Runtime |
| Express 5 | Web framework |
| Mongoose | MongoDB ODM |
| MongoDB Atlas | Cloud database |
| Multer | Multipart file handling |
| ImageKit | Cloud image storage & CDN |
| dotenv | Environment variable management |

---

## 📁 Project Structure

```
Post_Backend/
├── Backend/
│   ├── server.js               # Entry point — starts server on port 3000
│   ├── package.json
│   └── src/
│       ├── app.js              # Express routes
│       ├── .env                # Environment variables (not committed)
│       ├── db/
│       │   └── db.js           # MongoDB connection
│       ├── models/
│       │   └── post.model.js   # Mongoose Post schema
│       └── services/
│           └── storage.service.js  # ImageKit upload logic
│
├── Frontend/
│   ├── index.html
│   ├── vite.config.js          # Vite config with API proxy
│   ├── package.json
│   └── src/
│       ├── main.jsx            # React entry point with BrowserRouter
│       ├── App.jsx             # Pages: Home, Posts, Create
│       ├── App.css             # Neon dark theme styles
│       └── index.css           # Base styles
│
├── .gitattributes              # LF line ending enforcement
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
- npm
- MongoDB Atlas account
- ImageKit account

### 1. Clone the repository

```bash
git clone https://github.com/your-username/snapboard.git
cd snapboard
```

### 2. Set up the Backend

```bash
cd Backend
npm install
```

Create a `.env` file inside `Backend/src/`:

```env
IMAGEKIT_PRIVATE_KEY="your_imagekit_private_key"
MONGO_URI="your_mongodb_atlas_connection_string"
```

> ⚠️ The current code has the credentials hardcoded in `db.js` and `storage.service.js`. It is strongly recommended to update those files to read from `process.env` instead.

Start the backend server:

```bash
node server.js
```

The server runs on **http://localhost:3000**

### 3. Set up the Frontend

```bash
cd Frontend
npm install
npm run dev
```

The frontend runs on **http://localhost:5173**

> The Vite dev server proxies `/posts` and `/create-post` requests to `http://localhost:3000` automatically — no CORS issues.

---

## 🔌 API Endpoints

### `POST /create-post`

Creates a new post by uploading an image to ImageKit and saving the post to MongoDB.

**Request:** `multipart/form-data`

| Field | Type | Description |
|-------|------|-------------|
| `image` | File | The image to upload |
| `caption` | String | Caption for the post |

**Response:**
```json
{
  "message": "Post Created Successfully",
  "post": {
    "_id": "...",
    "image": "https://ik.imagekit.io/...",
    "caption": "Your caption here"
  }
}
```

---

### `GET /posts`

Returns all posts from the database.

**Response:**
```json
{
  "message": "Posts Fetched Successfully",
  "posts": [
    {
      "_id": "...",
      "image": "https://ik.imagekit.io/...",
      "caption": "..."
    }
  ]
}
```

---

## 🗃️ Database Schema

### Post Model

```js
{
  image:   String,  // ImageKit CDN URL
  caption: String   // User-provided caption
}
```

---

## 🎨 UI Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero landing page with navigation buttons |
| `/posts` | Posts Feed | Auto-fetches and displays all posts in a grid |
| `/create-post` | Create Post | Upload image + caption form |

---

## 🔒 Environment Variables

| Variable | Location | Description |
|----------|----------|-------------|
| `MONGO_URI` | `Backend/src/.env` | MongoDB Atlas connection string |
| `IMAGEKIT_PRIVATE_KEY` | `Backend/src/.env` | ImageKit private API key |

> These files are listed in `.gitignore` and will never be committed.

---

## 📦 Scripts

### Backend
```bash
node server.js        # Start the server
```

### Frontend
```bash
npm run dev           # Start Vite dev server
npm run build         # Build for production
npm run preview       # Preview production build
```

---

## 🚧 Known Improvements

- [ ] Move hardcoded credentials in `db.js` and `storage.service.js` to use `dotenv`
- [ ] Add error boundaries in the frontend
- [ ] Add authentication (login / signup)
- [ ] Add like and comment functionality
- [ ] Paginate the posts feed
- [ ] Add image compression before upload
- [ ] Deploy backend to Railway / Render and frontend to Vercel

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙌 Author

Built by **Sandeep Patil**  
Feel free to fork, star ⭐, and contribute.
