import { Icon } from "@types";

export const BNBIcon: Icon = ({
  width,
  height,
  className,
  color = "#f0b90b",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      enableBackground: "new 0 0 2496 2496",
    }}
    viewBox="0 0 2496 2496"
    width={width}
    height={height}
    className={className}
  >
    <script />
    <path
      d="M1248 0c689.3 0 1248 558.7 1248 1248s-558.7 1248-1248 1248S0 1937.3 0 1248 558.7 0 1248 0z"
      style={{
        fillRule: "evenodd",
        clipRule: "evenodd",
        fill: color,
      }}
    />
    <path
      d="m685.9 1248 .9 330 280.4 165v193.2l-444.5-260.7v-524l163.2 96.5zm0-330v192.3l-163.3-96.6V821.4l163.3-96.6L850 821.4 685.9 918zm398.4-96.6 163.3-96.6 164.1 96.6-164.1 96.6-163.3-96.6z"
      style={{
        fill: "#fff",
      }}
    />
    <path
      d="M803.9 1509.6v-193.2l163.3 96.6v192.3l-163.3-95.7zm280.4 302.6 163.3 96.6 164.1-96.6v192.3l-164.1 96.6-163.3-96.6v-192.3zm561.6-990.8 163.3-96.6 164.1 96.6v192.3l-164.1 96.6V918l-163.3-96.6zm163.3 756.6.9-330 163.3-96.6v524l-444.5 260.7v-193.2l280.3-164.9z"
      style={{
        fill: "#fff",
      }}
    />
    <path
      d="m1692.1 1509.6-163.3 95.7V1413l163.3-96.6v193.2z"
      style={{
        fill: "#fff",
      }}
    />
    <path
      d="m1692.1 986.4.9 193.2-281.2 165v330.8l-163.3 95.7-163.3-95.7v-330.8l-281.2-165V986.4l164-96.6 279.5 165.8 281.2-165.8 164.1 96.6h-.7zM803.9 656.5l443.7-261.6 444.5 261.6-163.3 96.6-281.2-165.8-280.4 165.8-163.3-96.6z"
      style={{
        fill: "#fff",
      }}
    />
    <script />
  </svg>
);
