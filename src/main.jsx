import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider, HashRouter, Routes, Route } from 'react-router-dom'
import { PokemonGuesser } from './pages/PokemonGuesser'


  const router = createBrowserRouter([
    {path: "/", element: <App/>},
    {path: "/PokemonGuesser", element: <PokemonGuesser/> }
  ]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App/>
      <Routes>
        <Route path="/Portfolio" element={<App/>}/>
        <Route path="/PokemonGuesser" element={<PokemonGuesser/>}/>
      </Routes>
    </HashRouter>
  </StrictMode>,
)
