import Header from "@/app/(components)/Header";
import { XIcon } from "lucide-react";
import React from "react";
import ReactDOM from "react-dom";

export type BaseModalProps = {
  open: boolean;
  onClose: () => void;
};

type Props = BaseModalProps & {
  children: React.ReactNode;
  name: string;
};

const Modal = ({ children, open, onClose, name }: Props) => {
  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto bg-gray-600 bg-opacity-50 p-4">
      <div className="w-full max-w-2xl rounded-lg bg-white p-4 shadow-lg dark:bg-dark-secondary">
        <Header
          name={name}
          buttonComponent={
            <button
              className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-primary text-white hover:bg-blue-600"
              onClick={onClose}
            >
              <XIcon size={18} />
            </button>
          }
          isSmallText
        />
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
