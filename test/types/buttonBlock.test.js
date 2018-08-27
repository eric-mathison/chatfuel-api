import buttonBlock from '../../src/types/buttonBlock';

describe('Button Block', () => {
    it('should return an error if no text provided', () => {
        const response = () => buttonBlock();

        expect(response).to.throw('Expected a text parameter');
    });

    it('should return an error if no buttons provided', () => {
        const text = 'Test Text';
        const response = () => buttonBlock(text);

        expect(response).to.throw('Expected a buttons parameter');
    });

    it('should return a button block', () => {
        const text = 'Test Text';
        const buttons = [
            {
                type: 'web_url',
                url: 'https://test.com/test/',
                title: 'Test URL',
            },
            {
                type: 'web_url',
                url: 'https://test.com/test2/',
                title: 'Test URL 2',
            },
        ];

        const response = buttonBlock(text, buttons);

        expect(response).to.deep.equal({
            attachment: {
                type: 'template',
                payload: {
                    template_type: 'button',
                    text: 'Test Text',
                    buttons: [
                        {
                            type: 'web_url',
                            url: 'https://test.com/test/',
                            title: 'Test URL',
                        },
                        {
                            type: 'web_url',
                            url: 'https://test.com/test2/',
                            title: 'Test URL 2',
                        },
                    ],
                },
            },
        });
    });
});
