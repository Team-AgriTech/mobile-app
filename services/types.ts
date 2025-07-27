export interface SensorData {
  gas_level: number;
  humidity: number;
  light_intensity: number;
  ph_value: number;
  soil_moisture: number;
  soil_temperature: number;
  temperature: number;
}

export interface StationData {
  _id: string;
  data: SensorData;
  device_id: string;
  prediction: number;
  timestamp: string;
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