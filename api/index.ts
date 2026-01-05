/**
 * Vercel Serverless Function Entry Point
 *
 * This file exports the Mastra application as a Vercel serverless function.
 * All routes defined in the Mastra server will be available at the root path.
 */

import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { mastra } from '../src/mastra/index.js';
import { slackRoutes } from '../src/mastra/slack/routes.js';

// Create a Hono app with the Slack routes
const app = new Hono();

// Add middleware to inject mastra into context
app.use('*', async (c, next) => {
  c.set('mastra', mastra as any);
  await next();
});

// Register all Slack routes
for (const route of slackRoutes) {
  const method = route.method.toLowerCase() as 'get' | 'post' | 'put' | 'delete' | 'patch';

  // slackRoutes uses 'handler' property (not 'createHandler')
  // Cast to any to bypass TypeScript union type checking
  const apiRoute = route as any;
  app[method](route.path, apiRoute.handler);
}

// Export as Vercel handler
export default handle(app);
