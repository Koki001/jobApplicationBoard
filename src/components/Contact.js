import NavBar from "./helpers/NavBar";
import Footer from "./sections/Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// MUI imports
import CircularProgress from "@mui/material/CircularProgress";

const Contact = () => {
  const location = useLocation();
  const [image, setImage] = useState();
  const apiKey = process.env.REACT_APP_MAP_QUEST_API;
  const imageUrl = `https://www.mapquestapi.com/staticmap/v5/map?key=${apiKey}&locations=483 Queen St, M5V 2A9&defaultMarker=marker-sm-3B5998-22407F&size=1100,500@2x`;
  const displayMap = async () => {
    const res = await fetch(imageUrl);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setImage(imageObjectURL);
  };
    useEffect(() => {
      document.documentElement.scrollTo(0, 0);
    }, [location.key]);
  useEffect(() => {
    displayMap();
  }, []);
  return (
    <div>
      <section className="contactUs" id="contactUs">
        <header className="contactHeader">
          <NavBar />
          <div
            className={
              image === undefined ? `flexed contactUsMap` : `contactUsMap`
            }
          >
            {image === undefined ? (
              <CircularProgress color="success" />
            ) : (
              <img src={image} alt="map location of Juno College" />
            )}
          </div>
        </header>
        <div className="contactDiv">
          <h1>Get in touch</h1>
          <ul className="contactTypes">
            <li>
              <div className="contactIcons">
                <img src="../assets/contact/address.png" alt="address logo" />
              </div>
              <h5>Our Address</h5>
              <p>483 Queen St W.</p>
              <p>Toronto, Ontario</p>
            </li>
            <li>
              <div className="contactIcons">
                <img src="../assets/contact/info.png" alt="mail logo" />
              </div>
              <h5>Contact Info</h5>
              <p>Start a chat or give us a call at</p>
              <p className="contactPhone">416.123.4567</p>
            </li>
            <li>
              <div className="contactIcons">
                <img src="../assets/contact/support.png" alt="chat logo" />
              </div>
              <h5>Live Support</h5>
              <p>Live chat service</p>
              <a href="#">www.robo-chat-jobi.com</a>
            </li>
          </ul>
          <form action="">
            <div className="contactUsTop">
              <div className="contactUsName">
                <label htmlFor="contactUsName">Name*</label>
                <input id="contactUsName" type="text" />
              </div>
              <div className="contactUsEmail">
                <label htmlFor="contactUsEmail">Email*</label>
                <input id="contactUsEmail" type="email" />
              </div>
            </div>
            <div className="contactUsMiddle">
              <label htmlFor="contactUsSubject">Subject {"(optional)"}</label>
              <input id="contactUsSubject" type="text" />
            </div>
            <div className="contactUsBottom">
              <label className="sr-only" htmlFor="contactUsMessage">
                Please enter your message here
              </label>
              <textarea
                id="contactUsMessage"
                cols="30"
                rows="10"
                placeholder="Your Message"
              ></textarea>
              <button className="buttonSquareGreen" type="button">
                send message
              </button>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
