import list from '../../src/types/list';

describe('List Messages', () => {
    it('should return an error if no element provided', () => {
        const response = () => list();

        expect(response).to.throw('Expected an element parameter');
    });

    it('should return a list message', () => {
        const elements = {
            title: 'Test List',
            image_url: 'https://test.com/test.png',
            subtitle: 'Test Subtitle',
            buttons: [
                {
                    type: 'web_url',
                    url: 'https://test.com/test/',
                    title: 'Test URL',
                },
            ],
        };
        const response = list(elements);

        expect(response).to.deep.equal({
            attachment: {
                type: 'template',
                payload: {
                    template_type: 'list',
                    top_element_style: 'compact',
                    elements: [
                        {
                            title: 'Test List',
                            image_url: 'https://test.com/test.png',
                            subtitle: 'Test Subtitle',
                            buttons: [
                                {
                                    type: 'web_url',
                                    url: 'https://test.com/test/',
                                    title: 'Test URL',
                                },
                            ],
                        },
                    ],
                },
            },
        });
    });
});
