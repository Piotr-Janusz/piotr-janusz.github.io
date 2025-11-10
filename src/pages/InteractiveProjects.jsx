import React, { useState, useMemo } from "react";
import { NavBarTest } from "../components/NavBarTest";

// /c:/Work/TailwindReactWebsite/portfolio/src/pages/InteractiveProjects.jsx

const projectsData = [
    {
        id: 1,
        title: "Pokemon Guesser",
        description: "Pokemon based minigame where you try to guess a pokemon and its type, height and weight in the lowest number of guesses with a new pokemon being randomly picked each day.",
        tech: ["React", "Tailwind"],
        link: "#PokemonGuesser",
        image: "/assets/pokemonGuesserLogo.png"
    },
];

export function InteractiveProjects() {

    return (
        <>
            <NavBarTest></NavBarTest>
            <div className="flex justify-center text-5xl font-bold font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent leading-right pt-10 pb-5"> Interactive Projects </div>
            <div className="flex justify-center">
                <div className="flex justify-center items-center max-w-[85%] space-x-20 flex-wrap mt-10">
                {projectsData.map((project) => 
                <div className="card bg-base-200 w-96 shadow-sm">
                    <figure className="px-10 pt-10">
                        <img
                        src={project.image}
                        alt="Shoes"
                        className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-primary">{project.title}</h2>
                        <p>{project.description}</p>
                        <div className="card-actions">
                         <a href={project.link}><div className="btn btn-primary" href={project.link}>Play</div></a>
                        </div>
                    </div>
                </div>
                )}
                </div>
            </div>
            
        </>
    );
}