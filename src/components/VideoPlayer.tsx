import { Close } from "@mui/icons-material";
import { Dialog, DialogContent, IconButton, Box } from "@mui/material";
import ReactPlayer from "react-player";
import { useState, useRef, useEffect } from "react";

interface VideoPlayerProps {
  src: string;
  autoPlay?: boolean;
  poster?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  onVideoStart?: () => void;
  onVideoEnd?: (watchedTime: number) => void;
  onVideoClose?: (watchedTime?: number) => void;
  startTime?: number;
}

const VideoPlayer = ({
  src,
  autoPlay = false,
  poster,
  open,
  setOpen,
  onVideoStart,
  onVideoEnd,
  onVideoClose,
  startTime = 0,
}: VideoPlayerProps) => {
  const [watchedTime, setWatchedTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const playerRef = useRef<ReactPlayer>(null);

  // Reset watched time when video changes
  useEffect(() => {
    if (open) {
      setWatchedTime(startTime);
      setIsPlaying(false);
    }
  }, [open, src, startTime]);

  const handleClose = () => {
    if (onVideoClose) {
      onVideoClose(watchedTime);
    }
    setOpen(false);
  };

  const handlePlay = () => {
    if (!isPlaying && onVideoStart) {
      onVideoStart();
    }
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleProgress = (state: { playedSeconds: number }) => {
    const newWatchedTime = Math.floor(state.playedSeconds);
    setWatchedTime(newWatchedTime);
  };

  const handleEnded = () => {
    if (onVideoEnd) {
      onVideoEnd(watchedTime);
    }
    setIsPlaying(false);
  };

  const handleReady = () => {
    if (startTime > 0 && playerRef.current) {
      playerRef.current.seekTo(startTime);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      sx={{
        boxShadow: "none",
        // width: "100%",
        ".MuiPaper-root": {
          borderRadius: 3,
          maxWidth: "100%",
        },
      }}>
      <DialogContent sx={{ p: 0, position: "relative" }}>
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 1,
            color: "#fff",
          }}>
          <Close />
        </IconButton>

        <Box
          mx='auto'
          sx={{
            width: "100%",
            height: "80vh",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "black",
          }}>
          <ReactPlayer
            ref={playerRef}
            url={src}
            controls={true}
            autoPlay={autoPlay}
            poster={poster}
            width='100%'
            height='100%'
            style={{ margin: "auto", maxHeight: "100vh" }}
            onPlay={handlePlay}
            onPause={handlePause}
            onProgress={handleProgress}
            onEnded={handleEnded}
            onReady={handleReady}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default VideoPlayer;
