import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { question, subject, examType, context } = await request.json()
    
    const prompt = `
As an expert tutor for competitive exams (specializing in ${subject} for ${examType}), provide a comprehensive answer to this question:

Question: ${question}
Context: ${context || 'General competitive exam preparation'}

Please provide:
1. A clear, step-by-step solution
2. Key concepts and formulas involved
3. Common mistakes students make
4. Practice tips for similar problems
5. Related topics to study

Use proper mathematical notation with LaTeX where appropriate (enclosed in $ for inline math or $$ for display math).

Format your response clearly with proper explanations for each step.
`

    const response = await fetch(process.env.OLLAMA_URL + '/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: process.env.AI_MODEL || 'llama3:8b',
        prompt,
        stream: false,
        options: {
          temperature: 0.7,
          top_p: 0.9,
          max_tokens: 2000,
          stop: ['Human:', 'Assistant:']
        }
      })
    })

    if (!response.ok) {
      throw new Error('AI service unavailable')
    }

    const aiResult = await response.json()
    
    return NextResponse.json({
      answer: aiResult.response,
      confidence: 0.85,
      model: process.env.AI_MODEL || 'llama3:8b',
      timestamp: new Date().toISOString(),
      isAI: true
    })
  } catch (error) {
    console.error('AI Answer Error:', error)
    return NextResponse.json(
      { error: 'AI service temporarily unavailable. Please try again later.' },
      { status: 503 }
    )
  }
}