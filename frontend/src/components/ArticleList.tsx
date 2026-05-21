import { Link } from "react-router-dom";
import { Article } from "../apis/models/types";

export default function ArticleList({ articles }: { articles: Article[] }) {
  return (
    <>
      {articles.map((article: Article) => (
        <Link key={article.name} to={`/articles/${article.name}`}>
          <h3>{article.title}</h3>
          <p>{article.content[0].substring(0, 150)}</p>
        </Link>
      ))}
    </>
  );
}
