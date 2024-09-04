import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Fab, Menu, TextField } from '@mui/material';
import { collection, query, orderBy, doc } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { useCollection } from 'react-firebase-hooks/firestore';
import ChatIcon from '@mui/icons-material/Chat';
import SendIcon from '@mui/icons-material/Send';

import { firestore, functions } from '../../services/firebase';
import { userAuth } from '../../context/authContext';

import styles from './styles.module.css';

const ChatBot = () => {
  const { user } = userAuth();

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const [anchorElChat, setAnchorElChat] = useState<HTMLButtonElement | null>(null);
  const [message, setMessage] = useState('');
  const [sendLoading, setSendLoading] = useState(false);

  const toggleChat = (e?: React.MouseEvent<HTMLButtonElement> | null) => {
    setAnchorElChat(e?.currentTarget || null);
  };

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

  const isLoading = messagesSnapshotLoading || sendLoading;

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
    setMessage('');
    setSendLoading(true);

    try {
      const result = await createChatBotMessage({
        discussionId: 'aOPTFiUwMicVLZElzzbV',
        messageId: doc(collection(firestore, 'temp')).id,
        prompt: newMessage,
      });

      if (result?.data?.success) {
        console.log(result?.data);
      }
    } catch (error) {
      const errorMessage = (error as { message: string }).message;
      console.error('Error sending message:', errorMessage);
    } finally {
      setSendLoading(false);
    }
  };

  useEffect(() => {
    if (anchorElChat && chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [anchorElChat, isLoading, messagesSnapshot]);

  return (
    <>
      <Fab
        color="primary"
        aria-label="chatbot"
        className={styles.fab}
        aria-describedby="chatbot-popper"
        onClick={toggleChat}
      >
        <ChatIcon />
      </Fab>

      <Menu
        sx={{
          '& .MuiPaper-root': { mt: -2, p: 0, borderRadius: '0.38rem' },
          '& .MuiList-root': { p: 0 },
        }}
        id="chatbot-popper"
        anchorEl={anchorElChat}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={Boolean(anchorElChat)}
        onClose={() => toggleChat(null)}
        disableScrollLock
        disableEscapeKeyDown
      >
        <Box className={styles.chat_wrapper}>
          <Box className={styles.chat_container} ref={chatContainerRef}>
            {!messagesSnapshotLoading &&
              messagesSnapshot?.docs?.map((doc) => {
                const { createTime, prompt, response } = doc.data();

                return (
                  <Box key={createTime}>
                    <p>Q: {prompt}</p>
                    <p>R: {response || '...'}</p>
                  </Box>
                );
              })}
          </Box>

          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className={styles.chat_form}
          >
            <TextField
              id="send-message"
              label="Type a message"
              value={message}
              onChange={(e) => {
                e.stopPropagation();
                setMessage(e.target.value);
              }}
              onKeyDown={(e) => {
                e.stopPropagation();
              }}
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: '0 0 0 0.38rem',
                },
              }}
              size="small"
              fullWidth
            />

            <Button
              onClick={sendMessage}
              disabled={isLoading}
              variant="contained"
              size="small"
              className={styles.chat_button}
              type="submit"
            >
              <SendIcon />
            </Button>
          </form>
        </Box>
      </Menu>
    </>
  );
};

export default ChatBot;
