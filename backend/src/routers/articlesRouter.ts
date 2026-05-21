import express, { Router } from "express";
import { ArticlesController } from "../controllers/articlesController";

export class ArticlesRouter {
  constructor(private controller: ArticlesController) {}
 
  getRouter(auth: express.RequestHandler): Router {
    const router = express.Router();

    router.get("/articles", this.controller.getArticles);
    router.get("/articles/:name", this.controller.getArticle);
    router.post("/articles/:name/upvote", auth, this.controller.updateArticleUpvote);
    router.post("/articles/:name/comments", auth, this.controller.addArticleComment);

    return router;
  }
}
