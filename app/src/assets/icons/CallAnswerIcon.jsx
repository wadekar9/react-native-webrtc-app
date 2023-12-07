import * as React from "react";
import Svg, { Ellipse, Path } from "react-native-svg";

const CallAnswerIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    style={{
      enableBackground: "new 0 0 512 512",
    }}
    xmlSpace="preserve"
    {...props}
  >
    <Ellipse
      style={{
        fill: "green",
      }}
      cx={256}
      cy={256}
      rx={256}
      ry={255.832}
    />
    <Path
      transform="rotate(-38.01 350.425 334.273)"
      style={{
        fill: "#fff",
      }}
      d="M331.753 288.52h37.344v91.504h-37.344z"
    />
    <Path
      style={{
        fill: "#fff",
      }}
      d="M348.696 393.736 292.344 321.6c-51.16-14.248-87.064-60.168-88.544-113.256l-56.352-72.096s-53.392 76.488 30.4 183.64 170.848 73.848 170.848 73.848z"
    />
    <Path
      transform="rotate(-38.01 205.486 148.922)"
      style={{
        fill: "#fff",
      }}
      d="M186.814 103.169h37.344v91.504h-37.344z"
    />
  </Svg>
);

export default CallAnswerIcon;