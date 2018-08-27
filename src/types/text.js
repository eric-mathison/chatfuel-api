const textMessage = (text, qReplies) => {
    if (!text) {
        throw new Error('Expected a text parameter');
    }

    const response = {
        text,
    };

    if (qReplies !== undefined) {
        const qRArray = !qReplies.quick_replies ? qReplies[0] : qReplies.quick_replies;
        response.quick_replies = qRArray;
    }

    return response;
};

export default textMessage;
