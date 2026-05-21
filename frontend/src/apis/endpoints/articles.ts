import axios from "axios";
import type { LoaderFunctionArgs } from "react-router-dom";

export const getArticles = async () => {
  const response = await axios.get("/api/articles");
  const articles = response.data;
  return articles;
};

export const getArticle = async ({ params }: LoaderFunctionArgs) => {
  const response = await axios.get(`/api/articles/${params.name}`);
  return response.data;
};
