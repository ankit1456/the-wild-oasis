import { FormEvent, useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRowVertical from "../../ui/FormRowVertical";
import Input from "../../ui/Input";
import useLogin from "./hooks/useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
import styled from "styled-components";
import { Conditional } from "../../ui";

function LoginForm() {
  const [email, setEmail] = useState("dummy@example.com");
  const [password, setPassword] = useState("test1234");

  const { isPending, loginMutate } = useLogin();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!email || !password) return;

    loginMutate({ email, password });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isPending}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isPending}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isPending}>
          <Flex>
            <Conditional test={isPending}>
              <SpinnerMini />
            </Conditional>
            Log in
          </Flex>
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;

const Flex = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;
