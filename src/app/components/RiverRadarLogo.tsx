import Logo from "../assets/river-radar-logo.png";
import InvertedLogo from "../assets/river-radar-inverted-logo.png";
import Image from "next/image";

export const RiverRadarLogo = ({
  width,
  height,
  inverted = false,
}: {
  width: number;
  height: number;
  inverted?: boolean;
}) => {
  return (
    <Image
      src={inverted ? InvertedLogo : Logo}
      quality={100}
      width={width}
      height={height}
      alt="RiverRadar Logo"
    />
  );
};
