import { getGoldPriceQueryFn } from "@/api/goldApi";
import ErrorScreen from "@/components/ErrorScreen";
import ModalButtonAndOptions from "@/components/Modals/ModalButtonAndOptions";
import BannerAd from "@/components/Views/ads/BannerAd";
import { Header } from "@/components/Views/Header/Header";
import { CurrencyOptions } from "@/options/CurrencyOptions";
import { KaratOptions, KaratOptionsEnum } from "@/options/KaratOptions";
import { WeightOptions } from "@/options/WeightOptions";
import {
  useSelectedCurrencyKey,
  useSelectedWeightKey,
} from "@/redux/slices/goldSelectionsSlice/goldSelectionHooks";
import { useColors } from "@/redux/slices/themeSlice/colorsHooks";
import { getPriceText } from "@/utils/getPriceText";
import { getWeightConversionFactor } from "@/utils/weightUnitsConversion";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";

const Upgrade = () => {
  const colors = useColors();

  const { selectedCurrencyKey, setSelectedCurrencyKey } =
    useSelectedCurrencyKey();
  const { selectedWeightKey, setSelectedWeightKey } = useSelectedWeightKey();
  const [selectedKarat, setSelectedKarat] = useState(KaratOptionsEnum.K_24);
  const [amount, setAmount] = useState("1");

  const { data, status, error, isLoading, isFetching, refetch } = useQuery({
    queryFn: () => getGoldPriceQueryFn({ currencyKey: selectedCurrencyKey }),
    queryKey: ["gold-price", selectedCurrencyKey],
  });

  const fullPrice =
    (data?.price ?? 0) *
    getWeightConversionFactor({ weightType: selectedWeightKey });

  const multiplier: number = useMemo(() => {
    try {
      return Number(amount);
    } catch (error) {
      return 1;
    }
  }, [amount]);

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
      <Header title="Calculator" shouldHideBackButton shouldHideSettings />
      <ScrollView
        className=" self-stretch flex-1"
        contentContainerClassName=" px-3 py-4"
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
      >
        <View className=" h-4" />
        <View className=" self-stretch gap-4">
          <TextInput
            defaultValue={amount}
            onChangeText={setAmount}
            style={{
              alignSelf: "stretch",
              borderRadius: 16,
              borderWidth: 1,
              borderColor: colors.border,
              color: colors.text,
              fontSize: 32,
              paddingHorizontal: 16,
            }}
            keyboardType="numeric"
            placeholder="Amount"
            placeholderTextColor={colors.border}
          />
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
          <ModalButtonAndOptions
            displayName={selectedKarat}
            options={KaratOptions}
            selectedKey={selectedKarat}
            setSelectedKey={setSelectedKarat}
            title={"Karat"}
          />
        </View>
      </ScrollView>
      <View
        className=" self-stretch"
        style={{ borderTopWidth: 4, borderColor: colors.text }}
      >
        <Text
          className=" self-stretch text-center p-4"
          style={{ color: colors.text, fontSize: 40 }}
        >
          Price:{" "}
          {getPriceText({
            karat: parseInt(selectedKarat),
            multiplier,
            currencySymbol: data?.currencySymbol ?? "",
            price: data?.price ?? 0,
            selectedWeightKey,
          })}
        </Text>
      </View>
      <BannerAd />
    </View>
  );
};

export default Upgrade;
