import { getGoldPriceQueryFn } from "@/api/goldApi";
import ErrorScreen from "@/components/ErrorScreen";
import { WeightOptions, WeightOptionsEnum } from "@/options/WeightOptions";
import OptionsModal from "@/components/Modals/OptionsModal";
import { Header } from "@/components/Views/Header/Header";
import { useColors } from "@/redux/slices/themeSlice/colorsHooks";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getWeightConversionFactor } from "@/utils/weightUnitsConversion";
import { CurrencyOptionsEnum } from "@/options/CurrencyOptions";

const HomeScreen = () => {
  const colors = useColors();

  const { data, status, error, isLoading, isFetching, refetch } = useQuery({
    queryFn: () => getGoldPriceQueryFn(),
    queryKey: ["gold-price"],
  });

  const [isWeightModalVisible, setIsWeightModalVisible] = useState(false);

  const [selectedWeightKey, setSelectedWeightKey] = useState(
    WeightOptionsEnum.Gram,
  );
  const [selectedCurrencyKey, setSelectedCurrencyKey] = useState(
    CurrencyOptionsEnum.USD,
  );

  const fullPrice =
    data?.price ??
    0 * getWeightConversionFactor({ weightType: selectedWeightKey });

  const getPriceText = useCallback(
    ({ karat }: { karat: number }) => {
      return (
        data?.currencySymbol ??
        "" + ((fullPrice * karat) / 24).toFixed(2).toString()
      );
    },
    [data?.currencySymbol, fullPrice],
  );

  const weightUnitName = useMemo(() => {
    return WeightOptions.find((item) => item.id === selectedWeightKey)
      ?.title as string;
  }, [selectedWeightKey]);

  if (status === "error") {
    return (
      <ErrorScreen
        isFetching={isFetching}
        refetch={refetch}
        error={`${error}`}
      />
    );
  }
  if (status === "pending") {
    return (
      <View className=" self-stretch flex-1 justify-center items-center">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View
      className=" self-stretch flex-1"
      style={{ backgroundColor: colors.background }}
    >
      <Header title="Gold Price" />
      <View className=" self-stretch flex-1 px-4" style={{ paddingTop: 16 }}>
        <View className=" self-stretch">
          <Row text1="Karat" text2="Price" isHeader />
        </View>

        <ScrollView
          className=" self-stretch flex-1 "
          refreshControl={
            <RefreshControl refreshing={isFetching} onRefresh={refetch} />
          }
          contentContainerClassName=""
        >
          <View className=" self-stretch flex-1">
            <Row text1="24" text2={getPriceText({ karat: 24 })} />
            <Row text1="23" text2={getPriceText({ karat: 23 })} />
            <Row text1="22" text2={getPriceText({ karat: 22 })} />
            <Row text1="21" text2={getPriceText({ karat: 21 })} />
            <Row text1="20" text2={getPriceText({ karat: 20 })} />
            <Row text1="19" text2={getPriceText({ karat: 19 })} />
            <Row text1="18" text2={getPriceText({ karat: 18 })} />
            <Row text1="17" text2={getPriceText({ karat: 17 })} />
            <Row text1="16" text2={getPriceText({ karat: 16 })} />
            <Row text1="15" text2={getPriceText({ karat: 15 })} />
            <Row text1="14" text2={getPriceText({ karat: 14 })} />
            <Row text1="13" text2={getPriceText({ karat: 13 })} />
            <Row text1="12" text2={getPriceText({ karat: 12 })} />
            <Row text1="11" text2={getPriceText({ karat: 11 })} />
            <Row text1="10" text2={getPriceText({ karat: 10 })} />
            <Row text1="9" text2={getPriceText({ karat: 9 })} />
            <Row text1="8" text2={getPriceText({ karat: 8 })} />
            <Row text1="7" text2={getPriceText({ karat: 7 })} />
            <Row text1="6" text2={getPriceText({ karat: 6 })} />
            <Row text1="5" text2={getPriceText({ karat: 5 })} />
            <Row text1="4" text2={getPriceText({ karat: 4 })} />
            <Row text1="3" text2={getPriceText({ karat: 3 })} />
            <Row text1="2" text2={getPriceText({ karat: 2 })} />
            <Row text1="1" text2={getPriceText({ karat: 1 })} />
          </View>
        </ScrollView>
      </View>
      <View
        className=" px-2 py-4 flex-row gap-2 self-stretch"
        style={{ borderColor: colors.text, borderTopWidth: 3, marginTop: 16 }}
      >
        <TouchableOpacity
          className=" self-stretch px-2 py-3 justify-center items-center flex-1"
          style={{
            borderColor: colors.text,
            borderWidth: 3,
            borderRadius: 16,
          }}
          onPress={() => {
            setIsWeightModalVisible(true);
          }}
        >
          <Text
            style={{ color: colors.text, fontSize: 20 }}
            className=" text-center"
          >
            Unit:{" "}
            <Text style={{ color: colors.primary, fontWeight: "bold" }}>
              {weightUnitName}
            </Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className=" self-stretch px-2 py-3 justify-center items-center flex-1"
          style={{
            borderColor: colors.text,
            borderWidth: 3,
            borderRadius: 16,
          }}
          onPress={() => {
            setIsWeightModalVisible(true);
          }}
        >
          <Text
            style={{ color: colors.text, fontSize: 20 }}
            className=" text-center"
          >
            Unit:{" "}
            <Text style={{ color: colors.primary, fontWeight: "bold" }}>
              {weightUnitName}
            </Text>
          </Text>
        </TouchableOpacity>
      </View>

      <OptionsModal
        isVisible={isWeightModalVisible}
        setIsVisible={setIsWeightModalVisible}
        title={"Weight Unit"}
        options={WeightOptions}
        selectedKey={selectedWeightKey}
        setSelectedKey={setSelectedWeightKey}
      />
    </View>
  );
};

const Row = ({
  text1,
  text2,
  isHeader = false,
}: {
  text1: string;
  text2: string;
  isHeader?: boolean;
}) => {
  const colors = useColors();
  return (
    <View
      className=" self-stretch flex-row"
      style={{ borderWidth: 1, borderColor: colors.text }}
    >
      <Cell isHeader={isHeader} text={text1} />
      <Cell isHeader={isHeader} text={text2} />
    </View>
  );
};

const Cell = ({ isHeader, text }: { text: string; isHeader: boolean }) => {
  const colors = useColors();

  return (
    <View
      className=" flex-1 justify-center items-center self-stretch px-3 py-4"
      style={{ borderColor: colors.text, borderWidth: 1 }}
    >
      <Text
        style={{
          color: isHeader ? colors.primary : colors.text,
          fontSize: isHeader ? 36 : 24,
          fontWeight: isHeader ? 800 : 600,
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export default HomeScreen;
