import express, { Request, Response } from 'express';
import dotnev from 'dotenv';
import mongoose from 'mongoose';

dotnev.config();
const app = express();
const db_url = process.env.DB_URL || 'mongodb+srv://myDatabaseUser:D1fficultP%40ssw0rd@cluster0.example.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT;

app.get("/", (request: Request, response: Response) => {
  response.status(200).send("Hello World");
});

async function StartApp() {
  try {
    await mongoose.connect(db_url);
    app.listen(PORT, () => {
      console.log("Server running at PORT: ", PORT);
    });
  } catch (e) {
    console.log(e);
  }
}
StartApp();