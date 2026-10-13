import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navebar from './Components/Navebar'
import Home from './Components/Home'
import Paste from './Components/Paste'
import ViewPaste from './Components/ViewPaste'

const router = createBrowserRouter(
  [
    {
      path:"/",
      element:
      <div>
        <Navebar />
        <Home />
      </div>
    },

    {
      path:"/pastes",
      element:
      <div>
        <Navebar />
        <Paste />
      </div>
    },

    {
      path:"/pastes/:id",
      element:
      <div>
        <Navebar />
        <ViewPaste />
      </div>
    },
  ]
)

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
    <RouterProvider router={router}>

    </RouterProvider>
   </div>
  )
}

export default App

