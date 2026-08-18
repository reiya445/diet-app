import type { Config } from '@netlify/functions'
import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({})

const PROMPT = `
あなたは管理栄養士です。

この料理画像を解析してください。

以下のJSONだけ返してください。

{
"dish":"",
"ingredients":[
{
"name":"",
"amount":""
}
],
"calories":0,
"advice":"",
"tomorrow_recipe":""
}
`

export default async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  try {
    const { image } = await req.json()

    if (!image || typeof image !== 'string') {
      return Response.json({ error: '画像が送信されていません' }, { status: 400 })
    }

    const base64 = image.split(',')[1] ?? image

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            { text: PROMPT },
            { inlineData: { mimeType: 'image/jpeg', data: base64 } },
          ],
        },
      ],
    })

    return Response.json({ result: response.text })
  } catch (error) {
    console.error('Gemini analyze error:', error)
    return Response.json({ error: '解析に失敗しました' }, { status: 500 })
  }
}

export const config: Config = {
  path: '/api/analyze',
}
