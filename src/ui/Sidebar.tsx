import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";

import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <StyledSidebar>
      <Link to="/">
        <Logo />
      </Link>
      <MainNav />
      {/* <Conditional test={user?.email === "ankittripathi1201@gmail.com"}>
        <Uploader />
      </Conditional> */}
    </StyledSidebar>
  );
};

export default Sidebar;

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1/-1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;
