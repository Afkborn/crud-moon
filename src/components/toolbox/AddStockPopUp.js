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
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  function handleAdd() {
    if (size && count) {
      handleAddStock({ size, count });
      setSize("");
      setCount(0);
      toggle();
    } else {
      setError(true);
      setErrorMessage("Please fill all fields");
    }
  }

  function handleClose() {
    setError(false);
    setErrorMessage("");
    setSize("");
    setCount(0);
    toggle();
  }

  function handleChange(event) {
    setError(false);
    setErrorMessage("");
    const { name, value } = event.target;
    if (name === "size") {
      setSize(value);
    }
    if (name === "count") {

      setCount(parseInt(value));
    }
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
            onChange={handleChange}
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
            onChange={handleChange}
            min={0}
          />
        </FormGroup>
        {error && <p style={{ color: "red" }}>{errorMessage}</p>}
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
        <Button
          color="secondary"
          onClick={() => {
            handleClose();
          }}
        >
          Vazgeç
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddStockPopUp;
