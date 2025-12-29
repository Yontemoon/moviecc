import { createFileRoute, Link } from "@tanstack/react-router"
import { getCredits, getMovieCredits } from "~/utils/credits"

export const Route = createFileRoute("/game/person/$personId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const personId = Number(params.personId)

    const credits = await getMovieCredits({ data: personId })
    return credits
  },
})

function RouteComponent() {
  const data = Route.useLoaderData()
  return (
    <div>
      <h1>{data.id}</h1>
      <div id="cast">
        {data.cast.map((movie) => {
          return (
            <div key={movie.id}>
              <p>
                <Link
                  to="/game/movie/$movieId"
                  params={{
                    movieId: movie.id.toString(),
                  }}
                >
                  {movie.title}
                </Link>
                as {movie.character}
              </p>
            </div>
          )
        })}
      </div>
      <div id="crew">
        {data.crew.map((movie) => {
          return (
            <div key={movie.id}>
              <p>
                <Link
                  to="/game/movie/$movieId"
                  params={{
                    movieId: movie.id.toString(),
                  }}
                >
                  {movie.title}
                </Link>
                as {movie.department}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
