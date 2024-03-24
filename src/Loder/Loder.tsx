import {Player} from "@lottiefiles/react-lottie-player";
import {useDarkMode} from "../hooks/useDarkMode";
import animationData from "../assets/animation_lkb9rmfk.json";

const Loder = () => {
  const isDarkMode = useDarkMode();
  return (
    <div
      className={`w-full overflow-hidden
        rounded-lg shadow-xs p-4
        h-screen
        ${isDarkMode ? "bg-black text-white" : "bg-white text-gray-800"}
        `}
    >
      <Player
        autoplay
        loop
        src={animationData}
        style={{
          height: "200px",
          width: "200px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
};

export default Loder;
