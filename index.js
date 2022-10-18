import { createRequestHandler } from "enhance-remix";
import { loadElements, loadRoutes } from "enhance-remix-bun";

/** @type {ReturnType<typeof createRequestHandler>} */
let handler;

if (process.env.NODE_ENV === "development") {
  const { default: livereload } = await import("bun-livereload");
  handler = livereload(async (request) => {
    const routes = await loadRoutes();
    const elements = await loadElements();

    return createRequestHandler(routes, elements)(request);
  });
} else {
  const routes = await loadRoutes();
  const elements = await loadElements();

  handler = createRequestHandler(routes, elements);
}

const port = Number(process.env.PORT || 3000);
const server = Bun.serve({
  fetch: (request) => {
    // @ts-expect-error
    request.signal = new AbortController().signal;
    return handler(request);
  },
  port,
});

console.log(`Listening on port http://localhost:${server.port}`);
