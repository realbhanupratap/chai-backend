import dotenv from "dotenv";
import connectDB from "./db/index.js";
import express from "express";

dotenv.config({
  path: './.env',  // Ensure this is the correct path
});

// Connect to the database
connectDB();

// Initialize Express App
const app = express();

// Start the server only after the DB is connected
( async () => {
  try {
    const connnectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    app.on("error", (error) => {
      console.error("ERROR: ", error);
      throw error;
    });

    app.listen(process.env.PORT, () => {
      console.log(`App is listening on port ${process.env.PORT}`);
    });

    console.log(`MongoDB connected! DB HOST: ${connnectionInstance.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error: ", error);
    process.exit(1);
  }
})();
