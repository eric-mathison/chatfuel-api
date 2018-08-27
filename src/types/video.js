import attachments from './attachment';

const videoMessage = (url, qReplies) => {
    if (!url) {
        throw new Error('Expected an url parameter');
    }

    const validateUrl = () => /\.(mp4)$/.test(url);

    if (!validateUrl()) {
        throw new Error('Expected url to contain a mp4 file');
    }

    const response = attachments('video', { url }, qReplies);

    return response;
};

export default videoMessage;
