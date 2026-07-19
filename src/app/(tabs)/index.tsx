import { useRouter } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import MoviesCard from "../../../components/MoviesCard";
import SearchBar from "../../../components/SearchBar";
import TrendingCard from "../../../components/TrendingCard";
import { icons } from "../../../constants/icons";
import { images } from "../../../constants/images";
import { fetchMovies } from "../../../services/api";
import { getTrendigMovies } from "../../../services/appwrite";
import useFetch from "../../../services/useFetch";
import "../globals.css";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendigMovies);

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() =>
    fetchMovies({
      query: "",
    }),
  );
  useEffect(() => {
    console.log("Home Mounted");

    return () => {
      console.log("Home Unmounted");
    };
  }, []);
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="w-full h-full absolute z-0" />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}
      >
        <Image
          source={icons.logo}
          className="w-12 h-10 mt-20 mb-5 mx-auto px-5"
        />

        {moviesLoading || trendingLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-20 self-center"
          />
        ) : moviesError || trendingError ? (
          <Text>{moviesError?.message || trendingError?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search a movie"
            />
            <>
              {trendingMovies && (
                <View className="mt-2">
                  <Text className="text-white text-lg font-bold mt-5 mb-3">
                    Trending Movies
                  </Text>
                  <FlatList
                    data={trendingMovies ?? []}
                    renderItem={({ item, index }) => (
                      <TrendingCard movie={item} index={index} />
                    )}
                    keyExtractor={(item) => item.movie_id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
              )}
              <Text className="text-white text-lg font-bold mt-5 mb-3">
                Latest Movies
              </Text>

              <FlatList
                scrollEnabled={false}
                data={movies ?? []}
                renderItem={({ item }) => <MoviesCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "space-between",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                  marginVertical: 16,
                }}
                className="mt-2 pb-32"
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
