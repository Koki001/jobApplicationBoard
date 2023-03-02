const MyProfile = () => {
  return (
    <div className="dashboardContent">
      <h2>My Profile</h2>
      <div className="myProfileBio">
        <div className="bioPhoto">
          <p>image</p>
          <button>upload</button>
          <button>delete</button>
        </div>
        <div className="bioText">
          <p>bio text</p>
        </div>
      </div>
      <div className="myProfileSocials">
        <h3>social media</h3>
        <p>link</p>
        <p>link</p>
        <button>add more links</button>
      </div>
      <div className="myProfileLocation">
        <h3>Address</h3>
        <form action="" className="myProfileForm">

        </form>
      </div>
      <button>save</button>
      <button>cancel</button>
    </div>
  );
};

export default MyProfile;
