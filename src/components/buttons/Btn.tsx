import { FCC } from "@types";
import { Button } from "primereact/button";
import { forwardRef, Ref } from "react";
import { PrimeBtnProps } from "./Btn.types";
// Is the custom layer of the Button component from PrimeReact in case we need to add some custom logic to it in the future or to make it easier to change the library in the future.
export const PrimeBtn: FCC<PrimeBtnProps> = forwardRef(
  (props, ref: Ref<Button> | undefined) => {
    return <Button {...props} ref={ref} />;
  }
);
