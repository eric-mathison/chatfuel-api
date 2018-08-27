import attachments from './attachment';

const audioMessage = (url, qReplies) => {
    if (!url) {
        throw new Error('Expected an url parameter');
    }

    const validateUrl = () => /\.(?:mp3|ogg|wav)$/.test(url);

    if (!validateUrl()) {
        throw new Error('Expected url to contain an audio file');
    }

    const response = attachments('audio', { url }, qReplies);

    return response;
};

export default audioMessage;
