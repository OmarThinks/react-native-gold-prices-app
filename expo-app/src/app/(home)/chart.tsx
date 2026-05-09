import { useColors } from "@/redux/slices/themeSlice/colorsHooks";
import React from "react";
import { Text, View } from "react-native";

const Chart = () => {
  const colors = useColors();

  return (
    <View
      className=" self-stretch flex-1 justify-center items-center"
      style={{ backgroundColor: colors.background }}
    >
      <Text style={{ color: colors.text }}>Chart</Text>
    </View>
  );
};

export default Chart;
