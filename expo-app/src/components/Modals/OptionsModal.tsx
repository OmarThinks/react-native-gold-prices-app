import { View, Text, Modal, Button, TouchableOpacity } from "react-native";
import React from "react";
import { useColors } from "@/redux/slices/themeSlice/colorsHooks";

const OptionsModal1 = ({
  isVisible,
  setIsVisible,
}: {
  isVisible: boolean;
  setIsVisible: (newValue: boolean) => void;
}) => {
  const colors = useColors();
  return (
    <Modal
      visible={isVisible}
      style={{ backgroundColor: colors.background }}
      transparent
      /*onDismiss={() => {
        setIsVisible(false);
      }}*/
    >
      <View
        className=" justify-center items-center flex-1 self-stretch  "
        //style={{ width: 300, height: 300 }}
        style={{ backgroundColor: colors.background + "99" }}
      >
        <TouchableOpacity
          className=" self-stretch flex-1 absolute w-full h-full"
          style={{ zIndex: 1 }}
          onPress={() => {
            setIsVisible(false);
            console.log("Modal dismissed");
          }}
        />
        <TouchableOpacity
          //pointerEvents="none"
          className=" absolute"
          style={{
            zIndex: 3,
            pointerEvents: "none",
            backgroundColor: colors.background,
            position: "absolute",
          }}
          disabled
          onPress={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("stopped propagation");
          }}
        >
          <View className=" self-stretch flex-1">
            <Text style={{ color: colors.text }} className=" text-[48px] p-12">
              Yo
            </Text>
            <View>
              <Text style={{ color: colors.text }}>OptionsModal</Text>
            </View>
            <Button
              title="Close"
              onPress={() => {
                setIsVisible(false);
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const OptionsModal = ({
  isVisible,
  setIsVisible,
}: {
  isVisible: boolean;
  setIsVisible: (newValue: boolean) => void;
}) => {
  const colors = useColors();
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
        className=" justify-center items-center flex-1 self-stretch  "
        //style={{ width: 300, height: 300 }}
        style={{ backgroundColor: colors.background + "99" }}
        onPress={() => {
          console.log("Outer");
        }}
      >
        <TouchableOpacity
          //pointerEvents="none"
          style={{
            //pointerEvents: "none",
            backgroundColor: colors.background,
            //position: "absolute",
            width: "70%",
            height: "50%",
          }}
          //disabled
          onPress={(e) => {
            console.log("Inner");
          }}
        >
          <View className=" self-stretch flex-1">
            <Text style={{ color: colors.text }} className=" text-[48px] p-12">
              Yo
            </Text>
            <View>
              <Text style={{ color: colors.text }}>OptionsModal</Text>
            </View>
            <Button
              title="Close"
              onPress={() => {
                setIsVisible(false);
              }}
            />
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default OptionsModal;
