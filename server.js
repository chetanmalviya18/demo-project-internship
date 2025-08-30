import express from "express";
import sequelize from "./database/database.js";
import cors from "cors";
import "dotenv/config";
import pinoHttp from "pino-http";
import errorHandler from "./middleware/errorHandler.js";
import helmet from "helmet";

// Import route modules
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import profileRoutes from "./routes/profile.route.js";
import authRoutes from "./routes/auth.route.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(
  pinoHttp({
    transport:
      process.env.NODE_ENV !== "production"
        ? { target: "pino-pretty" }
        : undefined,
  })
);
app.use(errorHandler);
app.use(cors());
app.use(express.json());

// --- Mount the routes ---
app.use("/api", userRoutes);
app.use("/api", postRoutes);
app.use("/api", commentRoutes);
app.use("/api", profileRoutes);
app.use("/api", authRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Express-Sequelize API");
});

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

startServer();
