import '@testing-library/jest-dom';
import {
  render,
  screen,
} from '@testing-library/react';

import Container from '../Container';

describe('Container', () => {
  it('should render', () => {
    const {
      getByTestId,
    } = render(
      <Container>
        <p>Oh hai</p>
      </Container>
    );

    expect(getByTestId('container')).toBeInTheDocument();
  });

  it('should render children', () => {
    const {
      getByText,
    } = render(
      <Container>
        <p>Oh hai</p>
      </Container>
    );

    expect(getByText('Oh hai')).toBeInTheDocument();
  });
});
