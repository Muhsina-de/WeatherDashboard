import dotenv from 'dotenv';
import { resolve } from 'path';
import express from 'express';
import routes from './routes';

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env') });

// Add detailed environment checks
if (!process.env.OPENWEATHER_API_KEY) {
  console.error('ERROR: OpenWeather API key is not configured');
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files first
app.use(express.static('public'));

// Then routes
app.use(routes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start the server on the port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
