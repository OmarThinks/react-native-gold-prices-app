import React, { useRef } from "react";
import { Platform, View } from "react-native";
import {
  BannerAd as BannerAd_,
  BannerAdSize,
  TestIds,
  useForeground,
} from "react-native-google-mobile-ads";
const adUnitId = TestIds.ADAPTIVE_BANNER;

const BannerAd = () => {
  const bannerRef = useRef<BannerAd_>(null);

  useForeground(() => {
    Platform.OS === "ios" && bannerRef.current?.load();
  });

  return (
    <View className=" self-stretch justify-center items-center">
      <BannerAd_ ref={bannerRef} unitId={adUnitId} size={BannerAdSize.BANNER} />
    </View>
  );
};

export default BannerAd;
