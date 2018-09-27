import urlButton from '../../../src/types/buttons/urlButton';

describe('Url Button', () => {
    it('should return an error if url not provided', () => {
        const response = () => urlButton();

        expect(response).to.throw('Expected a url parameter');
    });

    it('should return an error if title not provided', () => {
        const testUrl = 'https://test.com/test/';
        const response = () => urlButton(testUrl);

        expect(response).to.throw('Expected a title parameter');
    });

    it('should return expected url button', () => {
        const testUrl = 'https://test.com/test/';
        const response = urlButton(testUrl, 'Test Title', true);

        expect(response).to.deep.equal({
            type: 'web_url',
            url: testUrl,
            title: 'Test Title',
            messenger_extensions: true,
        });
    });
});
