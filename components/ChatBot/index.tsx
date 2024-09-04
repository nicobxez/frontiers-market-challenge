import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Fab, Menu, TextField } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import SendIcon from '@mui/icons-material/Send';

import { useChatBotMessages } from '../../hooks/useChatBotMessages';

import ChatCard from './ChatCard';
import styles from './styles.module.css';

const ChatBot = () => {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const [anchorElChat, setAnchorElChat] = useState<HTMLButtonElement | null>(null);
  const [inputText, setInputText] = useState('');

  const { messages, isLoading, messagesLoading, sendMessage } = useChatBotMessages(
    inputText,
    setInputText,
  );

  const toggleChat = (e?: React.MouseEvent<HTMLButtonElement> | null) => {
    setAnchorElChat(e?.currentTarget || null);
  };

  useEffect(() => {
    if (anchorElChat && chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [anchorElChat, isLoading, messages]);

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
            {messages?.map(({ createTime, prompt, response }) => {
              return (
                <ChatCard
                  key={createTime}
                  prompt={prompt}
                  response={response}
                  createTime={createTime}
                  isLoading={messagesLoading}
                />
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
              value={inputText}
              onChange={(e) => {
                e.stopPropagation();
                setInputText(e.target.value);
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
