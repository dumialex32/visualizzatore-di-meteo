import vismeteo from "../assets/vismeteo.png";

type HeightType = "sm" | "md" | "lg" | undefined;

const heightMap = {
  sm: "h-20",
  md: "h-40",
  lg: "h-60",
};

const Logo: React.FC<{ height: HeightType }> = ({ height = "sm" }) => {
  return (
    <div>
      <img className={heightMap[height]} src={vismeteo} alt="meteo logo" />
    </div>
  );
};

export default Logo;
