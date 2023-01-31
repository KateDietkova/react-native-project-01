import * as React from "react";
import Svg, { Path } from "react-native-svg";

const UserTabBarIcon = ({ color }, { ...props }) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
      stroke={color}
      strokeOpacity={color === "#fff" ? 1 : 0.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      clipRule="evenodd"
      d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
      stroke={color}
      strokeOpacity={color === "#fff" ? 1 : 0.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default UserTabBarIcon;
