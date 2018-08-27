import attachments from './attachment';

const fileMessage = (url, qReplies) => {
    if (!url) {
        throw new Error('Expected an url parameter');
    }

    const response = attachments('file', { url }, qReplies);

    return response;
};

export default fileMessage;
