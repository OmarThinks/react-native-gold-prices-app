import { View, Text, Modal, Button } from "react-native";
import React from "react";

const OptionsModal = ({
  isVisible,
  setIsVisible,
}: {
  isVisible: boolean;
  setIsVisible: (newValue: boolean) => void;
}) => {
  return (
    <Modal visible={isVisible}>
      <View>
        <Text>OptionsModal</Text>
      </View>
      <Button
        title="Close"
        onPress={() => {
          setIsVisible(false);
        }}
      />
    </Modal>
  );
};

export default OptionsModal;
