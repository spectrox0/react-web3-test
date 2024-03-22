import { ToastMessage } from "primereact/toast";

export const showToast = (
  toastObject: ToastMessage | ToastMessage[],
  primeToast = window.primeToast
) => {
  if (!primeToast) return;
  primeToast.show(toastObject);
};

// show error with primeToast
export const showError = (message: string, primeToast = window.primeToast) => {
  showToast(
    { severity: "error", summary: "Error", detail: message },
    primeToast
  );
};
