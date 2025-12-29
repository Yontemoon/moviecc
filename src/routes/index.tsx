import React from "react"
import { createFileRoute } from "@tanstack/react-router"
import { getMovie } from "~/utils/movies"

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => {
    const randomNum = Math.floor(Math.random() * 100_000)
    const randomMovie = await getMovie({ data: randomNum })
    return randomMovie
  },
})

function Home() {
  const movie = Route.useLoaderData()

  return (
    <div className="p-2">
      <h3>{JSON.stringify(movie)}</h3>
    </div>
  )
}
