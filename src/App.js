import React, {useState} from 'react';
import './App.css';
//importing components
import Header from "./components/Header"
import FooterButtons from "./components/FooterButtons"
import Form1 from "./components/Form1"
import Form2 from "./components/Form2"
import GameButton from "./components/GameButton"
import GameText from "./components/GameText"
import PopUp from "./components/PopUp"
import NightForm from "./components/NightForm"
import DayForm from "./components/DayForm"
//importing images
import Werewolf from "./images/werewolf.png"
import Villager from "./images/villager.png"

function App() {
  const [inputText, setInputText] = useState("")
  const [players, setPlayers] = useState([])
  const [gameButtonText, setGameButtonText] = useState("Start the game")
  const [gameButtonFunc, setGameButtonFunc] = useState(x => handleClickGameButton)
  const [gameButtonDisplay, setGameButtonDisplay] = useState("block")
  const [visibilityForm1, setVisibilityForm1] = useState("block")
  const [visibilityForm2, setVisibilityForm2] = useState("none")
  const [visibilityGameText, setVisibilityGameText] = useState("none")
  const [gameText, setGameText] = useState("Pick roles")
  const [popupDisplay, setPopupDisplay] = useState("none")
  const [nightFormDisplay, setNightFormDisplay] = useState("none")
  const [bgColor, setBgColor] = useState("background: white")
  const [killSelected, setKillSelected] = useState("")
  const [dayFormDisplay, setDayFormDisplay] = useState("none")
  const [kickSelected, setKickSelected] = useState("")
  const [popUpButtonText, setPopUpButtonText] = useState("OK!")
  const [popUpFunc, setPopUpFunc] = useState(x => popUpButton)
  const [popUpText, setPopUptext] = useState("Rules")

  function playAgain() {
    setPopupDisplay("none")
    setInputText("")
    setPlayers([])
    setGameButtonText("Start the game")
    setGameButtonFunc(x => handleClickGameButton)
    setGameButtonDisplay("block")
    setVisibilityForm1("block")
    setVisibilityForm2("none")
    setVisibilityGameText("none")
    setGameText("Pick roles")
    setNightFormDisplay("none")
    setBgColor("background: white")
    setKillSelected("")
    setDayFormDisplay("none")
    setKickSelected("")
    setPopUpButtonText("OK!")
    setPopUpFunc(x => popUpButton)
  }

  function onChangeForm1(value) {
    setInputText(currentInputText => value)
  }

  function handleClickForm1(event) {
    event.preventDefault()
    console.log(inputText.length)
    if (inputText.length === 0 || inputText === " " || inputText === "  " || inputText === "   ") {
      setPopUpButtonText("OK!")
      setPopUptext("Players name can't be blank")
      setPopUpFunc(x => popUpButton)
      setPopupDisplay("block")
      setInputText("")
    } else {
      setPlayers([...players, {name: inputText, role: "none", alive:true}])
      setInputText("")
    }
  }

  function handleClickGameButton() {
    setVisibilityForm1("none")
    setVisibilityForm2("block")
    setGameButtonText("Continue")
    setGameButtonFunc(x => night)
    setVisibilityGameText("inline")
  }

  function night() {
    setGameText("Night Phase!")
    setVisibilityForm2("none")
    setNightFormDisplay("block")
    setBgColor("background: gray")
    setGameButtonDisplay("none")
  }

  function popUpButton() {
    setPopupDisplay("none")
  }

  function rules() {
    setPopUpButtonText("OK!")
    setPopUptext("Rules")
    setPopUpFunc(x => popUpButton)
    setPopupDisplay("block")
  }

  function handleChangeForm2(event) {
    var value = event.target.value
    setPlayers(players.map(player => {
      if (player.name === event.target.id) {
        player.role = value
      }
      return player  
    }))
  }

  function handleChangeNightForm(event) {
    setKillSelected(event.target.options[event.target.selectedIndex].id)
  }

  function handleKill(event) {
    event.preventDefault()
    if (killSelected !== "") {
      setPlayers(players.map(player => {
        if (player.name === killSelected) {
          player.alive = false
        }
        return player
      }))
      setNightFormDisplay("none")
      setGameText(killSelected + " " + "was killed!")
      setGameButtonFunc(x => checkWolvesWin)
      setGameButtonDisplay("block")
    } else {
      setPopUpButtonText("OK!")
      setPopUptext("Please select who to kill")
      setPopUpFunc(x => popUpButton)
      setPopupDisplay("block")
    }
  }

  function checkWolvesWin() {
    var villagersAlive = []
    players.map(x => {
      if (x.role === "Villager" && x.alive === true) {
        villagersAlive.push(x.name)
      }
    })
    if (villagersAlive.length === 0) {
      setPopUpButtonText("Play Again!")
      setPopUptext("Werewolves won!")
      setPopUpFunc(x => playAgain)
      setPopupDisplay("block")
    } else {
      day()
    }
  }

  function checkVillagersWin() {
    var wolvesAlive = []
    var villagerAlive = []
    players.map(x => {
      if (x.role === "Werewolf" && x.alive === true) {
        wolvesAlive.push(x.name)
      } else if (x.role === "Villager" && x.alive === true) {
        villagerAlive.push(x.name)
      }
    })
    if (wolvesAlive.length === 0) {
      setPopUpButtonText("Play Again!")
      setPopUptext("Villagers won!")
      setPopUpFunc(x => playAgain)
      setPopupDisplay("block")
    } else if (villagerAlive.length === 0){
      setPopUpButtonText("Play Again!")
      setPopUptext("Werewolves won!")
      setPopUpFunc(x => playAgain)
      setPopupDisplay("block")
    } else {
      night()
    }
  }

  function handleChangeDayForm(event) {
    setKickSelected(event.target.options[event.target.selectedIndex].id)
  }

  function handleKick(event) {
    event.preventDefault()
    if (kickSelected !== "") {
      setPlayers(players.map(player => {
        if (player.name === kickSelected) {
          player.alive = false
        }
        return player
      }))
      setDayFormDisplay("none")
      setGameText(kickSelected + " " + "was kicked!")
      setGameButtonDisplay("block")
      setGameButtonFunc(x => checkVillagersWin)
    } else {
      setPopUpButtonText("OK!")
      setPopUptext("Please select who to kick")
      setPopUpFunc(x => popUpButton)
      setPopupDisplay("block")
    }
  }

  function day() {
    setGameText("Day Phase!")
    setBgColor("background: white")
    setDayFormDisplay("block")
    setGameButtonDisplay("none")
  }

  function callPopUp() {
    setPopUpButtonText("OK!")
    setPopUptext("You need to have at least 6 players + moderator")
    setPopUpFunc(x => popUpButton)
    setPopupDisplay("block")
  }

  document.body.style = bgColor
  return(
    <div>
      <Header />
      {/*<h2>{JSON.stringify(players)}</h2>
      <h2>{JSON.stringify(killSelected)}</h2>
      <h2>{JSON.stringify(kickSelected)}</h2>*/}
      <GameText text={gameText} display={visibilityGameText} />
      <Form1 display={visibilityForm1} players={players} onClick={handleClickForm1} value={inputText} onChange={onChangeForm1} />
      <Form2 onChange={handleChangeForm2} display={visibilityForm2} players={players} />
      <NightForm handleKill={handleKill} value={killSelected} onChange={handleChangeNightForm} players={players} display={nightFormDisplay} />
      <DayForm handleKick={handleKick} onChange={handleChangeDayForm} players={players} display={dayFormDisplay} />
      <GameButton callPopUp={callPopUp} players={players} display={gameButtonDisplay} buttonText={gameButtonText} onClick={gameButtonFunc} />
      <img className="werewolfImage" src={Werewolf} alt="werewolf" width="440px" height="624px"></img>
      <img className="villagerImage" src={Villager} alt="villager" width="480px" height="580px"></img>
      <FooterButtons playagain={playAgain} rules={rules} />
      <PopUp popUpText={popUpText} text={popUpButtonText} onClick={popUpFunc} display={popupDisplay} />
    </div>
  )
}

export default App;
