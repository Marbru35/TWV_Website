const { app } = require("@azure/functions");

app.http("mail", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    // Hilfsfunktion: JSON Response
    const json = (status, obj) => ({
      status,
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(obj),
    });

    try {
      context.log(`mail: ${request.method} ${request.url}`);

      // ✅ GET: Query params zurückgeben
      if (request.method === "GET") {
        const params = {};
        // request.query ist ein URLSearchParams
        for (const [k, v] of request.query.entries()) params[k] = v;

        return json(200, {
          ok: true,
          method: "GET",
          query: params,
        });
      }

      // ✅ POST: JSON Body lesen und "echo" zurückgeben
      if (request.method === "POST") {
        const contentType = request.headers.get("content-type") || "";

        // Wenn dein Frontend korrekt sendet, ist es application/json
        if (!contentType.toLowerCase().includes("application/json")) {
          // Fallback: Text lesen, aber klar sagen was erwartet wird
          const raw = await request.text();
          return json(415, {
            ok: false,
            error: "Expected application/json",
            receivedContentType: contentType,
            rawPreview: raw?.slice?.(0, 500) ?? "",
          });
        }

        const data = await request.json();

        // optional: minimal check (nur fürs Debuggen)
        if (!data || typeof data !== "object") {
          return json(400, { ok: false, error: "Invalid JSON body" });
        }

        context.log("mail: received body", data);

        // ✅ Das ist der Teil, den du dann im Frontend siehst:
        return json(200, {
          ok: true,
          method: "POST",
          received: data,
          receivedAt: new Date().toISOString(),
        });
      }

      // Sollte nie passieren, weil methods nur GET/POST sind
      return json(405, { ok: false, error: "Method not allowed" });
    } catch (err) {
      context.log("mail: error", err);
      return {
        status: 500,
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ ok: false, error: "Server error" }),
      };
    }
  },
});