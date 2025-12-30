import { createFileRoute } from "@tanstack/react-router"
import { Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/game/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>This is index</div>
}
