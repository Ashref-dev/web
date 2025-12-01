# Recipe Sharing Platform - Docker Setup

## 🚀 Quick Start with Docker

Run the entire application (frontend + backend) with one command:

```bash
docker-compose up
```

This will:
- Build and start the backend on `http://localhost:5000`
- Build and start the frontend on `http://localhost:3000`
- Automatically seed the database with sample users and recipes

## 📦 What's Included

### Seed Data
- **4 Users**: chef_mario, baker_sarah, foodie_alex, cook_emma
- **10 Recipes**: Spaghetti Carbonara, Margherita Pizza, Chocolate Chip Cookies, Caesar Salad, Beef Tacos, Chicken Stir Fry, Banana Bread, Greek Salad, Pancakes, Vegetable Curry
- All users have password: `password123`

### Services
- **Backend**: Node.js + Express + TypeScript + In-Memory MongoDB
- **Frontend**: Next.js 16 + React + Tailwind CSS v4

## 🛠️ Docker Commands

### Start the application
```bash
docker-compose up
```

### Start in detached mode (background)
```bash
docker-compose up -d
```

### Stop the application
```bash
docker-compose down
```

### Rebuild containers
```bash
docker-compose up --build
```

### View logs
```bash
docker-compose logs -f
```

### View specific service logs
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

## 🔧 Development

The containers use volume mounts, so any code changes will automatically reload:
- Backend: Uses `nodemon` for hot reload
- Frontend: Uses Next.js Fast Refresh

## 🌐 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/

## 📝 Test Accounts

You can login with any of these accounts:
- chef_mario@recipes.com / password123
- sarah@recipes.com / password123
- alex@recipes.com / password123
- emma@recipes.com / password123

## 🎨 Features

- ✅ Neo-Brutalist design with yellow accents
- ✅ User authentication (JWT)
- ✅ Recipe CRUD operations
- ✅ Comments and favorites
- ✅ Search and pagination
- ✅ Responsive design
- ✅ Forced light mode

## 🐳 Docker Architecture

```
┌─────────────────────────────────────┐
│         Docker Compose              │
├─────────────────────────────────────┤
│                                     │
│  ┌──────────────┐  ┌─────────────┐ │
│  │   Frontend   │  │   Backend   │ │
│  │   Next.js    │  │   Express   │ │
│  │   Port 3000  │  │   Port 5000 │ │
│  └──────────────┘  └─────────────┘ │
│         │                 │         │
│         └────────┬────────┘         │
│                  │                  │
│         recipe-network              │
└─────────────────────────────────────┘
```

## 🔥 Production Build

For production, update the Dockerfiles to use:
- Backend: `CMD ["npm", "start"]` (after adding build script)
- Frontend: Multi-stage build with `npm run build` and `npm start`

---

**Enjoy cooking with RecipeShare!** 🍳✨
