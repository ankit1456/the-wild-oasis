import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  PropsWithChildren,
  useState,
  ReactNode,
  MouseEvent,
  useMemo,
} from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import useClickOutside from "../hooks/useClickOutside";

type Props = {
  $position: {
    x: number;
    y: number;
  } | null;
};

type Position = {
  x: number;
  y: number;
};

type MenusContextType = {
  openId: number | undefined;
  close: () => void;
  open: Dispatch<SetStateAction<number | undefined>>;
  position: Position | null;
  setPosition: Dispatch<SetStateAction<Position | null>>;
};

const MenusContext = createContext<MenusContextType | null>(null);

const useMenusContext = () => {
  const context = useContext(MenusContext);

  if (!context) {
    throw new Error(
      "useMenusContext must be wrapped with MenusContextProvider"
    );
  }

  return context;
};

function Menus({ children }: Readonly<PropsWithChildren>) {
  const [openId, setOpenId] = useState<number>();
  const [position, setPosition] = useState<Position | null>(null);

  const close = () => setOpenId(undefined);

  const contextValue = useMemo(
    () => ({
      openId,
      close,
      open: setOpenId,
      position,
      setPosition,
    }),
    [openId, position]
  );

  return (
    <MenusContext.Provider value={contextValue}>
      {children}
    </MenusContext.Provider>
  );
}
function Toggle({ id }: Readonly<{ id: number }>) {
  const { close, openId, open, setPosition } = useMenusContext();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const rect = (e.target as HTMLElement)
      .closest("button")
      ?.getBoundingClientRect();

    if (rect) {
      setPosition({
        x: window.innerWidth - rect.width - rect.x,
        y: rect.y + rect.height + 8,
      });
    }

    if (!openId || openId !== id) open(id);
    else close();
  };
  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}
function List({ children, id }: PropsWithChildren<{ id: number }>) {
  const { openId, position, close } = useMenusContext();
  const closeMenuRef = useClickOutside<HTMLUListElement>(close, false);

  if (openId !== id) return null;

  return createPortal(
    <StyledList ref={closeMenuRef} $position={position}>
      {children}
    </StyledList>,
    document.body
  );
}

const Button = ({
  children,
  icon,
  onClick,
  disabled,
}: PropsWithChildren<{
  icon: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}>) => {
  const { close } = useMenusContext();

  const handleClick = () => {
    onClick?.();
    close();
  };
  return (
    <li>
      <StyledButton disabled={disabled} onClick={handleClick}>
        {icon} <span>{children}</span>
      </StyledButton>
    </li>
  );
};

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul<Props>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-lg);
  border-radius: var(--border-radius-md);

  right: ${({ $position }) => $position?.x}px;
  top: ${({ $position }) => $position?.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
