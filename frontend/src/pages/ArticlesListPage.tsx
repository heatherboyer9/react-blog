import { useLoaderData } from "react-router-dom";
import ArticleList from "../components/ArticleList";
import { Article } from "../apis/models/types";

export default function ArticleListPage() {
  const articles = useLoaderData() as Article[];
  return (
    <div>
      <h1>Articles</h1>
      <ArticleList articles={articles} />
    </div>
  );
}
