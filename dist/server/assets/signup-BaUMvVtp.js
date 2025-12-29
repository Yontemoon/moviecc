import { jsx, Fragment } from "react/jsx-runtime";
import { u as useMutation, a as useServerFn, A as Auth } from "./Auth-Cx8hzXbc.js";
import { s as signupFn } from "./router-BF5dxWeQ.js";
import "react";
import "@tanstack/react-router";
import "../server.js";
import "node:async_hooks";
import "@tanstack/react-router/ssr/server";
import "@tanstack/react-router-devtools";
function SignupComp() {
  const signupMutation = useMutation({
    fn: useServerFn(signupFn)
  });
  return /* @__PURE__ */ jsx(Auth, { actionText: "Sign Up", status: signupMutation.status, onSubmit: (e) => {
    const formData = new FormData(e.target);
    signupMutation.mutate({
      data: {
        email: formData.get("email"),
        password: formData.get("password")
      }
    });
  }, afterSubmit: signupMutation.data?.error ? /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "text-red-400", children: signupMutation.data.message }) }) : null });
}
export {
  SignupComp as component
};
