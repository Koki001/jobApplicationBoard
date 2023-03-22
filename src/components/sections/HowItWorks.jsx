import React, { useState } from "react";
import { Link } from "react-router-dom";
// MUI imports
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const HowItWorks = () => {
  const [expanded, setExpanded] = useState("panel1");
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <section id="about" className="howItWorks wrapper">
      <h2>How does it work?</h2>
      <div className="howToSteps">
        <div className="howToAccount">
          <div className="howToIcon">
            <img
              src="../assets/howItWorks/account.png"
              alt="create account icon"
            />
          </div>
          <h5>Create Account</h5>
          <p>It's very easy to start your journey with us.</p>
        </div>
        <div className="howToArrow">
          <img
            src="../assets/howItWorks/arrow.png"
            alt="arrow pointing to the next step in the process"
          />
        </div>
        <div className="howToProfile">
          <div className="howToIcon">
            <img
              src="../assets/howItWorks/profile.png"
              alt="complete profile icon"
            />
          </div>
          <h5>Complete your profile</h5>
          <p>Complete your profile to get best results when searching.</p>
        </div>
        <div className="howToArrow">
          <img
            src="../assets/howItWorks/arrow.png"
            alt="arrow pointing to the next step in the process"
          />
        </div>
        <div className="howToApply">
          <div className="howToIcon">
            <img
              src="../assets/howItWorks/apply.png"
              alt="apply to jobs icon"
            />
          </div>
          <h5>Apply for jobs or hire</h5>
          <p>Get results with any requirements you may have.</p>
        </div>
      </div>
      <div className="howToTalent">
        <div className="howToLeft">
          <img src="../assets/jobGuides/blogPlaceholder.png" alt="" />
        </div>
        <div className="howToRight">
          <div>
            <p className="whyUs">Why choose us?</p>
            <h2>World of talent at your fingertips</h2>
          </div>
          <div className="howToAccordion">
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
              sx={{ boxShadow: "none" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography
                  sx={{
                    fontSize: "0.8rem",
                    color: "#31795A",
                    fontWeight: "bold",
                  }}
                >
                  Seamless Search
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: "0.8rem" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
              sx={{ boxShadow: "none" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography
                  sx={{
                    fontSize: "0.8rem",
                    color: "#31795A",
                    fontWeight: "bold",
                  }}
                >
                  Hire top talents
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: "0.8rem" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
              sx={{ boxShadow: "none" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography
                  sx={{
                    fontSize: "0.8rem",
                    color: "#31795A",
                    fontWeight: "bold",
                  }}
                >
                  Protected payments
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: "0.8rem" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
          <Link to={"/pricing"}>
            <button className="buttonRoundGreen">See pricing</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
