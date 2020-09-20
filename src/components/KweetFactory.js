import { dbService, storageService } from "firebaseConfig";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function KweetFactory({ userObj }) {
  const [kweet, setKweet] = useState("");
  const [attachment, setAttachment] = useState("");

  async function onSubmit(event) {
    event.preventDefault();

    let attachmentURL = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentURL = await response.ref.getDownloadURL();
    }
    const newKweet = {
      text: kweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentURL,
    };
    await dbService.collection("kweets").add(newKweet);
    setKweet("");
  }

  function onChange(event) {
    const {
      target: { value },
    } = event;

    setKweet(value);
  }

  function onFileChange(event) {
    const {
      target: { files },
    } = event;

    const file = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
  }

  function onClearAttachment() {
    setAttachment(null);
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        value={kweet}
        onChange={onChange}
        type="text"
        placeholder="What's on your mind?"
        maxLength={120}
      />
      <input type="file" accept="image/*" onChange={onFileChange} />
      <input type="submit" value="Kweet" />
      {attachment && (
        <div>
          <img src={attachment} width="100px" height="100px" alt="preview" />
          <button onClick={onClearAttachment}>Clear</button>
        </div>
      )}
    </form>
  );
}

export default KweetFactory;
