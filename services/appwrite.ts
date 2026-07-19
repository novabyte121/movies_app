/**
 * Explaing (!):
 * expo env variable has a value and it's not undfined
 */

import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_MOVIES_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_MOVIES_ID!;
const TABLE_METRICS_ID = process.env.EXPO_PUBLIC_APPWRITE_TABLE_METRIC_ID!;
const APPWRITE_ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!;
const APPWRITE_PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;

const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID);

const database = new Databases(client);

export const updateSearchCounter = async (query: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(
      DATABASE_MOVIES_ID,
      TABLE_METRICS_ID,
      [Query.equal("movie_id", movie.id)],
    );

    if (result.documents.length > 0) {
      const exitingMovie = result.documents[0];

      await database.updateDocument(
        DATABASE_MOVIES_ID,
        TABLE_METRICS_ID,
        exitingMovie.$id,
        {
          count: exitingMovie.count + 1,
        },
      );
    } else {
      await database.createDocument(
        DATABASE_MOVIES_ID,
        TABLE_METRICS_ID,
        ID.unique(),
        {
          title: movie.title,
          searchTerm: query,
          movie_id: movie.id,
          count: 1,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        },
      );
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getTrendigMovies = async (): Promise<TrendingMovie[]> => {
  try {
    const result = await database.listDocuments(
      DATABASE_MOVIES_ID,
      TABLE_METRICS_ID,
      [Query.limit(5), Query.orderDesc("count")],
    );

    return result.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.log(error);
    return [];
  }
};
