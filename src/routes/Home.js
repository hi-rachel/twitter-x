import React, { useState } from "react";
import { dbService } from "./fbase";
import { collection, addDoc } from "firebase/firestore";

const Home = () => {
  const [tweet, setTweet] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(dbService, "tweet"), {
        tweet,
        createdAt: Date.now(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setTweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={tweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Tweet" />
      </form>
    </div>
  );
};
export default Home;
