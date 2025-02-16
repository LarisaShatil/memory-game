import { useState } from 'react'
import Form from './components/Form'
import MemoryCard from './components/MemoryCard'

export default function App() {
  const [isGameOn, setIsGameOn] = useState(false)
  const [emojisData, setEmojisData] = useState([])

  function getDataSlice(data) {
    const randomIndices = getRandomIndices(data)

    const dataSlice = randomIndices.map(index => data[index])

    return dataSlice
  }

  const getRandomIndices = (data) => {
    const randomNums = []
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * data.length)
      if (!randomNums.includes(randomIndex)) {
        randomNums.push(randomIndex) 
      } else {
        i--
      }

    }
    return randomNums
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
      setEmojisData(dataSample)
      setIsGameOn(true)
    } catch (e) {
      console.log("Error fetching data  ", e)
    }
  }

  function turnCard() {
    console.log("Memory card clicked")
  }

  return (
    <main>
      <h1>Memory</h1>
      {!isGameOn && <Form handleSubmit={startGame} />}
      {isGameOn && <MemoryCard data={emojisData} handleClick={turnCard} />}
    </main>
  )
}
