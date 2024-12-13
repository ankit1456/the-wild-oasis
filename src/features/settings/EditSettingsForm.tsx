import { FocusEvent } from "react";
import { Form, FormRow, Input, Spinner } from "../../ui";
import useEditSettings from "./hooks/useEditSettings";
import useSettings from "./hooks/useSettings";

function EditSettingsForm() {
  const {
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
    isLoadingSettings,
  } = useSettings();

  const { editSetting, isEditting } = useEditSettings();

  if (isLoadingSettings) return <Spinner />;

  function handleSettingChange(e: FocusEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    if (!value) return;
    editSetting({ [name]: value });
  }

  // This time we are using UNCONTROLLED fields, so we will NOT store state
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          defaultValue={minBookingLength}
          name="minBookingLength"
          onBlur={handleSettingChange}
          disabled={isEditting}
          id="min-nights"
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          defaultValue={maxBookingLength}
          name="maxBookingLength"
          onBlur={handleSettingChange}
          disabled={isEditting}
          id="max-nights"
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          defaultValue={maxGuestsPerBooking}
          onBlur={handleSettingChange}
          name="maxGuestsPerBooking"
          disabled={isEditting}
          id="max-guests"
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          defaultValue={breakfastPrice}
          onBlur={handleSettingChange}
          name="breakfastPrice"
          disabled={isEditting}
          id="breakfast-price"
        />
      </FormRow>
    </Form>
  );
}

export default EditSettingsForm;
