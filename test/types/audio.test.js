import audioMessage from '../../src/types/audio';

describe('Audio Messages', () => {
    it('should return an error if no url provided', () => {
        const response = () => audioMessage();

        expect(response).to.throw('Expected an url parameter');
    });

    it('should return an error if url is not an audio file', () => {
        const testAudio = 'https://test.com/uploads/image.jp';
        const response = () => audioMessage(testAudio);

        expect(response).to.throw('Expected url to contain an audio file');
    });

    it('should return an audio message', () => {
        const testAudio = 'https://test.com/uploads/audio.mp3';
        const response = audioMessage(testAudio);

        expect(response).to.deep.equal({
            attachment: {
                type: 'audio',
                payload: {
                    url: testAudio,
                },
            },
        });
    });
});
