import { createFileRoute, Link } from "@tanstack/react-router"
import { useGame } from "~/store/game"
import { getCredits, getMovieCredits } from "~/utils/credits"
import { getPerson } from "~/utils/person"

export const Route = createFileRoute("/game/person/$personId")({
  component: RouteComponent,
  headers: () => ({
    // Cache at CDN for 1 hour, allow stale content for up to 1 day
    "Cache-Control":
      "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
  }),
  loader: async ({ params }) => {
    const personId = params.personId

    const data = await Promise.all([
      getMovieCredits({ data: personId }),
      getPerson({ data: personId }),
    ])

    return data
  },
})

function RouteComponent() {
  const data = Route.useLoaderData()
  const { addToHistory, history } = useGame()

  return (
    <div>
      <h1>{data[1].name}</h1>
      <div id="cast">
        {data[0].cast.map((movie) => {
          return (
            <div key={`cast-${movie.id}`}>
              <p>
                <Link
                  onClick={() => {
                    addToHistory({
                      type: "movie",
                      id: movie.id,
                      number: history.length + 1,
                    })
                  }}
                  to="/game/movie/$movieId"
                  params={{
                    movieId: movie.id.toString(),
                  }}
                >
                  {movie.title} ---{" "}
                </Link>
                {movie.character}
              </p>
            </div>
          )
        })}
      </div>
      <div id="crew">
        {data[0].crew.map((movie) => {
          return (
            <div key={`crew-${movie.id}-${movie.job}`}>
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
