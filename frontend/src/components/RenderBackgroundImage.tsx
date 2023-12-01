import { useTheme } from "../context/ThemeContext";

interface RenderBackgroundImageProps {
  imageSource: string;
  low: number;
  high: number;
}

// const RenderBackgroundImage: React.FC<RenderBackgroundImageProps> = ({
//   imageSource,
//   low,
//   high,
// }) => {
//   const { darkMode } = useTheme();

//   return (
//     <div
//       style={{
//         position: "absolute",
//         width: "100%",
//         minHeight: "100%",
//         backgroundImage: `url(${imageSource})`,
//         backgroundPosition: "center",
//         backgroundSize: "cover",
//         backgroundRepeat: "no-repeat",
//         zIndex: -1,
//         filter:
//           darkMode === true ? `brightness(${low}%)` : `brightness(${high}%)`,
//       }}
//     ></div>
//   );
// };

// export default RenderBackgroundImage;

const RenderBackgroundImage: React.FC<RenderBackgroundImageProps> = ({
  imageSource,
  low,
  high,
}) => {
  const { darkMode } = useTheme();

  const parallaxStyle: React.CSSProperties = {
    position: "absolute",
    backgroundImage: `url(${imageSource})`,
    filter: darkMode === true ? `brightness(${low}%)` : `brightness(${high}%)`,
    width: "100%",
    minHeight: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundAttachment: "fixed",
    backgroundPosition: "50% 50%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    transition: "filter 0.5s ease-in-out",
    zIndex: -1,
  };

  return <div style={parallaxStyle}></div>;
};

export default RenderBackgroundImage;
