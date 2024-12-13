import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { TUserPayload } from "./user.types";
import useSignup from "./hooks/useSignup";
import SpinnerMini from "../../ui/SpinnerMini";
import styled from "styled-components";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm<TUserPayload>({
    mode: "all",
  });

  const { signUp, isCreating, error } = useSignup();

  const onSubmit: SubmitHandler<TUserPayload> = ({
    fullName,
    email,
    password,
  }) => {
    signUp(
      { fullName, email, password },
      {
        onSettled: () => reset(),
      }
    );
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", {
            required: "full name is required",
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow
        label="Email address"
        error={
          error?.message.endsWith("invalid")
            ? "please provide a valid email"
            : errors.email?.message
        }
      >
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "please provide a valid email",
            },
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "password is required",
            minLength: {
              value: 8,
              message: "password needs a minimum of 8 characters",
            },
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: getValues().password
              ? "please confirm your password"
              : "",
            validate: (value: string) =>
              getValues().password === value || "passwords do not match",
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button disabled={isCreating} $variant="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>
          {isCreating ? (
            <Flex>
              <SpinnerMini />
              <span>Creating...</span>
            </Flex>
          ) : (
            "Create new user"
          )}
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
