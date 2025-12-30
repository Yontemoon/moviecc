import { createFileRoute, Outlet } from "@tanstack/react-router"
import React from "react"
import { useGame } from "~/store/game"

export const Route = createFileRoute("/game")({
  component: RouteComponent,
})

function RouteComponent() {
  const [count, setCount] = React.useState(0)
  const { history } = useGame()

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCount((count) => count + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [setCount])
  return (
    <div>
      Seconds elapsed: {count}
      <div>
        {history.map((item) => {
          return <div key={item.number}>{item.id}</div>
        })}
      </div>
      <Outlet />
    </div>
  )
}
