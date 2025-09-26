import {
  Box,
  CircularProgress,
  MenuItem,
  MenuList,
  ListItemText,
  Typography,
} from "@mui/material";
import MovieInfo from "../components/MovieInfo";
import full_logo from "../assets/images/iptv-full-logo.png";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../store";
import {
  getTrendingMovies,
  getMovieHomeLayout,
  getOriginMovies,
  getGenreMovies,
  getLanguageMovies,
  getTagMovies,
  getMovieDetail,
  watchingMovies,
} from "../store/moviesSlice";
import PreviewThumbnail from "../components/PreviewThumbnail";
import MovieBanner from "../components/MovieBanner";

type LayoutContext = [
  number,
  React.Dispatch<React.SetStateAction<number>>,
  number,
  React.Dispatch<React.SetStateAction<number>>,
  any, // selectedParentOrigin is of type any, not SubMenuItem
  any, // selectedParentOrigin is of type any, not SubMenuItem
  any, // selectedParentOrigin is of type any, not SubMenuItem
  boolean // isMobileLandscape
];

interface LayoutItem {
  id: number;
  layout: string;
  category_type: string;
  category: string;
  limit: number;
  order: number;
  category_name: string;
}

const MovieList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [
    activeImage,
    setActiveImage,
    _activeTab,
    _setActiveTab,
    _selectedParentOrigin,
    _setSelectedChildOrigin,
    _selectedChildOrigin,
    isMobileLandscape,
  ] = useOutletContext<LayoutContext>();

  const { movie_detail } = useSelector((state: any) => state.movies);

  const [layoutData, setLayoutData] = useState<LayoutItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentMovies, setCurrentMovies] = useState<any[]>([]);
  const [isLoadingCategory, setIsLoadingCategory] = useState(false);
  const [categoriesWithData, setCategoriesWithData] = useState<Set<string>>(
    new Set()
  );

  // Fetch movie layout data
  useEffect(() => {
    dispatch(getMovieHomeLayout()).then(async (res) => {
      const layout = res.payload.data.layout;
      setLayoutData(layout);

      // Pre-fetch all categories to determine which ones have data
      const categoriesWithDataSet = new Set<string>();

      for (const item of layout) {
        if (item.order !== 0) {
          try {
            let response: any;
            let hasData = false;

            if (item.category === "Continue Watching") {
              response = await dispatch(watchingMovies({ page: 1, limit: 10 }));
              hasData = (response.payload.watched_movies || []).length > 0;
            } else if (item.category === "Tranding") {
              response = await dispatch(
                getTrendingMovies({ limit: item.limit })
              );
              hasData =
                (response.payload.data.trending_movies || []).length > 0;
            } else {
              if (item.category_type === "Origin") {
                response = await dispatch(
                  getOriginMovies({
                    origin_id: item.category,
                    limit: item.limit,
                  })
                );
                const movies = response.payload.data.movies || {};
                hasData = Object.values(movies).flat().length > 0;
              } else if (item.category_type === "Genre") {
                response = await dispatch(
                  getGenreMovies({ genre_id: item.category, limit: item.limit })
                );
                const movies = response.payload.data.movies || {};
                hasData = Object.values(movies).flat().length > 0;
              } else if (item.category_type === "Language") {
                response = await dispatch(
                  getLanguageMovies({
                    language_id: item.category,
                    limit: item.limit,
                  })
                );
                const movies = response.payload.data.movies || {};
                hasData = Object.values(movies).flat().length > 0;
              } else if (item.category_type === "Tag") {
                response = await dispatch(
                  getTagMovies({ tag_id: item.category, limit: item.limit })
                );
                const movies = response.payload.data.movies || {};
                hasData = Object.values(movies).flat().length > 0;
              }
            }

            if (hasData) {
              categoriesWithDataSet.add(item.category);
            }
          } catch (error) {
            console.error(
              `Error checking data for category ${item.category}:`,
              error
            );
          }
        }
      }

      setCategoriesWithData(categoriesWithDataSet);
      // Set first category with data as default
      const firstCategoryWithData = layout.find(
        (item: LayoutItem) =>
          item.order !== 0 && categoriesWithDataSet.has(item.category)
      );

      if (firstCategoryWithData) {
        setSelectedCategory(firstCategoryWithData.category);
        fetchMoviesByCategory(firstCategoryWithData);
      }
    });
  }, [dispatch]);

  // Function to fetch movies based on category
  const fetchMoviesByCategory = async (categoryItem: LayoutItem) => {
    setIsLoadingCategory(true);
    try {
      let response: any;
      let movies: any[] = [];

      if (categoryItem.category === "Continue Watching") {
        response = await dispatch(watchingMovies({ page: 1, limit: 10 }));
        movies = response.payload.watched_movies || [];
        setCurrentMovies(movies);
      } else if (categoryItem.category === "Tranding") {
        response = await dispatch(
          getTrendingMovies({ limit: categoryItem.limit })
        );
        movies = response.payload.data.trending_movies || [];
        setCurrentMovies(movies);
      } else {
        // Use category as origin_id, genre_id, etc. based on category_type
        if (categoryItem.category_type === "Origin") {
          response = await dispatch(
            getOriginMovies({
              origin_id: categoryItem.category,
              limit: categoryItem.limit,
            })
          );
          const moviesData = response.payload.data.movies || {};
          movies = Object.values(moviesData).flat();
          setCurrentMovies(movies);
        } else if (categoryItem.category_type === "Genre") {
          response = await dispatch(
            getGenreMovies({
              genre_id: categoryItem.category,
              limit: categoryItem.limit,
            })
          );
          const moviesData = response.payload.data.movies || {};
          movies = Object.values(moviesData).flat();
          setCurrentMovies(movies);
        } else if (categoryItem.category_type === "Language") {
          response = await dispatch(
            getLanguageMovies({
              language_id: categoryItem.category,
              limit: categoryItem.limit,
            })
          );
          const moviesData = response.payload.data.movies || {};
          movies = Object.values(moviesData).flat();
          setCurrentMovies(movies);
        } else if (categoryItem.category_type === "Tag") {
          response = await dispatch(
            getTagMovies({
              tag_id: categoryItem.category,
              limit: categoryItem.limit,
            })
          );
          const moviesData = response.payload.data.movies || {};
          movies = Object.values(moviesData).flat();
          setCurrentMovies(movies);
        }
      }

      // Update categories with data
      setCategoriesWithData((prev) => {
        const newSet = new Set(prev);
        if (movies.length > 0) {
          newSet.add(categoryItem.category);
        } else {
          newSet.delete(categoryItem.category);
        }
        return newSet;
      });
    } catch (error) {
      console.error("Error fetching movies by category:", error);
      setCurrentMovies([]);
      // Remove from categories with data on error
      setCategoriesWithData((prev) => {
        const newSet = new Set(prev);
        newSet.delete(categoryItem.category);
        return newSet;
      });
    } finally {
      setIsLoadingCategory(false);
    }
  };

  // Handle submenu click
  const handleSubMenuClick = (category: string) => {
    setSelectedCategory(category);
    const categoryItem = layoutData.find(
      (item: LayoutItem) => item.category === category
    );
    if (categoryItem) {
      fetchMoviesByCategory(categoryItem);
    }
  };

  // Get submenu items (excluding order 0 and items with no data)
  const subMenuItems = useMemo(() => {
    return layoutData
      .filter(
        (item: LayoutItem) =>
          item.order !== 0 && categoriesWithData.has(item.category)
      )
      .map((item: LayoutItem) => ({
        id: item.id,
        category_type: item.category_type,
        category: item.category,
        limit: item.limit,
        order: item.order,
        category_name: item.category_name,
      }));
  }, [layoutData, categoriesWithData]);
  // Style function matching the original SubMenu component
  const getStyle = (active: boolean) => ({
    height: isMobileLandscape ? 24 : 40,
    px: isMobileLandscape ? "15px" : "30px",
    mr: isMobileLandscape ? "5px" : "10px",
    borderRadius: "6px",
    fontSize: isMobileLandscape ? 14 : 20,
    fontWeight: 400,
    backgroundColor: active ? "rgb(160 80 112)" : "rgba(51, 51, 102, 1)",
    color: "white",
    "&:hover": {
      backgroundColor: active
        ? "rgb(160 80 112 / 60%)"
        : "rgba(51, 51, 102, 0.6)",
      color: "white",
    },
  });

  // Fetch movie detail when activeImage changes
  useEffect(() => {
    if (activeImage && !isNaN(Number(activeImage))) {
      dispatch(getMovieDetail(activeImage));
    } else if (currentMovies.length > 0) {
      dispatch(getMovieDetail(currentMovies[0]?.id));
    }
  }, [dispatch, activeImage, currentMovies]);

  // Loading state
  if (isLoadingCategory || currentMovies.length === 0) {
    return (
      <Box
        width='100%'
        height='100vh'
        display='flex'
        justifyContent='center'
        alignItems='center'>
        <CircularProgress sx={{ color: "#A05070" }} size={50} />
      </Box>
    );
  }

  // No content state
  if (currentMovies.length === 0) {
    return (
      <Box
        width='100%'
        height='100vh'
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        sx={{ color: "white" }}>
        <Typography variant='h4' component='h1' gutterBottom>
          No Content Available
        </Typography>
        <Typography variant='body1'>
          There are no movies available for this category.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        aspectRatio: isMobileLandscape ? "auto" : "16/9",
        width: isMobileLandscape
          ? "calc(100vw - 140px)"
          : "calc(100vw - 280px)",
        height: isMobileLandscape ? "100vh" : "auto", // optional fix
        position: "relative",
        overflow: "hidden", // ensures no scrollbars
      }}>
      <img
        src={full_logo}
        width={isMobileLandscape ? 80 : 128}
        style={{
          position: "absolute",
          top: isMobileLandscape ? 10 : 20,
          left: isMobileLandscape ? 20 : 41,
          zIndex: 2,
        }}
      />
      <MovieBanner
        mainImage={movie_detail?.posters?.[1]?.poster_cdn_url}
        movieDetail={movie_detail}
      />
      <Box
        sx={{
          background:
            "linear-gradient(180deg, rgba(12, 12, 43, 0) 0%, #0C0C2B 76.5%)",
          position: "absolute",
          zIndex: 1,
          bottom: "18%",
          width: "100%",
          height: "50%",
          backgroundRepeat: "no-repeat",
        }}
      />
      <Box
        width={isMobileLandscape ? "calc(100% - 20px)" : "calc(100% - 26px)"}
        position='absolute'
        bottom={isMobileLandscape ? 60 : 100}
        left={isMobileLandscape ? 20 : 26}
        zIndex={9}>
        <MovieInfo
          movie_detail={movie_detail}
          onWatchedProgressSaved={() => { }}
          isMobileLandscape={isMobileLandscape}
        />
        <PreviewThumbnail
          activeImage={
            !isNaN(Number(activeImage)) ? activeImage : currentMovies[0]?.id
          }
          setActiveImage={setActiveImage}
          suggestedItems={currentMovies}
          isMobileLandscape={isMobileLandscape}
        />
      </Box>

      {/* Custom Submenu - matching original SubMenu design */}
      <Box
        width='100%'
        zIndex={2}
        position='relative'
        sx={{ overflowX: "auto" }}>
        <MenuList
          sx={{
            display: "inline-flex",
            mt: isMobileLandscape ? "25px" : "90px",
          }}>
          {subMenuItems.map((item) => (
            <MenuItem
              key={item.id}
              onClick={() => handleSubMenuClick(item.category)}
              sx={getStyle(selectedCategory === item.category)}>
              <ListItemText
                sx={{ span: { fontSize: isMobileLandscape ? 10 : 16 } }}>
                {item.category_name}
              </ListItemText>
            </MenuItem>
          ))}
        </MenuList>
      </Box>
    </Box>
  );
};

export default MovieList;
