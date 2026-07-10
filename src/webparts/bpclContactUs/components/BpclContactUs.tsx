import * as React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import '@fontsource/inter';              
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import styles from "./BpclContactUs.module.scss";

const BpclContactUs: React.FC<{}> = () => {

  return (
    <div className={styles.contactPage}>

      {/* Hero Banner */}

      <div className={styles.heroSection}>
        <div className={styles.overlay} />

        <Container className={styles.heroContent}>
          <h1>Contact Us</h1>
        </Container>
      </div>

      {/* Contact Card */}

      <Container className={styles.contactContainer}>
        <div className={styles.contactCard}>

          <Row className="align-items-center">

            {/* Left */}

            <Col lg={6} md={12}>

              <h2>
                Ask Our <span>Experts</span> Today
              </h2>

              <p>
                Provide a subject and your query, and our experts will
                respond as soon as possible.
              </p>

              <div className={styles.line} />

              <Form>

                <Form.Group className="mb-4">
                  <Form.Label>Select a Subject</Form.Label>

                  <Form.Select>

                    <option>Select</option>
                    <option>IT</option>
                    <option>HR</option>
                    <option>Finance</option>

                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Enter your Query here</Form.Label>

                  <Form.Control
                    as="textarea"
                    rows={6}
                  />
                </Form.Group>

                <Button className={styles.submitBtn}>
                  Submit
                </Button>

              </Form>

            </Col>

            {/* Right */}

            <Col lg={6} md={12} className="text-center">

              <img
                src={require("../assets/contact.jpg")}
                className={styles.sideImage}
              />

            </Col>

          </Row>

        </div>
      </Container>

    </div>
  );
};

export default BpclContactUs;