import { useRouter, useMatch, rootRouteId, ErrorComponent, Link, createRootRoute, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { T as TSS_SERVER_FUNCTION, g as getServerFnById, c as createServerFn } from "../server.js";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
const createSsrRpc = (functionId, importer) => {
  const url = "/_serverFn/" + functionId;
  const fn = async (...args) => {
    const serverFn = await getServerFnById(functionId);
    return serverFn(...args);
  };
  return Object.assign(fn, {
    url,
    functionId,
    [TSS_SERVER_FUNCTION]: true
  });
};
function DefaultCatchBoundary({ error }) {
  const router2 = useRouter();
  const isRoot = useMatch({
    strict: false,
    select: (state) => state.id === rootRouteId
  });
  console.error(error);
  return /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1 p-4 flex flex-col items-center justify-center gap-6", children: [
    /* @__PURE__ */ jsx(ErrorComponent, { error }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center flex-wrap", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
          },
          className: `px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded-sm text-white uppercase font-extrabold`,
          children: "Try Again"
        }
      ),
      isRoot ? /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: `px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded-sm text-white uppercase font-extrabold`,
          children: "Home"
        }
      ) : /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: `px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded-sm text-white uppercase font-extrabold`,
          onClick: (e) => {
            e.preventDefault();
            window.history.back();
          },
          children: "Go Back"
        }
      )
    ] })
  ] });
}
function NotFound({ children }) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2 p-2", children: [
    /* @__PURE__ */ jsx("div", { className: "text-gray-600 dark:text-gray-400", children: children || /* @__PURE__ */ jsx("p", { children: "The page you are looking for does not exist." }) }),
    /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2 flex-wrap", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => window.history.back(),
          className: "bg-emerald-500 text-white px-2 py-1 rounded-sm uppercase font-black text-sm",
          children: "Go back"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: "bg-cyan-600 text-white px-2 py-1 rounded-sm uppercase font-black text-sm",
          children: "Start Over"
        }
      )
    ] })
  ] });
}
const appCss = "/assets/app-CnGWMaJ3.css";
const seo = ({
  title,
  description,
  keywords,
  image
}) => {
  const tags = [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: keywords },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:creator", content: "@tannerlinsley" },
    { name: "twitter:site", content: "@tannerlinsley" },
    { name: "og:type", content: "website" },
    { name: "og:title", content: title },
    { name: "og:description", content: description },
    ...image ? [
      { name: "twitter:image", content: image },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "og:image", content: image }
    ] : []
  ];
  return tags;
};
const fetchUser = createServerFn({
  method: "GET"
}).handler(createSsrRpc("1f41845ac3b65a581f73e88792eadc03859ad057285ba3f3d7dbd968fe09c1e3"));
const Route$8 = createRootRoute({
  beforeLoad: async () => {
    const user = await fetchUser();
    return {
      user
    };
  },
  head: () => ({
    meta: [{
      charSet: "utf-8"
    }, {
      name: "viewport",
      content: "width=device-width, initial-scale=1"
    }, ...seo({
      title: "TanStack Start | Type-Safe, Client-First, Full-Stack React Framework",
      description: `TanStack Start is a type-safe, client-first, full-stack React framework. `
    })],
    links: [{
      rel: "stylesheet",
      href: appCss
    }, {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/apple-touch-icon.png"
    }, {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon-32x32.png"
    }, {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon-16x16.png"
    }, {
      rel: "manifest",
      href: "/site.webmanifest",
      color: "#fffff"
    }, {
      rel: "icon",
      href: "/favicon.ico"
    }]
  }),
  errorComponent: (props) => {
    return /* @__PURE__ */ jsx(RootDocument, { children: /* @__PURE__ */ jsx(DefaultCatchBoundary, { ...props }) });
  },
  notFoundComponent: () => /* @__PURE__ */ jsx(NotFound, {}),
  component: RootComponent
});
function RootComponent() {
  return /* @__PURE__ */ jsx(RootDocument, { children: /* @__PURE__ */ jsx(Outlet, {}) });
}
function RootDocument({
  children
}) {
  const {
    user
  } = Route$8.useRouteContext();
  return /* @__PURE__ */ jsxs("html", { children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsxs("div", { className: "p-2 flex gap-2 text-lg", children: [
        /* @__PURE__ */ jsx(Link, { to: "/", activeProps: {
          className: "font-bold"
        }, activeOptions: {
          exact: true
        }, children: "Home" }),
        " ",
        /* @__PURE__ */ jsx(Link, { to: "/posts", activeProps: {
          className: "font-bold"
        }, children: "Posts" }),
        /* @__PURE__ */ jsx("div", { className: "ml-auto", children: user ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("span", { className: "mr-2", children: user.email }),
          /* @__PURE__ */ jsx(Link, { to: "/logout", children: "Logout" })
        ] }) : /* @__PURE__ */ jsx(Link, { to: "/login", children: "Login" }) })
      ] }),
      /* @__PURE__ */ jsx("hr", {}),
      children,
      /* @__PURE__ */ jsx(TanStackRouterDevtools, { position: "bottom-right" }),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter$5 = () => import("./signup-BaUMvVtp.js");
const signupFn = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(createSsrRpc("391e4fddd1127ccfb7d0d44594936a2e78a25b0239ffeab18aa9ec261f329199"));
const Route$7 = createFileRoute("/signup")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const logoutFn = createServerFn().handler(createSsrRpc("566828ec21d0ccdce1df662ede59410e979248719d530394b6aca7f837fe7339"));
const Route$6 = createFileRoute("/logout")({
  preload: false,
  loader: () => logoutFn()
});
const $$splitComponentImporter$4 = () => import("./login-BY3Fwbv2.js");
const Route$5 = createFileRoute("/login")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitErrorComponentImporter = () => import("./_authed-Bx265fZ5.js");
const loginFn = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(createSsrRpc("c734b57656130e92f97e5895851097dba28c0c97bd955c5a94d61db533974b39"));
const Route$4 = createFileRoute("/_authed")({
  beforeLoad: ({
    context
  }) => {
    if (!context.user) {
      throw new Error("Not authenticated");
    }
  },
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent")
});
const $$splitComponentImporter$3 = () => import("./index-BwMT9QHg.js");
const Route$3 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const fetchPost = createServerFn({
  method: "GET"
}).inputValidator((d) => d).handler(createSsrRpc("fcc606bc6a4391068ed708ee59e18e7e8c5685d0fa5f2f3f35a0d234c04f679f"));
const fetchPosts = createServerFn({
  method: "GET"
}).handler(createSsrRpc("9d2d75863ee5cc1769ed0162f4537aed3a4f16255a893cf6e946a857810a32df"));
const $$splitComponentImporter$2 = () => import("./posts-BzaDF6zm.js");
const Route$2 = createFileRoute("/_authed/posts")({
  loader: () => fetchPosts(),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./posts.index-DU8oxB5n.js");
const Route$1 = createFileRoute("/_authed/posts/")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitNotFoundComponentImporter = () => import("./posts._postId-7AqEsX5o.js");
const $$splitComponentImporter = () => import("./posts._postId-2aY0QEGZ.js");
const Route = createFileRoute("/_authed/posts/$postId")({
  loader: ({
    params: {
      postId
    }
  }) => fetchPost({
    data: postId
  }),
  errorComponent: PostErrorComponent,
  component: lazyRouteComponent($$splitComponentImporter, "component"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
function PostErrorComponent({
  error
}) {
  return /* @__PURE__ */ jsx(ErrorComponent, { error });
}
const SignupRoute = Route$7.update({
  id: "/signup",
  path: "/signup",
  getParentRoute: () => Route$8
});
const LogoutRoute = Route$6.update({
  id: "/logout",
  path: "/logout",
  getParentRoute: () => Route$8
});
const LoginRoute = Route$5.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$8
});
const AuthedRoute = Route$4.update({
  id: "/_authed",
  getParentRoute: () => Route$8
});
const IndexRoute = Route$3.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$8
});
const AuthedPostsRoute = Route$2.update({
  id: "/posts",
  path: "/posts",
  getParentRoute: () => AuthedRoute
});
const AuthedPostsIndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => AuthedPostsRoute
});
const AuthedPostsPostIdRoute = Route.update({
  id: "/$postId",
  path: "/$postId",
  getParentRoute: () => AuthedPostsRoute
});
const AuthedPostsRouteChildren = {
  AuthedPostsPostIdRoute,
  AuthedPostsIndexRoute
};
const AuthedPostsRouteWithChildren = AuthedPostsRoute._addFileChildren(
  AuthedPostsRouteChildren
);
const AuthedRouteChildren = {
  AuthedPostsRoute: AuthedPostsRouteWithChildren
};
const AuthedRouteWithChildren = AuthedRoute._addFileChildren(AuthedRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AuthedRoute: AuthedRouteWithChildren,
  LoginRoute,
  LogoutRoute,
  SignupRoute
};
const routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
  const router2 = createRouter({
    routeTree,
    scrollRestoration: true
  });
  return router2;
}
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  NotFound as N,
  Route$2 as R,
  Route as a,
  loginFn as l,
  router as r,
  signupFn as s
};
