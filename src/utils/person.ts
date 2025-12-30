import { createServerFn } from "@tanstack/react-start"
import { fetchMovieDb } from "./fetch"

type PersonType = {
  adult: boolean
  also_known_as: string[]
  biography: string
  birthday: string | null
  deathday: null | string
  gender: 2 | 1 | 0
  homepage: null | string
  id: number
  imdb_id: string
  known_for_department: string
  name: string
  place_of_birth: string
  popularity: number
  profile_path: string
}

const getPerson = createServerFn({ method: "GET" })
  .inputValidator((personId: string) => personId)
  .handler(async ({ data: personId }) => {
    const person = await fetchMovieDb<PersonType>(`/person/${personId}`)
    return person
  })

export { getPerson }
