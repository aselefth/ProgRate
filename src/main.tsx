import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import "./index.scss"
import AccountPage from "./pages/AccountPage/AccountPage"
import CommentsPage from "./pages/CommentsPage/CommentsPage"
import HomePage from "./pages/HomePage/HomePage"
import LoginPage from "./pages/LoginPage/LoginPage"
import RegisterPage from "./pages/RegisterPage/RegisterPage"
import store from "./store/store"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/login",
                element: <LoginPage />,
            },
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/account",
                element: <AccountPage />,
            },
            {
                path: "/register",
                element: <RegisterPage />,
            },
            {
                path: '/comments/:postId',
                element: <CommentsPage />
            }
        ],
    },
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <Provider store={store}>
        <RouterProvider router={router} />{" "}
    </Provider>
)
