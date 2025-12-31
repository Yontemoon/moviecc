import { getSupabaseServerClient } from "./supabase"
import fs from "fs"

type MovieLineType = {
  adult: false
  id: number
  original_title: string
  popularity: number
  video: false
}

type PeopleLineType = {
  adult: false
  id: number
  name: string
  popularity: number
  video: false
}

function containsOnlyEnglishLetters(inputString: string) {
  const regex = /^[A-Za-z\s]*$/
  return regex.test(inputString)
}

const readMovieJson = (popularity: number) => {
  console.log("Reading JSON...")

  fs.readFile(
    "src/scripts/movie_ids_10_25_2025.json",
    "utf8",
    (err, jsonString) => {
      if (err) {
        console.error("File read error:", err)
        return
      }
      let count = 0
      const lines = jsonString.split("\n")

      lines.forEach((line, index) => {
        if (!line.trim()) return
        const parsed: MovieLineType = JSON.parse(line)

        if (parsed.popularity > popularity) {
          count++
          console.log(
            `${index}: ${parsed.original_title} -- ${parsed.popularity}`
          )
        }
      })

      console.log(`Total Movies above ${popularity}: `, count)
    }
  )
}

const readPersonJson = async (popularity: number) => {
  console.log("Reading JSON...")
  const supabase = getSupabaseServerClient()

  fs.readFile(
    "src/scripts/person_ids_12_15_2025.json",
    "utf8",
    (err, jsonString) => {
      if (err) {
        console.error("File read error:", err)
        return
      }
      let count = 0
      let validPeople = [] as PeopleLineType[]
      const lines = jsonString.split("\n")

      lines.forEach(async (line, index) => {
        if (!line.trim()) return
        const parsed: PeopleLineType = JSON.parse(line)

        const { error } = await supabase.from("people").upsert({
          id: parsed.id,
          name: parsed.name,
          popularity: parsed.popularity,
        })

        if (error) {
          throw new Error(error.message)
        }

        if (
          parsed.popularity > popularity &&
          containsOnlyEnglishLetters(parsed.name)
        ) {
          count++
          validPeople.push(parsed)

          console.log(`${index}: ${parsed.name} -- ${parsed.popularity}`)
        }
      })

      console.log(`Total people above ${popularity}: `, count)

      const randomInt = Math.floor(Math.random() * count)
      console.log(validPeople[randomInt])
    }
  )
}

// readMovieJson(10)
readPersonJson(5)
