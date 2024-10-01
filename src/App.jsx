import './App.css'
import Home from './components/Home'
import AddTask from './components/AddTask'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


function App() {
  const rotas = createBrowserRouter([
    {
      path: "/",
      element : <Home/>
    },
    {
      path: "/add",
      element : <AddTask/>
    }
  
  ])

   return (
    <>
      <RouterProvider router={rotas}/>
    </>
  )
}

export default App
