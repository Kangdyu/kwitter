import Kweet from "components/Kweet";
import { dbService } from "firebaseConfig";
import React, { useEffect, useState } from "react";

function Home({ userObj }) {
  const [kweet, setKweet] = useState("");
  const [kweets, setKweets] = useState([]);

  useEffect(() => {
    dbService.collection("kweets").onSnapshot((snapshot) => {
      const kweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setKweets(kweetArr);
    });
  }, []);

  async function onSubmit(event) {
    event.preventDefault();
    await dbService.collection("kweets").add({
      text: kweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setKweet("");
  }

  function onChange(event) {
    const {
      target: { value },
    } = event;

    setKweet(value);
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={kweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Kweet" />
      </form>
      <div>
        {kweets.map((kweet) => (
          <Kweet
            key={kweet.id}
            kweetObj={kweet}
            isOwner={kweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
