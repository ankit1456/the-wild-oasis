import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import styled from "styled-components";
import { ConfirmDelete, Menus, Modal, Table } from "../../ui";
import { formatCurrency } from "../../utils/helpers";
import { TCabin } from "./cabin.types";
import CreateEditCabinForm from "./CreateEditCabinForm";
import useCreateCabin from "./hooks/useCreateCabin";
import useDeleteCabin from "./hooks/useDeleteCabin";

type Props = {
  cabin: TCabin;
};

function CabinRow({ cabin }: Props) {
  const {
    id: cabinId,
    discount,
    image,
    name,
    maxCapacity,
    regularPrice,
    description,
  } = cabin;

  const { deleteCabin, isDeleting } = useDeleteCabin();
  const { createCabin, isCreating } = useCreateCabin();

  function handleCabinDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      description,
      discount,
      maxCapacity,
      regularPrice,
      image,
    });
  }

  return (
    <Table.Row>
      <Img src={image} />
      <CabinName>{name}</CabinName>
      <div>Fits up to {maxCapacity}</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>
        {discount ? formatCurrency(discount) : <span>&mdash;</span>}
      </Discount>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId} />
            <Menus.List id={cabinId}>
              <Menus.Button
                onClick={handleCabinDuplicate}
                icon={<HiSquare2Stack />}
              >
                Duplicate
              </Menus.Button>

              <Modal.Open opensWindowName="edit-cabin-form">
                <Menus.Button disabled={isCreating} icon={<HiPencil />}>
                  Edit
                </Menus.Button>
              </Modal.Open>

              <Modal.Open opensWindowName="confirm-delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>
            <Modal.Window windowName="edit-cabin-form">
              <CreateEditCabinForm editPayload={cabin} />
            </Modal.Window>

            <Modal.Window windowName="confirm-delete">
              <ConfirmDelete
                resourceName="cabin"
                disabled={isDeleting}
                onConfirm={() => deleteCabin(cabinId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const CabinName = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;
