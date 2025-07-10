import React, { useState } from 'react';
import { Container, Navbar, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { FaUtensils, FaLayerGroup, FaBalanceScale, FaSignOutAlt, FaTachometerAlt, FaHome } from 'react-icons/fa';
import Dashbrd from './controllers/Dashbrd';
import AddMenu from './controllers/AddMenu';
import AddFoodCat from './controllers/AddFoodCat';
import AddQty from './controllers/AddQty';
import { useNavigate } from 'react-router-dom';

export default function AdminPanel() {
  const [activeComponent, setActiveComponent] = useState("dashboard");

  const navigate = useNavigate();
  function handleLogout() {
     if (window.confirm("Are you sure you want to logout?"))
      {
       alert("Logged out successfully!");
       navigate("/admin-login");
      }

  }
    
  return (  
    <>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" className="px-3">
        <Navbar.Brand><FaTachometerAlt className="me-2" /> Admin Panel</Navbar.Brand>
      </Navbar>

      <Container fluid>
        <Row>
          {/* Sidebar */}
          <Col md={3} lg={2} className="bg-light min-vh-100 p-3">
            <ListGroup>
              <ListGroup.Item action active={activeComponent === "dashboard"} onClick={() => setActiveComponent("dashboard")}>
                <FaHome className="me-2" /> Dashboard
              </ListGroup.Item>

              <ListGroup.Item action active={activeComponent === "menu"} onClick={() => setActiveComponent("menu")}>
                <FaUtensils className="me-2" /> Manage Menu
              </ListGroup.Item>

              <ListGroup.Item action active={activeComponent === "groups"} onClick={() => setActiveComponent("groups")}>
                <FaLayerGroup className="me-2" /> Manage Food Groups
              </ListGroup.Item>

              <ListGroup.Item action active={activeComponent === "quantity"} onClick={() => setActiveComponent("quantity")}>
                <FaBalanceScale className="me-2" /> Manage Quantity
              </ListGroup.Item>

              <ListGroup.Item action variant="danger" onClick={handleLogout}>
                <FaSignOutAlt className="me-2" /> Logout
              </ListGroup.Item>

            </ListGroup>
          </Col>

          {/* Main Content */}
          <Col md={9} lg={10} className="p-4">
            <Card className="p-4 shadow">
              {activeComponent === "dashboard" && <Dashbrd />}
              {activeComponent === "menu" && <AddMenu />}
              {activeComponent === "groups" && <AddFoodCat />}
              {activeComponent === "quantity" && <AddQty />}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
