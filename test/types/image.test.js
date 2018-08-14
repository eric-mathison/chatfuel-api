import imageMessage from '../../src/types/image';

describe('Image Messages', () => {
    it('should return an error if no url provided', () => {
        const response = () => imageMessage();

        expect(response).to.throw('Expected an url parameter');
    });

    it('should return an error if url is not an image file', () => {
        const testImage = 'https://test.com/uploads/image.jp';
        const response = () => imageMessage(testImage);

        expect(response).to.throw('Expected url to contain an image');
    });

    it('should return an image message', () => {
        const testImage = 'https://test.com/uploads/image.jpg';
        const response = imageMessage(testImage);

        expect(response).to.deep.equal({
            attachment: {
                type: 'image',
                payload: {
                    url: testImage,
                },
            },
        });
    });
});
