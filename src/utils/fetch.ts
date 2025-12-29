const fetchMovieDb = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(`https://api.themoviedb.org/3${endpoint}`, {
    headers: {
      Authorization: `Bearer ${process.env.THE_MOVIE_DB_API_KEY}`,
    },
  })
  const data: T = await response.json()
  return data
}

export { fetchMovieDb }
