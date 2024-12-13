import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, FileInput, Form, FormRow, Input, Textarea } from "../../ui";
import { createCabinSchema, TCabin, TCabinFormData } from "./cabin.types";
import useCreateCabin from "./hooks/useCreateCabin";
import useEditCabin from "./hooks/useEditCabin";

type Props = {
  onCloseModal?: () => void;
  editPayload?: TCabin;
};

function CreateEditCabinForm({ onCloseModal, editPayload }: Props) {
  const { createCabin, isCreating } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();

  const { id: editId, ...cabinToEdit } = editPayload ?? {};

  const isEditMode = !!editId;
  const isWorking = isCreating || isEditing;

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<TCabinFormData>({
    defaultValues: isEditMode ? cabinToEdit : { discount: 0 },
    resolver: zodResolver(createCabinSchema),
    mode: "all",
  });

  const onSubmit: SubmitHandler<TCabinFormData> = (data) => {
    if (!data.image)
      return setError("image", { message: "Please upload cabin image" });

    const callbackOptions = {
      onSuccess: () => {
        reset();
        onCloseModal?.();
      },
    };
    if (isEditMode)
      editCabin({ editCabinPayload: data, id: editId }, callbackOptions);
    else createCabin(data, callbackOptions);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors.name?.message}>
        <Input
          disabled={isWorking}
          type="text"
          id="name"
          {...register("name")}
        />
      </FormRow>
      <FormRow label="Maximum capacity" error={errors.maxCapacity?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            valueAsNumber: true,
          })}
        />
      </FormRow>
      <FormRow label="Regular price" error={errors.regularPrice?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            valueAsNumber: true,
          })}
        />
      </FormRow>
      <FormRow label="Discount" error={errors.discount?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="discount"
          {...register("discount", {
            valueAsNumber: true,
          })}
        />
      </FormRow>
      <FormRow
        label="Description for website"
        error={errors.description?.message}
      >
        <Textarea
          disabled={isWorking}
          id="description"
          {...register("description")}
        />
      </FormRow>
      <FormRow label="Cabin photo" error={errors.image?.message}>
        <FileInput
          disabled={isWorking}
          id="image"
          accept="image/*"
          {...register("image")}
        />
      </FormRow>

      {/* type=reset , this is a native html attribute */}
      <FormRow>
        <Button
          onClick={() => onCloseModal?.()}
          $variant="secondary"
          size="large"
          type="reset"
        >
          Cancel
        </Button>

        <Button disabled={isWorking}>
          {isEditMode ? "Update Cabin" : "Add cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateEditCabinForm;
