import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { cvText } = await req.json();
    
    if (!cvText || typeof cvText !== 'string') {
      return new Response(
        JSON.stringify({ error: 'CV text content is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `You are an expert CV/Resume parser. Extract structured information from the CV text provided.
    
You MUST respond with ONLY a valid JSON object using the exact structure below. Do not include any explanations or markdown.

{
  "personal": {
    "full_name": "string",
    "email": "string or null",
    "phone": "string or null",
    "location": "string or null",
    "country": "string or null",
    "title": "current or most recent job title",
    "summary": "professional summary if present, otherwise create a brief one",
    "linkedin_url": "string or null",
    "years_experience": number (estimate from work history)
  },
  "employment": [
    {
      "company_name": "string",
      "job_title": "string",
      "location": "string or null",
      "start_date": "YYYY-MM format or null",
      "end_date": "YYYY-MM format or null (null if current)",
      "is_current": boolean,
      "description": "responsibilities and achievements"
    }
  ],
  "education": [
    {
      "institution": "string",
      "degree": "string",
      "field_of_study": "string or null",
      "start_date": "YYYY-MM or null",
      "end_date": "YYYY-MM or null",
      "grade": "string or null"
    }
  ],
  "skills": [
    {
      "skill_name": "string",
      "skill_type": "technical or soft",
      "proficiency": "Beginner, Intermediate, Advanced, or Expert",
      "years_of_experience": number (estimate)
    }
  ],
  "projects": [
    {
      "title": "string",
      "description": "string",
      "technologies": ["array", "of", "tech"],
      "project_url": "string or null",
      "repo_url": "string or null"
    }
  ],
  "certifications": [
    {
      "name": "string",
      "issuing_organization": "string",
      "issue_date": "YYYY-MM or null",
      "expiry_date": "YYYY-MM or null",
      "credential_id": "string or null"
    }
  ]
}

Important:
- Extract ALL information available in the CV
- For dates, use YYYY-MM format
- For skills, infer proficiency from context (years used, expertise mentioned)
- If information is not available, use null
- Estimate years_experience from the work history`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Parse the following CV and extract all information:\n\n${cvText}` }
        ],
        temperature: 0.1, // Low temperature for more consistent parsing
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please add credits to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('No content in AI response');
    }

    // Parse the JSON response from AI
    let parsedCV;
    try {
      // Remove any markdown code blocks if present
      let cleanContent = content.trim();
      if (cleanContent.startsWith('```json')) {
        cleanContent = cleanContent.slice(7);
      } else if (cleanContent.startsWith('```')) {
        cleanContent = cleanContent.slice(3);
      }
      if (cleanContent.endsWith('```')) {
        cleanContent = cleanContent.slice(0, -3);
      }
      parsedCV = JSON.parse(cleanContent.trim());
    } catch (parseError) {
      console.error('Failed to parse AI response:', content);
      throw new Error('Failed to parse CV data from AI response');
    }

    return new Response(
      JSON.stringify({ success: true, data: parsedCV }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('CV parsing error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
