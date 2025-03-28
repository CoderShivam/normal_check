import express from "express"; // Use 'import' for express
import axios from "axios"; // Use 'import' for axios
import cors from "cors"; // Use 'import' for cors
import multer from "multer"; // Import multer for file uploads
import { config } from "dotenv"; // Use 'import' for dotenv
import app from "./app.js"; // Your custom app module
config();

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the directory to store files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Unique file name
  },
});

const upload = multer({ storage }); // Create an upload instance

// Middleware setup
app.use(cors());
app.use(express.json());

// app.use(
//     cors({
//       origin: "http://localhost:5174", // Allow requests from your frontend origin
//       methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
//       credentials: true, // Allow cookies or authentication headers
//     })
//   );

// LeetCode problems API endpoint
app.get("/api/problems", async (req, res) => {
  try {
    const response = await axios.get("https://leetcode.com/api/problems/all/");
    const problems = response.data.stat_status_pairs.map((problem) => ({
      id: problem.stat.frontend_question_id,
      title: problem.stat.question__title,
      difficulty:
        problem.difficulty.level === 1
          ? "Easy"
          : problem.difficulty.level === 2
          ? "Medium"
          : "Hard",
      url: `https://leetcode.com/problems/${problem.stat.question__title_slug}/`,
      paid_only: problem.paid_only,
    }));
    //hello everyone
    res.status(200).json(problems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch problems from LeetCode API." });
  }
});

// Upload Resume API
app.post("/upload-resume", upload.single("file"), async (req, res) => {
  try {
    const { userId } = req.body; // Extract the userId from the request
    const filePath = req.file.path; // Get the uploaded file's path

    // Check if the user already exists
    let user = await User.findOne({ userId });

    if (!user) {
      // If the user doesn't exist, create a new entry
      user = new User({ userId, resumePath: filePath });
    } else {
      // If the user exists, update the resumePath
      user.resumePath = filePath;
    }

    await user.save();

    res.status(200).json({
      message: "File uploaded successfully!",
      userId,
      resumePath: filePath,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to upload file." });
  }
});

// Endpoint to fetch user data
app.get("/user-resume/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ userId, resumePath: user.resumePath });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user data." });
  }
});