import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ArticleListPage from "./pages/ArticlesListPage";
import ArticlePage from "./pages/ArticlePage";
import Layout from "./components/Layout";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import CreateAccountPage from "./pages/CreateAccountPage";
import { getArticles, getArticle } from "./apis/endpoints/articles";
import ProfilePage from "./pages/ProfilePage";
import withProtected from "./hooks/routes";

const ProfilePageWithProtected = withProtected(ProfilePage, "/login");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/articles",
        element: <ArticleListPage />,
        loader: getArticles,
      },
      {
        path: "/articles/:name",
        element: <ArticlePage />,
        loader: getArticle,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/create-account",
        element: <CreateAccountPage />,
      },
      {
        path: "/profile",
        element: <ProfilePageWithProtected />,
      },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
