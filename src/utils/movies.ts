import { createServerFn } from "@tanstack/react-start"
import { fetchMovieDb } from "./fetch"

type MovieType = {
  adult: false
  backdrop_path: string
  belongs_to_collection: null
  budget: number
  genres: {
    id: number
    name: string
  }[]
  homepage: string
  id: number
  imdb_id: string
  origin_country: string[]
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: {
    id: number
    logo_path: null | string
    name: string
    origin_country: string
  }[]
  production_countries: {
    iso_3166_1: string
    name: string
  }[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: {
    english_name: string
    iso_639_1: string
    name: string
  }[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

const getMovie = createServerFn({ method: "GET" })
  .inputValidator((id: string) => id)
  .handler(async ({ data: movieId }) => {
    const movieData = await fetchMovieDb<MovieType>(`/movie/${movieId}`)
    return movieData
  })

export { getMovie }
