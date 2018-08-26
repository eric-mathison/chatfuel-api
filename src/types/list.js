import attachment from './attachment';

const list = (buttons, ...elements) => {
    if (Object.keys(elements).length === 0) {
        throw new Error('Expected an element parameter');
    }

    const elementsArray =
        Object.keys(elements).length >= 1 ? elements : elements[0];

    const listWrapper = {
        template_type: 'list',
        top_element_style: 'compact',
        elements: elementsArray,
    };

    if (buttons !== undefined) {
        const buttonsArray = !buttons.buttons ? buttons : buttons.buttons;
        listWrapper.buttons = buttonsArray;
    }

    const response = attachment('template', listWrapper);

    return response;
};

export default list;
