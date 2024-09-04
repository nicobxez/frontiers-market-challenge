import React, { useState } from 'react';
import { collection, query, orderBy, doc } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { useCollection } from 'react-firebase-hooks/firestore';

import { firestore, functions } from '../services/firebase';
import { UserAuth } from '../context/authContext';

const ChatBot = () => {
  const { user } = UserAuth();

  const [message, setMessage] = useState('');
  const [update, setUpdate] = useState(false);

  const messagesRef = collection(
    firestore,
    'users',
    user?.uid || 'uO4umSZvrmc5ff2SbxFD',
    'discussions',
    'aOPTFiUwMicVLZElzzbV',
    'messages',
  );

  const messagesQuery = query(messagesRef, orderBy('createTime', 'asc'));

  const [messagesSnapshot, loading] = useCollection(messagesQuery);

  const sendMessage = async () => {
    const newMessage = message.trim();
    if (!newMessage) return;

    const createChatBotMessage = httpsCallable<
      {
        discussionId: string;
        messageId: string;
        prompt: string;
      },
      { success: boolean; message: string }
    >(functions, 'createChatBotMessage');
    try {
      const result = await createChatBotMessage({
        discussionId: 'aOPTFiUwMicVLZElzzbV',
        messageId: doc(collection(firestore, 'temp')).id,
        prompt: newMessage,
      });

      if (result?.data?.success) {
        setMessage('');
        console.log(result?.data);
      }
    } catch (error) {
      const errorMessage = (error as { message: string }).message;
      console.error('Error sending message:', errorMessage);
    } finally {
      setUpdate(false);
    }
  };

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
      <button onClick={sendMessage} disabled={update}>
        Send
      </button>
    </div>
  );
};

export default ChatBot;
