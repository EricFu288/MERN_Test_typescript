import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import connectDB from "./config/db.js";
import routes from "./routes/routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
dotenv.config();

connectDB();

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ extended: false }));
app.use(bodyParser.json());
app.use("/api", routes);
// const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  // app.use(express.static(path.join(__dirname, "client", "build")));
  app.use(express.static("client/build"));
  app.get(
    "*",
    (req, res) =>
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    // res.sendFile(path.join(__dirname + "/client/build/index.html"))
  );
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
