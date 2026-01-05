/**
 * Vercel Serverless Function Entry Point
 *
 * This file exports the Mastra application as a Vercel serverless function.
 * All routes defined in the Mastra server will be available at the root path.
 */

import { mastra } from '../src/mastra/index';

// Export the Hono app as a Vercel serverless function handler
export default mastra.server.getApp().fetch;
