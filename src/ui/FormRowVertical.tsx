import { isValidElement, PropsWithChildren } from "react";
import styled from "styled-components";
import Conditional from "./Conditional";

type Props = {
  label?: string;
  error?: string;
};
function FormRowVertical({ label, error, children }: PropsWithChildren<Props>) {
  return (
    <StyledFormRow>
      <Conditional test={label}>
        <Label htmlFor={isValidElement(children) && children.props.id}>
          {label}
        </Label>
      </Conditional>
      {children}

      <Conditional test={error}>
        <Error>{error}</Error>
      </Conditional>
    </StyledFormRow>
  );
}

export default FormRowVertical;

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem 0;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;
