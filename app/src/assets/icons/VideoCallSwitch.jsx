import * as React from "react";
import Svg, { Path } from "react-native-svg";

const VideoCallSwitch = (props) => (
  <Svg
    fill="#f00f00"
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    viewBox="0 0 3.125 3.125"
    xmlSpace="preserve"
    {...props}
  >
    <Path d="M2.071 1.917v.33a.143.143 0 0 1-.142.142H.454a.143.143 0 0 1-.142-.142V.878C.312.8.376.736.454.736h1.475c.078 0 .142.064.142.142v.326l.742-.352v1.415l-.742-.35z" />
  </Svg>
);

export default VideoCallSwitch;