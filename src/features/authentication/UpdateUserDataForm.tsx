import { FormEvent, useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useUpdateUser } from "./hooks/useUpdateUser";
import useUser from "./hooks/useUser";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const { user } = useUser();

  const { updateUser, isUpdating } = useUpdateUser();
  const { fullName: currentFullName } = user?.user_metadata ?? {};

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState<File>();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!fullName) return;
    updateUser(
      {
        fullName,
        avatar,
      },
      {
        onSuccess: () => {
          setAvatar(undefined);
          if (e.target instanceof HTMLFormElement) e.target.reset();
        },
      }
    );
  }

  const handleCancel = () => {
    setFullName(currentFullName);
    setAvatar(undefined);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={user?.email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target?.files?.[0])}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow>
        <Button onClick={handleCancel} type="reset" $variant="secondary">
          Cancel
        </Button>
        <Button disabled={isUpdating}>
          {isUpdating ? "Updating..." : "Update account"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
