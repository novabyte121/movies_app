import { Image, TextInput, View } from "react-native";
import { icons } from "../constants/icons";

interface Props {
  onPress?: () => void;
  placeholder: string;
  onChangeText?: (item: string) => void;
  value?: string;
}

const SearchBar = ({ onPress, placeholder, onChangeText, value }: Props) => {
  return (
    <View className="flex-row items-center bg-slate-900 px-5 rounded-[8px] border-white border-[1px]">
      <Image source={icons.search} resizeMode="contain" tintColor="#ab8bff" />
      <TextInput
        onPress={onPress}
        onChangeText={onChangeText}
        placeholder={placeholder}
        value={value}
        placeholderTextColor="#a8b5db"
        className="flex-1 ml-2 text-white"
      />
    </View>
  );
};

export default SearchBar;
