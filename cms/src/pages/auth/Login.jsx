import { useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { setInForm } from "../../lib";
import { FormField } from "../../components";

export const Login = () => {
  const [form, setForm] = useState({});
  const [remember, setRemember] = useState(false);
  const handleSubmit = ev => {
    ev.preventDefault();
  };
  return (
    <Container>
      <Row>
        <Col
          lg={4}
          md={5}
          sm={8}
          className="my-5 py-3 shadow-sm bg-body mx-auto">
          <Row>
            <Col>
              <h1 className="text-center">Login</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form onSubmit={handleSubmit}>
                <FormField label="Email" title="email">
                  <Form.Control
                    type="text"
                    name="email"
                    id="email"
                    onChange={ev => setInForm(ev, form, setForm)}
                    required></Form.Control>
                </FormField>
                <FormField label="Password" title="password">
                  <Form.Control
                    type="text"
                    name="password"
                    id="password"
                    onChange={ev => setInForm(ev, form, setForm)}
                    required></Form.Control>
                </FormField>
                <div className="mb-3 form-check">
                  <Form.Check.Input
                    value="yes"
                    id="remember"
                    defaultChecked={remember}
                    onClick={ev => setRemember(!remember)}></Form.Check.Input>
                  <Form.Check.Label htmlFor="remember">
                    Remember Me
                  </Form.Check.Label>
                </div>
                <div className="mb-3 d-grid">
                  <Button variant="dark">
                    <i className="fa-solid fa-sign-in-alt me-2"></i>Login
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
