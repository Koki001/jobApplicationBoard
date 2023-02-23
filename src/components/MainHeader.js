const MainHeader = () => {
  return (
    <header className="mainHeader">
      <nav>
        <div className="navLogo">
          <p>jobi logo</p>
        </div>
        <ul className="navMenu">
          <li>home</li>
          <li>jobs</li>
          <li>explore</li>
          <li>contact</li>
          <li>pages</li>
        </ul>
        <div className="navButtons">
          <button>login/sign up</button>

          <button>hire top talent</button>
        </div>
      </nav>
    </header>
  );
};

export default MainHeader;
