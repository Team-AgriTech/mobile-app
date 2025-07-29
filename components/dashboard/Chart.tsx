import { ThemedText } from "@/components/ThemedText";
import { useLanguage } from "@/contexts/LanguageContext";
import { StationData } from "@/services/types";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

interface GraphCardProps {
  historicalData: StationData[];
  loading: boolean;
  stationId: string;
}

const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  decimalPlaces: 1,
  color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(55, 65, 81, ${opacity})`,
  propsForDots: {
    r: "4",
    strokeWidth: "2",
    stroke: "#2563EB",
  },
  propsForLabels: {
    fontWeight: "500",
  },
};

export function GraphCard({ historicalData, loading, stationId }: GraphCardProps) {
  const [selected, setSelected] = useState<string>("temperature");
  const { t } = useLanguage();

  const getParameterData = () => {
    if (!historicalData || historicalData.length === 0) {
      return [];
    }

    // Get the last 5 data points for better visualization (reduced from 10)
    const recentData = historicalData.slice(-5);

    return recentData.map(station => {
      const time = new Date(station.timestamp).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });

      let value = 0;
      switch (selected) {
        case "temperature":
          value = station.data.temperature;
          break;
        case "humidity":
          value = station.data.humidity;
          break;
        case "ph":
          value = station.data.ph_value;
          break;
        case "moisture":
          value = station.data.soil_moisture;
          break;
        case "gas_level":
          value = station.data.gas_level;
          break;
        case "light_intensity":
          value = station.data.light_intensity;
          break;
        default:
          value = 0;
      }

      return { time, value };
    });
  };

  const selectedData = getParameterData();

  const chartData = {
    labels: selectedData.map((d) => d.time),
    datasets: [
      {
        data: selectedData.length > 0 ? selectedData.map((d) => d.value) : [0],
        color: () => "#3B82F6",
      },
    ],
    legend: [t(`chart.legend.${selected}`)],
  };

  const parameterOptions = [
    { key: "temperature", label: t('chart.parameter.temperature') },
    { key: "humidity", label: t('chart.parameter.humidity') },
    { key: "ph", label: t('chart.parameter.ph') },
    { key: "moisture", label: t('chart.parameter.moisture') },
    { key: "gas_level", label: t('chart.parameter.gas_level') },
    { key: "light_intensity", label: t('chart.parameter.light_intensity') },
  ];

  if (loading) {
    return (
      <View style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          {t('chart.title')} - {stationId}
        </ThemedText>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <ThemedText style={styles.loadingText}>{t('chart.loading')}</ThemedText>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        {t('chart.title')} - {stationId}
      </ThemedText>

      <View style={styles.dropdownContainer}>
        <ThemedText style={styles.dropdownLabel}>{t('chart.select_parameter')}:</ThemedText>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selected}
            onValueChange={(val) => setSelected(val)}
            style={styles.picker}
            dropdownIconColor="#6B7280"
            mode="dropdown"
          >
            {parameterOptions.map((option) => (
              <Picker.Item key={option.key} label={option.label} value={option.key} />
            ))}
          </Picker>
        </View>
      </View>

      {selectedData.length > 0 ? (
        <LineChart
          data={chartData}
          width={screenWidth - 32}
          height={260}
          chartConfig={chartConfig}
          bezier
          withVerticalLabels={true}
          withHorizontalLabels={true}
          withShadow={false}
          style={styles.chart}
        />
      ) : (
        <View style={styles.noDataContainer}>
          <ThemedText style={styles.noDataText}>{t('chart.no_data')}</ThemedText>
        </View>
      )}

      <ThemedText style={styles.dataInfo}>
        {t('chart.showing_points', { count: selectedData.length })}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#111827",
  },
  chart: {
    borderRadius: 16,
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  dropdownLabel: {
    fontSize: 14,
    color: "#4B5563",
    fontWeight: "500",
    marginBottom: 6,
  },
  pickerWrapper: {
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    overflow: "hidden",
    justifyContent: "center",
  },
  picker: {
    color: "#111827",
    fontSize: 16,
    paddingHorizontal: 12,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 10,
    color: '#6B7280',
  },
  noDataContainer: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
  },
  noDataText: {
    color: '#6B7280',
    fontSize: 14,
  },
  dataInfo: {
    marginTop: 10,
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});