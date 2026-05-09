import { getGoldPriceQueryFn } from "@/api/goldApi";
import ErrorScreen from "@/components/ErrorScreen";
import OptionsModal from "@/components/Modals/OptionsModal";
import { Header } from "@/components/Views/Header/Header";
import { useColors } from "@/redux/slices/themeSlice/colorsHooks";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const HomeScreen = () => {
  const colors = useColors();

  const { data, status, error, isLoading, isFetching, refetch } = useQuery({
    queryFn: getGoldPriceQueryFn,
    queryKey: ["gold-price"],
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const fullPrice = data.price;

  const getPriceText = useCallback(
    ({ karat }: { karat: number }) => {
      return (
        data.currencySymbol + ((fullPrice * karat) / 24).toFixed(2).toString()
      );
    },
    [data.currencySymbol, fullPrice],
  );

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
        className=" px-2 py-4 "
        style={{ borderColor: colors.text, borderTopWidth: 3, marginTop: 16 }}
      >
        <TouchableOpacity
          className=" self-stretch px-4 py-3 justify-center items-center"
          style={{ borderColor: colors.text, borderWidth: 3, borderRadius: 16 }}
          onPress={() => {
            setIsModalVisible(true);
          }}
        >
          <Text style={{ color: colors.text, fontSize: 32 }}>
            Unit:{" "}
            <Text style={{ color: colors.primary, fontWeight: "bold" }}>
              Oz
            </Text>
          </Text>
        </TouchableOpacity>
      </View>

      <OptionsModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
      />

      <TouchableOpacity
        className=" self-stretch px-10 py-4"
        onPress={() => {
          console.log("Outer Pressed");
        }}
        style={{ borderRadius: 16, borderColor: colors.text, borderWidth: 1 }}
      >
        <Pressable
          className=" px-10 py-10 self-stretch"
          style={{
            borderColor: colors.text,
            backgroundColor: colors.primary,
            borderRadius: 16,
            //pointerEvents: "none",
          }}
          onPress={() => {
            console.log("Inner");
          }}
          //android_ripple={null}
          //touchSoundDisabled
          android_disableSound
        >
          <Text style={{ color: colors.text }}>Press</Text>
          <Button
            title="The button"
            onPress={() => {
              console.log("The button");
            }}
          />
        </Pressable>
      </TouchableOpacity>
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
