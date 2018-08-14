import fileMessage from '../../src/types/file';

describe('File Messages', () => {
    it('should return an error if no url provided', () => {
        const response = () => fileMessage();

        expect(response).to.throw('Expected an url parameter');
    });

    it('should return a file message', () => {
        const testFile = 'https://test.com/uploads/file.pdf';
        const response = fileMessage(testFile);

        expect(response).to.deep.equal({
            attachment: {
                type: 'file',
                payload: {
                    url: testFile,
                },
            },
        });
    });
});
