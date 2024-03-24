import { FCC } from "@types";

type Props = React.HTMLAttributes<HTMLDivElement>;
export const Box: FCC<Props> = ({ children, className = "p-4 w-full" }) => {
  return (
    <div className={`rounded-[15px] bg-white dark:bg-gray-900  ${className}`}>
      {children}
    </div>
  );
};
