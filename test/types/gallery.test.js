import gallery from '../../src/types/gallery';

describe('Gallery Messages', () => {
    it('should return an error if no element provided', () => {
        const response = () => gallery();

        expect(response).to.throw('Expected an element parameter');
    });

    it('should return a gallery message', () => {
        const elements = {
            title: 'Test Title',
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
        const response = gallery(elements);

        expect(response).to.deep.equal({
            attachment: {
                type: 'template',
                payload: {
                    template_type: 'generic',
                    image_aspect_ratio: 'square',
                    elements: [
                        {
                            title: 'Test Title',
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
