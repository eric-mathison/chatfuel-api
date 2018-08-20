const jsonButton = (url, title) => {
    if (!url) {
        throw new Error('Expected a url parameter');
    }

    if (!title) {
        throw new Error('Expected a title parameter');
    }

    const response = {
        type: 'json_plugin_url',
        url,
        title,
    };

    return response;
};

export default jsonButton;
