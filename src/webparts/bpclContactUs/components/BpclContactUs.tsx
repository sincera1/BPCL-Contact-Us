import * as React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@fontsource/inter";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import styles from "./BpclContactUs.module.scss";
import PopupModal from '../Services/PopupModal';

import type { SPFI } from "@pnp/sp";
import BpclContactUsServices, { ISubject } from "../Services/BpclContactUsServices";

interface IBpclContactUsProps {
  sp: SPFI;
}

const BpclContactUs: React.FC<IBpclContactUsProps> = ({ sp }) => {

  const [subjects, setSubjects] = React.useState<ISubject[]>([]);
  const [selectedSubject, setSelectedSubject] = React.useState<string>("");
  const [query, setQuery] = React.useState<string>("");
  const [showPopup, setShowPopup] = React.useState(false);
  const [popupType, setPopupType] = React.useState<"success" | "danger" | "confirm">("success");
  const [popupMessage, setPopupMessage] = React.useState("");

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

      if (!selectedSubject) {

        setPopupType("danger");
        setPopupMessage("Please select a subject.");
        setShowPopup(true);
        return;

      }

      if (!query.trim()) {

        setPopupType("danger");
        setPopupMessage("Please enter your query.");
        setShowPopup(true);
        return;

      }

      const selectedItem = subjects.find(
        item => item.Id === Number(selectedSubject)
      );

      if (!selectedItem || !selectedItem.SME) {

        setPopupType("danger");
        setPopupMessage("SME is not configured for the selected subject.");
        setShowPopup(true);
        return;

      }

      await service.saveContactQuery(
        Number(selectedSubject),
        selectedItem.SME.Id,
        query
      );

      setPopupType("success");
      setPopupMessage("Your query has been submitted successfully.");
      setShowPopup(true);

      setSelectedSubject("");
      setQuery("");

    } catch (error) {

      console.error(error);

      setPopupType("danger");
      setPopupMessage("Something went wrong while submitting your query.");
      setShowPopup(true);

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

          </Row>

        </div>
      </Container>

      <PopupModal
        show={showPopup}
        type={popupType}
        message={popupMessage}
        onClose={() => setShowPopup(false)}
      />

    </div>
  );
};

export default BpclContactUs;