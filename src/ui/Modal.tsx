import React, {
  cloneElement,
  createContext,
  Dispatch,
  PropsWithChildren,
  ReactElement,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import useClickOutside from "../hooks/useClickOutside";
import Conditional from "./Conditional";

type TWindows =
  | "add-cabin-form"
  | "edit-cabin-form"
  | "confirm-delete"
  | "delete-booking"
  | "";

type TModalContextType = {
  open: Dispatch<SetStateAction<TWindows>>;
  close: () => void;
  currentWindowName: TWindows;
};

const ModalContext = createContext<TModalContextType | null>(null);

const useModelContext = () => {
  const context = useContext(ModalContext);

  if (!context)
    throw new Error("useModalContext must be used within a ModalProvider");

  return context;
};

function Modal({ children }: Readonly<PropsWithChildren>) {
  const [windowName, setWindowName] = useState<TWindows>("");

  const close = () => setWindowName("");
  const open = setWindowName;

  const contextValue = useMemo(
    () => ({
      currentWindowName: windowName,
      open,
      close,
    }),
    [open, windowName]
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({
  children,
  opensWindowName,
}: PropsWithChildren<{ opensWindowName: TWindows }>) {
  const { open } = useModelContext();

  return (
    <Conditional test={React.isValidElement(children)}>
      {cloneElement(children as ReactElement, {
        onClick: () => open(opensWindowName),
      })}
    </Conditional>
  );
}

type Props = {
  windowName: TWindows;
};

function Window({ children, windowName }: PropsWithChildren<Props>) {
  const { currentWindowName, close } = useModelContext();

  const clickOutSideRef = useClickOutside<HTMLDivElement>(close);

  if (windowName !== currentWindowName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={clickOutSideRef}>
        <Button onClick={close}>
          <HiXMark />
        </Button>

        <Conditional test={React.isValidElement(children)}>
          {cloneElement(children as ReactElement, { onCloseModal: close })}
        </Conditional>
      </StyledModal>
    </Overlay>,
    document.body
  );
}
Modal.Open = Open;
Modal.Window = Window;

export default Modal;

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1rem;
  right: 1.5rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;
