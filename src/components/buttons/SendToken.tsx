import {
  FormHandleSendTokenForm,
  SendTokenForm,
} from "@components/form/SendTokenForm";
import { useWalletStore } from "@store";
import { FCC } from "@types";
import { formatCurrency } from "@utils";
import { Dialog } from "primereact/dialog";
import { useCallback, useRef, useState } from "react";
import { PrimeBtn } from "./Btn";
import { CustomBtn } from "./CustomBtn";
import { CustomBtnProps } from "./CustomBtn.types";

type SendTokenBtnProps = Omit<CustomBtnProps, "onClick"> & {
  text?: string;
};

export const SendTokenBtn: FCC<SendTokenBtnProps> = ({
  className = "font-semibold text-medium border-2 ml-auto self-end",
  text = "Send Token",
}) => {
  const [open, setOpen] = useState(false);
  const { balance } = useWalletStore(state => state.wallet);
  const getGasPrice = useWalletStore(state => state.getGasPrice);
  const estimateGas = useWalletStore(state => state.estimateGas);
  const sendToken = useWalletStore(state => state.sendToken);
  const [gasPrice, setGasPrice] = useState<string>();
  const [estimatedGas, setEstimatedGas] = useState<string>();

  const [currency, setCurrency] = useState<string | null>(null);
  const promiseSend = useRef<
    null | ((value: boolean | PromiseLike<boolean>) => void)
  >(null);
  const handleClick = async () => {
    setOpen(true);
    await getGasPrice().then(setGasPrice);
  };

  const getCurrentBalance = useCallback(
    (token: string) => {
      const value = balance.find(value => value.symbol === token)?.balance;
      if (value === null || value === undefined) return null;
      return setCurrency(`${formatCurrency(value)} ${token}`);
    },
    [balance]
  );

  const onHandleSendToken: FormHandleSendTokenForm = async (
    { addr, amount, token },
    { setSubmitting }
  ) => {
    setSubmitting(true);
    const gas = await estimateGas({
      address: addr,
      amount: amount,
      token: token,
    });
    if (gas) {
      setEstimatedGas(gas);
      const res = await new Promise<boolean>(
        resolve => (promiseSend.current = resolve)
      );
      if (res)
        await sendToken({
          address: addr,
          amount: amount,
          token: token,
        });
    }

    //   resetForm();
    setSubmitting(false);
  };

  const onHandleConfirmSend = async () => {
    if (promiseSend.current) {
      promiseSend.current(true);
      setEstimatedGas(undefined);
      promiseSend.current = null;
    }
  };
  const onHandleCancelSend = async () => {
    if (promiseSend.current) {
      promiseSend.current(false);
      setEstimatedGas(undefined);
      promiseSend.current = null;
    }
  };
  const Footer = () => {
    return (
      <div className="item-center flex flex-col gap-0.5">
        {currency ? (
          <p className="text-contrast text-base font-semibold">
            Balance: {currency}
          </p>
        ) : null}
        {gasPrice ? (
          <p className="text-base font-medium">Gas Price: {gasPrice} Gwei</p>
        ) : null}
        {estimatedGas ? (
          <div className="flex flex-col gap-2">
            <p className="text-base font-semibold">
              Estimated Gas Rate: {estimatedGas} ETH
            </p>
            <div className="ml-auto flex flex-wrap items-center gap-2 self-end">
              <PrimeBtn
                className="text-medium border-2 font-semibold"
                color="secondary"
                outlined
                icon={"pi pi-refresh"}
                label="Back"
                severity="danger"
                onClick={onHandleCancelSend}
              ></PrimeBtn>
              <PrimeBtn
                icon={"pi pi-send"}
                className="text-medium border-2 font-semibold"
                outlined
                label="Confirm Send Token"
                onClick={onHandleConfirmSend}
              ></PrimeBtn>
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <>
      <CustomBtn onClick={handleClick} className={className}>
        <i className="pi pi-send" />
        {text}
      </CustomBtn>

      <Dialog
        header="Send Token"
        visible={open}
        onHide={() => setOpen(false)}
        breakpoints={{ "960px": "75vw" }}
        style={{ width: "50vw" }}
        footer={Footer}
      >
        <SendTokenForm
          getCurrentBalance={getCurrentBalance}
          disabled={Boolean(estimatedGas)}
          onHandleForm={onHandleSendToken}
          setEstimatedGas={setEstimatedGas}
        />
      </Dialog>
    </>
  );
};
