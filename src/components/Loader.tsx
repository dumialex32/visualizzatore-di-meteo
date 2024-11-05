import { TailSpin } from "react-loader-spinner";

type Size = "tiny" | "small" | "medium" | "large";

const SizeMap: Record<Size, string> = {
  tiny: "20",
  small: "40",
  medium: "60",
  large: "80",
};

const Loader: React.FC<{ color?: string; size?: Size }> = ({
  color = "#F97316",
  size = "large",
}) => {
  return (
    <div className="flex justify-center items-center">
      <TailSpin
        visible={true}
        height={SizeMap[size]}
        width={SizeMap[size]}
        color={color}
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
