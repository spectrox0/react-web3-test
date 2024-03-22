import { FCC } from "@types";
import { ContainerProps } from "./Container.types";

// Container with tailwind css with common max with and margin auto
export const Container: FCC<ContainerProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`mx-auto 2xl:w-4/5 w-11/12 max-w-[1615px] ${className}`}>
      {children}
    </div>
  );
};
