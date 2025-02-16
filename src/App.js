import { useState } from 'react'
import Form from './components/Form'
import MemoryCard from './components/MemoryCard'

export default function App() {
  const [isGameOn, setIsGameOn] = useState(false)
  const [emojisData, setEmojisData] = useState([])

  const getRandomSet = (arr) => {
    const randomArr = []
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * arr.length)
      if (!randomArr.includes(randomIndex)) {
        randomArr.push(arr[randomIndex]) 
      } else {
        i--
      }

    }
    return randomArr
  }

  async function startGame(e) {
    e.preventDefault()

    try {
      const response = await fetch('https://emojihub.yurace.pro/api/all/category/animals-and-nature')
      if (!response.ok) {
        throw new Error("Could not fetch data")
      }//doesn't work properly
      const data = await response.json()
      const dataSample = await getRandomSet(data)
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
