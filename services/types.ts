export interface StationData {
  station_id: string;
  timestamp: string;
  insights: {
    air_quality: string;
    soil_condition: string;
    water_ph_status: string;
    temperature_status: string;
    humidity_status: string;
    suggestion: string;
  };
}

export interface ApiResponse {
  data: StationData[];
  status: 'success' | 'error';
  message?: string;
}

// New AI-related types
export interface AIInsightRequest {
  station_id: string;
  station_data: StationData;
}

export interface AIInsightResponse {
  station_id: string;
  ai_insights: {
    summary: string;
    recommendations: string[];
    priority_actions: string[];
    risk_assessment: string;
    optimal_conditions: string;
  };
  confidence_score: number;
  timestamp: string;
}

export interface AIApiResponse {
  data: AIInsightResponse;
  status: 'success' | 'error';
  message?: string;
}