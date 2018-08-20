const blockButton = (block, title) => {
    if (!block) {
        throw new Error('Expected a block name parameter');
    }

    if (!title) {
        throw new Error('Expected a title parameter');
    }

    const response = {
        type: 'show_block',
        block_names: [block],
        title,
    };

    return response;
};

export default blockButton;
