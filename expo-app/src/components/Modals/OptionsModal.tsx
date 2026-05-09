import { useColors } from "@/redux/slices/themeSlice/colorsHooks";
import type { OptionsType, SingleOptionType } from "@/types/OptionsType";
import React from "react";
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

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
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
            >
              {title}
            </Text>
            <FlatList
              data={options}
              renderItem={({ item }) => (
                <DisplayOption<T>
                  option={item}
                  selectedKey={selectedKey}
                  setIsModalVisible={setIsVisible}
                  setSelectedKey={setSelectedKey}
                  key={item.id as string}
                />
              )}
              keyExtractor={(item) => item.id as string}
              ItemSeparatorComponent={() => <View className=" h-2" />}
            />
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

  const theColor = isSelected ? colors.primary : colors.border;

  return (
    <TouchableOpacity
      className=" self-stretch flex-row gap-3 items-center"
      onPress={() => {
        setSelectedKey(option.id);
        setIsModalVisible(false);
      }}
      style={{
        borderWidth: 2,
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 24,
        borderColor: theColor,
      }}
    >
      <RadioButton isSelected={isSelected} />
      <Text
        className=" flex-1"
        style={{
          color: isSelected ? colors.primary : colors.text,
          fontSize: 36,
          fontWeight: "semibold",
        }}
      >
        {option.title}
      </Text>
    </TouchableOpacity>
  );
};

const RadioButton = ({ isSelected }: { isSelected: boolean }) => {
  const colors = useColors();
  const size = 36;
  return (
    <View
      className=" justify-center items-center"
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderColor: isSelected ? colors.primary : colors.border,
        borderWidth: 2,
      }}
    >
      <View
        style={{
          width: size / 2,
          height: size / 2,
          backgroundColor: isSelected ? colors.primary : colors.transparent,
          borderRadius: size / 4,
        }}
      />
    </View>
  );
};

export default OptionsModal;
