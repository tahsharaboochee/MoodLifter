// import React from 'react';
// import { render } from '@testing-library/react';
// import App from './components/App';

// test('renders MoodLifter', () => {
//     const { getByText } = render(<App />);
//     const linkElement = getByText(/MoodLifter/i);
//     expect(linkElement).toBeInTheDocument();
// });

import React from 'react';
import { shallow } from 'enzyme';
import App from './components/App';
it('renders without crashing', () => {
    shallow(<App />);
});
