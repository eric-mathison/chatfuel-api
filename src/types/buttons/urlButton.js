const urlButton = (url, title, extensions = false) => {
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
        messenger_extensions: extensions,
    };

    return response;
};

export default urlButton;
