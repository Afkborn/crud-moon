import React from "react";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const DeletePopUp = ({ modal, toggle, name, handleDelete }) => {
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        {name}'i silmek istediğinden emin misin?
      </ModalHeader>
      <ModalBody>
        {name}'i silmek istediğinden emin misin? Bu işlem geri alınamaz.
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={handleDelete}>
          SİL
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Vazgeç
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeletePopUp;
