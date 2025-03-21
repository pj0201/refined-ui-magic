
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

export function handleOptionsRequest() {
  return new Response(null, { headers: corsHeaders })
}

export function createErrorResponse(message: string, statusCode: number = 400, details?: string) {
  const body = details 
    ? JSON.stringify({ error: message, details }) 
    : JSON.stringify({ error: message })
  
  return new Response(
    body,
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: statusCode }
  )
}

export function createSuccessResponse(data: any) {
  return new Response(
    JSON.stringify(data),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}
