import { Db, WithId } from "mongodb";
import {Article, Comment} from "../models/articles";

export class ArticlesRepository {
  constructor(private db: Db) {}
  
  getArticles = async (): Promise<WithId<Article[]>[]> => {
    
    return this.db.collection<Article[]>("articles").find({}).toArray();
  };

  getArticle = async(name: string): Promise<WithId<Article> | null> => {
    return this.db.collection<Article>("articles").findOne({ name });
  };

  updateArticleUpvote = async (name: string, uid: string): Promise<WithId<Article> | null> => {
    return this.db.collection<Article>("articles").findOneAndUpdate({ name }, { 
      $inc: { upvotes: 1 }, 
      $push:  {upVoteIds: uid }
    }, { 
        returnDocument: "after" 
    });
  }

  addArticleComment = async (name: string, comment: Comment): Promise<WithId<Article> | null> => {
    return this.db.collection<Article>("articles").findOneAndUpdate(
      { name },
      { $push: { comments: comment as any } },
      { returnDocument: "after" }
    );
  }
}
