const callButton = (number, title) => {
    // number format +12342322344
    if (!number) {
        throw new Error('Expected a phone number parameter');
    }

    if (!title) {
        throw new Error('Expected a title parameter');
    }

    const response = {
        type: 'phone_number',
        phone_number: number,
        title,
    };

    return response;
};

export default callButton;
