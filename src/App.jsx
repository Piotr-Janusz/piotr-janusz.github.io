import { useState, useRef, useEffect } from 'react'
import './App.css'
import { LoadingScreen } from './components/LoadingScreen'
import { NavBarTest } from './components/NavBarTest'
import { Home } from './components/sections/Home'
import { ProjectButtons } from './components/sections/ProjectButtons'
import "./index.css"
import { Navbar } from './components/Navbar'
import { Projects } from './components/sections/Projects'
import { Contact } from './components/sections/Contact'
import { Link,Element } from 'react-scroll'

import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'

import { Routes, Route } from 'react-router-dom'
import { PokemonGuesser } from './pages/PokemonGuesser'


function App() {
  const contactRef = useRef(null);
  const homeRef = useRef(null);
  const projectsRef = useRef(null);

  const scrollToChosen = (element) => {
    if(element == 'contact')
    {
      contactRef.current.scrollIntoView({behavior: 'smooth'});
    }
    if(element == 'home')
    {
      homeRef.current.scrollIntoView({behavior: 'smooth'});
    }
    if(element == 'projects')
    {
      projectsRef.current.scrollIntoView({behavior: 'smooth'});
    }
  }
  

  const [shouldUpdate, setShouldUpdate] = useState(true)


  const [count, setCount] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false);

  const [currentProjectFilter, setProjectFilter] = useState("none");
  return (
    <>
      <div className="bg-base-200">
        {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}
        <NavBarTest scrollFunction={scrollToChosen}></NavBarTest>
        <span ref={homeRef}>
          <Home scrollFunction={scrollToChosen}></Home>
        </span>
        <span ref={projectsRef}>
          <ProjectButtons changeFilter={setProjectFilter} currentFilter={currentProjectFilter} id="projects"></ProjectButtons>
          <Projects id="projects" currentFilter={currentProjectFilter}> </Projects>
        </span>
        <span ref={contactRef}>
          <Contact> </Contact>
        </span>
      </div>
    </>
  )
}

export default App;
