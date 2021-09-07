import React from 'react';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Artwalk from './Artwalk';

// Some test data for the tests.
const artwalk = {
    id: 42,
    name: "Tom",
    bilds: ["Bild 1", "Bild 2", "Bild 3", "Bild 4", "Bild 5", "Bild 6", "Bild 7", "Bild 8", "Bild 9", "Bild 10"]
};

it('renders the name of the artwalk', () => {
    const comp = <Artwalk getArtwalk={_ => artwalk}/>;
    const {getByText} = render(comp);
    expect(getByText(artwalk.name)).toBeInTheDocument();
});

it('renders the "Bilds" header', () => {
    const comp = <Artwalk getArtwalk={_ => artwalk}/>;
    const {getByText} = render(comp);
    expect(getByText("Bilds")).toBeInTheDocument();
});

it('renders each bild', () => {
    const comp = <Artwalk getArtwalk={_ => artwalk}/>;
    const {getByText} = render(comp);
    artwalk.bilds.forEach(h => expect(getByText(h)).toBeInTheDocument());
});

it('renders the "Back" link', () => {
    const comp = <Artwalk getArtwalk={_ => artwalk}/>;
    const {getByText} = render(comp);
    expect(getByText(/back/i)).toBeInTheDocument();
});