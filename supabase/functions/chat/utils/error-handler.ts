
import { corsHeaders } from "./cors.ts";

export function handleError(error: Error): Response {
  console.error('エラー発生:', error);
  return new Response(
    JSON.stringify({
      error: 'Internal server error',
      details: error.message
    }), 
    { 
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    }
  );
}
