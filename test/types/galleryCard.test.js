import galleryCard from '../../src/types/galleryCard';

describe('Gallery Card', () => {
    it('should return an error if no title provided', () => {
        const response = () => galleryCard();

        expect(response).to.throw('Expected a title parameter');
    });

    it('should return a gallery card element', () => {
        const buttons = [
            {
                type: 'web_url',
                url: 'https://test.com/test_url',
                title: 'Test Web Url Button 1',
            },
            {
                type: 'web_url',
                url: 'https://test.com/test_url',
                title: 'Test Web Url Button 2',
            },
            {
                type: 'web_url',
                url: 'https://test.com/test_url',
                title: 'Test Web Url Button 3',
            },
        ];
        const cardTitle = 'Test Gallery Card';
        const cardImage = 'https://test.com/test/image.png';
        const cardSubtitle = 'Test Gallery Card Subtitle';
        const response = galleryCard(cardTitle, cardImage, cardSubtitle, buttons);

        expect(response).to.deep.equal({
            title: cardTitle,
            image_url: cardImage,
            subtitle: cardSubtitle,
            buttons,
        });
    });
});
