/**
 * Vercel Serverless Function Entry Point
 *
 * This file exports the Mastra application as a Vercel serverless function.
 * All routes defined in the Mastra server will be available at the root path.
 */

import { mastra } from '../src/mastra/index';

// Get the Hono app instance
const app = mastra.server.getApp();

// Export handler compatible with Vercel's Web Standard API
export default async (req: Request) => {
  try {
    return await app.fetch(req);
  } catch (error) {
    console.error('Serverless function error:', error);
    return new Response(JSON.stringify({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
