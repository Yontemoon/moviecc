import { a as createServerRpc, c as createServerFn } from "../server.js";
import { g as getSupabaseServerClient } from "./supabase-B58YyUwE.js";
import "node:async_hooks";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
import "@tanstack/react-router";
import "@supabase/ssr";
const loginFn_createServerFn_handler = createServerRpc("c734b57656130e92f97e5895851097dba28c0c97bd955c5a94d61db533974b39", (opts, signal) => loginFn.__executeServer(opts, signal));
const loginFn = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(loginFn_createServerFn_handler, async ({
  data
}) => {
  const supabase = getSupabaseServerClient();
  const {
    error
  } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password
  });
  if (error) {
    return {
      error: true,
      message: error.message
    };
  }
});
export {
  loginFn_createServerFn_handler
};
