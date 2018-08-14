const textMessage = (text) => {
    if (!text) {
        throw new Error('Expected a text parameter');
    }

    const response = {
        text,
    };

    return response;
};

export default textMessage;
