
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import type { Alert, Location, ScanResult, RecordingLawResult, JargonBusterResult } from '../types';

// Get user settings from localStorage for API key and model
const getUserSettings = () => {
  try {
    const stored = localStorage.getItem('firewatch_user_settings');
    if (stored) {
      const settings = JSON.parse(stored);
      return {
        apiKey: settings.geminiApiKey || '',
        model: settings.geminiModel || 'gemini-2.0-flash-exp'
      };
    }
  } catch (error) {
    console.error('Error reading user settings:', error);
  }
  return {
    apiKey: '',
    model: 'gemini-2.0-flash-exp'
  };
};

const getAI = () => {
  const settings = getUserSettings();
  if (!settings.apiKey) {
    throw new Error('No Gemini API key configured. Please set your API key in Settings.');
  }
  return new GoogleGenAI({ apiKey: settings.apiKey });
};

const alertSchema = {
  type: Type.OBJECT,
  properties: {
    id: { type: Type.STRING, description: 'A unique ID for the alert, can be a timestamp-based string.' },
    type: { type: Type.STRING, description: 'The type of alert. Must be one of: "Immediate Threat", "Area Watch", "Pattern Alert", or "All Clear".' },
    title: { type: Type.STRING, description: 'A short, descriptive title for the alert (e.g., "ICE Raid Reported").' },
    location: { type: Type.STRING, description: 'The general location of the event (e.g., "Downtown Los Angeles").' },
    timestamp: { type: Type.STRING, description: 'The current time in ISO 8601 format.' },
    description: { type: Type.STRING, description: 'A brief, 1-2 sentence description of the alert with actionable advice for civilians.' },
    verified: { type: Type.BOOLEAN, description: 'Whether the report is verified. Should be false for new, unconfirmed reports.' },
  },
  required: ['id', 'type', 'title', 'location', 'timestamp', 'description', 'verified'],
};


export const generateNewAlert = async (): Promise<Alert | null> => {
  try {
    const ai = getAI();
    const { model } = getUserSettings();
    const prompt = `Generate a new, realistic-sounding community safety alert for the "Firewatch" civil rights app. The alert should be relevant to potential unconstitutional government enforcement actions against civilians. It can be an unconfirmed report. It must conform to the provided JSON schema. Make the title and description compelling and informative. The timestamp should be the current time. The ID should be unique. The 'verified' status should be false.`;
    const response: GenerateContentResponse = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: alertSchema,
      },
    });

    const jsonText = response.text.trim();
    if (!jsonText) {
        console.error('Gemini API returned an empty response.');
        return null;
    }

    const newAlert = JSON.parse(jsonText) as Alert;
    // Ensure timestamp is current in case the model hallucinates an old one
    newAlert.timestamp = new Date().toISOString();
    return newAlert;

  } catch (error) {
    console.error('Error generating new alert from Gemini API:', error);
    return null;
  }
};


export const scanForLocalAlerts = async (location: Location | string): Promise<ScanResult | null> => {
    try {
        const ai = getAI();
        const { model } = getUserSettings();
        const locationContext = typeof location === 'string'
            ? `in or around ${location}`
            : `around latitude ${location.lat} and longitude ${location.lon}`;
        
        const prompt = `Perform a search for recent events ${locationContext}. Scan for news articles, social media discussions, and official alerts posted in the last 48 hours. Focus on topics relevant to a civil rights protection app, such as: - Protests or demonstrations - Law enforcement activity (e.g., police checkpoints, ICE raids, increased patrols) - Community safety alerts - Reports of rights violations. Provide a concise summary of your findings. If there are no relevant events, state that the area appears clear based on available data.`;

        const response: GenerateContentResponse = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                tools: [{ googleSearch: {} }],
            },
        });

        const text = response.text;
        
        const rawSources = response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
        const sources = rawSources
            .map((chunk: any) => chunk.web)
            .filter((web: any) => web && web.uri) // Filter out any chunks that aren't web sources
            .map((web: any) => ({ uri: web.uri, title: web.title || web.uri })) // use uri as title if title is missing
            // Simple deduplication based on URI
            .filter((value: any, index: number, self: any[]) =>
                self.findIndex((s: any) => s.uri === value.uri) === index
            );

        return { text, sources };

    } catch (error)
    {
        console.error('Error scanning for local alerts with Gemini API:', error);
        throw new Error('An unknown error occurred during the scan.');
    }
};

const recordingLawSchema = {
    type: Type.OBJECT,
    properties: {
        consentType: { type: Type.STRING, description: 'The consent type. Must be one of: "One-Party", "Two-Party", "Varies", or "Unclear".' },
        summary: { type: Type.STRING, description: 'A brief, one-sentence summary for a layperson.' },
        disclaimer: { type: Type.STRING, description: 'A standard disclaimer that this is not legal advice and is for informational purposes only.' }
    },
    required: ['consentType', 'summary', 'disclaimer'],
};

export const getRecordingLaw = async (state: string): Promise<RecordingLawResult | null> => {
    try {
        const prompt = `Analyze the laws for the state of "${state}". Is it a "One-Party" or "Two-Party" consent state for recording audio conversations where there is a reasonable expectation of privacy? If the law is complex (e.g., differs for in-person vs. electronic), classify as "Varies". Provide a brief, one-sentence summary for a layperson. Include a disclaimer. Respond ONLY with the JSON object.`;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: recordingLawSchema,
            },
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as RecordingLawResult;
    } catch (error) {
        console.error(`Error fetching recording law for ${state}:`, error);
        return null;
    }
};

const jargonBusterSchema = {
    type: Type.OBJECT,
    properties: {
        term: { type: Type.STRING },
        explanation: { type: Type.STRING, description: 'A simple explanation (1-2 sentences) for a non-lawyer.' }
    },
    required: ['term', 'explanation'],
};

export const explainLegalTerm = async (term: string): Promise<JargonBusterResult | null> => {
    try {
        const ai = getAI();
        const { model } = getUserSettings();
        const prompt = `Explain the legal term "${term}" in simple, easy-to-understand language for a non-lawyer. Keep the explanation to 1-2 sentences. Respond ONLY with the JSON object.`;
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: jargonBusterSchema,
            },
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as JargonBusterResult;
    } catch (error) {
        console.error(`Error explaining legal term "${term}":`, error);
        return null;
    }
};