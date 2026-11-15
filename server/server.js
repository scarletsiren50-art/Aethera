
import express from "express";
import cors from "cors";
import helmet from "helmet";

import { env } from "./config/env.js";
import healthRoutes from "./routes/healthRoutes.js";
import {
  notFound,
  errorHandler
} from "./middleware/errorMiddleware.js";
import { apiLimiter } from "./middleware/rateLimitMiddleware.js";
import weatherRoutes from "./routes/weatherRoutes.js";
import { apiLimiter } from "./middlewares/rateLimitMiddleware.js";


const app = express();

// Security middleware
app.use(helmet());

app.use(cors({
  origin: env.CLIENT_URL
}));

app.use(express.json());

// API rate limiting
app.use("/api", apiLimiter);

// API routes
app.use("/api/health", healthRoutes);
app.use("/api/weather", weatherRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(env.PORT, () => {
  console.log(`Aethera server running on port ${env.PORT}`);
  console.log(`Environment: ${env.NODE_ENV}`);
  console.log(
    `Health check: http://localhost:${env.PORT}/api/health`
  );
});
