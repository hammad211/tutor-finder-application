import apiService from '../apiService';

const getConversation = (userId) => {
  return apiService
    .request('get', '/chat/conversation/'+ userId)
    .then((res) => {
      return res;
    });
};

const postMessage = (conversation_id, sender_id, messages, receiver_id,formattedTime,
  formattedDate) => {
  return apiService
    .request('post', '/chat/message', { conversation_id, sender_id, messages, receiver_id, formattedTime, formattedDate })
    .then((res) => {
      return res;
    });
};

const postConversation = (sRegId,tRegId) => {
  return apiService
    .request('post', '/chat/conversation', { sRegId,tRegId})
    .then((res) => {
      return res;
    });
};

const getMessages = (conversationId) => {
  return apiService
    .request('get', '/chat/message/' + conversationId )
    .then((res) => {
      return res;
    });
};

export { getConversation, postMessage, getMessages, postConversation };
