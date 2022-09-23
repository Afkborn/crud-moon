import React from "react";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const AddStockPopUp = ({ modal, toggle, handleAddStock }) => {
  const [size, setSize] = React.useState("");
  const [count, setCount] = React.useState(0);

  function handleAdd() {
    handleAddStock({ size, count:parseInt(count) });
    setSize("");
    setCount(0);
    toggle();
  }
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Stok Ekle</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="size">Size (Örn: S, M)</Label>
          <Input
            type="text"
            name="size"
            id="size"
            required
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="count">Adet</Label>
          <Input
            type="number"
            name="count"
            id="count"
            required
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button
          color="success"
          onClick={() => {
            handleAdd();
          }}
        >
          Ekle
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Vazgeç
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddStockPopUp;
