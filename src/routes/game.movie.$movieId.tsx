import { createFileRoute, Link } from "@tanstack/react-router"
import { useGame } from "~/store/game"
import { getCredits } from "~/utils/credits"
import { getMovie } from "~/utils/movies"

export const Route = createFileRoute("/game/movie/$movieId")({
  component: RouteComponent,
  headers: () => ({
    // Cache at CDN for 1 hour, allow stale content for up to 1 day
    "Cache-Control":
      "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
  }),
  loader: async ({ params }) => {
    const movieId = params.movieId

    const data = await Promise.all([
      getCredits({ data: movieId }),
      getMovie({ data: movieId }),
    ])
    return data
  },
})

function RouteComponent() {
  const data = Route.useLoaderData()
  const { addToHistory, history } = useGame()
  return (
    <div>
      {JSON.stringify(data[1])}
      <div id="cast">
        <h2>Cast</h2>
        {data[0].cast.map((person) => {
          return (
            <div key={`cast-${person.id}`} className="flex flex-row gap-2">
              <Link
                onClick={() => {
                  addToHistory({
                    type: "person",
                    id: person.id,
                    number: history.length + 1,
                  })
                }}
                to="/game/person/$personId"
                params={{ personId: person.id.toString() }}
              >
                <p>{person.name} --- </p>
              </Link>
              <p>{person.character}</p>
            </div>
          )
        })}
      </div>
      <div id="crew">
        <h2>Crew</h2>
        <div>
          {data[0].crew.map((person) => {
            return (
              <div
                key={`crew-${person.id}-${person.job}`}
                className="flex flex-row gap-2"
              >
                <Link
                  onClick={(e) =>
                    addToHistory({
                      type: "person",
                      id: person.id,
                      number: history.length + 1,
                    })
                  }
                  to="/game/person/$personId"
                  params={{ personId: person.id.toString() }}
                >
                  <p>{person.name} --- </p>
                </Link>

                <p>{person.job}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
