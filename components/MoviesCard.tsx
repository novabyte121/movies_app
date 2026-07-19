import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { icons } from "../constants/icons";

const MoviesCard = ({
  id,
  title,
  poster_path,
  vote_average,
  release_date,
}: Movie) => {
  return (
    <Link href={`/movie/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : `https://placeholder.co/600x400/1a1a1a/ffffff.png`,
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <View className="flex-1 justify-center items-center mt-2">
          <Text className="text-white font-bold text-[12px] text-center">
            {title}
          </Text>
          {/* <Text className="text-white font-bold">{vote_average}</Text>
          <Text className="text-white font-bold">{release_date}</Text> */}
          <View className="flex-row gap-1 mt-1">
            <Image source={icons.star} />
            <Text className="text-white font-bold text-[12px]">
              {vote_average.toFixed(1)}
            </Text>
          </View>
          <Text className="text-white font-semibold text-[12px]">
            {release_date}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MoviesCard;
