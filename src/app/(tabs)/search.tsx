import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import MoviesCard from "../../../components/MoviesCard";
import SearchBar from "../../../components/SearchBar";
import { icons } from "../../../constants/icons";
import { images } from "../../../constants/images";
import { fetchMovies } from "../../../services/api";
import { updateSearchCounter } from "../../../services/appwrite";
import useFetch from "../../../services/useFetch";

const Search = () => {
  const [searchQuery, setsearchQuery] = useState("");

  const {
    data: movies,
    loading,
    error,
    refetch: loadingMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  useEffect(() => {
    // updateSearchCounter(searchQuery, movies[0]);

    const timedId = setTimeout(async () => {
      if (searchQuery.trim()) {
        // Batman 1 => Batman%201
        await loadingMovies();
      } else {
        reset();
      }
    }, 1000);

    return () => clearTimeout(timedId);
  }, [searchQuery]);

  useEffect(() => {
    if (movies?.length > 0 && movies?.[0])
      updateSearchCounter(searchQuery, movies[0]);
  }, [movies]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />
      <FlatList
        data={movies ?? []}
        renderItem={({ item }) => <MoviesCard {...item} />}
        className="px-3"
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          marginVertical: 16,
          // marginBottom: 0,
        }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10 mb-2" />
            </View>
            <SearchBar
              placeholder="Search Movies..."
              value={searchQuery}
              onChangeText={(item) => setsearchQuery(item)}
            />

            {loading && <ActivityIndicator size="large" color="#0000ff" />}

            {error && (
              <Text className="text-red-600 text-xl text-center">
                Error: {error.message}
              </Text>
            )}

            {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
              <Text className="text-xl text-white font-bold mt-5 mb-2">
                Results of{" "}
                <Text className="text-indigo-600">{searchQuery}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 px-5">
              <Text className="text-gray-500 text-sm font-bold text-center">
                {searchQuery.trim() ? "No movies found" : "Search for a movie"}
              </Text>
            </View>
          ) : null
        }
        contentContainerStyle={{
          paddingBottom: 80,
        }}
      />
    </View>
  );
};

export default Search;
