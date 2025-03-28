import express from "express";
import cors from "cors";
import  {dbConnection} from "./database/dbConnection.js";
import { config } from "dotenv";
import userRouter from "./router/userRouter.js";
import cookieParser from "cookie-parser";

const app = express();

// Load environment variables
config({ path: "./config/config.env" });

// Database connection
dbConnection();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from your frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Allow cookies or authentication headers
  })
);

// Routes
app.use("/user", userRouter);


// Start the server
// app.use('/api/companies', Company);
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
}).on("error", (err) => {
  console.error("Server Error:", err);
});
export default app;