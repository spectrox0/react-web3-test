import { InputAddr } from "@components/buttons/InputAddr";
import { TokenSelect } from "@components/selects/TokenSelect";
import { UnitNetwork } from "@constants/unitNetwork";
import { useWalletStore } from "@store";
import { areAddressesEqual } from "@utils/address";
import { isAddress } from "ethers";
import { FormikHelpers, useFormik } from "formik";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { FC, useEffect, useMemo } from "react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

interface Props {
  getCurrentBalance(token: string): void;
  setEstimatedGas(gas: string): void;
  onHandleForm: FormHandleSendTokenForm;
  disabled?: boolean;
}
interface Values {
  token: string;
  amount: number;
  addr: string;
}
export type FormHandleSendTokenForm = (
  values: Values,
  formikHelpers: FormikHelpers<Values>
) => void | Promise<unknown>;
export const SendTokenForm: FC<Props> = ({
  getCurrentBalance,
  onHandleForm,
  disabled,
}) => {
  const { address, balance, network } = useWalletStore(state => state.wallet);

  const validationSchema = toFormikValidationSchema(
    z.object({
      token: z
        .string()
        .refine(value => balance.some(item => item.symbol === value), {
          message: "Token not found",
        }),
      amount: z.number().positive({ message: "Amount must be greater than 0" }),
      addr: z
        .string()
        .min(42, { message: "Address is too short" })
        .refine((item: string) => isAddress(item), {
          message: "Invalid address. Please check the address",
        })
        .refine((item: string) => !areAddressesEqual(item, address as string), {
          message: "You can't send tokens to yourself",
        }),
    })
  );
  const {
    handleSubmit,
    handleBlur,
    isSubmitting,
    errors,
    touched,
    isValid,
    values: { addr, token, amount },
    handleChange,
  } = useFormik<Values>({
    initialValues: {
      token: UnitNetwork[network],
      amount: 0,
      addr: "",
    },
    onSubmit: onHandleForm,
    validateOnMount: true,
    validationSchema,
  });

  useEffect(() => {
    getCurrentBalance(token);
  }, [getCurrentBalance, token]);

  const moreThanBalance = useMemo(() => {
    const balanceToken = balance.find(item => item.symbol === token);
    if (!balanceToken) return false;
    return balanceToken.balance >= amount;
  }, [token, amount, balance]);
  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3 py-2">
      <div className="flex flex-col gap-1">
        <InputNumber
          value={amount}
          className="w-full flex-1"
          name="amount"
          inputStyle={{ flex: 1 }}
          suffix={` ${token}`}
          disabled={disabled}
          onValueChange={handleChange}
          onBlur={handleBlur}
          minFractionDigits={2}
          maxFractionDigits={5}
        />
        {touched.amount && errors.amount ? (
          <p className="text-sm text-red-500">{errors.amount}</p>
        ) : null}
        {!moreThanBalance ? (
          <p className="text-sm text-red-500">Insufficient balance</p>
        ) : null}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex w-full flex-1 flex-wrap items-stretch gap-2">
          <InputAddr
            name="addr"
            value={addr}
            disabled={disabled}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Button
            icon={"pi pi-send"}
            loading={isSubmitting}
            style={{ marginLeft: "auto", alignSelf: "flex-end" }}
            label="Send"
            disabled={!isValid || !moreThanBalance || disabled || isSubmitting}
            type="submit"
          />
        </div>
        {touched.addr && errors.addr ? (
          <p className="text-sm text-red-500">{errors.addr}</p>
        ) : null}
      </div>

      <TokenSelect
        name="token"
        value={token}
        disabled={disabled}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </form>
  );
};
