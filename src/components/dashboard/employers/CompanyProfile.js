import { db, auth } from "../../../firebase";
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import { ref, child, get, onValue, update } from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { USER } from "../../../redux/slices/userSlice";

// MUI imports
import EditIcon from "@mui/icons-material/Edit";

const CompanyProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const accountType = useSelector((state) => state.type.type);
  const [editInfo, setEditInfo] = useState({});

  const [enableEdit, setEnableEdit] = useState(false);

  useEffect(() => {
    // if (enableEdit === false) {
    const userID = auth.currentUser.uid;
    onValue(ref(db, `users/${accountType}/` + userID), (snapshot) => {
      dispatch(USER(snapshot.val()));
    });
    // }
  }, [enableEdit]);
  const handleLineBreak = (e) => {
    if (e.code === "Enter") {
      setEditInfo((prev) => ({ ...prev, bio: prev.bio + " _lnbr " }));
    }
  };
  const handleSaveEdits = () => {
    setEnableEdit(false);
    const userID = auth.currentUser.uid;
    update(ref(db, `users/${accountType}/` + userID), editInfo);
  };

  return (
    <div className="dashboardContent">
      <h2>Profile</h2>
      <div className="myProfileBio">
        <div className="bioPhoto">
          <div className="bioImage"></div>
          <button className="buttonSquareLimeGreen">Upload new photo</button>
          <button className="buttonSquareClear">Delete photo</button>
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
            <label htmlFor="bioName">Company Name</label>
            <input
              className={enableEdit ? "editable" : ""}
              readOnly={enableEdit ? false : true}
              defaultValue={user?.name || user?.companyName}
              onChange={(e) =>
                setEditInfo((prev) => ({ ...prev, name: e.target.value }))
              }
              id="bioName"
              type="text"
            />
          </div>
          <div className="companyInfo">
            <div className="companyEmail">
              <label htmlFor="companyEmail">Email</label>
              <input
                onChange={(e) =>
                  setEditInfo((prev) => ({ ...prev, email: e.target.value }))
                }
                defaultValue={user?.email}
                readOnly={enableEdit ? false : true}
                className={enableEdit ? "editable" : ""}
                id="companyEmail"
                type="text"
              />
            </div>
            <div className="companySite">
              <label htmlFor="companySite">Website</label>
              <input
                onChange={(e) =>
                  setEditInfo((prev) => ({ ...prev, site: e.target.value }))
                }
                defaultValue={user?.site}
                readOnly={enableEdit ? false : true}
                className={enableEdit ? "editable" : ""}
                id="companySite"
                type="text"
              />
            </div>
            <div className="companyDate">
              <label htmlFor="companyDate">Date Founded</label>
              <input
                onChange={(e) =>
                  setEditInfo((prev) => ({ ...prev, founded: e.target.value }))
                }
                defaultValue={user?.founded}
                readOnly={enableEdit ? false : true}
                className={enableEdit ? "editable" : ""}
                id="companyDate"
                type="text"
              />
            </div>
            <div className="companySize">
              <label htmlFor="companySize">Number of Employees</label>
              <input
                onChange={(e) =>
                  setEditInfo((prev) => ({ ...prev, size: e.target.value }))
                }
                defaultValue={user?.size}
                readOnly={enableEdit ? false : true}
                className={enableEdit ? "editable" : ""}
                id="companySize"
                type="text"
              />
            </div>
            <div className="companyNumber">
              <label htmlFor="companyNumber">Phone Number</label>
              <input
                onChange={(e) =>
                  setEditInfo((prev) => ({ ...prev, phone: e.target.value }))
                }
                defaultValue={user?.phone}
                readOnly={enableEdit ? false : true}
                className={enableEdit ? "editable" : ""}
                id="companyNumber"
                type="text"
              />
            </div>
            <div className="companyCategory">
              <label htmlFor="companyCategory">Category</label>
              <input
                onChange={(e) =>
                  setEditInfo((prev) => ({ ...prev, category: e.target.value }))
                }
                defaultValue={user?.category}
                readOnly={enableEdit ? false : true}
                className={enableEdit ? "editable" : ""}
                id="companyCategory"
                type="text"
              />
            </div>
          </div>
          <div className="bioBio">
            <label htmlFor="bioBio">About</label>
            <textarea
              className={enableEdit ? "editable bioBioText" : "bioBioText"}
              readOnly={enableEdit ? false : true}
              onChange={(e) =>
                setEditInfo((prev) => ({ ...prev, bio: e.target.value }))
              }
              onKeyDown={handleLineBreak}
              name="bio"
              id="bioBio"
              rows={8}
              defaultValue={user?.bio}
            ></textarea>
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

export default CompanyProfile;
