import React from 'react';
import renderer from 'react-test-renderer';

import { PureBio as Bio } from '../bio';

describe('Bio', () => {
  it('renders correctly', () => {
    const data = {
      avatar: {
        childImageSharp: {
          fixed: {
            base64:
              'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAUABQDASIAAhEBAxEB/8QAGAABAQADAAAAAAAAAAAAAAAAAAECAwX/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/2gAMAwEAAhADEAAAAe/GFztRNAUH/8QAGBAAAgMAAAAAAAAAAAAAAAAAAAEQESD/2gAIAQEAAQUCLhiz/8QAFREBAQAAAAAAAAAAAAAAAAAAESD/2gAIAQMBAT8BY//EABQRAQAAAAAAAAAAAAAAAAAAACD/2gAIAQIBAT8BH//EABQQAQAAAAAAAAAAAAAAAAAAADD/2gAIAQEABj8CH//EABoQAQABBQAAAAAAAAAAAAAAABEAARAgITH/2gAIAQEAAT8hry5mokx//9oADAMBAAIAAwAAABBEzwD/xAAVEQEBAAAAAAAAAAAAAAAAAAABIP/aAAgBAwEBPxBQx//EABYRAQEBAAAAAAAAAAAAAAAAAAEgIf/aAAgBAgEBPxAMj//EABwQAQABBAMAAAAAAAAAAAAAAAEhABFBYRAgMf/aAAgBAQABPxBIkLtEpgib54Cyaq5gdnnX/9k=',
            width: 50,
            height: 50,
            src:
              '/static/897dc7abe19cc42b831a745c4a64d44d/99438/profile-pic.jpg',
            srcSet:
              '/static/897dc7abe19cc42b831a745c4a64d44d/99438/profile-pic.jpg 1x,\n/static/897dc7abe19cc42b831a745c4a64d44d/aba1d/profile-pic.jpg 1.5x,\n/static/897dc7abe19cc42b831a745c4a64d44d/b315d/profile-pic.jpg 2x',
          },
        },
      },
      site: {
        siteMetadata: {
          author: {
            name: 'anoriqq',
            summary:
              'Web app developer in Tokyo. Interested in Node.js and TypeScript.',
          },
          social: {
            twitter: 'anoriqq',
            github: 'anoriqq',
          },
        },
      },
    };
    const tree = renderer.create(<Bio data={data} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
