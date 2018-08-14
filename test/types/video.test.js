import videoMessage from '../../src/types/video';

describe('Video Messages', () => {
    it('should return an error if no url provided', () => {
        const response = () => videoMessage();

        expect(response).to.throw('Expected an url parameter');
    });

    it('should return an error if url is not an image file', () => {
        const testVideo = 'https://test.com/uploads/video.mpeg';
        const response = () => videoMessage(testVideo);

        expect(response).to.throw('Expected url to contain a mp4 file');
    });

    it('should return an video message', () => {
        const testVideo = 'https://test.com/uploads/video.mp4';
        const response = videoMessage(testVideo);

        expect(response).to.deep.equal({
            attachment: {
                type: 'video',
                payload: {
                    url: testVideo,
                },
            },
        });
    });
});
