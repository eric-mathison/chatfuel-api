import attachment from './attachment';

const gallery = (...elements) => {
    if (Object.keys(elements).length === 0) {
        throw new Error('Expected an element parameter');
    }

    const elementsArray =
        Object.keys(elements).length >= 1 ? elements : elements[0];

    const galleryWrapper = {
        template_type: 'generic',
        image_aspect_ratio: 'square',
        elements: elementsArray,
    };

    const response = attachment('template', galleryWrapper);

    return response;
};

export default gallery;
