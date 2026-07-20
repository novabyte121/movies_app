/**
 * Explaing (!):
 * expo env variable has a value and it's not undfined
 */

import { Client, ID, Query, TablesDB } from "react-native-appwrite";

const DATABASE_MOVIES_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_MOVIES_ID!;
const TABLE_METRICS_ID = process.env.EXPO_PUBLIC_APPWRITE_TABLE_METRIC_ID!;
const TABLE_SAVED_MOVIES_ID =
  process.env.EXPO_PUBLIC_APPWRITE_TABLE_SAVED_MOVIES_ID!;
const APPWRITE_ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!;
const APPWRITE_PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;

const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID);

const tableDB = new TablesDB(client);

export const updateSearchCounter = async (query: string, movie: Movie) => {
  try {
    const result = await tableDB.listRows(
      DATABASE_MOVIES_ID,
      TABLE_METRICS_ID,
      [Query.equal("movie_id", movie.id)],
    );

    if (result.rows.length > 0) {
      const exitingMovie = result.rows[0];

      await tableDB.updateRow(
        DATABASE_MOVIES_ID,
        TABLE_METRICS_ID,
        exitingMovie.$id,
        {
          count: exitingMovie.count + 1,
        },
      );
    } else {
      await tableDB.createRow(
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
    const result = await tableDB.listRows(
      DATABASE_MOVIES_ID,
      TABLE_METRICS_ID,
      [Query.limit(5), Query.orderDesc("count")],
    );

    return result.rows as unknown as TrendingMovie[];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const isMovieSaved = async (movie: MovieDetails): Promise<boolean> => {
  const result = await tableDB.listRows(
    DATABASE_MOVIES_ID,
    TABLE_SAVED_MOVIES_ID,
    [Query.equal("movie_id", movie.id)],
  );

  return result.rows.length > 0;
};

export const saveMovie = async (movie: MovieDetails): Promise<void> => {
  // console.log("Save Movie Called");

  try {
    const result = await tableDB.listRows(
      DATABASE_MOVIES_ID,
      TABLE_SAVED_MOVIES_ID,
      [Query.equal("movie_id", movie.id)],
    );
    if (result.rows.length === 0) {
      await tableDB.createRow(
        DATABASE_MOVIES_ID,
        TABLE_SAVED_MOVIES_ID,
        ID.unique(),
        {
          movie_id: movie.id,
          title: movie.title,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        },
      );
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const deleteSaveMovie = async (movie: MovieDetails): Promise<void> => {
  // console.log("Delete Save Movie Called");

  try {
    const result = await tableDB.listRows(
      DATABASE_MOVIES_ID,
      TABLE_SAVED_MOVIES_ID,
      [Query.equal("movie_id", movie.id)],
    );
    const exitigMovie = result.rows[0];
    if (result.rows.length > 0) {
      await tableDB.deleteRow(
        DATABASE_MOVIES_ID,
        TABLE_SAVED_MOVIES_ID,
        exitigMovie.$id,
      );
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getSavedMovies = async (): Promise<SavedMovies[]> => {
  try {
    const result = await tableDB.listRows(
      DATABASE_MOVIES_ID,
      TABLE_SAVED_MOVIES_ID,
    );
    return result.rows as unknown as SavedMovies[];
  } catch (err) {
    console.log(err);
    return [];
  }
};
