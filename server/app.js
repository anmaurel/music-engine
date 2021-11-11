import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("../client/public"));
app.use(cors());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content,Accept,Content-Type,Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    next();
});

app.get("/", (req, res, next) => {
    res.status(200).json({
        message: "it's fine",
    });
});

import authRouter from "./routes/auth.js";

app.use("/", authRouter);

app.listen(process.env.APP_PORT);

export default app;
