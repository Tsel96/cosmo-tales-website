import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "react-router";
import { Agentation } from "agentation";
import "./app.css";

export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter+Tight:wght@700&family=Inter:opsz,wght@14..32,400;14..32,600&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://use.typekit.net/wzh6wvx.css",
  },
];

export function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        {process.env.NODE_ENV === "development" && <Agentation />}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function HydrateFallback() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#050A1A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p style={{ color: "#4DC9F6", fontFamily: "system-ui", fontSize: "1rem" }}>
        Loading...
      </p>
    </div>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div style={{ padding: "2rem", color: "#E8EDF5", fontFamily: "system-ui" }}>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", color: "#E8EDF5", fontFamily: "system-ui" }}>
      <h1>Something went wrong</h1>
      <p>{error?.message || "Unknown error"}</p>
    </div>
  );
}
