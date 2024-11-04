const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
// Import security and other middlewares if needed
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

// Load environment variables
dotenv.config();

// Import database connection and routers
const connectToDB = require("./config/db");
const indexRouter = require("./routes/index.routes");
const userRouter = require("./routes/user.routes");

// Initialize Express app
const app = express();

// Connect to the database
connectToDB();

// Set up middlewares
app.set("view engine", "ejs");
app.use(helmet()); // Adds security headers
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiter middleware to prevent brute-force attacks
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Set up routes
app.use("/user", userRouter);
app.use("/", indexRouter);

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server on the specified port
const PORT = process.env.PORT || 3000; // Use environment variable if defined
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
