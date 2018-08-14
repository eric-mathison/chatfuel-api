import attachment from './attachment';

const imageMessage = url => {
    if (!url) {
        throw new Error('Expected an url parameter');
    }

    const validateImage = () => /\.(?:jpg|gif|png)$/.test(url);

    if (!validateImage()) {
        throw new Error('Expected url to contain an image');
    }

    const response = attachment('image', { url });

    return response;
};

export default imageMessage;
