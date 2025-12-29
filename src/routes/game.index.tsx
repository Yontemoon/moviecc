import { createFileRoute } from "@tanstack/react-router"
import { Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/game/")({
  component: RouteComponent,
  ssr: () => {
    return true
  },
})

function RouteComponent() {
  return (
    <div>
      Hello "/game/"!
      <Outlet />
    </div>
  )
}
