import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/game")({
  component: RouteComponent,
  ssr: () => {
    return true
  },
})

function RouteComponent() {
  return (
    <div>
      <h1>This is a game</h1>
      <Outlet />
    </div>
  )
}
