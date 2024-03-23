import { showError } from "@utils/message";
import copy from "copy-text-to-clipboard"; // Small library to copy text to clipboard with a single function call
export const readTextToClipboard = async (): Promise<string | undefined> => {
  try {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.readText();
    }
    showError("Not support");
  } catch (e) {
    if (e instanceof Error) console.error(e.message);
    showError("Error reading text from clipboard");
  }
};

export const copyToClipboard = async (text: string): Promise<void> => {
  try {
    copy(text);
  } catch (e) {
    if (e instanceof Error) console.error(e.message);
    showError("Error copying text to clipboard");
  }
};
