import { AIInsightRequest, AIInsightResponse, AIApiResponse } from './types';

const AI_API_BASE_URL = process.env.EXPO_PUBLIC_AI_API_URL || 'https://your-ai-api-endpoint.com';
const USE_MOCK_AI = process.env.EXPO_PUBLIC_USE_MOCK_AI === 'true' || true;

// Mock AI insights data
const getMockAIInsights = (stationId: string): AIInsightResponse => ({
  station_id: stationId,
  ai_insights: {
    summary: "Based on current conditions, your farm station is performing well with some areas needing attention. The air quality and temperature are optimal for crop growth, but soil moisture levels require monitoring.",
    recommendations: [
      "Increase irrigation frequency to maintain optimal soil moisture",
      "Monitor pH levels closely and consider lime application if needed",
      "Implement windbreaks to improve air circulation",
      "Consider installing humidity sensors for better climate control"
    ],
    priority_actions: [
      "Immediate: Check irrigation system functionality",
      "This week: Test soil pH and adjust if necessary",
      "This month: Install additional monitoring sensors"
    ],
    risk_assessment: "Low to moderate risk. Current conditions are generally favorable, but dry soil conditions could impact crop yield if not addressed promptly.",
    optimal_conditions: "For optimal growth, maintain soil moisture at 60-70%, keep pH between 6.0-7.0, and ensure consistent temperature between 20-25°C."
  },
  confidence_score: 0.87,
  timestamp: new Date().toISOString()
});

class AIService {
  async getAIInsights(request: AIInsightRequest): Promise<AIInsightResponse> {
    if (USE_MOCK_AI) {
      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      return getMockAIInsights(request.station_id);
    }

    try {
      const response = await fetch(`${AI_API_BASE_URL}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.EXPO_PUBLIC_AI_API_KEY}`
        },
        body: JSON.stringify(request)
      });

      const result: AIApiResponse = await response.json();
      
      if (result.status === 'success') {
        return result.data;
      }
      throw new Error(result.message || 'AI API Error');
    } catch (error) {
      console.error('AI API Error:', error);
      // Fallback to mock data
      return getMockAIInsights(request.station_id);
    }
  }
}

export const aiService = new AIService();