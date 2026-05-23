import { Request, Response } from "express";
import { DecodedIdToken } from "firebase-admin/auth";
import { Comment } from "../models/articles";
import {ArticlesService} from "../services/articlesService";

type AuthedRequest<P = Record<string, string>> = Request<P> & { user: DecodedIdToken };

export class ArticlesController {
  constructor(private svc: ArticlesService) {}
  
  getArticles = async (req: Request, res: Response) => {
    
    const articles = await this.svc.getArticles();

    res.json(articles);
  };

  getArticle = async(req: Request<{ name: string }>, res: Response) => {
    const { name } = req.params;

    const article = await this.svc.getArticle(name);

    if (article) {
      res.json(article);
    } else {
      res.status(404).json({ message: "Article not found" });
    }
  };

  updateArticleUpvote = async (req: Request<{ name: string }>, res: Response) => {
    try {
      const { name } = req.params;

      const authedReq = req as unknown as AuthedRequest<{ name: string }>;

      if (!authedReq.user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const { uid } = authedReq.user;

      const article = await this.svc.updateArticleUpvote(name, uid);

      if (article) {
        res.json(article);
      } else {
        res.status(404).json({ message: "Article not found" });
      }
    } catch (error) {
      if (error instanceof Error && error.message === "User has already upvoted this article") {
        res.status(403).json({ message: error.message });
      } else {
        console.error("Error updating article upvote", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  addArticleComment = async (req: Request<{ name: string }>, res: Response) => {
    const { name } = req.params;
    const { postedBy, text, dateCreated } = req.body;
    
    const comment: Comment = { postedBy, text, dateCreated };

    const article = await this.svc.addArticleComment(name, comment);

    if (article) {
      res.json(article);
    } else {
      res.status(404).json({ message: "Article not found" });
    }
  }
}
