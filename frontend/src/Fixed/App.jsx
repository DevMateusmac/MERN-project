import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Users from "./user/pages/Users";
import RootElement from "./RootElement";
import UserPlaces from "./places/pages/UserPlaces";
import "./index.css";
import NewPlace from "./places/pages/NewPlace";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./user/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";
import { useCallback, useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn]  = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true)
  }, [])

  const logout = useCallback(() => {
    setIsLoggedIn(false)
  }, [])

  const autCtxValue = {
    isLoggedIn,
    login,
    logout
  }

  let routes; 

  if(isLoggedIn){
    routes = (
      {
        path: "/",
        element: <RootElement />,
        children: [
          { index: true, element: <Users /> },
          { path: "/places", element: <UserPlaces /> },
          { path: "/:userId/places", element: <UserPlaces /> },
          { path: "/places/new", element: <NewPlace /> },
          { path: "/places/:placeId", element: <UpdatePlace /> },
          { path: "/auth", element: <Auth /> },
          { path: "/*", element: <Navigate to="/" /> }
        ],
        
      }
    )
  }else {
    routes = (
      {
        path: "/",
        element: <RootElement />,
        children: [
          { index: true, element: <Users /> },
          { path: "/:userId/places", element: <UserPlaces /> },
          { path: "/auth", element: <Auth /> },
          { path: "/*", element: <Navigate to="/auth" /> }
        ]
      }
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootElement />,
      children: [
        { index: true, element: <Users /> },
        { path: "/places", element: <UserPlaces /> },
        { path: "/:userId/places", element: <UserPlaces /> },
        { path: "/places/new", element: <NewPlace /> },
        { path: "/places/:placeId", element: <UpdatePlace /> },
        { path: "/auth", element: <Auth /> },
      ],
    },
    { path: "/*", element: <Navigate to="/" /> },
  ]);
  return (
    <AuthContext.Provider value={autCtxValue}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}

export default App;