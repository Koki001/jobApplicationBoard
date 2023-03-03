const MyProfile = () => {
  return (
    <div className="dashboardContent">
      <h2>My Profile</h2>
      <div className="myProfileBio">
        <div className="bioPhoto">
          <div className="bioImage"></div>
          <button className="buttonSquareLimeGreen">Upload new photo</button>
          <button className="buttonSquareClear">Delete photo</button>
        </div>
        <div className="bioText">
          <div className="bioName">
            <label htmlFor="bioName">Full Name</label>
            <input id="bioName" type="text" />
          </div>
          <div className="bioBio">
            <label htmlFor="bioBio">Bio</label>
            <textarea
              className="bioBioText"
              name="bio"
              id="bioBio"
              rows={8}
            ></textarea>
          </div>
        </div>
      </div>
      <div className="myProfileSocials">
        <h3>Websites</h3>
        <div className="profileSocialsLinks">
          <label htmlFor="socialsLinks">Network Name</label>
          <input id="socialsLinks" type="text" />
        </div>
        <div className="profileSocialsLinks">
          <label htmlFor="socialsLinks2">Network 2 Name</label>
          <input id="socialsLinks2" type="text" />
        </div>
        <button className="buttonSquareClear">+ add more links</button>
      </div>
      <div className="myProfileLocation">
        <h3>Address</h3>
        <form action="" className="myProfileForm"></form>
      </div>
      <button className="buttonRoundDarkGreen">save</button>
      <button className="buttonRoundClear">cancel</button>
    </div>
  );
};

export default MyProfile;
