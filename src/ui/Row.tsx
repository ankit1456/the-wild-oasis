import styled, { css } from "styled-components";

type RowProps = {
  $align?: "horizontal" | "vertical";
  gap?: number;
};

const Row = styled.div<RowProps>`
  display: flex;

  ${({ $align }) =>
    $align === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${({ $align, gap = 1.6 }) =>
    $align === "vertical" &&
    css`
      flex-direction: column;
      gap: ${gap}rem;
    `}
`;

Row.defaultProps = {
  $align: "horizontal",
};

export default Row;
