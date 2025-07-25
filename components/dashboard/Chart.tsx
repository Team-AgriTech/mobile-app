import { ThemedText } from "@/components/ThemedText";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const dummyData = {
  temperature: [
    { time: "10:00", value: 22 },
    { time: "11:00", value: 24 },
    { time: "12:00", value: 23 },
    { time: "13:00", value: 26 },
    { time: "14:00", value: 25 },
  ],
  humidity: [
    { time: "10:00", value: 45 },
    { time: "11:00", value: 50 },
    { time: "12:00", value: 48 },
    { time: "13:00", value: 55 },
    { time: "14:00", value: 52 },
  ],
  ph: [
    { time: "10:00", value: 6.2 },
    { time: "11:00", value: 6.5 },
    { time: "12:00", value: 6.7 },
    { time: "13:00", value: 6.3 },
    { time: "14:00", value: 6.4 },
  ],
  moisture: [
    { time: "10:00", value: 30 },
    { time: "11:00", value: 32 },
    { time: "12:00", value: 34 },
    { time: "13:00", value: 33 },
    { time: "14:00", value: 31 },
  ],
};

const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  decimalPlaces: 1,
  color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`, // Tailwind blue-500
  labelColor: (opacity = 1) => `rgba(55, 65, 81, ${opacity})`, // Tailwind gray-700
  propsForDots: {
    r: "5",
    strokeWidth: "2",
    stroke: "#2563EB",
  },
  propsForLabels: {
    fontWeight: "500",
  },
};

export function GraphCard() {
  const [selected, setSelected] =
    useState<keyof typeof dummyData>("temperature");
  const selectedData = dummyData[selected];

  const chartData = {
    labels: selectedData.map((d) => d.time),
    datasets: [
      {
        data: selectedData.map((d) => d.value),
        color: () => "#3B82F6",
      },
    ],
    legend: [selected.toUpperCase()],
  };

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Sensor Graph
      </ThemedText>

      <View style={styles.dropdownContainer}>
  <ThemedText style={styles.dropdownLabel}>Select Parameter:</ThemedText>
  <View style={styles.pickerWrapper}>
    <Picker
      selectedValue={selected}
      onValueChange={(val) => setSelected(val)}
      style={styles.picker}
      dropdownIconColor="#6B7280"
      mode="dropdown" // Use 'dropdown' instead of 'dialog'
    >
      {Object.keys(dummyData).map((key) => (
        <Picker.Item key={key} label={key.toUpperCase()} value={key} />
      ))}
    </Picker>
  </View>
</View>


      <LineChart
        data={chartData}
        width={screenWidth - 32} // fits perfectly inside padding
        height={260}
        chartConfig={chartConfig}
        bezier
        withVerticalLabels={true}
        withHorizontalLabels={true}
        withShadow={false}
        style={styles.chart}
      />
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
    color: "#4B5563", // gray-600
    fontWeight: "500",
    marginBottom: 6,
    outline: "none",
  },

  pickerWrapper: {
    backgroundColor: "#F3F4F6", // gray-100
    borderRadius: 12,
    borderWidth: 4,
    borderColor: "#D1D5DB", // gray-300
    overflow: "hidden",
    // height: 48,
    justifyContent: "center",
  },

  picker: {
    color: "#111827", // gray-900
    fontSize: 16,
    // outline: "none",
    paddingHorizontal: 12,
    // height: 48,
  },
});
