import styled from "styled-components";
import { useTheme } from "../context/ThemeContext";

function Logo({ height }: Readonly<{ height?: string }>) {
  const { isDark } = useTheme();

  const src = isDark ? "/images/logo-dark.png" : "/images/logo-light.png";

  return (
    <StyledLogo>
      <Img $imageHeight={height ?? "8.5rem"} src={src} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img<{
  $imageHeight: string;
}>`
  height: ${({ $imageHeight }) => $imageHeight};
  width: auto;
`;
