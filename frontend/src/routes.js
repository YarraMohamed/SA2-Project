import { createBrowserRouter, Navigate} from "react-router-dom";
import Home from './pages/home/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import App from "./App";
import BookDetails from "./pages/BookDetails/BookDetails";
import ManageBooks from "./pages/ManageBooks/ManageBooks";
import AddBook from "./pages/ManageBooks/AddBook";
import UpdateBook from "./pages/ManageBooks/UpdateBook";
import Requests from "./pages/Requests/Requests";
import ManageChapters from "./pages/ManageChapters/ManageChapters";
import UpdateChapters from "./pages/ManageChapters/UpdateChapters"
import AddChapters from "./pages/ManageChapters/AddChapters"
import Guest from "./middleware/Guest.js"
import Admin from "./middleware/Admin.js"
import AdminOffers from './pages/Offers/AdminOffers';
import UserOffers from './pages/Offers/UserOffers';
import AddOffers from './pages/Offers/AddOffers';



export const routes = createBrowserRouter([
   {
    path:"",
    element: <App />,
    children: [ {
      path: "/",
      element: <Home/>,
    },
    {
      path: ":id",
      element: <BookDetails/>,
    },
    {
        path: '/offers',
        element: <UserOffers/>
    },
    {
      element :<Guest/>,
      children : [
        {
          path: "/login",
          element: <Login/>,
       },
       {
        path: "/register",
        element: <Register/>,
       }
      ]
    },
   {
     path: '/manage-offers',
     element: <Admin/>,
        children: [
          {
            path: "",
            element: <AdminOffers />
          },
          {
            path: "add",
            element: <AddOffers />
          }
        ]
    },
    {
      path: '/manage-books',
      element: <Admin/>,
      children:[
        {
          path: '',
          element: <ManageBooks/>
        },
        {
          path: ':id',
          element: <UpdateBook/>,
        },
        {
          path: 'add',
          element: <AddBook/>
        },
        {
          path :'manage-chapters',
          children :[
            {
              path :'',
              element : <ManageChapters/>
            },
            {
              path :'add',
              element: <AddChapters/>
            },
            {
              path:':chapterId',
              element: <UpdateChapters/>

            }
          ] 
        }
      ]
    },
    {
      path: "/requests",
      element: <Admin/>,
      element: <Requests/>
    },
    {
      path: '/manage-chapters',
      element: <Admin/>,
      children:[
        {
          path: ':chapterId',
          element: <UpdateChapters/>
        },
        {
          path: 'add',
          element: <AddChapters/>
        }
      ]
    }
    ]
   },
   {
    path:'*',
    element: <Navigate to={"/"}/>
    
   }
   
  ]);