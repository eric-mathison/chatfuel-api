const urlButton = (url, title) => {
    if (!url) {
        throw new Error('Expected a url parameter');
    }

    if (!title) {
        throw new Error('Expected a title parameter');
    }

    const response = {
        type: 'web_url',
        url,
        title,
    };

    return response;
};

export default urlButton;
