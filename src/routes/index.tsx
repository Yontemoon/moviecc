import { createFileRoute, Link } from "@tanstack/react-router"
import { getMovie } from "~/utils/movies"
// import { getMovie } from "~/utils/movies"
import { getStartandEnd } from "~/utils/random"

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => {
    const randomMovie = await getStartandEnd()

    return randomMovie
  },
})

function Home() {
  const data = Route.useLoaderData()
  console.log(data)

  return (
    <div className="p-2">
      <Link
        to="/game/person/$personId"
        params={{
          personId: data.start.id.toString(),
        }}
      >
        <h3>{data.start.name}</h3>
      </Link>
      <Link
        to="/game/movie/$movieId"
        params={{ movieId: data.end.id.toString() }}
      >
        <h3>{data.end.original_title}</h3>
      </Link>
    </div>
  )
}
