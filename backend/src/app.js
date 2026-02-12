import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import leadRoutes from "./routes/lead.routes.js";
import companyRoutes from "./routes/company.routes.js";
import taskRoutes from "./routes/task.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import userRoutes from "./routes/users.route.js";

dotenv.config();
const app = express();

// app.use(cors());
app.use(cors({
    origin: [
      "http://localhost:5173",
      "https://mini-crm-mern.vercel.app"
    ],
    credentials: true
  }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/dashboard", dashboardRoutes);

export default app;
