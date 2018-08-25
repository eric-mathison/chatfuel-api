import listItem from '../../src/types/listItem';

describe('List Item', () => {
    it('should return an error if no title provided', () => {
        const response = () => listItem();

        expect(response).to.throw('Expected a title parameter');
    });

    it('should return a list element', () => {
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
        const itemTitle = 'Test List Item';
        const itemImage = 'https://test.com/test/image.png';
        const itemSubtitle = 'Test Gallery Card Subtitle';
        const response = listItem(itemTitle, itemImage, itemSubtitle, buttons);

        expect(response).to.deep.equal({
            title: itemTitle,
            image_url: itemImage,
            subtitle: itemSubtitle,
            buttons,
        });
    });
});
