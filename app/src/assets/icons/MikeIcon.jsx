import * as React from "react";
import Svg, { Path } from "react-native-svg";
const MikeIcon = (props) => (
  <Svg
    fill="blue"
    width={25}
    height={25}
    viewBox="-0.109 0 0.75 0.75"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path d="M.263.525a.15.15 0 0 0 .15-.15V.15a.15.15 0 1 0-.3 0v.225a.15.15 0 0 0 .15.15z" />
    <Path d="M.525.375V.3A.037.037 0 1 0 .45.3v.075a.188.188 0 1 1-.375 0V.3A.037.037 0 1 0 0 .3v.075a.263.263 0 0 0 .224.259h.001v.041H.113a.037.037 0 1 0 0 .075h.3a.037.037 0 1 0 0-.075H.3V.634A.263.263 0 0 0 .525.375z" />
  </Svg>
);
export default MikeIcon;