import { a as createServerRpc, c as createServerFn } from "../server.js";
import { redirect } from "@tanstack/react-router";
import { g as getSupabaseServerClient } from "./supabase-B58YyUwE.js";
import "node:async_hooks";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
import "@supabase/ssr";
const logoutFn_createServerFn_handler = createServerRpc("566828ec21d0ccdce1df662ede59410e979248719d530394b6aca7f837fe7339", (opts, signal) => logoutFn.__executeServer(opts, signal));
const logoutFn = createServerFn().handler(logoutFn_createServerFn_handler, async () => {
  const supabase = getSupabaseServerClient();
  const {
    error
  } = await supabase.auth.signOut();
  if (error) {
    return {
      error: true,
      message: error.message
    };
  }
  throw redirect({
    href: "/"
  });
});
export {
  logoutFn_createServerFn_handler
};
