import attachment from './attachment';

const fileMessage = (url) => {
    if (!url) {
        throw new Error('Expected an url parameter');
    }

    const response = attachment('file', { url });

    return response;
};

export default fileMessage;
