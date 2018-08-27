import callButton from '../../../src/types/buttons/callButton';

describe('Call Button', () => {
    it('should return an error if phone number not provided', () => {
        const response = () => callButton();

        expect(response).to.throw('Expected a phone number parameter');
    });

    it('should return an error if title not provided', () => {
        const response = () => callButton('Test Block');

        expect(response).to.throw('Expected a title parameter');
    });

    it('should return expected call button', () => {
        const response = callButton('+11231235555', 'Test Call');

        expect(response).to.deep.equal({
            type: 'phone_number',
            phone_number: '+11231235555',
            title: 'Test Call',
        });
    });
});
