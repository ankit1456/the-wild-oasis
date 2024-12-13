import EditSettingsForm from "../features/settings/EditSettingsForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Settings() {
  return (
    <Row $align="vertical">
      <Heading as="h1">Update hotel settings</Heading>
      <EditSettingsForm />
    </Row>
  );
}

export default Settings;
