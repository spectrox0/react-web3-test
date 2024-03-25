import { useWalletStore } from "@store";
import { useEffect, useState } from "react";

export const useMetamask = () => {
  const [loading, setLoading] = useState(true);
  const {
    checkInitialConnectionMetamask,
    subscribeMetamaskEvents,
    unSubscribeMetamaskEvents,
  } = useWalletStore(state => state);

  useEffect(() => {
    (async () => {
      await checkInitialConnectionMetamask();
      subscribeMetamaskEvents();
      setLoading(false);
    })();
    return unSubscribeMetamaskEvents;
  }, [
    checkInitialConnectionMetamask,
    subscribeMetamaskEvents,
    unSubscribeMetamaskEvents,
  ]);

  return { loading };
};
