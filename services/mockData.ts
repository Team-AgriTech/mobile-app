import { StationData } from "./types";

export const mockStationData: StationData[] = [
  {
    _id: "68843c685667fc4fe45e7768",
    data: {
      gas_level: 230,
      humidity: 61,
      light_intensity: 320,
      ph_value: 6.7,
      soil_moisture: 432,
      soil_temperature: 23.5,
      temperature: 26.4
    },
    device_id: "station-01",
    prediction: 33,
    timestamp: "Sat, 26 Jul 2025 02:24:40 GMT"
  },
  {
    _id: "68843c685667fc4fe45e7769",
    data: {
      gas_level: 180,
      humidity: 45,
      light_intensity: 280,
      ph_value: 7.2,
      soil_moisture: 380,
      soil_temperature: 22.1,
      temperature: 24.8
    },
    device_id: "station-02",
    prediction: 28,
    timestamp: "Sat, 26 Jul 2025 02:25:40 GMT"
  }
];