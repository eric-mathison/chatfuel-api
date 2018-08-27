const attachments = (type, payload, qReplies) => {
    const attachment = {
        attachment: {
            type,
            payload,
        },
    };

    if (qReplies !== undefined) {
        const qRArray = !qReplies.quick_replies ? qReplies[0] : qReplies.quick_replies;
        attachment.quick_replies = qRArray;
    }

    return attachment;
};

export default attachments;
