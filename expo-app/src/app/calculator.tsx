import { getGoldPriceQueryFn } from "@/api/goldApi";
import ErrorScreen from "@/components/ErrorScreen";
import ModalButtonAndOptions from "@/components/Modals/ModalButtonAndOptions";
import { CurrencyOptions } from "@/options/CurrencyOptions";
import { WeightOptions } from "@/options/WeightOptions";
import {
  useSelectedCurrencyKey,
  useSelectedWeightKey,
} from "@/redux/slices/goldSelectionsSlice/goldSelectionHooks";
import { useColors } from "@/redux/slices/themeSlice/colorsHooks";
import { getWeightConversionFactor } from "@/utils/weightUnitsConversion";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useMemo } from "react";
import { ScrollView, Text, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";

const Upgrade = () => {
  const colors = useColors();

  const { selectedCurrencyKey, setSelectedCurrencyKey } =
    useSelectedCurrencyKey();
  const { selectedWeightKey, setSelectedWeightKey } = useSelectedWeightKey();

  const { data, status, error, isLoading, isFetching, refetch } = useQuery({
    queryFn: () => getGoldPriceQueryFn({ currencyKey: selectedCurrencyKey }),
    queryKey: ["gold-price", selectedCurrencyKey],
  });

  const fullPrice =
    (data?.price ?? 0) *
    getWeightConversionFactor({ weightType: selectedWeightKey });

  const getPriceText = useCallback(
    ({ karat }: { karat: number }) => {
      return (
        (data?.currencySymbol ?? "") +
        ((fullPrice * karat) / 24).toFixed(2).toString()
      );
    },
    [data?.currencySymbol, fullPrice],
  );

  const weightUnitName = useMemo(() => {
    return WeightOptions.find((item) => item.id === selectedWeightKey)
      ?.title as string;
  }, [selectedWeightKey]);

  const currencyName = useMemo(() => {
    return CurrencyOptions.find((item) => item.id === selectedCurrencyKey)
      ?.title as string;
  }, [selectedCurrencyKey]);

  if (status === "error") {
    return (
      <ErrorScreen
        isFetching={isFetching}
        refetch={refetch}
        error={`${error}`}
      />
    );
  }

  return (
    <View
      className=" self-stretch flex-1"
      style={{ backgroundColor: colors.background }}
    >
      <ScrollView
        className=" self-stretch flex-1"
        contentContainerClassName=" px-3 py-4"
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
      >
        <Text style={{ color: colors.text, fontSize: 40, fontWeight: "bold" }}>
          Calculator
        </Text>
        <View className=" h-4" />
        <View className=" self-stretch gap-4">
          <ModalButtonAndOptions
            displayName={weightUnitName}
            options={WeightOptions}
            selectedKey={selectedWeightKey}
            setSelectedKey={setSelectedWeightKey}
            title={"Weight Unit"}
          />
          <ModalButtonAndOptions
            displayName={currencyName}
            options={CurrencyOptions}
            selectedKey={selectedCurrencyKey}
            setSelectedKey={setSelectedCurrencyKey}
            title={"Currency"}
          />
        </View>
      </ScrollView>
      <View
        className=" self-stretch"
        style={{ borderTopWidth: 4, borderColor: colors.text }}
      >
        <Text
          className=" self-stretch text-center"
          style={{ color: colors.text, fontSize: 40 }}
        >
          Price: {getPriceText({ karat: 24 })}
        </Text>
      </View>
    </View>
  );
};

export default Upgrade;
