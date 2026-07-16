import * as React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@fontsource/inter";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import styles from "./BpclContactUs.module.scss";


import type { SPFI } from "@pnp/sp";
import BpclContactUsServices, { ISubject } from "../Services/BpclContactUsServices";

interface IBpclContactUsProps {
  sp: SPFI;
}

const BpclContactUs: React.FC<IBpclContactUsProps> = ({ sp }) => {

  const [subjects, setSubjects] = React.useState<ISubject[]>([]);
  const [selectedSubject, setSelectedSubject] = React.useState<string>("");
  const [query, setQuery] = React.useState<string>("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");

  const service = React.useMemo(() => {
    return new BpclContactUsServices(sp);
  }, [sp]);

  React.useEffect(() => {
    loadSubjects();
  }, []);

  const loadSubjects = async (): Promise<void> => {

    try {

      const response = await service.getContactSubjects();
      setSubjects(response);

    } catch (error) {

      console.error("Error loading subjects:", error);

    }

  };

  const handleSubmit = async (): Promise<void> => {

    try {

      setErrorMessage("");

      if (!selectedSubject) {
        setErrorMessage("Please select a subject.");
        return;
      }

      if (!query.trim()) {
        setErrorMessage("Please enter your query.");
        return;
      }

      const selectedItem = subjects.find(
        item => item.Id === Number(selectedSubject)
      );

      if (!selectedItem || !selectedItem.SME) {
        setErrorMessage("SME is not configured for the selected subject.");
        return;
      }

      await service.saveContactQuery(
        Number(selectedSubject),
        selectedItem.SME.Id,
        query
      );

      setSuccessMessage("success");

      setTimeout(() => {
        setSuccessMessage("");
        setSelectedSubject("");
        setQuery("");
      }, 10000);

    } catch (error) {

      console.error(error);
      setErrorMessage("Something went wrong while submitting your query.");

    }

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

                  <Form>

                    <Form.Group className="mb-4">

                      <Form.Label>Select a Subject</Form.Label>

                      <Form.Select
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                      >
                        <option value="">Select</option>

                        {subjects.map((item) => (
                          <option
                            key={item.Id}
                            value={item.Id}
                          >
                            {item.Subject}
                          </option>
                        ))}

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
                      className={styles.submitBtn}
                      type="button"
                      onClick={handleSubmit}
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
                    alt="Contact Us"
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
                    onClick={() => {
                      window.location.href = "/sites/dev-iconnect-final"; 
                    }}
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