import { TailSpin } from "react-loader-spinner";

const Loader: React.FC<{ color?: string; size?: string }> = ({
  color = "#F97316",
  size = "80",
}) => {
  return (
    <div className="flex justify-center items-center">
      <TailSpin
        visible={true}
        height={size}
        width={size}
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
