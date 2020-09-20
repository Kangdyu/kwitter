import Kweet from "components/Kweet";
import { dbService } from "firebaseConfig";
import React, { useEffect, useState } from "react";
import KweetFactory from "components/KweetFactory";

function Home({ userObj }) {
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

  return (
    <div>
      <KweetFactory userObj={userObj} />
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
