import { Box } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player";

type MovieBannerProps = {
  mainImage: string;
  movieDetail?: any;
  serieDetail?: any;
};

const MovieBanner = ({ mainImage, movieDetail, serieDetail }: MovieBannerProps) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);

  // Get trailer URL from movie or series detail
  useEffect(() => {
    let url: string | null = null;
    
    if (movieDetail?.videos?.length) {
      const trailer = movieDetail.videos.find((v: any) => v.video_status === 2);
      url = trailer?.streaming_url || null;
    } else if (serieDetail?.videos?.length) {
      const trailer = serieDetail.videos.find((v: any) => v.video_status === 2);
      url = trailer?.streaming_url || null;
    }
    
    setTrailerUrl(url);
  }, [movieDetail, serieDetail]);

  // Start timer to show trailer after 5 seconds
  useEffect(() => {
    if (trailerUrl) {
      timeoutRef.current = setTimeout(() => {
        setShowTrailer(true);
      }, 5000); // 5 seconds
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [trailerUrl]);

  // Reset trailer state when detail changes
  useEffect(() => {
    setShowTrailer(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, [movieDetail?.id, serieDetail?.id]);

  if (showTrailer && trailerUrl) {
    return (
      <Box
        height='78.5vh'
        position='relative'
        sx={{
          background: 'black',
          overflow: 'hidden',
        }}>
        <ReactPlayer
          url={trailerUrl}
          playing={true}
          muted={true}
          loop={true}
          width='100%'
          height='100%'
          style={{
            objectFit: 'cover',
          }}
          config={{
            file: {
              attributes: {
                style: {
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                },
              },
            },
          }}
        />
      </Box>
    );
  }

  return (
    <Box
      height='78.5vh'
      position='relative'
      sx={{
        background: `url(${mainImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "top center",
      }}></Box>
  );
};

export default MovieBanner;
