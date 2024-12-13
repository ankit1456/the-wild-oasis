import { PropsWithChildren, isValidElement } from "react";
import styled from "styled-components";
import Conditional from "./Conditional";

type FormRowProps = {
  label?: string;
  error?: string;
};

const FormRow = ({
  error,
  label,
  children,
}: PropsWithChildren<FormRowProps>) => {
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
};

export default FormRow;

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 20.7rem 1fr 0.8fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.3rem;
  color: var(--color-red-700);
`;
