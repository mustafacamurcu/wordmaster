import './App.css';
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  redirect
} from "react-router-dom"
import Game from './Game';
import Levels from './Levels';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAW_Rh8D9Jn8TEVcydfOUslYh-aXrJLrls",
  authDomain: "wordmasterpuzzle.firebaseapp.com",
  projectId: "wordmasterpuzzle",
  storageBucket: "wordmasterpuzzle.appspot.com",
  messagingSenderId: "900021681347",
  appId: "1:900021681347:web:dc56454a0db0af1c5d3676",
  measurementId: "G-QGYGGFH6NG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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
