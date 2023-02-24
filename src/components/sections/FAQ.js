import { useState } from "react";
// MUI imports
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
const FAQ = () => {
  const [expanded, setExpanded] = useState("panel1");
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <section id="faq" className="faq wrapper">
      <h2>
        <span>Frequently Asked</span> Questions
      </h2>
      <div className="faqAccordion">
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          sx={{ boxShadow: "none" }}
        >
          <AccordionSummary
            sx={{ "&:hover": { backgroundColor: "#EFF6F3" } }}
            expandIcon={
              expanded === "panel1" ? (
                <RemoveIcon
                  sx={{
                    transition: "all 0.1s linear",
                    borderRadius: "50%",
                    "&:hover": {
                      backgroundColor: "#00BF58",
                      transform: "scale(1.2)",
                      color: "white",
                    },
                  }}
                />
              ) : (
                <AddIcon
                  sx={{
                    transition: "all 0.1s linear",
                    borderRadius: "50%",
                    "&:hover": {
                      backgroundColor: "#00BF58",
                      transform: "scale(1.2)",
                      color: "white",
                    },
                  }}
                />
              )
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography
              sx={{
                fontSize: "0.8rem",
                fontWeight: "bold",
                padding: "15px 0",
              }}
            >
              How does the free trial work?
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
            sx={{ "&:hover": { backgroundColor: "#EFF6F3" } }}
            expandIcon={
              expanded === "panel2" ? (
                <RemoveIcon
                  sx={{
                    transition: "all 0.1s linear",
                    borderRadius: "50%",
                    "&:hover": {
                      backgroundColor: "#00BF58",
                      transform: "scale(1.2)",
                      color: "white",
                    },
                  }}
                />
              ) : (
                <AddIcon
                  sx={{
                    transition: "all 0.1s linear",
                    borderRadius: "50%",
                    "&:hover": {
                      backgroundColor: "#00BF58",
                      transform: "scale(1.2)",
                      color: "white",
                    },
                  }}
                />
              )
            }
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography
              sx={{
                fontSize: "0.8rem",

                fontWeight: "bold",
                padding: "15px 0",
              }}
            >
              How do you find different criteria in your process?
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
            sx={{ "&:hover": { backgroundColor: "#EFF6F3" } }}
            expandIcon={
              expanded === "panel3" ? (
                <RemoveIcon
                  sx={{
                    transition: "all 0.1s linear",
                    borderRadius: "50%",
                    "&:hover": {
                      backgroundColor: "#00BF58",
                      transform: "scale(1.2)",
                      color: "white",
                    },
                  }}
                />
              ) : (
                <AddIcon
                  sx={{
                    transition: "all 0.1s linear",
                    borderRadius: "50%",
                    "&:hover": {
                      backgroundColor: "#00BF58",
                      transform: "scale(1.2)",
                      color: "white",
                    },
                  }}
                />
              )
            }
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography
              sx={{
                fontSize: "0.8rem",

                fontWeight: "bold",
                padding: "15px 0",
              }}
            >
              What do you look for in a founding team?
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
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
          sx={{ boxShadow: "none" }}
        >
          <AccordionSummary
            sx={{ "&:hover": { backgroundColor: "#EFF6F3" } }}
            expandIcon={
              expanded === "panel4" ? (
                <RemoveIcon
                  sx={{
                    transition: "all 0.1s linear",
                    borderRadius: "50%",
                    "&:hover": {
                      backgroundColor: "#00BF58",
                      transform: "scale(1.2)",
                      color: "white",
                    },
                  }}
                />
              ) : (
                <AddIcon
                  sx={{
                    transition: "all 0.1s linear",
                    borderRadius: "50%",
                    "&:hover": {
                      backgroundColor: "#00BF58",
                      transform: "scale(1.2)",
                      color: "white",
                    },
                  }}
                />
              )
            }
            aria-controls="panel4a-content"
            id="panel4a-header"
          >
            <Typography
              sx={{
                fontSize: "0.8rem",

                fontWeight: "bold",
                padding: "15px 0",
              }}
            >
              Do you recommend pay-as-you-go or pre-pay ?
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
          expanded={expanded === "panel5"}
          onChange={handleChange("panel5")}
          sx={{ boxShadow: "none" }}
        >
          <AccordionSummary
            sx={{ "&:hover": { backgroundColor: "#EFF6F3" } }}
            expandIcon={
              expanded === "panel5" ? (
                <RemoveIcon
                  sx={{
                    transition: "all 0.1s linear",
                    borderRadius: "50%",
                    "&:hover": {
                      backgroundColor: "#00BF58",
                      transform: "scale(1.2)",
                      color: "white",
                    },
                  }}
                />
              ) : (
                <AddIcon
                  sx={{
                    transition: "all 0.1s linear",
                    borderRadius: "50%",
                    "&:hover": {
                      backgroundColor: "#00BF58",
                      transform: "scale(1.2)",
                      color: "white",
                    },
                  }}
                />
              )
            }
            aria-controls="panel5a-content"
            id="panel5a-header"
          >
            <Typography
              sx={{
                fontSize: "0.8rem",
                fontWeight: "bold",
                padding: "15px 0",
              }}
            >
              What do i get for $10 with my plan?
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
      <p className="faqLink">
        Didn't find the answer? We can help. <a href="#">Click here</a>
      </p>
    </section>
  );
};

export default FAQ;
