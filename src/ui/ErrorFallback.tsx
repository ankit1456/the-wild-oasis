import styled from "styled-components";
import Heading from "./Heading";
import Button from "./Button";
import { MdErrorOutline } from "react-icons/md";

const StyledErrorFallback = styled.main`
  height: 100dvh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  padding: 4.8rem;
  max-width: 600px;
  text-align: center;

  & h1 {
    margin-bottom: 1.6rem;
    font-size: 2.4rem;
    color: var(--color-grey-800);
  }

  & p {
    margin-bottom: 3.2rem;
    font-size: 1.6rem;
    color: var(--color-grey-500);
    line-height: 1.5;
  }
`;

const ErrorFallback = ({
  resetErrorBoundary,
}: {
  error?: Error;
  resetErrorBoundary?: () => void;
}) => {
  return (
    <StyledErrorFallback>
      <Box>
        <MdErrorOutline size={36} />
        <Heading>Oops! Something went wrong.</Heading>
        <p>
          We’re sorry for the inconvenience. Please try refreshing the page or
          come back later.
        </p>
        <Button size="large" onClick={resetErrorBoundary}>
          Try again
        </Button>
      </Box>
    </StyledErrorFallback>
  );
};

export default ErrorFallback;
