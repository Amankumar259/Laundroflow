import express from "express";
import cors from "cors";
import path from "path";
import { createServer as createViteServer } from "vite";
import orderRoutes from "./server/routes/orderRoutes.js";
import { OrderController } from "./server/controllers/orderController.js";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes - must be registered before Vite middleware
  app.use("/api/orders", orderRoutes);
  app.get("/api/dashboard", (req: any, res: any) =>
    OrderController.getDashboard(req, res),
  );

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    app.use("*", async (req: any, res: any) => {
      try {
        const url = (req.originalUrl || "/").replace(/^\/?/, "/");
        let template = await vite.transformIndexHtml(
          url,
          `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>LaundroFlow</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.tsx"><\/script>
  </body>
</html>`,
        );
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e: any) {
        res.status(500).end(e.message);
      }
    });
  } else {
    // Serve static files in production
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
