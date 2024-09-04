import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

const db = admin.firestore();

export const createChatBotMessage = functions.https.onCall(async (data, context) => {
  const { uid } = context?.auth || {};
  const { discussionId, messageId, message } = data || {};

  const user = JSON.parse(JSON.stringify(context?.auth || {}));

  if (!uid) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'The function must be called while authenticated.',
    );
  }

  const userRef = db.collection('users').doc(uid);
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
      title: message,
    });
  }

  const messageData = {
    prompt: message,
  };

  if (message?.length > 0) {
    await messageRef.set(messageData);
    return { success: true, data: messageData };
  } else {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'The message must have a length greater than 0.',
    );
  }
});
