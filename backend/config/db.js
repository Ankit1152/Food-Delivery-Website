import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://suryawantidevi903:nzkNdCEN4JLRMVJu@cluster0.hllmezq.mongodb.net/food_delivery"
    )
    .then(() => console.log("DB connected"));
};
