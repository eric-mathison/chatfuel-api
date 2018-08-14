import Message from '../src/message';

describe('Messages', () => {
    it('should return an empty object', () => {
        const response = new Message();

        expect(response).to.deep.equal({
            messages: [],
        });
    });

    it('should return one text message', () => {
        const response = new Message().text('This is a test message');

        expect(response).to.deep.equal({
            messages: [{ text: 'This is a test message' }],
        });
    });

    it('should return two text messages', () => {
        const response = new Message()
            .text('This is a test message')
            .text('This is another test message');

        expect(response).to.deep.equal({
            messages: [
                { text: 'This is a test message' },
                { text: 'This is another test message' },
            ],
        });
    });

    it('should return three text messages', () => {
        const response = new Message()
            .text('This is a test message')
            .text('This is another test message')
            .text('This is a third test message');

        expect(response).to.deep.equal({
            messages: [
                { text: 'This is a test message' },
                { text: 'This is another test message' },
                { text: 'This is a third test message' },
            ],
        });
    });

    it('should return an image message', () => {
        const testImage = 'https://test.com/uploads/image.png';
        const response = new Message().image(testImage);

        expect(response).to.deep.equal({
            messages: [
                {
                    attachment: {
                        type: 'image',
                        payload: {
                            url: testImage,
                        },
                    },
                },
            ],
        });
    });

    it('should return a text message and image message', () => {
        const testImage = 'https://test.com/uploads/image.png';
        const response = new Message()
            .text('This is a test text message')
            .image(testImage);

        expect(response).to.deep.equal({
            messages: [
                { text: 'This is a test text message' },
                {
                    attachment: {
                        type: 'image',
                        payload: {
                            url: testImage,
                        },
                    },
                },
            ],
        });
    });
});
