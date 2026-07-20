import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { FlatList, Image, Text, View } from "react-native";
import SavedMovieCard from "../../../components/SavedMovieCard";
import { icons } from "../../../constants/icons";
import { getSavedMovies } from "../../../services/appwrite";
import useFetch from "../../../services/useFetch";

const Saved = () => {
  const { data: savedMovies, refetch, error } = useFetch(getSavedMovies);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );
  return (
    <View className="flex-1 bg-primary px-10">
      <View className="flex-1 w-full my-14">
        <FlatList
          data={savedMovies ?? []}
          renderItem={({ item }) => <SavedMovieCard {...item} />}
          keyExtractor={(item) => item.movie_id.toString()}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "flex-start",
            gap: 20,
            paddingRight: 5,
            marginBottom: 10,
            marginVertical: 16,
          }}
          className="mt-2 pb-32"
          ListHeaderComponent={
            <View className="flex justify-center items-center">
              <Image
                source={icons.saved}
                className="size-12"
                resizeMode="cover"
              />
              {error && (
                <View className="flex justify-center items-center">
                  <Text className="text-red-600 font-bold text-xl">
                    {error.message}
                  </Text>
                </View>
              )}
            </View>
          }
        />
      </View>
    </View>
  );
};

export default Saved;
