import { Article, Comment } from "../models/articles";
import {ArticlesRepository} from "../database/articlesDb";
import {WithId} from "mongodb";

export class ArticlesService {
  constructor(private db: ArticlesRepository) {}
  
  private mapDbArticleToArticle(dbArticle: WithId<Article>): Article {
    return {
      id: dbArticle._id.toString(),
      name: dbArticle.name,
      title: dbArticle.title,
      content: dbArticle.content,
      upvotes: dbArticle.upvotes || 0,
      upVoteIds: dbArticle.upVoteIds || [],
      comments: dbArticle.comments || []
    };
  }
  
  getArticles = async (): Promise<WithId<Article[]>[]> => {
    return this.db.getArticles();
  };

  getArticle = async(name: string): Promise<Article | undefined> => {
    const dbArticle = await this.db.getArticle(name);

    if (!dbArticle) {
      return undefined;
    }

    return this.mapDbArticleToArticle(dbArticle);
  };

  updateArticleUpvote = async(name: string, uid: string): Promise<Article | undefined> => {
    const dbArticle = await this.db.getArticle(name);

    if (!dbArticle) {
      return undefined; // Article not found
    }
    
    //check if the user has already upvoted the article
    if (dbArticle.upVoteIds && dbArticle.upVoteIds.includes(uid)) {
      // return a 403 error
      throw new Error("User has already upvoted this article");
    }
    
    const updatedDbArticle = await this.db.updateArticleUpvote(name, uid);

    if (!updatedDbArticle) {
      return undefined; // Article not found after update
    }

    return this.mapDbArticleToArticle(updatedDbArticle);
  }

  addArticleComment = async (name: string, comment: Comment): Promise<Article | undefined> => {
    console.log("Adding comment to article:", name, comment);
    const dbArticle = await this.db.addArticleComment(name, comment);
    
    if (!dbArticle) {
      return undefined; // Article not found
    }
    
    return this.mapDbArticleToArticle(dbArticle);
  }
}
