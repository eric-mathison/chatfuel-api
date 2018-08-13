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
});
