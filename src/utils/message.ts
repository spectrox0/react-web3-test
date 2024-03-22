import { Toast, ToastMessage } from "primereact/toast";

export const showToast = (
  toastObject: ToastMessage | ToastMessage[],
  primeToast = window.primeToast
) => {
  if (!primeToast) return;
  primeToast.show(toastObject);
};

// show error with primeToast
export const showError = (message: string, primeToast?: Toast) => {
  showToast(
    { severity: "error", summary: "Error", detail: message },
    primeToast
  );
};

export const showSuccess = (
  message: string,
  primeToast = window.primeToast
) => {
  showToast(
    { severity: "success", summary: "Success", detail: message },
    primeToast
  );
};

export const showAlert = (message: string, primeToast?: Toast) => {
  showToast(
    { severity: "warn", summary: "Warning", detail: message },
    primeToast
  );
};
