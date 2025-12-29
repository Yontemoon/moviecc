import { createFileRoute, Link } from "@tanstack/react-router"
import { getMovie } from "~/utils/movies"

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => {
    const randomMovie = await getMovie({ data: 76341 })
    return randomMovie
  },
})

function Home() {
  const movie = Route.useLoaderData()

  return (
    <div className="p-2">
      <Link
        to="/game/movie/$movieId"
        params={{
          movieId: movie.id.toString(),
        }}
      >
        <h3>{movie.title}</h3>
      </Link>
    </div>
  )
}
