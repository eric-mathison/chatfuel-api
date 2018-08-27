const quickReply = (type, attr, title) => {
    if (!type) {
        throw new Error('Expected a type parameter');
    }

    if (!attr) {
        throw new Error('Expected an attribute parameter');
    }

    if (!title) {
        throw new Error('Expected a title parameter');
    }

    if (type === 'block') {
        const response = {
            title,
            block_names: [...attr],
        };
        return response;
    }

    if (type === 'json') {
        const response = {
            title,
            url: attr,
            type: 'json_plugin_url',
        };
        return response;
    }

    throw new Error('Not a valid type');
};

export default quickReply;
