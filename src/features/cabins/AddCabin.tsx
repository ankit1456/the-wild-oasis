import { Button, Modal } from "../../ui";
import CreateCabinForm from "./CreateEditCabinForm";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opensWindowName="add-cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window windowName="add-cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddCabin;
