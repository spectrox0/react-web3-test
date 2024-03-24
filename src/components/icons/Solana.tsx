import { Icon } from "@types";

export const SolanaIcon: Icon = ({
  width = 50,
  height = 50,
  color = "#D7ACDC",
  className = "",
}) => {
  const classNameFill = `fill-[${color}]`;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      data-name="Layer 1"
      viewBox="0 0 508.07 398.17"
      width={width}
      height={height}
      className={className}
    >
      <path
        d="M84.53 358.89A16.63 16.63 0 0 1 96.28 354h405.45a8.3 8.3 0 0 1 5.87 14.18l-80.09 80.09a16.61 16.61 0 0 1-11.75 4.86H10.31A8.31 8.31 0 0 1 4.43 439Z"
        style={{ fill: color }}
        className={classNameFill}
        transform="translate(-1.98 -55)"
      />
      <path
        d="M84.53 59.85A17.08 17.08 0 0 1 96.28 55h405.45a8.3 8.3 0 0 1 5.87 14.18l-80.09 80.09a16.61 16.61 0 0 1-11.75 4.86H10.31A8.31 8.31 0 0 1 4.43 140Z"
        className={classNameFill}
        transform="translate(-1.98 -55)"
      />
      <path
        d="M427.51 208.42a16.61 16.61 0 0 0-11.75-4.86H10.31a8.31 8.31 0 0 0-5.88 14.18l80.1 80.09a16.6 16.6 0 0 0 11.75 4.86h405.45a8.3 8.3 0 0 0 5.87-14.18Z"
        className={classNameFill}
        transform="translate(-1.98 -55)"
      />
    </svg>
  );
};
