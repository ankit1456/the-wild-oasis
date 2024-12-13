import { HiOutlineUser } from "react-icons/hi2";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import ThemeToggle from "./ThemeToggle";

function HeaderMenu() {
  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon>
          <Link to="/account">
            <HiOutlineUser />
          </Link>
        </ButtonIcon>
      </li>

      <li>
        <ThemeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
  align-items: center;
`;
