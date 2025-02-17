import { useState } from 'react'
import Form from './components/Form'
import MemoryCard from './components/MemoryCard'

export default function App() {
  const [isGameOn, setIsGameOn] = useState(false)
  const [emojisData, setEmojisData] = useState([])
  const [clickedCards, setClickedCards] = useState([])

  console.log(clickedCards)
  function getDataSlice(data) {
    const randomIndices = getRandomIndices(data)

    const dataSlice = randomIndices.map(index => data[index])

    return dataSlice
  }

  const getRandomIndices = (data) => {
    const randomNumbers = []
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * data.length)
      if (!randomNumbers.includes(randomIndex)) {
        randomNumbers.push(randomIndex) 
      } else {
        i--
      }
    }
    return randomNumbers
  }

  function getEmojisArray(data) {
    const pairedEmojisArray = [...data, ...data]

    // Fisher–Yates shuffle Algorithm
    for (let i = pairedEmojisArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = pairedEmojisArray[i]
      pairedEmojisArray[i] = pairedEmojisArray[j]
      pairedEmojisArray[j] = temp
    }
    return pairedEmojisArray
  }

  async function startGame(e) {
    e.preventDefault()

    try {
      const response = await fetch('https://emojihub.yurace.pro/api/all/category/animals-and-nature')
      if (!response.ok) {
        throw new Error("Could not fetch data")
      }//doesn't work properly
      const data = await response.json()
      const dataSample = await getDataSlice(data)
      const pairedData = await getEmojisArray(dataSample)
      setEmojisData(pairedData)
      setIsGameOn(true)
    } catch (e) {
      console.log("Error fetching data  ", e)
    }
  }

  function turnCard(name, index) {
    const clickedCardEntry = clickedCards.find(card => card.index === index)
    if (!clickedCardEntry && clickedCards.length < 2) { 
      setClickedCards(prevClickedCards =>[...clickedCards,{name, index}])
    }else if (!clickedCardEntry && clickedCards.length === 2) {
        setClickedCards([{name, index}])
    }
  }

  return (
    <main>
      <h1>Memory</h1>
      {!isGameOn && <Form handleSubmit={startGame} />}
      {isGameOn && <MemoryCard data={emojisData} handleClick={turnCard} />}
    </main>
  )
}
