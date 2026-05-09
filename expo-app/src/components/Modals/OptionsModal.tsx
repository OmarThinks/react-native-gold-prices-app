import { useColors } from "@/redux/slices/themeSlice/colorsHooks";
import React from "react";
import {
  Button,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import type { OptionsType, SingleOptionType } from "@/types/OptionsType";

const OptionsModal = <T,>({
  isVisible,
  setIsVisible,
  title,
  options,
  selectedKey,
  setSelectedKey,
}: {
  isVisible: boolean;
  setIsVisible: (newValue: boolean) => void;
  title: string;
  options: OptionsType<T>;
  selectedKey: T;
  setSelectedKey: (newKey: T) => void;
}) => {
  const colors = useColors();

  const { height: screenHeight } = useWindowDimensions();

  return (
    <Modal
      visible={isVisible}
      style={{ backgroundColor: colors.background }}
      transparent
      /*onDismiss={() => {
        setIsVisible(false);
      }}*/
    >
      <TouchableOpacity
        className=" justify-center items-center flex-1 self-stretch px-4  py-24"
        style={{ backgroundColor: colors.border + "99" }}
        onPress={() => {
          setIsVisible(false);
        }}
      >
        <View
          className=" self-stretch flex-1"
          style={{ maxHeight: screenHeight * 0.8 }}
        >
          <Pressable
            style={{
              backgroundColor: colors.background,
              borderRadius: 16,
              borderWidth: 2,
              borderColor: colors.border,
              flex: 1,
            }}
            className=" self-stretch"
            android_disableSound
          >
            <Text
              style={{
                color: colors.text,
                fontSize: 44,
                fontWeight: "bold",
                marginBottom: 12,
              }}
            >
              {title}
            </Text>
            <ScrollView className=" self-stretch flex-1">
              <View>
                <Text style={{ color: colors.text }}>OptionsModal</Text>
              </View>
              <Button
                title="Close"
                onPress={() => {
                  setIsVisible(false);
                }}
              />
            </ScrollView>
          </Pressable>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const DisplayOption = <T,>({
  option,
  selectedKey,
  setIsModalVisible,
  setSelectedKey,
}: {
  selectedKey: T;
  setSelectedKey: (newKey: T) => void;
  setIsModalVisible: (newValue: boolean) => void;
  option: SingleOptionType<T>;
}) => {
  const isSelected = selectedKey === option.id;
  const colors = useColors();

  return (
    <TouchableOpacity
      className=" self-stretch"
      onPress={() => {
        setSelectedKey(option.id);
        setIsModalVisible(false);
      }}
      style={{}}
    ></TouchableOpacity>
  );
};

const RadioButton = ({ isSelected }: { isSelected: boolean }) => {
  const colors = useColors();
  const size = 30;
  return (
    <View
      className=" justify-center items-center rounded-full"
      style={{
        width: size,
        height: size,
        borderRadius: 3,
        borderColor: isSelected ? colors.primary : colors.border,
      }}
    >
      <View
        className=" rounded-full"
        style={{
          width: size / 2,
          height: size / 2,
          backgroundColor: isSelected ? colors.primary : colors.transparent,
        }}
      />
    </View>
  );
};

export default OptionsModal;
