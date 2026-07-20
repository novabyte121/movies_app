import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { icons } from "../../../constants/icons";
import { fetchMovieDetails } from "../../../services/api";
import {
  deleteSaveMovie,
  isMovieSaved,
  saveMovie,
} from "../../../services/appwrite";
import useFetch from "../../../services/useFetch";

// Components

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col gap-y-2 mt-8">
    <Text className="text-gray-400">{label}</Text>
    <Text className="text-white font-normal text-base">{value}</Text>
  </View>
);

interface SaveBtnProps {
  movie: MovieDetails;
}

const SaveBtn = ({ movie }: SaveBtnProps) => {
  const [isSave, setIsSaved] = useState(false);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const checkSaved = async () => {
      const saved = await isMovieSaved(movie);
      setIsSaved(saved);
    };

    checkSaved();
  }, [movie]);

  const onClickSavedBtn = async () => {
    // console.log(movie);
    if (!movie) return;

    try {
      setSaving(true);

      const saved = await isMovieSaved(movie);

      if (saved) {
        await deleteSaveMovie(movie);
        setIsSaved(false);
      } else {
        await saveMovie(movie);
        setIsSaved(true);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={onClickSavedBtn} disabled={saving}>
        <Image
          source={isSave ? icons.saved : icons.save}
          className="size-7 mr-3"
        />
      </TouchableOpacity>
    </View>
  );
};

const MoviesDetails = () => {
  const { id } = useLocalSearchParams();

  const {
    data: movie,
    loading,
    refetch,
  } = useFetch(() => fetchMovieDetails(id as string));

  if (loading || !movie) {
    return (
      <View className="flex-1 bg-primary items-center justify-center">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View className="bg-primary flex-1">
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 80,
        }}
      >
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
          }}
          className="w-full h-[550px] bg-primary"
          resizeMode="stretch"
        />
        <View className="flex-col items-start justify-center pt-6 pl-3">
          <View className="items-center justify-between flex-row w-full">
            <Text className="text-white font-bold text-xl ">
              {movie?.title}
            </Text>
            <SaveBtn movie={movie} />
          </View>
          <View className="flex-row items-center gap-x-5 mt-4">
            <Text className="text-gray-400 font-medium text-sm">
              {movie?.release_date.split("-")[0]}
            </Text>
            <Text className="text-gray-400 font-medium text-sm">
              {movie?.runtime}m
            </Text>
          </View>
          <View className="bg-slate-800 gap-x-1 flex-row rounded-lg p-1 mt-4">
            <Image source={icons.star} />
            <Text className="text-white">
              {movie?.vote_average.toFixed(1)}
              <Text className="text-gray-400">/10</Text>
            </Text>
            <Text className="text-gray-400">({movie?.vote_count})</Text>
          </View>
          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={movie?.genres.map((g) => g.name).join(" - ")}
          />
          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={`$${movie?.budget / 1_000_000} million`}
            />
            <MovieInfo
              label="Revnue"
              value={`$${(movie?.revenue / 1_000_000).toFixed()} million`}
            />
          </View>
          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies.map((c) => c.name).join("  - ") ||
              "N/A"
            }
          />
        </View>

        <TouchableOpacity
          className="text-white bg-purple-600 flex flex-row gap-1 absolute bottom-4 left-0 right-0 mx-4 py-3.5 items-center justify-center rounded-xl"
          onPress={router.back}
        >
          <Image
            source={icons.arrow}
            className="w-6 h-6 text-white rotate-180"
            tintColor="#fff"
          />
          <Text className="text-white font-semibold">Go Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default MoviesDetails;
