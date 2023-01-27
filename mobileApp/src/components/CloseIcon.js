import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

const CloseIcon = (props) => (
  <Svg
    width={37}
    height={37}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle
      cx={18.5}
      cy={18.5}
      r={15}
      transform="rotate(-45 18.5 18.5)"
      fill="#fff"
      stroke="#E8E8E8"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m12.857 13.55-.707.707 6.243 6.243-6.243 6.243.707.707 6.243-6.243 6.243 6.243.707-.707-6.243-6.243 6.243-6.243-.707-.707-6.243 6.243-6.243-6.243Z"
      fill="#BDBDBD"
    />
  </Svg>
);

export default CloseIcon;
