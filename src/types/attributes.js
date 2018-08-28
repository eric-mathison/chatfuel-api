const attributes = (attribute, type, title, opt) => {
    if (!attribute) {
        throw new Error('Expected an attribute parameter');
    }

    const setAttribute = {
        set_attributes: attribute,
    };

    if (type === 'json') {
        setAttribute.type = 'json_plugin_url';
        setAttribute.url = opt;
        setAttribute.title = title;
    }

    if (type === 'block') {
        setAttribute.type = 'show_block';
        setAttribute.block_names = opt;
        setAttribute.title = title;
    }

    return setAttribute;
};

export default attributes;
