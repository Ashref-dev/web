import express from 'express';
import { connectDB } from './config/db';
import { seedDatabase } from './seed/seedData';

const app = express();
const PORT = process.env.PORT || 5000;

// Note: cors middleware removed per user request (will not set CORS headers)
app.use(express.json());

// Manual permissive CORS headers (Allow everything for development)
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }
  next();
});

// Database Connection and Seeding
connectDB().then(async () => {
  // Seed database on startup (only in development)
  if (process.env.NODE_ENV !== 'production') {
    await seedDatabase();
  }
});

// Routes
import authRoutes from './routes/authRoutes';
import recipeRoutes from './routes/recipeRoutes';
import userRoutes from './routes/userRoutes';

app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/users', userRoutes);

// Basic Route
app.get('/', (req, res) => {
  res.send('Recipe Platform API is running');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
