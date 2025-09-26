import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import iptvApi from "../config/axios";

export const getRandomMovies = createAsyncThunk(
  "movies/getRandomMovies",
  async ({
    searchParams = {},
    page = 1,
    limit = 10,
  }: {
    searchParams?: any;
    page?: number;
    limit?: number;
  }) => {
    const result = await iptvApi.get(
      `${
        import.meta.env.VITE_BASE_URL
      }/random-movie-list?page=${page}&limit=${limit}`,
      searchParams
    );
    return result?.data;
  }
);

export const getSuggestedMovies = createAsyncThunk(
  "movies/getSuggestedMovies",
  async ({
    searchParams = {},
    page = 1,
    limit = 10,
  }: {
    searchParams?: any;
    page?: number;
    limit?: number;
  }) => {
    const result = await iptvApi.get(
      `${
        import.meta.env.VITE_BASE_URL
      }/suggested-movies?page=${page}&limit=${limit}`,
      searchParams
    );
    return result?.data;
  }
);

export const getTrendingMovies = createAsyncThunk(
  "movies/getTrendingMovies",
  async ({
    searchParams = {},
    page = 1,
    limit = 10,
  }: {
    searchParams?: any;
    page?: number;
    limit?: number;
  }) => {
    const result = await iptvApi.get(
      `${
        import.meta.env.VITE_BASE_URL
      }/trending-movie-list?page=${page}&limit=${limit}`,
      searchParams
    );
    return result?.data;
  }
);

export const getTrendingSeries = createAsyncThunk(
  "movies/getTrendingSeries",
  async ({
    searchParams = {},
    page = 1,
    limit = 10,
  }: {
    searchParams?: any;
    page?: number;
    limit?: number;
  }) => {
    const result = await iptvApi.get(
      `${
        import.meta.env.VITE_BASE_URL
      }/trending-serie-list?page=${page}&limit=${limit}`,
      searchParams
    );
    return result?.data;
  }
);

export const getNewArrivalMovies = createAsyncThunk(
  "movies/getNewArrivalMovies",
  async ({
    searchParams = {},
    page = 1,
    limit = 10,
  }: {
    searchParams?: any;
    page?: number;
    limit?: number;
  }) => {
    const result = await iptvApi.get(
      `${
        import.meta.env.VITE_BASE_URL
      }/new-movie-list?page=${page}&limit=${limit}`,
      searchParams
    );
    return result?.data;
  }
);

export const getOriginMovies = createAsyncThunk(
  "movies/getOriginMovies",
  async ({
    searchParams = {},
    page = 1,
    limit = 10,
    origin_id = null,
  }: {
    searchParams?: any;
    page?: number;
    limit?: number;
    origin_id?: any;
  }) => {
    const result = await iptvApi.get(
      `${
        import.meta.env.VITE_BASE_URL
      }/movie-by-origin?origin_id=${origin_id}&page=${page}&limit=${limit}`,
      searchParams
    );
    return result?.data;
  }
);

export const getGenreMovies = createAsyncThunk(
  "movies/getGenreMovies",
  async ({
    searchParams = {},
    page = 1,
    limit = 10,
    genre_id = null,
  }: {
    searchParams?: any;
    page?: number;
    limit?: number;
    genre_id?: any;
  }) => {
    const result = await iptvApi.get(
      `${
        import.meta.env.VITE_BASE_URL
      }/movie-by-genre?genre_id=${genre_id}&page=${page}&limit=${limit}`,
      searchParams
    );
    return result?.data;
  }
);

export const getLanguageMovies = createAsyncThunk(
  "movies/getLanguageMovies",
  async ({
    searchParams = {},
    page = 1,
    limit = 10,
    language_id = null,
  }: {
    searchParams?: any;
    page?: number;
    limit?: number;
    language_id?: any;
  }) => {
    const result = await iptvApi.get(
      `${
        import.meta.env.VITE_BASE_URL
      }/movie-by-language?language_id=${language_id}&page=${page}&limit=${limit}`,
      searchParams
    );
    return result?.data;
  }
);

export const getTagMovies = createAsyncThunk(
  "movies/getTagMovies",
  async ({
    searchParams = {},
    page = 1,
    limit = 10,
    tag_id = null,
  }: {
    searchParams?: any;
    page?: number;
    limit?: number;
    tag_id?: any;
  }) => {
    const result = await iptvApi.get(
      `${
        import.meta.env.VITE_BASE_URL
      }/movie-by-tag?tag_id=${tag_id}&page=${page}&limit=${limit}`,
      searchParams
    );
    return result?.data;
  }
);

export const getMovieHomeLayout = createAsyncThunk(
  "movies/getMovieHomeLayout",
  async () => {
    const result = await iptvApi.get(
      `${import.meta.env.VITE_BASE_URL}/movie-home-layout`
    );
    return result?.data;
  }
);

export const getTvSeries = createAsyncThunk(
  "movies/getTvSeries",
  async ({
    searchParams = {},
    page = 1,
    limit = 10,
  }: {
    searchParams?: any;
    page?: number;
    limit?: number;
  }) => {
    const result = await iptvApi.get(
      `${
        import.meta.env.VITE_BASE_URL
      }/random-serie-list?page=${page}&limit=${limit}`,
      searchParams
    );
    return result?.data;
  }
);

export const getSuggestedSeries = createAsyncThunk(
  "movies/getSuggestedSeries",
  async ({
    searchParams = {},
    page = 1,
    limit = 10,
  }: {
    searchParams?: any;
    page?: number;
    limit?: number;
  }) => {
    const result = await iptvApi.get(
      `${
        import.meta.env.VITE_BASE_URL
      }/suggested-series?page=${page}&limit=${limit}`,
      searchParams
    );
    return result?.data;
  }
);

export const getNewArrivalSeries = createAsyncThunk(
  "movies/getNewArrivalSeries",
  async ({
    searchParams = {},
    page = 1,
    limit = 10,
  }: {
    searchParams?: any;
    page?: number;
    limit?: number;
  }) => {
    const result = await iptvApi.get(
      `${
        import.meta.env.VITE_BASE_URL
      }/new-serie-list?page=${page}&limit=${limit}`,
      searchParams
    );
    return result?.data;
  }
);


export const getOriginSeries = createAsyncThunk(
  "movies/getOriginSeries",
  async ({
    searchParams = {},
    page = 1,
    limit = 10,
    origin_id = null,
  }: {
    searchParams?: any;
    page?: number;
    limit?: number;
    origin_id?: any;
  }) => {
    const result = await iptvApi.get(
      `${
        import.meta.env.VITE_BASE_URL
      }/serie-by-origin?origin_id=${origin_id}&page=${page}&limit=${limit}`,
      searchParams
    );
    return result?.data;
  }
);

export const getGenreSeries = createAsyncThunk(
  "movies/getGenreSeries",
  async ({
    searchParams = {},
    page = 1,
    limit = 10,
    genre_id = null,
  }: {
    searchParams?: any;
    page?: number;
    limit?: number;
    genre_id?: any;
  }) => {
    const result = await iptvApi.get(
      `${
        import.meta.env.VITE_BASE_URL
      }/serie-by-genre?genre_id=${genre_id}&page=${page}&limit=${limit}`,
      searchParams
    );
    return result?.data;
  }
);

export const getLanguageSeries = createAsyncThunk(
  "movies/getLanguageSeries",
  async ({
    searchParams = {},
    page = 1,
    limit = 10,
    language_id = null,
  }: {
    searchParams?: any;
    page?: number;
    limit?: number;
    language_id?: any;
  }) => {
    const result = await iptvApi.get(
      `${
        import.meta.env.VITE_BASE_URL
      }/serie-by-language?language_id=${language_id}&page=${page}&limit=${limit}`,
      searchParams
    );
    return result?.data;
  }
);

export const getTagSeries = createAsyncThunk(
  "movies/getTagSeries",
  async ({
    searchParams = {},
    page = 1,
    limit = 10,
    tag_id = null,
  }: {
    searchParams?: any;
    page?: number;
    limit?: number;
    tag_id?: any;
  }) => {
    const result = await iptvApi.get(
      `${
        import.meta.env.VITE_BASE_URL
      }/serie-by-tag?origin_id=${tag_id}&page=${page}&limit=${limit}`,
      searchParams
    );
    return result?.data;
  }
);

export const getSerieHomeLayout = createAsyncThunk(
  "movies/getSerieHomeLayout",
  async () => {
    const result = await iptvApi.get(
      `${import.meta.env.VITE_BASE_URL}/serie-home-layout`
    );
    return result?.data;
  }
);

export const getTvChannels = createAsyncThunk(
  "movies/getTvChannels",
  async ({
    searchParams = {},
    page = 1,
    limit = 10,
  }: {
    searchParams?: any;
    page?: number;
    limit?: number;
  }) => {
    const result = await iptvApi.get(
      `${
        import.meta.env.VITE_BASE_URL
      }/channel-list?page=${page}&limit=${limit}`,
      searchParams
    );
    return result?.data;
  }
);

export const getMovieDetail = createAsyncThunk<PayloadAction, any>(
  "movies/getMovieDetail",
  async (id) => {
    const result = await iptvApi.get(
      `${import.meta.env.VITE_BASE_URL}/movie-detail/${id}`
    );
    return result.data;
  }
);

export const getSerieDetail = createAsyncThunk<PayloadAction, any>(
  "movies/getSerieDetail",
  async (id) => {
    const result = await iptvApi.get(
      `${import.meta.env.VITE_BASE_URL}/serie-detail/${id}`
    );
    return result.data;
  }
);

export const getEpisodeDetail = createAsyncThunk<PayloadAction, any>(
  "movies/getEpisodeDetail",
  async (id) => {
    const result = await iptvApi.get(
      `${import.meta.env.VITE_BASE_URL}/episode-detail/${id}`
    );
    return result.data;
  }
);

export const getOrigins = createAsyncThunk("movies/getOrigins", async () => {
  const result = await iptvApi.get(`${import.meta.env.VITE_BASE_URL}/origins`);
  return result.data.data;
});

export const savedMovies = createAsyncThunk(
  "movies/savedMovies",
  async ({
    searchParams = {},
    page = 1,
    limit = 10,
  }: {
    searchParams?: any;
    page?: number;
    limit?: number;
  }) => {
    const result = await iptvApi.get(
      `${import.meta.env.VITE_BASE_URL}/saved-movie-list?page=${page}&limit=${limit}`,
      searchParams
    );
    return result.data.data;
  }
);

export const storeMovie = createAsyncThunk<PayloadAction, any>(
  "movies/storeMovie",
  async (payload) => {
    const result = await iptvApi.post(
      `${import.meta.env.VITE_BASE_URL}/store-movie`,
      payload
    );
    return result.data.data;
  }
);

export const deleteSavedMovie = createAsyncThunk(
  "movies/deleteSavedMovie",
  async (id) => {
    const result = await iptvApi.get(
      `${import.meta.env.VITE_BASE_URL}/delete-movie/${id}`
    );
    return result.data.data;
  }
);

export const savedSeries = createAsyncThunk(
  "movies/savedSeries",
  async ({
    searchParams = {},
    page = 1,
    limit = 10,
  }: {
    searchParams?: any;
    page?: number;
    limit?: number;
  }) => {
    const result = await iptvApi.get(
      `${import.meta.env.VITE_BASE_URL}/saved-serie-list?page=${page}&limit=${limit}`,
      searchParams
    );
    return result.data.data;
  }
);

export const storeSerie = createAsyncThunk<PayloadAction, any>(
  "movies/storeSerie",
  async (payload) => {
    const result = await iptvApi.post(
      `${import.meta.env.VITE_BASE_URL}/store-serie`,
      payload
    );
    return result.data.data;
  }
);

export const deleteSavedSerie = createAsyncThunk(
  "movies/deleteSavedSerie",
  async (id) => {
    const result = await iptvApi.get(
      `${import.meta.env.VITE_BASE_URL}/delete-serie/${id}`
    );
    return result.data.data;
  }
);

export const watchingMovies = createAsyncThunk(
  "movies/watchingMovies",
  async ({ searchParams = {}, page = 1, limit = 10 }: any = {}) => {
    const result = await iptvApi.get(
      `${import.meta.env.VITE_BASE_URL}/watched-movie-list?page=${page}&limit=${limit}`,
      searchParams
    );
    return result.data.data;
  }
);

export const watchingSeries = createAsyncThunk(
  "movies/watchingSeries",
  async ({ searchParams = {}, page = 1, limit = 10 }: any = {}) => {
    const result = await iptvApi.get(
      `${import.meta.env.VITE_BASE_URL}/watched-serie-list?page=${page}&limit=${limit}`,
      searchParams
    );
    return result.data.data;
  }
);

export const storeWatchingMovie = createAsyncThunk<PayloadAction, any>(
  "movies/storeWatchingMovie",
  async (payload) => {
    const result = await iptvApi.post(
      `${import.meta.env.VITE_BASE_URL}/store-watched-movie`,
      payload
    );
    return result.data.data;
  }
);

export const storeWatchedSerie = createAsyncThunk<PayloadAction, any>(
  "movies/storeWatchedSerie",
  async (payload) => {
    const result = await iptvApi.post(
      `${import.meta.env.VITE_BASE_URL}/store-watched-serie`,
      payload
    );
    return result.data.data;
  }
);

export const storeWatchedMovie = createAsyncThunk<PayloadAction, any>(
  "movies/storeWatchedMovie",
  async (payload) => {
    const result = await iptvApi.post(
      `${import.meta.env.VITE_BASE_URL}/store-watched-movie`,
      payload
    );
    return result.data.data;
  }
);

export const deleteWatchingMovie = createAsyncThunk<PayloadAction, any>(
  "movies/deleteWatchingMovie",
  async (payload) => {
    const result = await iptvApi.get(
      `${import.meta.env.VITE_BASE_URL}/end-watched-movie`,
      payload
    );
    return result.data.data;
  }
);

interface MoviesState {
  random_movies: any[];
  suggested_movies: any[];
  trending_movies: any[];
  trending_series: any[];
  new_arrival_movies: any[];
  all_movies: any[];
  tv_series: any[];
  suggested_series: any[];
  new_arrival_series: any[];
  tv_channels: any[];
  origins: any[];
  origins_movies: object;
  genres_movies: object;
  languages_movies: object;
  tags_movies: object;
  origins_series: object,
  genres_series: object,
  languages_series: object,
  tags_series: object,
  saved_movies: any[];
  saved_series: any[];
  watching_movies: any[];
  watching_series: any[];
  movie_home_layout: any[];
  serie_home_layout: any[];
  movie_detail: object;
  serie_detail: object;
  episode_detail: object;
  current_watching_episode: object;
  loading: boolean;
  error: boolean;
  // Pagination state for infinite scroll
  movies_pagination: {
    current_page: number;
    total_pages: number;
    total_items: number;
    has_more: boolean;
  };
  series_pagination: {
    current_page: number;
    total_pages: number;
    total_items: number;
    has_more: boolean;
  };
  saved_movies_pagination: {
    current_page: number;
    total_pages: number;
    total_items: number;
    has_more: boolean;
  };
  saved_series_pagination: {
    current_page: number;
    total_pages: number;
    total_items: number;
    has_more: boolean;
  };
  watching_movies_pagination: {
    current_page: number;
    total_pages: number;
    total_items: number;
    has_more: boolean;
  };
  watching_series_pagination: {
    current_page: number;
    total_pages: number;
    total_items: number;
    has_more: boolean;
  };
  // Additional pagination states for different movie/series lists
  trending_movies_pagination: {
    current_page: number;
    total_pages: number;
    total_items: number;
    has_more: boolean;
  };
  new_arrival_movies_pagination: {
    current_page: number;
    total_pages: number;
    total_items: number;
    has_more: boolean;
  };
  suggested_movies_pagination: {
    current_page: number;
    total_pages: number;
    total_items: number;
    has_more: boolean;
  };
  trending_series_pagination: {
    current_page: number;
    total_pages: number;
    total_items: number;
    has_more: boolean;
  };
  new_arrival_series_pagination: {
    current_page: number;
    total_pages: number;
    total_items: number;
    has_more: boolean;
  };
  suggested_series_pagination: {
    current_page: number;
    total_pages: number;
    total_items: number;
    has_more: boolean;
  };
}

const initialState: MoviesState = {
  random_movies: [],
  suggested_movies: [],
  trending_movies: [],
  trending_series: [],
  new_arrival_movies: [],
  all_movies: [],
  tv_series: [],
  suggested_series: [],
  new_arrival_series: [],
  tv_channels: [],
  origins: [],
  origins_movies: {},
  genres_movies: {},
  languages_movies: {},
  tags_movies: {},
  origins_series: {},
  genres_series: {},
  languages_series: {},
  tags_series: {},
  saved_movies: [],
  saved_series: [],
  watching_movies: [],
  watching_series: [],
  movie_home_layout: [],
  serie_home_layout: [],
  movie_detail: {},
  serie_detail: {},
  episode_detail: {},
  current_watching_episode: {},
  loading: false,
  error: false,
  // Pagination state for infinite scroll
  movies_pagination: {
    current_page: 1,
    total_pages: 1,
    total_items: 0,
    has_more: false,
  },
  series_pagination: {
    current_page: 1,
    total_pages: 1,
    total_items: 0,
    has_more: false,
  },
  saved_movies_pagination: {
    current_page: 1,
    total_pages: 1,
    total_items: 0,
    has_more: false,
  },
  saved_series_pagination: {
    current_page: 1,
    total_pages: 1,
    total_items: 0,
    has_more: false,
  },
  watching_movies_pagination: {
    current_page: 1,
    total_pages: 1,
    total_items: 0,
    has_more: false,
  },
  watching_series_pagination: {
    current_page: 1,
    total_pages: 1,
    total_items: 0,
    has_more: false,
  },
  // Additional pagination states for different movie/series lists
  trending_movies_pagination: {
    current_page: 1,
    total_pages: 1,
    total_items: 0,
    has_more: false,
  },
  new_arrival_movies_pagination: {
    current_page: 1,
    total_pages: 1,
    total_items: 0,
    has_more: false,
  },
  suggested_movies_pagination: {
    current_page: 1,
    total_pages: 1,
    total_items: 0,
    has_more: false,
  },
  trending_series_pagination: {
    current_page: 1,
    total_pages: 1,
    total_items: 0,
    has_more: false,
  },
  new_arrival_series_pagination: {
    current_page: 1,
    total_pages: 1,
    total_items: 0,
    has_more: false,
  },
  suggested_series_pagination: {
    current_page: 1,
    total_pages: 1,
    total_items: 0,
    has_more: false,
  },
};

const MoviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    clearMovieDetail: (state) => {
      state.movie_detail = {};
    },
    clearSerieDetail: (state) => {
      state.serie_detail = {};
    },
    clearAllDetails: (state) => {
      state.movie_detail = {};
      state.serie_detail = {};
      state.episode_detail = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRandomMovies.fulfilled, (state, action: any) => {
      state.random_movies = action.payload.data.random_movie;
      state.loading = false;
    });
    builder.addCase(getRandomMovies.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getRandomMovies.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(getSuggestedMovies.fulfilled, (state, action: any) => {
      const suggestedMovies = action.payload.data.suggest_movies || [];
      const total = action.payload.data.total || 0;
      const currentPage = action.meta.arg.page || 1;
      const limit = action.meta.arg.limit || 10;
      const totalPages = Math.ceil(total / limit);

      if (currentPage === 1) {
        state.suggested_movies = suggestedMovies;
      } else {
        state.suggested_movies = [...state.suggested_movies, ...suggestedMovies];
      }

      state.suggested_movies_pagination = {
        current_page: currentPage,
        total_pages: totalPages,
        total_items: total,
        has_more: currentPage < totalPages,
      };
      state.loading = false;
    });
    builder.addCase(getSuggestedMovies.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getSuggestedMovies.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(getTrendingMovies.fulfilled, (state, action: any) => {
      const trendingMovies = action.payload.data.trending_movies || [];
      const total = action.payload.data.total || 0;
      const currentPage = action.meta.arg.page || 1;
      const limit = action.meta.arg.limit || 10;
      const totalPages = Math.ceil(total / limit);

      if (currentPage === 1) {
        state.trending_movies = trendingMovies;
      } else {
        state.trending_movies = [...state.trending_movies, ...trendingMovies];
      }

      state.trending_movies_pagination = {
        current_page: currentPage,
        total_pages: totalPages,
        total_items: total,
        has_more: currentPage < totalPages,
      };
      state.loading = false;
    });
    builder.addCase(getTrendingMovies.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getTrendingMovies.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(getTrendingSeries.fulfilled, (state, action: any) => {
      const trendingSeries = action.payload.data.trending_series || [];
      const currentPage = action.meta.arg.page || 1;
      // const limit = action.meta.arg.limit || 10;
      
      // Since the API doesn't return pagination info, we'll assume it's the first page
      // and set has_more to false for now (can be updated if pagination is added later)
      const total = trendingSeries.length;
      const totalPages = 1; // Assuming single page for now

      if (currentPage === 1) {
        state.trending_series = trendingSeries;
      } else {
        state.trending_series = [...state.trending_series, ...trendingSeries];
      }

      state.trending_series_pagination = {
        current_page: currentPage,
        total_pages: totalPages,
        total_items: total,
        has_more: false, // Set to false since API doesn't provide pagination info
      };
      state.loading = false;
    });
    builder.addCase(getTrendingSeries.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getTrendingSeries.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(getNewArrivalMovies.fulfilled, (state, action: any) => {
      const newArrivalMovies = action.payload.data.new_movies || [];
      const total = action.payload.data.total || 0;
      const currentPage = action.meta.arg.page || 1;
      const limit = action.meta.arg.limit || 10;
      const totalPages = Math.ceil(total / limit);

      if (currentPage === 1) {
        state.new_arrival_movies = newArrivalMovies;
      } else {
        state.new_arrival_movies = [...state.new_arrival_movies, ...newArrivalMovies];
      }

      state.new_arrival_movies_pagination = {
        current_page: currentPage,
        total_pages: totalPages,
        total_items: total,
        has_more: currentPage < totalPages,
      };
      state.loading = false;
    });
    builder.addCase(getNewArrivalMovies.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getNewArrivalMovies.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(getOriginMovies.fulfilled, (state, action: any) => {
      const responseData = action.payload.data;
      const movies = responseData.movies;
      const total = responseData.total || 0;
      const currentPage = action.meta.arg.page || 1;
      const limit = action.meta.arg.limit || 10;
      
      // Calculate total pages based on total items and limit
      const totalPages = Math.ceil(total / limit);
      
      // If it's the first page, replace the data
      if (currentPage === 1) {
        state.origins_movies = responseData;
      } else {
        // For subsequent pages, append the data (only if movies is not null)
        if (movies !== null) {
          const currentMovies = state.origins_movies as any;
          Object.keys(movies).forEach(category => {
            if (currentMovies.movies && currentMovies.movies[category]) {
              currentMovies.movies[category] = [...currentMovies.movies[category], ...movies[category]];
            } else if (currentMovies.movies) {
              currentMovies.movies[category] = movies[category];
            }
          });
        }
      }
      
      // Update pagination state
      state.movies_pagination = {
        current_page: currentPage,
        total_pages: totalPages,
        total_items: total,
        has_more: currentPage < totalPages,
      };
      
      state.loading = false;
    });
    builder.addCase(getOriginMovies.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getOriginMovies.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(getGenreMovies.fulfilled, (state, action: any) => {
      state.genres_movies = action.payload.data.movies;
      state.loading = false;
    });
    builder.addCase(getGenreMovies.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getGenreMovies.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(getLanguageMovies.fulfilled, (state, action: any) => {
      state.languages_movies = action.payload.data.movies;
      state.loading = false;
    });
    builder.addCase(getLanguageMovies.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getLanguageMovies.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(getTagMovies.fulfilled, (state, action: any) => {
      state.tags_movies = action.payload.data.movies;
      state.loading = false;
    });
    builder.addCase(getTagMovies.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getTagMovies.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(getMovieHomeLayout.fulfilled, (state, action: any) => {
      state.movie_home_layout = action.payload.data.layout;
      state.loading = false;
    });
    builder.addCase(getMovieHomeLayout.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getMovieHomeLayout.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(getSerieHomeLayout.fulfilled, (state, action: any) => {
      state.serie_home_layout = action.payload.data.layout;
      state.loading = false;
    });
    builder.addCase(getSerieHomeLayout.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getSerieHomeLayout.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(getTvSeries.fulfilled, (state, action: any) => {
      const tvSeries = action.payload.data.random_serie || [];
      const total = action.payload.data.total || 0;
      const currentPage = action.meta.arg.page || 1;
      const limit = action.meta.arg.limit || 10;
      const totalPages = Math.ceil(total / limit);

      if (currentPage === 1) {
        state.tv_series = tvSeries;
      } else {
        state.tv_series = [...state.tv_series, ...tvSeries];
      }

      state.series_pagination = {
        current_page: currentPage,
        total_pages: totalPages,
        total_items: total,
        has_more: currentPage < totalPages,
      };
      state.loading = false;
    });
    builder.addCase(getTvSeries.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getTvSeries.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(getSuggestedSeries.fulfilled, (state, action: any) => {
      const suggestedSeries = action.payload.data.suggest_series || [];
      const total = action.payload.data.total || 0;
      const currentPage = action.meta.arg.page || 1;
      const limit = action.meta.arg.limit || 10;
      const totalPages = Math.ceil(total / limit);

      if (currentPage === 1) {
        state.suggested_series = suggestedSeries;
      } else {
        state.suggested_series = [...state.suggested_series, ...suggestedSeries];
      }

      state.suggested_series_pagination = {
        current_page: currentPage,
        total_pages: totalPages,
        total_items: total,
        has_more: currentPage < totalPages,
      };
      state.loading = false;
    });
    builder.addCase(getSuggestedSeries.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getSuggestedSeries.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(getNewArrivalSeries.fulfilled, (state, action: any) => {
      const newArrivalSeries = action.payload.data.new_series || [];
      const total = action.payload.data.total || 0;
      const currentPage = action.meta.arg.page || 1;
      const limit = action.meta.arg.limit || 10;
      const totalPages = Math.ceil(total / limit);

      if (currentPage === 1) {
        state.new_arrival_series = newArrivalSeries;
      } else {
        state.new_arrival_series = [...state.new_arrival_series, ...newArrivalSeries];
      }

      state.new_arrival_series_pagination = {
        current_page: currentPage,
        total_pages: totalPages,
        total_items: total,
        has_more: currentPage < totalPages,
      };
      state.loading = false;
    });
    builder.addCase(getNewArrivalSeries.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getNewArrivalSeries.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(getOriginSeries.fulfilled, (state, action: any) => {
      const responseData = action.payload.data;
      const series = responseData.series;
      const total = responseData.total || 0;
      const currentPage = action.meta.arg.page || 1;
      const limit = action.meta.arg.limit || 10;
      
      // Calculate total pages based on total items and limit
      const totalPages = Math.ceil(total / limit);
      
      // If it's the first page, replace the data
      if (currentPage === 1) {
        state.origins_series = responseData;
      } else {
        // For subsequent pages, append the data (only if series is not null)
        if (series !== null) {
          const currentSeries = state.origins_series as any;
          Object.keys(series).forEach(category => {
            if (currentSeries.series && currentSeries.series[category]) {
              currentSeries.series[category] = [...currentSeries.series[category], ...series[category]];
            } else if (currentSeries.series) {
              currentSeries.series[category] = series[category];
            }
          });
        }
      }
      
      // Update pagination state
      state.series_pagination = {
        current_page: currentPage,
        total_pages: totalPages,
        total_items: total,
        has_more: currentPage < totalPages,
      };
      
      state.loading = false;
    });
    builder.addCase(getOriginSeries.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getOriginSeries.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(getGenreSeries.fulfilled, (state, action: any) => {
      state.genres_series = action.payload.data.series;
      state.loading = false;
    });
    builder.addCase(getGenreSeries.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getGenreSeries.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(getLanguageSeries.fulfilled, (state, action: any) => {
      state.languages_series = action.payload.data.series;
      state.loading = false;
    });
    builder.addCase(getLanguageSeries.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getLanguageSeries.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(getTagSeries.fulfilled, (state, action: any) => {
      state.tags_series = action.payload.data.series;
      state.loading = false;
    });
    builder.addCase(getTagSeries.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getTagSeries.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(getTvChannels.fulfilled, (state, action: any) => {
      state.tv_channels = action.payload.data.channels;
      state.loading = false;
    });
    builder.addCase(getTvChannels.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getTvChannels.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(getOrigins.fulfilled, (state, action: any) => {
      state.origins = action.payload.origins;
      state.loading = false;
    });
    builder.addCase(getOrigins.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getOrigins.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });



    builder.addCase(watchingMovies.fulfilled, (state, action: any) => {
      const watchedMovies = action.payload.watched_movies || [];
      const total = action.payload.total || 0;
      const currentPage = action.meta.arg.page || 1;
      const limit = action.meta.arg.limit || 10;
      const totalPages = Math.ceil(total / limit);

      if (currentPage === 1) {
        state.watching_movies = watchedMovies;
      } else {
        state.watching_movies = [...state.watching_movies, ...watchedMovies];
      }

      state.watching_movies_pagination = {
        current_page: currentPage,
        total_pages: totalPages,
        total_items: total,
        has_more: currentPage < totalPages,
      };
      state.loading = false;
    });
    builder.addCase(watchingMovies.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(watchingMovies.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(watchingSeries.fulfilled, (state, action: any) => {
      const watchedSeries = action.payload.watched_series || [];
      const total = action.payload.total || 0;
      const currentPage = action.meta.arg.page || 1;
      const limit = action.meta.arg.limit || 10;
      const totalPages = Math.ceil(total / limit);

      if (currentPage === 1) {
        state.watching_series = watchedSeries;
      } else {
        state.watching_series = [...state.watching_series, ...watchedSeries];
      }

      state.watching_series_pagination = {
        current_page: currentPage,
        total_pages: totalPages,
        total_items: total,
        has_more: currentPage < totalPages,
      };
      state.loading = false;
    });
    builder.addCase(watchingSeries.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(watchingSeries.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(savedMovies.fulfilled, (state, action: any) => {
      const savedMovies = action.payload.saved_movies || [];
      const total = action.payload.total || 0;
      const currentPage = action.meta.arg.page || 1;
      const limit = action.meta.arg.limit || 10;
      const totalPages = Math.ceil(total / limit);

      if (currentPage === 1) {
        state.saved_movies = savedMovies;
      } else {
        state.saved_movies = [...state.saved_movies, ...savedMovies];
      }

      state.saved_movies_pagination = {
        current_page: currentPage,
        total_pages: totalPages,
        total_items: total,
        has_more: currentPage < totalPages,
      };
      state.loading = false;
    });

    builder.addCase(savedMovies.pending, (state) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(savedMovies.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(savedSeries.fulfilled, (state, action: any) => {
      const savedSeries = action.payload.saved_series || [];
      const total = action.payload.total || 0;
      const currentPage = action.meta.arg.page || 1;
      const limit = action.meta.arg.limit || 10;
      const totalPages = Math.ceil(total / limit);

      if (currentPage === 1) {
        state.saved_series = savedSeries;
      } else {
        state.saved_series = [...state.saved_series, ...savedSeries];
      }

      state.saved_series_pagination = {
        current_page: currentPage,
        total_pages: totalPages,
        total_items: total,
        has_more: currentPage < totalPages,
      };
      state.loading = false;
    });

    builder.addCase(savedSeries.pending, (state) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(savedSeries.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(getMovieDetail.fulfilled, (state, action: any) => {
      state.movie_detail = action.payload.data.movie;
      state.loading = false;
    });
    builder.addCase(getMovieDetail.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getMovieDetail.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(getSerieDetail.fulfilled, (state, action: any) => {
      state.serie_detail = action.payload.data.serie;
      state.loading = false;
    });
    builder.addCase(getSerieDetail.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getSerieDetail.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(getEpisodeDetail.fulfilled, (state, action: any) => {
      state.episode_detail = action.payload.data.episode;
      state.loading = false;
    });
    builder.addCase(getEpisodeDetail.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getEpisodeDetail.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    // builder.addCase(storeWatchedSerie.fulfilled, (state, action: any) => {
    //   // Update the watching_series list with the new watched episode
    //   const watchedEpisode = action.payload;
    //   // You can add logic here to update the watching_series list if needed
    //   state.loading = false;
    // });
    // builder.addCase(storeWatchedSerie.pending, (state) => {
    //   state.loading = true;
    //   state.error = false;
    // });
    // builder.addCase(storeWatchedSerie.rejected, (state) => {
    //   state.loading = false;
    //   state.error = true;
    // });

    // builder.addCase(storeWatchedMovie.fulfilled, (state, action: any) => {
    //   // Update the watching_movies list with the new watched movie
    //   const watchedMovie = action.payload;
    //   // You can add logic here to update the watching_movies list if needed
    //   state.loading = false;
    // });
    // builder.addCase(storeWatchedMovie.pending, (state) => {
    //   state.loading = true;
    //   state.error = false;
    // });
    // builder.addCase(storeWatchedMovie.rejected, (state) => {
    //   state.loading = false;
    //   state.error = true;
    // });
  },
});

export const { clearMovieDetail, clearSerieDetail, clearAllDetails } = MoviesSlice.actions;

export default MoviesSlice.reducer;
