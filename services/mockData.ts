import { StationData } from "./types";

export const mockStationData: StationData[] = [
  {
    station_id: "station-01",
    timestamp: "2025-07-24T10:00:00Z",
    insights: {
      air_quality: "Moderate – Safe for crops",
      soil_condition: "Moisture is sufficient",
      water_ph_status: "Slightly acidic – acceptable for most plants",
      temperature_status: "Ideal temperature for growth",
      humidity_status: "Optimal humidity level",
      suggestion: "Add Npk Fertilizers"
    }
  },
  {
    station_id: "station-02", 
    timestamp: "2025-07-24T10:05:00Z",
    insights: {
      air_quality: "Good – Excellent for plant growth",
      soil_condition: "Dry – Needs watering",
      water_ph_status: "Neutral – Perfect for most crops",
      temperature_status: "Slightly high – Monitor closely",
      humidity_status: "Low – Consider irrigation",
      suggestion: "Add Npk Fertilizers"

    }
  }
];