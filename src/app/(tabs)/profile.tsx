import * as Linking from "expo-linking";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { icons } from "../../../constants/icons";

interface LinkedProps {
  title: string;
  icon: Object;
  url: string;
}

const Linked = ({ title, icon, url }: LinkedProps) => {
  const onClickFunc = () => {
    Linking.openURL(url);
  };

  return (
    <TouchableOpacity
      className="bg-purple-400 rounded-xl mx-5 flex flex-row w-full gap-4 items-center justify-center py-2"
      onPress={onClickFunc}
    >
      <Text className="text-white font-semibold text-base">{title}</Text>
      <Image source={icon} className="size-6" />
    </TouchableOpacity>
  );
};

const Profile = () => {
  return (
    <View className="flex-1 bg-primary px-6">
      <View className="flex items-center mt-14 flex-col">
        <Image source={icons.person} className="size-12" tintColor="#fff" />
        <View className="flex-col gap-5">
          <View className="flex-1 justify-start mt-12 gap-6 items-center">
            <Text className="text-white text-xl font-semibold text-center">
              Omar Salah
            </Text>
            <Text className="text-white text-3xl text-center font-bold">
              Who Am I ?
            </Text>
            <Text className="text-purple-500 text-xl font-bold text-center">
              Mobile Application Developer Cross-Platform{" "}
              <Text className="text-blue-400">(React Native)</Text>
            </Text>
            <Text className="text-white font-semibold">Version 1.0.0</Text>
            <Linked
              title="Github"
              icon={icons.github}
              url="https://github.com/novabyte121"
            />
            <Linked
              title="WhatsApp"
              icon={icons.whatsapp}
              url="https://wa.me/+201020790825"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Profile;
