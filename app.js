import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import paymentRoutes from './routes/payments.js';
import { globalErrorHandler } from './middleware/errorHandling.js';

// Get the directory name from the URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Serve static files (e.g., CSS, JavaScript)
app.use(express.static(path.join(__dirname, 'public')));

// Set up EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/api', paymentRoutes);

// Global error handler
app.use(globalErrorHandler);

// Serve the main page
app.get('/', (req, res) => {
    res.render('index'); // Render the EJS template
});

export default app;
