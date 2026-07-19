import { Image, Text, View } from "react-native";
import { icons } from "../../../constants/icons";

const Saved = () => {
  return (
    <View className="flex-1 bg-primary px-10">
      <View className="flex-1 justify-center items-center flex-col gap-5">
        <Image source={icons.save} className="size-8" tintColor="#fff" />
        <Text className="text-gray-500 text-base">Saved</Text>
      </View>
    </View>
  );
};

export default Saved;
