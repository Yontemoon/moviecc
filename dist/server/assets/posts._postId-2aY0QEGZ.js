import { jsxs, jsx } from "react/jsx-runtime";
import { a as Route } from "./router-BF5dxWeQ.js";
import "@tanstack/react-router";
import "../server.js";
import "node:async_hooks";
import "@tanstack/react-router/ssr/server";
import "@tanstack/react-router-devtools";
function PostComponent() {
  const post = Route.useLoaderData();
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold underline", children: post.title }),
    /* @__PURE__ */ jsx("div", { className: "text-sm", children: post.body })
  ] });
}
export {
  PostComponent as component
};
