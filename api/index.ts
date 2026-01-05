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

// Register all Slack routes
for (const route of slackRoutes) {
  const method = route.method.toLowerCase() as 'get' | 'post' | 'put' | 'delete' | 'patch';
  app[method](route.path, async (c) => {
    c.set('mastra', mastra);
    return route.handler(c);
  });
}

// Export as Vercel handler
export default handle(app);
