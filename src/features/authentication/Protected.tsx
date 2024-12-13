import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import useUser from "./hooks/useUser";
import { Conditional } from "../../ui";

function Protected({ children }: Readonly<PropsWithChildren>) {
  const { isPending, isAuthenticated } = useUser();

  if (isPending) {
    return (
      <FullPage>
        <Spinner />;
      </FullPage>
    );
  }

  return (
    <Conditional test={!isAuthenticated && !isPending} fallback={children}>
      <Navigate to="/login" replace />
    </Conditional>
  );
}

export default Protected;

const FullPage = styled.div`
  height: 100dvh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;
