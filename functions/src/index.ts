import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

const db = admin.firestore();

export const createChatBotMessage = functions.https.onCall(async (data, context) => {
  const { uid } = context?.auth || {};
  const { discussionId, messageId, prompt } = data || {};

  const user = JSON.parse(JSON.stringify(context?.auth || {}));

  const userRef = db.collection('users').doc(uid || 'uO4umSZvrmc5ff2SbxFD');
  const discussionRef = userRef.collection('discussions').doc(discussionId);
  const messageRef = discussionRef.collection('messages').doc(messageId);

  const userDoc = await userRef.get();
  if (!userDoc?.exists) {
    await userRef.set(user);
  }

  const discussionDoc = await discussionRef.get();
  if (!discussionDoc?.exists) {
    await discussionRef.set({
      uid: discussionId,
      title: prompt,
    });
  }

  const messageData = {
    prompt,
    uid: messageId,
  };

  if (prompt?.length > 0) {
    await messageRef.set(messageData);
    return { success: true, data: messageData };
  } else {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'The message must have a length greater than 0.',
    );
  }
});
