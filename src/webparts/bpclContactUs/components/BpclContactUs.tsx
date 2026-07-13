import * as React from "react";
import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import '@fontsource/inter';              
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import styles from "./BpclContactUs.module.scss";

const BpclContactUs: React.FC<{}> = () => {

const [subject, setSubject] = useState("");
const [query, setQuery] = useState("");
const [errorMessage, setErrorMessage] = useState("");
const [successMessage, setSuccessMessage] = useState("");
//const [showForm, setShowForm] = useState(true);
const handleSubmit = (e: React.FormEvent): void => {
  e.preventDefault();

  setErrorMessage("");

  // Validation
  if (!subject || !query.trim()) {
    setErrorMessage("Please fill in all required fields.");
    return;
  }

  // TODO: Save to SharePoint here

  setSuccessMessage("success");

  setTimeout(() => {
    setSuccessMessage("");
    setSubject("");
    setQuery("");
  }, 10000);
};
 
 
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

              {!successMessage ? (

                <>
                  {/* Left */}

                  <Col lg={6} md={12}>

                    <h2>
                      Ask Our <span>Experts</span> Today
                    </h2>

                    <p>
                      Provide a subject and your query, and our experts
                      will respond as soon as possible.
                    </p>

                    <div className={styles.line} />

                    <Form onSubmit={handleSubmit}>

                      <Form.Group className="mb-4">
                        <Form.Label>Select a Subject</Form.Label>

                        <Form.Select
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                        >
                          <option value="">Select</option>
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
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                        />

                      </Form.Group>

                      {errorMessage && (
                        <div className={styles.errorMessage}>
                          {errorMessage}
                        </div>
                      )}

                      <Button
                        type="submit"
                        className={styles.submitBtn}
                      >
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

                </>

              ) : (

                <Col xs={12}>

                  <div className={styles.successContainer}>

                    <div className={styles.successCircle}>
                      <i className="bi bi-check-lg"></i>
                    </div>

                    <h2>Thank You!</h2>

                    <h5>Your query has been submitted successfully.</h5>

                    <div className={styles.successDivider}>
                      <span>
                        <i className="bi bi-headset"></i>
                      </span>
                    </div>

                    <h4>Our expert will respond to you soon.</h4>

                    <p>
                      We appreciate you reaching out to us.
                      <br />
                      Our team will review your query and get back to you
                      at the earliest.
                    </p>

                    <Button
                      variant="outline-primary"
                      onClick={() => setSuccessMessage("")}
                    >
                      <i className="bi bi-house-door me-2"></i>
                      Back
                    </Button>

                  </div>

                </Col>

              )}

            </Row>

        </div>
      </Container>

    </div>
  );
};

export default BpclContactUs;