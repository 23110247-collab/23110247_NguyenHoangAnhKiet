import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import viewEngine from './config/viewEngine.js';
import webRoutes from './route/web.js';
import connectDB from './config/configdb.js';

dotenv.config();

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

viewEngine(app);
webRoutes(app);
connectDB();

let port = process.env.PORT || 6969;
app.listen(port,() => {
  console.log("Backend Nodejs is runing on the port : " + port)
})