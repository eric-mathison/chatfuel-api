import jsonButton from '../../../src/types/buttons/jsonButton';

describe('JSON Button', () => {
    it('should return an error if url not provided', () => {
        const response = () => jsonButton();

        expect(response).to.throw('Expected a url parameter');
    });

    it('should return an error if title not provided', () => {
        const testUrl = 'https://test.com/test/api';
        const response = () => jsonButton(testUrl);

        expect(response).to.throw('Expected a title parameter');
    });

    it('should return expected url button', () => {
        const testUrl = 'https://test.com/test/api';
        const response = jsonButton(testUrl, 'Test Title');

        expect(response).to.deep.equal({
            type: 'json_plugin_url',
            url: testUrl,
            title: 'Test Title',
        });
    });
});
