const Footer = () => {
  return (
    <footer className="footerMain">
      <div className="footerTop">
        <div className="footerLogo">
          <p>logo</p>
          <p>image</p>
        </div>
        <ul className="footerProducts">
          <li>Take the tour</li>
          <li>Live chat</li>
          <li>Self-service</li>
          <li>Mobile</li>
          <li>Collaboration</li>
          <li>Reviews</li>
        </ul>
        <ul className="footerLinks">
          <li>Pricing</li>
          <li>About us</li>
          <li>Careers</li>
          <li>Blog</li>
        </ul>
        <ul className="footerLegal">
          <li>Terms of use</li>
          <li>Terms & conditions</li>
          <li>Privacy</li>
          <li>Cookie policy</li>
        </ul>
        <div className="footerNewsletter">
          <p>Newsletter</p>
          <p>join us</p>
          <input type="text" />
        </div>
      </div>
      <div className="footerBottom">
        <div className="footerBottomLeft">
          <a href="#">Privacy & Terms</a>
          <a href="#">Contact Us</a>
        </div>
        <p>Copyright</p>
        <div className="footerBottomRight">
          <p>facebook</p>
          <p>insta</p>
          <p>pintrest</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer