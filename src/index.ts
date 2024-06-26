import express, { Request, Response, Router } from 'express';
import Url from './routers/Url';
import dotnev from 'dotenv';
import mongoose from 'mongoose';

dotnev.config();
const app = express();
const db_url = process.env.DB_URL || 'mongodb+srv://myDatabaseUser:D1fficultP%40ssw0rd@cluster0.example.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT;

app.use(express.json())
app.use('/url', Url)

async function StartApp() {
  try {
    mongoose.Collection.updateMany({}, {$rename: {"shortUrl": "redirectUrl"}});
    await mongoose.connect(db_url);
    app.listen(PORT, () => {
      console.log("Server running at PORT: ", PORT);
    });
  } catch (e) {
    console.log(e);
  }
}
StartApp();