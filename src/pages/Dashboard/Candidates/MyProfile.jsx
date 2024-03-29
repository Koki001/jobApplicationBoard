import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { USER, PHOTO } from "../../../redux/slices/userSlice";
import { ref as sRef } from "firebase/storage";
import { ref, onValue, update } from "firebase/database";
import { db, auth, storage } from "../../../firebase/firebase";
import { uploadBytes, getDownloadURL } from "firebase/storage";
// MUI imports +
import EditIcon from "@mui/icons-material/Edit";
import TextareaAutosize from "react-textarea-autosize";

const MyProfile = () => {
  const [editInfo, setEditInfo] = useState({});
  const [file, setFile] = useState(useSelector((state) => state.user.photo));
  const [enableEdit, setEnableEdit] = useState(false);
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
  // edit profile
  useEffect(() => {
    if (enableEdit === false) {
      const userID = auth.currentUser.uid;
      onValue(ref(db, `users/` + userID), (snapshot) => {
        dispatch(USER(snapshot.val()));
      });
    }
  }, [enableEdit]);
  // workaround for line break
  const handleLineBreak = (e) => {
    if (e.code === "Enter") {
      setEditInfo((prev) => ({ ...prev, bio: prev.bio + "\n" }));
    }
  };
  const handleSaveEdits = () => {
    setEnableEdit(false);
    const userID = auth.currentUser.uid;
    update(ref(db, `users/` + userID), editInfo);
  };
  const handlePhotoUpload = (e) => {
    const storageRef = sRef(storage, `avatar/${auth.currentUser.uid}/logo`);
    if (e.target.files) {
      uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
        getDownloadURL(
          sRef(storage, `avatar/${auth.currentUser.uid}/logo`)
        ).then((url) => {
          update(ref(db, `users/${auth.currentUser.uid}`), {
            logo: url,
          });
          dispatch(PHOTO(url));
          setFile(url);
        });
      });
    }
  };
  useEffect(() => {
    onValue(ref(db, `users/` + auth.currentUser.uid), (snapshot) => {
      dispatch(PHOTO(snapshot.val().logo));
      setFile(snapshot.val().logo);
    });
  }, [auth.currentUser]);
  return (
    <div className="dashboardContent">
      <h2>My Profile</h2>
      <div className="myProfileBio">
        <div className="bioPhoto">
          <div className="bioImage">
            <img src={file} alt="profile" />
          </div>
          <div className="uploadPhoto">
            <label className="buttonSquareLimeGreen" htmlFor="upload">
              Upload new photo
            </label>
            <input
              onChange={handlePhotoUpload}
              id="upload"
              type={"file"}
              className="sr-only"
            />
          </div>
          <button className="buttonSquareClear deletePhoto">
            Delete photo
          </button>
          <div className="editIcon">
            <EditIcon
              onClick={() => setEnableEdit(true)}
              sx={{ height: "30xp", width: "30px" }}
            />
            <p>Edit Info</p>
          </div>
        </div>

        <div className="bioText">
          <div className="bioName">
            <label htmlFor="bioName">Full Name </label>
            <input
              className={enableEdit ? "editable" : ""}
              readOnly={enableEdit ? false : true}
              defaultValue={user?.name}
              onChange={(e) =>
                setEditInfo((prev) => ({ ...prev, name: e.target.value }))
              }
              id="bioName"
              type="text"
            />
          </div>
          <div className="bioBio">
            <label htmlFor="bioBio">Bio</label>
            <TextareaAutosize
              className={enableEdit ? "editable bioBioText" : "bioBioText"}
              readOnly={enableEdit ? false : true}
              onChange={(e) =>
                setEditInfo((prev) => ({ ...prev, bio: e.target.value }))
              }
              onKeyDown={handleLineBreak}
              name="bio"
              id="bioBio"
              defaultValue={user?.bio}
            />
          </div>
        </div>
      </div>
      <div className="myProfileSocials">
        <h3>Websites</h3>
        <div className="profileSocialsLinks">
          <label htmlFor="socialsLinks">Network Name</label>
          <input
            readOnly={enableEdit ? false : true}
            id="socialsLinks"
            type="text"
            className={enableEdit ? "editable" : ""}
          />
        </div>
        <div className="profileSocialsLinks">
          <label htmlFor="socialsLinks2">Network 2 Name</label>
          <input
            readOnly={enableEdit ? false : true}
            id="socialsLinks2"
            type="text"
            className={enableEdit ? "editable" : ""}
          />
        </div>
        <button className="buttonSquareClear">+ add more links</button>
      </div>
      <div className="myProfileLocation">
        <h3>Location</h3>
        <form action="" className="myProfileForm">
          <div className="addressTop">
            <label htmlFor="profileStreet">Address</label>
            <input
              className={enableEdit ? "editable" : ""}
              readOnly={enableEdit ? false : true}
              id="profileStreet"
              type="text"
              defaultValue={user?.address}
              onChange={(e) =>
                setEditInfo((prev) => ({ ...prev, address: e.target.value }))
              }
            />
          </div>
          <div className="addressMiddle">
            <div className="profileCountry">
              <label htmlFor="profileCountry">Country</label>
              <input
                className={enableEdit ? "editable" : ""}
                readOnly={enableEdit ? false : true}
                id="profileCountry"
                type="text"
                defaultValue={user?.country}
                onChange={(e) =>
                  setEditInfo((prev) => ({ ...prev, country: e.target.value }))
                }
              />
            </div>
            <div className="profileCity">
              <label htmlFor="profileCity">City</label>
              <input
                className={enableEdit ? "editable" : ""}
                readOnly={enableEdit ? false : true}
                id="profileCity"
                type="text"
                defaultValue={user?.city}
                onChange={(e) =>
                  setEditInfo((prev) => ({ ...prev, city: e.target.value }))
                }
              />
            </div>
            <div className="profilePostal">
              <label htmlFor="profilePostal">Post Code</label>
              <input
                className={enableEdit ? "editable" : ""}
                readOnly={enableEdit ? false : true}
                id="profilePostal"
                type="text"
                defaultValue={user?.postal}
                onChange={(e) =>
                  setEditInfo((prev) => ({ ...prev, postal: e.target.value }))
                }
              />
            </div>
          </div>
        </form>
      </div>
      <button
        onClick={handleSaveEdits}
        className={
          enableEdit
            ? "buttonRoundGreen visibleButton"
            : "buttonRoundGreen hiddenButton"
        }
      >
        save changes
      </button>
    </div>
  );
};

export default MyProfile;
