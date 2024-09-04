import React from 'react';
import { Box } from '@mui/material';
import { Timestamp } from '@google-cloud/firestore';

interface IChatCard {
  prompt: string;
  response?: string;
  createTime?: Timestamp;
  isLoading?: boolean;
}

const ChatCard = ({ prompt, response }: IChatCard) => {
  return (
    <Box>
      <p>Q: {prompt}</p>
      <p>R: {response || '...'}</p>
    </Box>
  );
};

export default ChatCard;
