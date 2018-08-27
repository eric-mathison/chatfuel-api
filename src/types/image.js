import attachments from './attachment';

const imageMessage = (url, qReplies) => {
    if (!url) {
        throw new Error('Expected an url parameter');
    }

    const validateUrl = () => /\.(?:jpg|gif|png)$/.test(url);

    if (!validateUrl()) {
        throw new Error('Expected url to contain an image');
    }

    const response = attachments('image', { url }, qReplies);

    return response;
};

export default imageMessage;
