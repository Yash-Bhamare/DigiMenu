import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {

  const navigate = useNavigate();
  const [un, setun] = useState("");
  const [ps, setps] = useState("");

  function User(n) {
    setun(n.target.value)
  }

  function Pass(n) {
    setps(n.target.value)
  }

  function Submit(e) {
    e.preventDefault();
    const dt = {
      uname:un,
      pass:ps
    }
    axios.post("http://localhost:3000/admin-login",dt,{ withCredentials: true })
      .then(response => {
        if (response.data.status===200) {
          alert("Login Successful");
          navigate("/admin-panel");  // Redirect to admin panel
        } 
      })  
      .catch(error => {
         alert("Something went wrong. Please try again.");
      });
  }


  return (<>
    <Container className="mt-5" style={{ paddingTop: '50px', paddingBottom: '170px' }}>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="p-4 shadow">
            <Card.Body>
              <h2 className="text-center mb-4">Admin Login</h2>
              <Form onSubmit={Submit}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>USER NAME</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter UserName"
                    value={un}
                    onChange={User}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>PASSWORD</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={ps}
                    onChange={Pass}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">Login</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </>
  );
}
