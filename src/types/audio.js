import attachment from './attachment';

const audioMessage = (url) => {
    if (!url) {
        throw new Error('Expected an url parameter');
    }

    const validateUrl = () => /\.(?:mp3|ogg|wav)$/.test(url);

    if (!validateUrl()) {
        throw new Error('Expected url to contain an audio file');
    }

    const response = attachment('audio', { url });

    return response;
};

export default audioMessage;
