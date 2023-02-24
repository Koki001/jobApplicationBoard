const Header = () => {
  return (
    <header className="mainHeader">
      <nav className="navWrapper">
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
      <h1>
        <span>Find & Hire</span> <span>Experts for any Job.</span>
      </h1>
      <p>
        Unlock your potential with quality jobs & earn from world leading brands
      </p>
      <div className="headerSearchContainer">
        <div className="headerSearchLeft">
          <label htmlFor="category">Category</label>
          <select name="category" id="category">
            <option value="">something</option>
            <option value="">something2</option>
            <option value="">something3</option>
            <option value="">something4</option>
          </select>
        </div>
        <div className="headerSearchMiddle">
          <label htmlFor="keyword">keyword or company</label>
          <input id="keyword" type="text" />
        </div>
        <div className="headerSearchRight">
          <button>Search</button>
        </div>
      </div>
      <div className="headerStats">
        <p>some stats</p>
        <p>used by</p>
        <div className="companyUserLogos">
          <p>google</p>
          <p>shipbob</p>
          <p>dribble</p>
          <p>slack</p>
          <p>vine</p>
          <p>airbnb</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
