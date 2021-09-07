import React from 'react';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Artwalk from './Artwalk';

// Some test data for the tests.
const artwalk = {
    id: 42,
    name: "Tom",
    hobbies: ["sleeping", "purring", "people watching", "eating"]
};

it('renders the name of the artwalk', () => {
    const comp = <Artwalk getArtwalk={_ => artwalk}/>;
    const {getByText} = render(comp);
    expect(getByText(artwalk.name)).toBeInTheDocument();
});

it('renders the "Hobbies" header', () => {
    const comp = <Artwalk getArtwalk={_ => artwalk}/>;
    const {getByText} = render(comp);
    expect(getByText("Hobbies")).toBeInTheDocument();
});

it('renders each hobby', () => {
    const comp = <Artwalk getArtwalk={_ => artwalk}/>;
    const {getByText} = render(comp);
    artwalk.hobbies.forEach(h => expect(getByText(h)).toBeInTheDocument());
});

it('renders the "Back" link', () => {
    const comp = <Artwalk getArtwalk={_ => artwalk}/>;
    const {getByText} = render(comp);
    expect(getByText(/back/i)).toBeInTheDocument();
});