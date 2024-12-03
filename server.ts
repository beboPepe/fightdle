import express, { Request, Response } from "express"; // Import types for Express
import connectDB from "./db"; // Adjust the path if necessary
import Character from "./models/Character"; // Character is now `Character.ts`
import cors from "cors"; // No additional types needed for CORS

// Initialize express app
const app = express();
app.use(cors()); // Enable CORS

// Connect to MongoDB
connectDB();

// Define routes to interact with the database
app.get(
  "/api/characters",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const characters = await Character.find(); // Fetch all characters from DB
      //console.log("Fetched characters:", characters);
      res.json(characters); // Send the characters as JSON response
    } catch (error) {
      console.error("Error fetching characters:", error);
      res.status(500).json({ error: "Failed to fetch characters" });
    }
  }
);

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
