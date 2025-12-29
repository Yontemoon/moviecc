import { jsx } from "react/jsx-runtime";
import { N as NotFound } from "./router-BF5dxWeQ.js";
import "@tanstack/react-router";
import "../server.js";
import "node:async_hooks";
import "@tanstack/react-router/ssr/server";
import "@tanstack/react-router-devtools";
const SplitNotFoundComponent = () => {
  return /* @__PURE__ */ jsx(NotFound, { children: "Post not found" });
};
export {
  SplitNotFoundComponent as notFoundComponent
};
