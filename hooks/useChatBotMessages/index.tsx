import { useCallback, useMemo, useState } from 'react';
import { collection, query, orderBy, doc } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { useCollection } from 'react-firebase-hooks/firestore';

import { firestore, functions } from '../../services/firebase';
import { userAuth } from '../../context/authContext';

const useChatBotMessages = (
  message = '',
  setMessage: React.Dispatch<React.SetStateAction<string>>,
) => {
  const { user } = userAuth();

  const [sendLoading, setSendLoading] = useState(false);

  const messagesRef = collection(
    firestore,
    'users',
    user?.uid || 'uO4umSZvrmc5ff2SbxFD',
    'discussions',
    'aOPTFiUwMicVLZElzzbV',
    'messages',
  );

  const messagesQuery = query(messagesRef, orderBy('createTime', 'asc'));

  const [messagesSnapshot, messagesSnapshotLoading] = useCollection(messagesQuery);

  const memoizedMessages = useMemo(() => {
    return messagesSnapshot?.docs.map((doc) => doc.data());
  }, [messagesSnapshot]);

  const isLoading = messagesSnapshotLoading || sendLoading;

  const sendMessage = useCallback(async () => {
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
    setMessage('');
    setSendLoading(true);

    try {
      await createChatBotMessage({
        discussionId: 'aOPTFiUwMicVLZElzzbV',
        messageId: doc(collection(firestore, 'temp')).id,
        prompt: newMessage,
      });
    } catch (error) {
      const errorMessage = (error as { message: string }).message;
      console.error('Error sending message:', errorMessage);
    } finally {
      setSendLoading(false);
    }
  }, [message, setMessage, setSendLoading]);

  return {
    isLoading,
    messages: memoizedMessages,
    messagesLoading: messagesSnapshotLoading,
    sendMessage,
  };
};

export { useChatBotMessages };
