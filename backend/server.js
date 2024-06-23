import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";

// app config
const app = express();
const PORT = 4000;

// Middleware
app.use(express.json());
app.use(cors());

connectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// mongodb+srv://suryawantidevi903:nzkNdCEN4JLRMVJu@cluster0.hllmezq.mongodb.net/?
// retryWrites=true&w=majority&appName=Cluster0
