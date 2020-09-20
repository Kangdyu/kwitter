import { dbService, storageService } from "firebaseConfig";
import React, { useState } from "react";

function Kweet({ kweetObj, isOwner }) {
  const [editing, setEditing] = useState(false);
  const [newKweet, setNewKweet] = useState(kweetObj.text);

  async function onDeleteClick() {
    const ok = window.confirm("Are you sure to delete this kweet?");
    if (ok) {
      await dbService.doc(`kweets/${kweetObj.id}`).delete();
      if (kweetObj.attachmentURL !== "") {
        await storageService.refFromURL(kweetObj.attachmentURL).delete();
      }
    }
  }

  function toggleEditing() {
    setEditing((prev) => !prev);
  }

  function onSubmit(event) {
    event.preventDefault();
    dbService.doc(`kweets/${kweetObj.id}`).update({ text: newKweet });
    setEditing(false);
  }

  function onChange(event) {
    const {
      target: { value },
    } = event;
    setNewKweet(value);
  }

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your kweet"
              value={newKweet}
              onChange={onChange}
              required
            />
            <input type="submit" value="Update Kweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{kweetObj.text}</h4>
          {kweetObj.attachmentURL && (
            <img
              src={kweetObj.attachmentURL}
              width="50px"
              height="50px"
              alt="img"
            />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Kweet;
