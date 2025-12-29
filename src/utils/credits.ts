import { createServerFn } from "@tanstack/react-start"
import { fetchMovieDb } from "./fetch"

type CreditTypes = {
  id: number
  cast: {
    adult: boolean
    gender: 1 | 2 | 3
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string
    cast_id: number
    character: string
    credit_id: string
    order: number
  }[]
  crew: {
    adult: boolean
    gender: 1 | 2 | 3
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string
    credit_id: string
    department: string
    job: string
  }[]
}

type MovieCrediType = {
  id: number
  cast: {
    adult: false
    backdrop_path: string
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: false
    vote_average: number
    vote_count: number
    character: string
    credit_id: string
    order: number
  }[]
  crew: {
    adult: false
    backdrop_path: string
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: false
    vote_average: number
    vote_count: number
    credit_id: string
    department: string
    job: string
  }[]
}

// Fetch movie credits based on movie ID
const getCredits = createServerFn({ method: "GET" })
  .inputValidator((id: number) => id)
  .handler(async ({ data: movieId }) => {
    const credits = await fetchMovieDb<CreditTypes>(`/${movieId}/credits`)
    return credits
  })

// Fetch movie credits based on the person ID
const getMovieCredits = createServerFn({ method: "GET" })
  .inputValidator((id: number) => id)
  .handler(async ({ data: personId }) => {
    const credits = await fetchMovieDb<MovieCrediType>(
      `/person/${personId}/movie_credits?language=en-US`
    )
    return credits
  })

export { getCredits, getMovieCredits }
