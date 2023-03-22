import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ParagraphGenerator } from "../helpers/Faker";
// MUI imports
import PinterestIcon from "@mui/icons-material/Pinterest";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Footer = () => {
  const [terms, setTerms] = useState(false);
  const [conditions, setConditions] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [cookies, setCookies] = useState(false);
  const [text, setText] = useState("");
  useEffect(() => {
    setText(ParagraphGenerator(5));
  }, []);

  const handleOpenTerms = () => setTerms(true);
  const handleCloseTerms = () => setTerms(false);
  const handleOpenConditions = () => setConditions(true);
  const handleCloseConditions = () => setConditions(false);
  const handleOpenPrivacy = () => setPrivacy(true);
  const handleClosePrivacy = () => setPrivacy(false);
  const handleOpenCookies = () => setCookies(true);
  const handleCloseCookies = () => setCookies(false);
  return (
    <footer id="contact" className="footerMain navWrapper">
      <div className="footerTop">
        <div className="footerTopHalf">
          <div className="footerLogo">
            <img src="../assets/header/jobiLogo.png" alt="jobi company logo" />
          </div>
          <div>
            <h4>Products</h4>
            <ul className="footerProducts">
              <li>
                <a href="#">Take the tour</a>
              </li>
              <li>
                <a href="#">Live chat</a>
              </li>
              <li>
                <a href="#">Self-service</a>
              </li>
              <li>
                <a href="#">Mobile</a>
              </li>
              <li>
                <a href="#">Collaboration</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Links</h4>
            <ul className="footerLinks">
              <li>
                <Link to={"/pricing"}>Pricing</Link>
              </li>
              <li>
                <Link to={"/#about"}>About us</Link>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#blog">Blog</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Legal</h4>
            <ul className="footerLegal">
              <li>
                <p className="legalList" onClick={handleOpenTerms}>
                  Terms of Use
                </p>
                <Dialog
                  open={terms}
                  onClose={handleCloseTerms}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Terms of Use"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText
                      sx={{ fontFamily: "Gordita Regular", fontSize: "0.7rem" }}
                      id="alert-dialog-description"
                    >
                      <span className="fakeTextBreaks">{text}</span>
                      <span className="fakeTextBreaks">{text}</span>
                      <span className="fakeTextBreaks">{text}</span>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      color="success"
                      onClick={handleCloseTerms}
                      autoFocus
                    >
                      Ok
                    </Button>
                  </DialogActions>
                </Dialog>
              </li>
              <li>
                <p className="legalList" onClick={handleOpenConditions}>
                  Terms & Conditions
                </p>
                <Dialog
                  open={conditions}
                  onClose={handleCloseConditions}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Terms & Conditions"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText
                      sx={{ fontFamily: "Gordita Regular", fontSize: "0.7rem" }}
                      id="alert-dialog-description"
                    >
                      <span className="fakeTextBreaks">{text}</span>
                      <span className="fakeTextBreaks">{text}</span>
                      <span className="fakeTextBreaks">{text}</span>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      color="success"
                      onClick={handleCloseConditions}
                      autoFocus
                    >
                      Ok
                    </Button>
                  </DialogActions>
                </Dialog>
              </li>
              <li>
                <p className="legalList" onClick={handleOpenPrivacy}>
                  Privacy
                </p>
                <Dialog
                  open={privacy}
                  onClose={handleClosePrivacy}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">{"Privacy"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText
                      sx={{ fontFamily: "Gordita Regular", fontSize: "0.7rem" }}
                      id="alert-dialog-description"
                    >
                      <span className="fakeTextBreaks">{text}</span>
                      <span className="fakeTextBreaks">{text}</span>
                      <span className="fakeTextBreaks">{text}</span>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      color="success"
                      onClick={handleClosePrivacy}
                      autoFocus
                    >
                      Ok
                    </Button>
                  </DialogActions>
                </Dialog>
              </li>
              <li>
                <p className="legalList" onClick={handleOpenCookies}>
                  Cookie Policy
                </p>
                <Dialog
                  open={cookies}
                  onClose={handleCloseCookies}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Cookie Policy"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText
                      sx={{ fontFamily: "Gordita Regular", fontSize: "0.7rem" }}
                      id="alert-dialog-description"
                    >
                      <span className="fakeTextBreaks">{text}</span>
                      <span className="fakeTextBreaks">{text}</span>
                      <span className="fakeTextBreaks">{text}</span>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      color="success"
                      onClick={handleCloseCookies}
                      autoFocus
                    >
                      Ok
                    </Button>
                  </DialogActions>
                </Dialog>
              </li>
            </ul>
          </div>
        </div>
        <div className="footerNewsletter">
          <h4>Newsletter</h4>
          <p>Join & get important updates</p>
          <div className="newsletterInputs">
            <label className="sr-only" htmlFor="newsEmail">
              Please enter your e-mail
            </label>
            <input id="newsEmail" placeholder="Enter your email" type="email" />
            <button className="buttonSquareGreen">Send</button>
          </div>
          <span>We only send interesting and relevant emails.</span>
        </div>
      </div>
      <div className="footerBottom">
        <div className="footerBottomLeft">
          <a href="#">Privacy & Terms</a>
          <Link to={"/contactUs"}>Contact Us</Link>
        </div>
        <p>Copyright© 2023 jobi inc.</p>
        <div className="footerBottomRight">
          <a href="#">
            <FacebookIcon />
          </a>
          <a href="#">
            <InstagramIcon />
          </a>
          <a href="#">
            <PinterestIcon />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
