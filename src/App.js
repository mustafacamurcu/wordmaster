import './App.css';
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  redirect
} from "react-router-dom"
import Game from './Game';
import Levels from './Levels';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      loader: ({ params }) => {
        return redirect("/0");
      },
      element: <Game />
    },
    {
      path: "/:level",
      loader: ({ params }) => {
        if (params.level >= Levels.length) {
          return redirect("/0");
        }
        return params.level;
      },
      element: <Game />
    }
  ])
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App;
