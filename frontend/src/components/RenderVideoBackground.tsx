import { useTheme } from "../context/ThemeContext";

interface VideoBackgroundProps {
  videoSource: string;
  low: number;
  high: number;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({
  videoSource,
  low,
  high,
}) => {
  const { darkMode } = useTheme();

  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        zIndex: -1,
        filter:
          darkMode === true ? `brightness(${low}%)` : `brightness(${high}%)`,
      }}
    >
      <source src={videoSource} type="video/mp4" />
    </video>
  );
};

export default VideoBackground;
