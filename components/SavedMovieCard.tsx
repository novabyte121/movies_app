import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

const SavedMovieCard = ({ movie_id, title, poster_url }: SavedMovies) => {
  return (
    <Link href={`/movie/${movie_id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_url
              ? `https://image.tmdb.org/t/p/w500${poster_url}`
              : `https://placeholder.co/600x400/1a1a1a/ffffff.png`,
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <View className="flex-1 justify-center items-center mt-2">
          <Text className="text-white font-bold text-[12px] text-center">
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default SavedMovieCard;
