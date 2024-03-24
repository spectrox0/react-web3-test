import { Icon } from "@types";

export const EthereumIcon: Icon = ({
  width = 50,
  height = 50,
  color = "#627EEA",
  className = "",
}) => {
  // const {
  //   palette: {
  //     ETHEREUM: { main },
  //   },
  // } = useTheme();
  return (
    <svg
      height={height}
      viewBox="420.1 80.7 1079.8 1758.6"
      width={width}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m959.8 80.7-539.7 895.6 539.7-245.3z" fill={color} />
      <path
        d="m959.8 731-539.7 245.3 539.7 319.1zm539.8 245.3-539.8-895.6v650.3z"
        fill={`${color}80`}
      />
      <path d="m959.8 1295.4 539.8-319.1-539.8-245.3z" fill={`${color}9D`} />
      <path d="m420.1 1078.7 539.7 760.6v-441.7z" fill={color} />
      <path d="m959.8 1397.6v441.7l540.1-760.6z" fill={`${color}80`} />
    </svg>
  );
};
