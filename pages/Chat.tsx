import React, { useState } from 'react';
import { firestore } from '../services/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

const ChatBot = () => {
  const [message, setMessage] = useState('');

  const messagesRef = collection(
    firestore,
    'users',
    'uO4umSZvrmc5ff2SbxFD',
    'discussions',
    'aOPTFiUwMicVLZElzzbV',
    'messages',
  );

  const messagesQuery = query(messagesRef, orderBy('createTime', 'asc'));

  const [messagesSnapshot, loading] = useCollection(messagesQuery);

  if (!loading) {
    messagesSnapshot?.docs.map((doc) => console.log(doc.data()));
  }

  return (
    <div>
      <div>
        {!loading &&
          messagesSnapshot?.docs?.map((doc) => {
            const { createTime, prompt, response } = doc.data();

            return (
              <div key={createTime}>
                <p>Q: {prompt}</p>
                <p>R: {response}</p>
              </div>
            );
          })}
      </div>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      {/* <button onClick={sendMessage}>Send</button> */}
    </div>
  );
};

export default ChatBot;
