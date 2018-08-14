import attachment from './attachment';

const videoMessage = (url) => {
    if (!url) {
        throw new Error('Expected an url parameter');
    }

    const validateImage = () => /\.(mp4)$/.test(url);

    if (!validateImage()) {
        throw new Error('Expected url to contain a mp4 file');
    }

    const response = attachment('video', { url });

    return response;
};

export default videoMessage;
