import React from "react"
import { useState, useRef, useEffect } from 'react'
import Confetti from 'react-confetti'
import { useWindowSize} from '@uidotdev/usehooks'
import randomSeed from 'random-seed'
import seedrandom from "seedrandom"
import MerseneTwister from "mersenne-twister"

export const PokemonGuesser = () => {

  // States used to control Data
  const [data, setData] = useState([{name:"temp", url:"temp"}]);
  const [randomPokemonData, setRandomPokemonData] = useState({sprites:{front_default:"null"}, types:[{slot:0, type:{name:"normal"}}]});
  const [randomPokemon, setRandomPokemon] = useState(-1);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [pokemonNames, setPokemonNames] = useState([]);
  const [inputFocused, setInputFocused] = useState(false);
  const [pokemonNamesPossible, setPokemonNamesPossible] = useState([]);

  // States used to control game state
  const [imageGuessed, setImageGuessed] = useState(false);
  const [type1Guessed, setType1Guessed] = useState(false);
  const [type2Guessed, setType2Guessed] = useState(false);
  const [heightGuessed, setHeightGuessed] = useState(false);
  const [currentHeightGuess, setCurrentHeightGuess] = useState(-1.0);
  const [weightGuessed, setWeightGuessed] = useState(false);
  const [currentWeightGuess, setCurrentWeightGuess] = useState(-1.0);
  const [gameFinished, setGameFinished] = useState(false);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [time, setTime] = useState(Date.now());
  const [guessType, setGuessType] = useState("name");
  const [yesterdaysPokemon, setYesterdaysPokemon] = useState("");


  const { ConfettiWidth, ConfettiHeight } = useWindowSize()

    useEffect(() => {
    fetchData();
    yesterdaysRandomPokemon();
  }, [false]);


  useEffect(() => {
    checkComplete();
  }, [imageGuessed, type1Guessed, type2Guessed, heightGuessed, weightGuessed]);

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    }
  }, [])
  const typeMap = new Map();

  const inputRef = useRef(null);

  const PokemonTypes = ["normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy"];

  typeMap.set("normal", {src:"./assets/normal.svg", color:"#A8A77A"});
  typeMap.set("fire", {src:"./assets/fire.svg", color:"#EE8130"});
  typeMap.set("water", {src:"./assets/water.svg", color:"#6390F0"});
  typeMap.set("electric", {src:"./assets/electric.svg", color:"#F7D02C"});
  typeMap.set("grass", {src:"./assets/grass.svg", color:"#7AC74C"});
  typeMap.set("ice", {src:"./assets/ice.svg", color:"#96D9D6"});
  typeMap.set("fighting", {src:"./assets/fighting.svg", color:"#C22E28"});
  typeMap.set("poison", {src:"./assets/poison.svg", color:"#A33EA1"});
  typeMap.set("ground", {src:"./assets/ground.svg", color:"#E2BF65"});
  typeMap.set("flying", {src:"./assets/flying.svg", color:"#A98FF3"});
  typeMap.set("psychic", {src:"./assets/psychic.svg", color:"#F95587"});
  typeMap.set("bug", {src:"./assets/bug.svg", color:"#A6B91A"});
  typeMap.set("rock", {src:"./assets/rock.svg", color:"#B6A136"});
  typeMap.set("ghost", {src:"./assets/ghost.svg", color:"#735797"});
  typeMap.set("dragon", {src:"./assets/dragon.svg", color:"#6F35FC"});
  typeMap.set("dark", {src:"./assets/dark.svg", color:"#705746"});
  typeMap.set("steel", {src:"./assets/steel.svg", color:"#B7B7CE"});
  typeMap.set("fairy", {src:"./assets/fairy.svg", color:"#D685AD"});
  
  
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=151"
      );
      const pokemonData = await response.json();
      setData(pokemonData.results);
      setDataLoaded(true);

      console.log(pokemonData);

      var dummyArray = [];
      // Put the results into the names list
      pokemonData.results.forEach(element => {
        dummyArray.push(element.name);
      });

      setPokemonNames(dummyArray);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchSpecificPokemon = async (randomValue) => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + randomValue)
    const pokemonData = await response.json();
    setRandomPokemonData(pokemonData)
  }

  const chooseRandom = () => {

    resetStates();

    const minCeil = Math.ceil(1);
    const maxFloor = Math.floor(151);

    const randomValue = Math.floor(Math.random() * (maxFloor - minCeil + 1) + minCeil)
    fetchSpecificPokemon(randomValue);


    setRandomPokemon(
      randomValue
    );
  };

  const checkAnswer = (formData) => {
    var guess = formData.get("answer");
    inputRef.current.value = '';
    // Check pokemon guess
    if(guess == randomPokemonData.name)
    {
        setImageGuessed(true);
        return;
    }
    // Next check if the guess equals to one of the two types
    else if(guess == randomPokemonData.types[0].type.name)
    {
        setType1Guessed(true);
        return;
    }
    else if(randomPokemonData.types.length > 1)
    {
        if(guess == randomPokemonData.types[1].type.name)
        {
            setType2Guessed(true);
            return;
        }
    }
    // Finally check if the guess is a height or a weight
    if(guess.slice(-1) == "m" || guessType == "height")
    {
      if(guess.slice(-1) == "m")
      {
        var guessNumber = parseFloat(guess.slice(0, -1).replace(/\s/g, ""));
      }
      else
      {
        var guessNumber = parseFloat(guess)
      }
      
      if(!isNaN(guessNumber))
      {
        // Check if the number matches
        if(Math.abs(guessNumber - (randomPokemonData.height / 10)) < 0.3)
        {
           setHeightGuessed(true);
           return;
        } 
        // if it doesnt update guess
        else
        {
          setCurrentHeightGuess(guessNumber);
          setWrongGuesses(wrongGuesses + 1);
          return;
        }
      }
    }

        // Finally check if the guess is a height or a weight
    if(guess.slice(-2) == "kg" || guessType == "weight")
    {
      var guessNumber = parseFloat(guess.slice(0, -2).replace(/\s/g, ""));

      if(guess.slice(-2) == "kg")
      {
        var guessNumber = parseFloat(guess.slice(0, -2).replace(/\s/g, ""));
      }
      else
      {
        var guessNumber = parseFloat(guess)
      }

      if(!isNaN(guessNumber))
      {
        // Check if the number matches
        if(Math.abs(guessNumber - (randomPokemonData.weight / 10)) < 3)
        {
           setWeightGuessed(true);
           return;
        } 
        // if it doesnt update guess
        else
        {
          setCurrentWeightGuess(guessNumber);
          setWrongGuesses(wrongGuesses + 1);
          return;
        }
      }
    }

    setWrongGuesses(wrongGuesses + 1);

  }

  const checkComplete = () => 
  {
    console.log("Checking if complete")
    if(imageGuessed && type1Guessed && heightGuessed && weightGuessed)
    {
      console.log("Step 1")
      if(randomPokemonData.types.length > 1 && type2Guessed)
      {
        console.log("Step 2")
        setGameFinished(true);
        console.log("Finished")
        localStorage.setItem("Finished", JSON.stringify("Yes"));
        localStorage.setItem("Time", JSON.stringify(Math.floor(((Date.now() / 1000) / 86400))).toString())
        localStorage.setItem("Guesses", JSON.stringify(guessNumber))
      }
      else if(randomPokemonData.types.length == 1)
      {
        console.log("Step 3")
        setGameFinished(true);
        console.log("Finsihed");
        localStorage.setItem("Finished", JSON.stringify("Yes"));
        localStorage.setItem("Time", JSON.stringify(Math.floor(((Date.now() / 1000) / 86400))).toString())
        localStorage.setItem("Guesses", JSON.stringify(guessNumber))
      }
    }
  }

  const todaysRandomPokemon = () =>
  {
    resetStates();

    const minCeil = Math.ceil(1);
    const maxFloor = Math.floor(151);

    const d = new Date();

    var generator = new MerseneTwister(Math.floor((((Date.now() / 1000) / 86400))));


    
    var rand1 = seedrandom(d.getDate().toString() + d.getMonth().toString() + d.getFullYear().toString());

    //console.log(generator.random() * (maxFloor - minCeil + 1) + minCeil)

    var randomPokemon = Math.floor(generator.random() * (maxFloor - minCeil + 1) + minCeil);
    console.log(randomPokemon);
    setRandomPokemon(randomPokemon);
    fetchSpecificPokemon(randomPokemon);

    if(localStorage.getItem("Finished"))
    {
      if(parseInt(JSON.parse(localStorage.getItem("Time"))) == Math.floor(((Date.now() / 1000) / 86400)))
      {
        console.log(parseInt(JSON.parse(localStorage.getItem("Time"))));
        console.log(Math.floor((((Date.now() / 1000) / 86400))));
        setWrongGuesses(localStorage.getItem("Guesses"));
        setGameFinished(true);
      }
    }
  }

  const yesterdaysRandomPokemon = async () => 
  {
    const minCeil = Math.ceil(1);
    const maxFloor = Math.floor(151);

    const d = new Date();

    var generator = new MerseneTwister(Math.floor((((Date.now() / 1000) / 86400))) - 1);

    
    var rand1 = seedrandom(d.getDate().toString() + d.getMonth().toString() + d.getFullYear().toString());

    var randomPokemon = Math.floor(generator.random() * (maxFloor - minCeil + 1) + minCeil);

    const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + randomPokemon)
    const pokemonData = await response.json();

    setYesterdaysPokemon(pokemonData);
  }

  const resetStates = () => {
    setImageGuessed(false);
    setType1Guessed(false);
    setType2Guessed(false);
    setHeightGuessed(false);
    setCurrentHeightGuess(-1.0);
    setWeightGuessed(false);
    setCurrentWeightGuess(-1.0);
    setGameFinished(false);
    setWrongGuesses(0);
  }

  const typeList = randomPokemonData.types.map((type) => {
  return (
  <> 
    <div style={((type1Guessed && (type.slot == 1))  ||  (type2Guessed && (type.slot == 2))) ? {backgroundColor:typeMap.get(type.type.name).color} : {backgroundColor:"black"}} className= {" min-w-[80%] h-14 max-w-sm rounded-2xl flex justify-center items-center text-xl m-2 border-black border-3 font-pixel"}>
        {((type1Guessed && (type.slot == 1))  ||  (type2Guessed && (type.slot == 2))) && <img src={typeMap.get(type.type.name).src} height="32" width="32" className="mr-1"/>}
        <div className="justify-center"> {((type1Guessed && (type.slot == 1))  ||  (type2Guessed && (type.slot == 2))) ? type.type.name : "?"} </div>
    </div>
  </>);});


    const handleTextChange = (e) => {
      if(e.target.value == '')
      {
        setInputFocused(false);
      }
      else
      {
        setInputFocused(true);
      }
        var possibleAnswers = []



        pokemonNames.forEach(element => {
            if(element.includes(e.target.value))
            {
                possibleAnswers.push(element);
            }
        });


        if(guessType == "type")
        {
          possibleAnswers = [];
          PokemonTypes.forEach(element => {
            if(element.includes(e.target.value))
            {
                possibleAnswers.push(element);
            }
        });
        }


        console.log(possibleAnswers.slice(0,5));
        setPokemonNamesPossible(possibleAnswers.slice(0,5));
    }

    const suggestedList = pokemonNamesPossible.map((possibleName) => {
      return (
          <li className="list-row flex justify-center" onClick={() => {inputRef.current.value = possibleName;
              setInputFocused(false);
            }}>
            <div>
              <div>{possibleName}</div>
            </div>
          </li>
      );
    });

    const getColorFromGuess = (guess, actual) => {
      if(Math.abs(guess - actual) < 0.5)
      {
        return {backgroundColor:"#285B00"};
      }
      else if(Math.abs(guess - actual) < 1)
      {
        return {backgroundColor:"#4F3700"};
      }
      else if(Math.abs(guess - actual) < 2)
      {
        return {backgroundColor:"#771200"};
      }
      else
      {
        return {backgroundColor:"#8B0000"};
      }
    };


    const heightTag = () => {
      return (
      <div style={heightGuessed ? {backgroundColor:"green"} : (currentHeightGuess == -1.0 ? {backgroundColor:"black"} : getColorFromGuess(currentHeightGuess, (randomPokemonData.height / 10)))} className={" min-w-[80%] h-14 max-w-sm rounded-2xl flex justify-center items-center text-xl m-2 border-black border-3 font-pixel"}>
        {((currentHeightGuess != -1.0) && (currentHeightGuess < (randomPokemonData.height / 10)) && (!heightGuessed)) && <svg className="w-8 h-8 text-gray-300 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v13m0-13 4 4m-4-4-4 4"/>
        </svg>}

        {((currentHeightGuess != -1.0) && (currentHeightGuess > (randomPokemonData.height / 10)) && (!heightGuessed)) && <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19V5m0 14-4-4m4 4 4-4"/>
        </svg>}

        <div className="justify-center"> {heightGuessed ? (randomPokemonData.height / 10 + " m") : "????? m" }</div>
      </div>);
    };

    const weightTag = () => {
      return (
      <div style={weightGuessed ? {backgroundColor:"green"} : (currentWeightGuess == -1.0 ? {backgroundColor:"black"} : getColorFromGuess(currentWeightGuess, (randomPokemonData.weight / 10)))} className={" min-w-[80%] h-14 max-w-sm rounded-2xl flex justify-center items-center text-xl m-2 border-black border-3 font-pixel"}>
        {((currentWeightGuess != -1.0) && (currentWeightGuess < (randomPokemonData.weight / 10)) && (!weightGuessed)) && <svg className="w-8 h-8 text-gray-300 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v13m0-13 4 4m-4-4-4 4"/>
        </svg>}

        {((currentWeightGuess != -1.0) && (currentWeightGuess > (randomPokemonData.weight / 10)) && (!weightGuessed)) && <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19V5m0 14-4-4m4 4 4-4"/>
        </svg>}

        <div className="justify-center"> {weightGuessed ? (randomPokemonData.weight / 10 + " Kg") : "????? Kg" }</div>
      </div>);
    };

    const mainGameScreen = () => {
      return (
      <>
        <div className="flex justify-center pt-5">
            <div className="text-5xl"> Pokemon Guessr </div>
        </div>

        <div className="flex justify-center">
            {!gameFinished && <img src={randomPokemonData.sprites.front_default} className={"w-64 max-w-full" + (imageGuessed ? "" : "saturate-0 brightness-0")}/>}
        </div>

        <div className="grid grid-cols-3">
            <div className="flex flex-col items-center">
                <div className="mb-5 text-2xl"> Types </div>
                <div className="min-w-full flex flex-col items-center">
                    {typeList}
                </div>
            </div>

            <div className="flex flex-col items-center">
                <div className="text-2xl mb-5"> Name </div>
                <div style={imageGuessed ? {backgroundColor:"green"} : {backgroundColor:"black"}} className={" min-w-[80%] h-14 max-w-sm rounded-2xl flex justify-center items-center text-xl m-2 border-black border-3 font-pixel"}>
                    <div className="justify-center"> {imageGuessed ? randomPokemonData.name : "?????"} </div>
                </div>
            </div>
            
            <div className="flex flex-col items-center">
                <div className="text-2xl mb-5"> Height & Weight </div>
                {heightTag()}
                {weightTag()}
            </div>

        </div>


        <div className="flex justify-center pt-15 space-x-2">
          <div className={"btn btn-outline" + (guessType == "name" ? " btn-primary" : "")} onClick={() => {setGuessType("name")}}>
            Name
          </div>
          <div className={"btn btn-outline" + (guessType == "type" ? " btn-primary" : "")} onClick={() => {setGuessType("type")}}>
            Type
          </div>
          <div className={"btn btn-outline" + (guessType == "height" ? " btn-primary" : "")} onClick={() => {setGuessType("height")}}>
            Height
          </div>
          <div className={"btn btn-outline" + (guessType == "weight" ? " btn-primary" : "")} onClick={() => {setGuessType("weight")}}>
            Weight
          </div>
        </div>

        {!gameFinished && <form action={checkAnswer} className="flex justify-center pt-5">
          <div className="max-w-[60%]">
            <input ref={inputRef} autoComplete="off" name="answer" type="text" placeholder={guessType == "name" ? "Guess Pokemon Name" : guessType == "type" ? "Guess Pokemon Type" : guessType == "height" ? "meters" : guessType == "weight" ? "kg" : " "} className="input" role="button" onInput={handleTextChange}/>
              
              {inputFocused && <ul className="list bg-base-200 rounded-box shadow-md">
                {suggestedList}
            </ul>}
          </div>
          <datalist id="pokemon">
          </datalist>
          <button type="submit" className="btn btn-primary"> Submit </button>
        </form>}


    </>
      )
    }

    const countDownToNextDay = () => 
    {
      var secondsTillNextDayTotal = 86400 - Math.floor((time % 86400000) / 1000);

      var hoursTillNextDay = Math.floor(secondsTillNextDayTotal / 3600);
      var minutesTillNextDay = (Math.floor(secondsTillNextDayTotal / 60) - (hoursTillNextDay * 60))
      var secondsTillNextDay = (secondsTillNextDayTotal - ((minutesTillNextDay * 60) + (hoursTillNextDay * 3600)));

      return (
        <>
          <div className="flex justify-center"> {hoursTillNextDay} Days :: {minutesTillNextDay} Minutes :: {secondsTillNextDay} Seconds </div>
        </>
      )

    }

    const mainMenuScreen = () => {
      return (
        <>
          <a className="flex items-center justify-center -pt-5"><img src="https://fontmeme.com/permalink/251013/21d4e4f77687ef4a6f86a02071ca88f9.png" alt="pokemon-font" border="0"></img></a>
          <h1 className="flex justify-center pt-15 text-3xl text-yellow-500 drop-shadow-[0_2.2px_2.2px_rgba(0,0,255,1)]"> Time Until Next Pokemon</h1>
          {countDownToNextDay()}

          <div className="flex items-center justify-center text-xl text-yellow-500 drop-shadow-[0_2.2px_2.2px_rgba(0,0,255,1)]"> Yesterdays Pokemon was {yesterdaysPokemon ? yesterdaysPokemon.name[0].toUpperCase() + yesterdaysPokemon.name.slice(1) : ""}</div>

          <div className="flex justify-center pt-5">
            <div className="btn btn-primary text-2xl justify-center text-yellow-500" onClick={() => {todaysRandomPokemon(); setGameStarted(true)}}>Play Game</div>
          </div>

          <div className="flex justify-center pt-5">
            <div className="btn btn-primary text-2xl justify-center text-yellow-500" onClick={() => {chooseRandom(); setGameStarted(true)}}>Practice Mode</div>
          </div>
          
        </>
      )
    }


    const gameOverScreen = () => {
      return (
          <div className="flex absolute bg-base-200 rounded-xl border-4 border-black h-[70%] w-[50%] justify-center items-center text-5xl">
            <div className="relative justify-center items-center font-pixel mt-15  h-full">
              <h1>
                Game Complete
              </h1>

              <div className={"mt-15 text-xl text-center" + (wrongGuesses == 0 ? " text-green-400" : "")}>
                Wrong Guesses: {wrongGuesses}
              </div>
              {wrongGuesses == 0 && <div className="mt-1 text-lg text-center text-green-400">
                  ( Perfect Game )
                </div>}

              <div className="absolute bottom-20 left-20">
                <button className="btn btn-primary" onClick={() => {chooseRandom()}}> Try Practice Mode </button>
              </div>
            </div>

            
          </div>
      );

    };


  if(!dataLoaded)
  {
    return <div> Loading </div>
  }
  else
  {
    return <>

    <div className="flex justify-center mt-30">
      {gameFinished && gameOverScreen()}
    </div>
    

    {gameFinished && <Confetti width={ConfettiWidth} height={ConfettiHeight}/>}
    
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
    <link href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap" rel="stylesheet"/>


    {gameStarted ? mainGameScreen() : mainMenuScreen()}
    </>;
  }
  
}
