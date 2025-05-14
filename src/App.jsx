import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { LoadingScreen } from './components/LoadingScreen'
import { NavBarTest } from './components/NavBarTest'
import { Home } from './components/sections/Home'
import { ProjectButtons } from './components/sections/ProjectButtons'
import "./index.css"
import { Navbar } from './components/Navbar'
import { Projects } from './components/sections/Projects'

function App() {
  const [count, setCount] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false);

  const [currentProjectFilter, setProjectFilter] = useState("none");

  function testFunctionality(message)
  {
    console.log(message)
  }

  return (
    <>
      <div className="bg-base-200">
        {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}

        <NavBarTest></NavBarTest>
        <Home></Home>
        <ProjectButtons changeFilter={setProjectFilter} currentFilter={currentProjectFilter}></ProjectButtons>
        <Projects currentFilter={currentProjectFilter}> </Projects>
      </div>
    </>
  )
}

export default App
