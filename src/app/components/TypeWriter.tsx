"use client";
import { ReactTyped } from "react-typed";

type Props = {
  strings: string[];
  typeSpeed?: number;
  backSpeed?: number;
  loop?: boolean;
};

export const TypeWriter = ({
  strings,
  typeSpeed = 75,
  backSpeed = 90,
  loop = false,
}: Props) => (
  <ReactTyped
    strings={strings}
    typeSpeed={typeSpeed}
    backSpeed={backSpeed}
    loop={loop}
  />
);
