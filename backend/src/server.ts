import express from "express";
import { Db, MongoClient, ServerApiVersion } from "mongodb";
import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import {ArticlesRouter} from "./routers/articlesRouter";
import {ArticlesController} from "./controllers/articlesController";
import {ArticlesRepository} from "./database/articlesDb";
import {ArticlesService} from "./services/articlesService";
import {authMiddleware} from "./middlewares/auth";

const credentials = JSON.parse(
  fs.readFileSync("./credentials.json", "utf-8")
)

admin.initializeApp({
  credential: admin.credential.cert(credentials)
});

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

async function connectToDB() {
  const dbHost = process.env.DB_HOST ?? "mongodb://127.0.0.1:27017";
  const client = new MongoClient(dbHost, { serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  } });
  
  await client.connect();
  return client.db("react-blog-db");
}

async function startServer() {
  try {
    const db: Db = await connectToDB();
    console.log("Connected to database");
    
    const articlesDb = new ArticlesRepository(db);
    const articlesService = new ArticlesService(articlesDb);
    const articlesController = new ArticlesController(articlesService);
    const articlesRouter = new ArticlesRouter(articlesController);
    
    app.use(express.static(path.join(__dirname, "../dist")));
    
    app.get(/^(?!\/api).*/, (req, res) => {
      res.sendFile(path.join(__dirname, "../dist/index.html"));
    });
    
    // Add routes
    app.use('/api', articlesRouter.getRouter(authMiddleware));
    
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to database", error);
  }
}

startServer();
