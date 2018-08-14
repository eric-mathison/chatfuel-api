import attachment from './attachment';

const imageMessage = (url) => {
    if (!url) {
        throw new Error('Expected an url parameter');
    }

    const validateUrl = () => /\.(?:jpg|gif|png)$/.test(url);

    if (!validateUrl()) {
        throw new Error('Expected url to contain an image');
    }

    const response = attachment('image', { url });

    return response;
};

export default imageMessage;
