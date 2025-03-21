import styled, { css } from "styled-components";

type HeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4";
};

const Heading = styled.h1<HeadingProps>`
  line-height: 1.4;
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 1.7rem;
      font-weight: 500;
    `} 
    
    ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 2rem;
      font-weight: 600;
      text-align: center;
    `}
`;

Heading.defaultProps = {
  as: "h1",
};

export default Heading;
