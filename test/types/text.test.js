import textMessage from '../../src/types/text';

describe('Text Messages', () => {
    it('should return an error if no text provided', () => {
        const response = () => textMessage();

        expect(response).to.throw('Expected a text parameter');
    });

    it('should return a text message', () => {
        const response = textMessage('This is a test text message');

        expect(response).to.deep.equal({
            text: 'This is a test text message',
        });
    });
});
