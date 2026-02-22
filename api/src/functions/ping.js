const { app } = require("@azure/functions");

app.http("ping", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async () => {
    return { status: 200, body: "pong" };
  },
});