import { createFileRoute, Link } from "@tanstack/react-router"
import { getCredits } from "~/utils/credits"

export const Route = createFileRoute("/game/movie/$movieId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const movieId = Number(params.movieId)
    const movieData = await getCredits({ data: movieId })

    return movieData
  },
})

function RouteComponent() {
  const data = Route.useLoaderData()
  return (
    <div>
      <div id="cast">
        <h2>Cast</h2>
        {data.cast.map((person) => {
          return (
            <div key={person.id} className="flex flex-row gap-2">
              <Link
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
          {data.crew.map((person) => {
            return (
              <div key={person.id} className="flex flex-row gap-2">
                <Link
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
