import { SensorData } from '@/services/types';

export type SensorStatus = 'good' | 'moderate' | 'warning' | 'danger';

export interface SensorInsight {
  status: SensorStatus;
  message: string;
  value: number;
}

export class SensorEvaluator {
  static evaluateTemperature(temp: number): SensorInsight {
    if (temp >= 20 && temp <= 25) {
      return { status: 'good', message: 'Ideal temperature for growth', value: temp };
    } else if (temp >= 18 && temp <= 30) {
      return { status: 'moderate', message: 'Acceptable temperature range', value: temp };
    } else if (temp >= 15 && temp <= 35) {
      return { status: 'warning', message: 'Temperature needs monitoring', value: temp };
    } else {
      return { status: 'danger', message: 'Critical temperature level', value: temp };
    }
  }

  static evaluateHumidity(humidity: number): SensorInsight {
    if (humidity >= 50 && humidity <= 70) {
      return { status: 'good', message: 'Optimal humidity level', value: humidity };
    } else if (humidity >= 40 && humidity <= 80) {
      return { status: 'moderate', message: 'Acceptable humidity range', value: humidity };
    } else if (humidity >= 30 && humidity <= 90) {
      return { status: 'warning', message: 'Humidity needs attention', value: humidity };
    } else {
      return { status: 'danger', message: 'Critical humidity level', value: humidity };
    }
  }

  static evaluatePH(ph: number): SensorInsight {
    if (ph >= 6.0 && ph <= 7.0) {
      return { status: 'good', message: 'Optimal pH for most crops', value: ph };
    } else if (ph >= 5.5 && ph <= 7.5) {
      return { status: 'moderate', message: 'Acceptable pH range', value: ph };
    } else if (ph >= 5.0 && ph <= 8.0) {
      return { status: 'warning', message: 'pH needs adjustment', value: ph };
    } else {
      return { status: 'danger', message: 'Critical pH level', value: ph };
    }
  }

  static evaluateSoilMoisture(moisture: number): SensorInsight {
    if (moisture >= 400 && moisture <= 600) {
      return { status: 'good', message: 'Optimal soil moisture', value: moisture };
    } else if (moisture >= 300 && moisture <= 700) {
      return { status: 'moderate', message: 'Adequate soil moisture', value: moisture };
    } else if (moisture >= 200 && moisture <= 800) {
      return { status: 'warning', message: 'Moisture needs monitoring', value: moisture };
    } else {
      return { status: 'danger', message: 'Critical moisture level', value: moisture };
    }
  }

  static evaluateGasLevel(gasLevel: number): SensorInsight {
    if (gasLevel <= 150) {
      return { status: 'good', message: 'Excellent air quality', value: gasLevel };
    } else if (gasLevel <= 250) {
      return { status: 'moderate', message: 'Good air quality', value: gasLevel };
    } else if (gasLevel <= 350) {
      return { status: 'warning', message: 'Moderate air quality', value: gasLevel };
    } else {
      return { status: 'danger', message: 'Poor air quality', value: gasLevel };
    }
  }

  static evaluateLightIntensity(light: number): SensorInsight {
    if (light >= 300 && light <= 500) {
      return { status: 'good', message: 'Optimal light intensity', value: light };
    } else if (light >= 200 && light <= 600) {
      return { status: 'moderate', message: 'Adequate light level', value: light };
    } else if (light >= 100 && light <= 700) {
      return { status: 'warning', message: 'Light needs adjustment', value: light };
    } else {
      return { status: 'danger', message: 'Critical light level', value: light };
    }
  }
}