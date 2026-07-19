import { Tabs } from "expo-router";
import { Image, ImageBackground, Text, View } from "react-native";
import { icons } from "../../../constants/icons";
import { images } from "../../../constants/images";
import "../globals.css";

const TabIcon = ({ title, icon, focused }: any) => {
  if (focused) {
    return (
      <>
        <ImageBackground
          source={images.highlight}
          className="flex flex-row w-full min-w-[115px] min-h-14 mt-2 rounded-full justify-center items-center overflow-hidden"
        >
          <Image source={icon} tintColor="#151312" className="size-5" />
          <Text className="font-semibold ml-2">{title}</Text>
        </ImageBackground>
      </>
    );
  } else {
    return (
      <View className="size-full justify-center items-center mt-2 rounded-full">
        <Image source={icon} tintColor="#A8B5DB" className="size-5" />
      </View>
    );
  }
};

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          height: 48,
          backgroundColor: "#0f0d23",
          marginHorizontal: 10,
          marginBottom: 30,
          borderRadius: 50,
          borderWidth: 1,
          borderColor: "#0f0d32",
          overflow: "hidden",
          position: "absolute",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon title="Home" icon={icons.home} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon title="Search" icon={icons.search} focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon title="Saved" icon={icons.save} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon title="Profile" icon={icons.person} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
