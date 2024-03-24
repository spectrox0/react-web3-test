import { CryptoIcon } from "@components/icons/CryptoIcon";
import { useWalletStore } from "@store";
import { DropdownChangeEvent, DropdownProps } from "primereact/dropdown";
import { FC, ReactNode, useState } from "react";
import { CustomSelect } from "./Select";

type Template = (option: string, props: DropdownProps) => ReactNode;
type TemplateFooter =
  | ReactNode
  | ((props: DropdownProps, hide: () => void) => ReactNode);
type ItemTemplate = (option: string) => ReactNode;
export const CryptoTokenSelect: FC = () => {
  const contract = useWalletStore(state => state.wallet.contractAddress);
  const tokens = Object.keys(contract);
  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  const onHandleChange = (e: DropdownChangeEvent) => setSelectedToken(e.value);

  const selectedTokenTemplate: Template = (option, props) => {
    if (option) {
      return (
        <div className="flex align-items-center">
          <CryptoIcon symbol={option} className="w-7 h-7" />
          <div>{option}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  const tokenOptionTemplate: ItemTemplate = option => {
    return (
      <div className="flex align-items-center">
        <CryptoIcon symbol={option} className="w-7 h-7" />
        <div>{option}</div>
      </div>
    );
  };

  const panelFooterTemplate: TemplateFooter = () => {
    return (
      <div className="py-2 px-3">
        {selectedToken ? (
          <span>
            <b>{selectedToken}</b> selected.
          </span>
        ) : (
          "No Token selected."
        )}
      </div>
    );
  };
  return (
    <CustomSelect
      options={tokens}
      onChange={onHandleChange}
      valueTemplate={selectedTokenTemplate}
      panelFooterTemplate={panelFooterTemplate}
      itemTemplate={tokenOptionTemplate}
      value={selectedToken}
    />
  );
};
