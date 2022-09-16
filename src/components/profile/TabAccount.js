import React from "react";
// , { useState }

import {
  Label,
  FormGroup,
  Input,
  Container,
  Row,
  Col,

} from "reactstrap";
// import SelectInput from "../toolbox/SelectInput";
function TabAccount({ user, setActiveTab, history, ...props }) {
    // const [email, setEmail] = useState(user.email);
    // const [password, setPassword] = useState("");
    // const [passwordConfirm, setPasswordConfirm] = useState("");
    // const [name, setName] = useState(user.name);
    // const [surname, setSurname] = useState(user.surname);
    // const [phone, setPhone] = useState(user.phone);
    // const [address, setAddress] = useState(user.address);
    // const [sellername, setSellername] = useState(user.sellername);
  return (
    <div className="m-2">
      <Container>
        <Row xs={1} sm={1} md={2} lg={2}>
          <Col>
            <FormGroup className="">
              <Label for="sellername">Seller Name</Label>
              <Input
                type="text"
                name="sellername"
                id="sellername"
                placeholder="Seller Name"
                value={user.sellername}
                required
                // onChange={(e) => setSellername(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup className="">
              <Label for="email">E-mail</Label>
              <Input
                type="text"
                disabled={true}
                name="email"
                id="email"
                placeholder="E-mail"
                value={user.email}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup className="">
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="First Name"
                value={user.name}
                required
                // onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup className="">
              <Label for="surname">Surname</Label>
              <Input
                type="text"
                name="surname"
                id="surname"
                required
                placeholder="Last Name"
                value={user.surname}
                // onChange={(e) => setSurname(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup className="">
              <Label for="phone">Phone</Label>
              <Input
                type="text"
                name="phone"
                id="phone"
                placeholder="Phone"
                value={user.phone}
                // onChange={(e) => setPhone(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup className="">
              <Label for="mersis">Mersis No</Label>
              <Input
                type="text"
                name="mersis"
                id="mersis"
                disabled={true}
                placeholder="Mersis No"
                value={user.mersis}
              />
            </FormGroup>
          </Col>


          {/*  GENDER SIDE FOR MOON FRONTEND 
          <Col>
            <SelectInput
              name="gender"
              label="Gender"
              defaultOption="Select Gender"
              options={[
                { value: "e", text: "Men" },
                { value: "k", text: "Woman" },
              ]}
            ></SelectInput>
          </Col> */}
        </Row>
      </Container>
    </div>
  );
}

export default TabAccount;
