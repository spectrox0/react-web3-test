import { FCC } from "@types";
import { Toast, ToastMessage } from "primereact/toast";
import { createContext, useCallback, useMemo, useRef } from "react";

type ShowToast = (toastObject: ToastMessage | ToastMessage[]) => void;
export const ToastContext = createContext<{
  showToast: ShowToast;
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
}>({
  showToast: () => undefined,
  showSuccess: () => undefined,
  showError: () => undefined,
});

export const ToastProvider: FCC = ({ children }) => {
  const toast = useRef<Toast>(null);

  const showToast = useCallback(
    (toastObject: ToastMessage | ToastMessage[]) => {
      if (!toast.current) return;
      toast.current.show(toastObject);
    },
    [toast]
  );

  const showError = useCallback(
    (message: string) => {
      showToast({ severity: "error", summary: "Error", detail: message });
    },
    [showToast]
  );

  const showSuccess = useCallback(
    (message: string) => {
      showToast({ severity: "success", summary: "Success", detail: message });
    },
    [showToast]
  );

  const state = useMemo(
    () => ({
      showToast,
      showSuccess,
      showError,
    }),
    [showError, showToast, showSuccess]
  );

  return (
    <ToastContext.Provider value={state}>
      <Toast ref={toast} />
      {children}
    </ToastContext.Provider>
  );
};
