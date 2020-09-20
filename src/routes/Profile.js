import { authService, dbService } from "firebaseConfig";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function Profile({ userObj, refreshUser }) {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  useEffect(() => {
    getMyKweets();
  }, []);

  async function getMyKweets() {
    const kweets = await dbService
      .collection("kweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt")
      .get();

    console.log(kweets.docs.map((doc) => doc.data()));
  }

  function onLogOutClick() {
    authService.signOut();
    history.push("/");
  }

  function onChange(event) {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  }

  async function onSubmit(event) {
    event.preventDefault();

    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} type="text" value={newDisplayName} />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
}

export default Profile;
