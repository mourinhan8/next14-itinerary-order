"use client"
import { useState } from "react"
import axios from "axios"
import { convertStr2Obj } from "@/utils"

export default function Home() {
  const [itinerary, setItinerary] = useState([])
  const [input, setInput] = useState("")

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const res = await axios.post("/api", {
        itinerary: convertStr2Obj(input) || [],
      })
      const sortedItinerary = res.data
      setItinerary(sortedItinerary || [])
    } catch (error) {
      console.log(error)
      alert(error)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 text-black border"
          rows={10}
        ></textarea>
        <button type="submit" className="mt-2 p-2 bg-blue-500 text-white">
          Submit
        </button>
        <button
          onClick={(e) => {
            e.preventDefault()
            setItinerary([])
            setInput("")
          }}
          className="mt-2 ml-2 p-2 bg-red-500 text-white"
        >
          Clear
        </button>
      </form>
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-semibold">Ordered Itineraries</h2>
        <ul className="mt-4">
          {itinerary.map(({ from, to }, index) => (
            <li key={index}>
              {from} -&gt; {to}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
