import { createServerFn } from "@tanstack/react-start"
import { getSupabaseServerClient } from "./supabase"
import { fetchMovieDb } from "./fetch"
import type { MovieType } from "./movies"
import type { PersonType } from "./person"

const getStartandEnd = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = getSupabaseServerClient()

  const [
    { data: person, error: personError },
    { data: movie, error: movieError },
  ] = await Promise.all([
    supabase.rpc("get_random_person").single(),
    supabase.rpc("get_random_movie").single(),
  ])

  if (personError) {
    console.error(personError)
    throw new Error(personError.message)
  }

  if (movieError) {
    console.error(movieError)
    throw new Error(movieError.message)
  }

  const [personDetails, movieDetails] = await Promise.all([
    await fetchMovieDb<PersonType>(`/person/${person.id}`),
    await fetchMovieDb<MovieType>(`/movie/${movie.id}`),
  ])

  return {
    start: personDetails,
    end: movieDetails,
  }
})

export { getStartandEnd }
