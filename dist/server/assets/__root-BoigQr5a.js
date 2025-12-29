import { a as createServerRpc, c as createServerFn } from "../server.js";
import { g as getSupabaseServerClient } from "./supabase-B58YyUwE.js";
import "node:async_hooks";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
import "@tanstack/react-router";
import "@supabase/ssr";
const fetchUser_createServerFn_handler = createServerRpc("1f41845ac3b65a581f73e88792eadc03859ad057285ba3f3d7dbd968fe09c1e3", (opts, signal) => fetchUser.__executeServer(opts, signal));
const fetchUser = createServerFn({
  method: "GET"
}).handler(fetchUser_createServerFn_handler, async () => {
  const supabase = getSupabaseServerClient();
  const {
    data,
    error: _error
  } = await supabase.auth.getUser();
  if (!data.user?.email) {
    return null;
  }
  return {
    email: data.user.email
  };
});
export {
  fetchUser_createServerFn_handler
};
