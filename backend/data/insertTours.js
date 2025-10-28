import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import Tour from "../models/Tour.js";

dotenv.config();

mongoose.set("strictQuery", false);

const tours = JSON.parse(fs.readFileSync("./data/tours.json", "utf-8"));

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Tour.deleteMany(); // očisti staro
    await Tour.insertMany(tours); // ubaci novo

    console.log("✅ Ture uspešno ubačene u bazu!");
    process.exit();
  } catch (err) {
    console.error("❌ Greška:", err);
    process.exit(1);
  }
};

seedData();
