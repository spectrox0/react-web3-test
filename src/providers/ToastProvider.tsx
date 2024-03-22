import { FCC } from "@types";
import { Toast, ToastMessage } from "primereact/toast";
import { createContext, useLayoutEffect, useMemo, useRef } from "react";

type ShowToast = (toastObject: ToastMessage | ToastMessage[]) => void;
export const ToastContext = createContext<{ showToast: ShowToast }>({
  showToast: () => undefined,
});

export const ToastProvider: FCC = ({ children }) => {
  const toast = useRef<Toast>(null);

  const showToast = (toastObject: ToastMessage | ToastMessage[]) => {
    if (!toast.current) return;
    toast.current.show(toastObject);
  };

  useLayoutEffect(() => {
    // Save the reference toast instance to the window object to use it globally in the app outside of the provider
    window.primeToast = toast.current;
  }, []);

  const state = useMemo(
    () => ({
      showToast,
    }),
    []
  );

  return (
    <ToastContext.Provider value={state}>
      <Toast ref={toast} />
      {children}
    </ToastContext.Provider>
  );
};
