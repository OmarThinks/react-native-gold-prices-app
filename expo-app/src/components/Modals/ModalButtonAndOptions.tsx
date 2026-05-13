import { useColors } from "@/redux/slices/themeSlice/colorsHooks";
import { OptionsType } from "@/types/OptionsType";
import { useState } from "react";
import { ViewStyle, Text, TouchableOpacity } from "react-native";
import OptionsModal from "./OptionsModal";

const ModalButtonAndOptions = <T,>({
  selectedKey,
  setSelectedKey,
  options,
  title,
  displayName,
  style,
}: {
  selectedKey: T;
  setSelectedKey: (key: T) => void;
  options: OptionsType<T>;
  title: string;
  displayName: string;
  style?: ViewStyle;
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const colors = useColors();

  return (
    <>
      <TouchableOpacity
        className=" self-stretch px-2 py-3 justify-center items-center flex-1"
        style={{
          borderColor: colors.text,
          borderWidth: 3,
          borderRadius: 16,
          ...style,
        }}
        onPress={() => {
          setIsModalVisible(true);
        }}
      >
        <Text
          style={{ color: colors.text, fontSize: 20 }}
          className=" text-center"
        >
          {title}:{" "}
          <Text style={{ color: colors.primary, fontWeight: "bold" }}>
            {displayName}
          </Text>
        </Text>
      </TouchableOpacity>
      <OptionsModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        title={title}
        options={options}
        selectedKey={selectedKey}
        setSelectedKey={setSelectedKey}
      />
    </>
  );
};

export default ModalButtonAndOptions;
