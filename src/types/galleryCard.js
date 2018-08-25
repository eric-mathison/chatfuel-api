const galleryCard = (title, imageUrl, subTitle, buttons) => {
    if (!title) {
        throw new Error('Expected a title parameter');
    }

    const buttonsArray = !buttons[0].buttons ? buttons : buttons[0].buttons;

    const response = {
        title,
        image_url: imageUrl,
        subtitle: subTitle,
        buttons: buttonsArray,
    };

    return response;
};

export default galleryCard;
