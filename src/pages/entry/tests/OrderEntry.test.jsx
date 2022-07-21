import {
  render,
  screen,
  waitFor,
} from '../../../test-utils/testing-library-utils';
import OrderEntry from '../OrderEntry';
import { rest } from 'msw';
import { server } from '../../../../mocks/server';
import userEvent from '@testing-library/user-event';

const BASE_URL = 'http://localhost:3030/';

test('handles error for scoops and toppings routes', async () => {
  server.resetHandlers(
    rest.get(BASE_URL + 'scoops', (req, res, ctx) => res(ctx.status(500))),
    rest.get(BASE_URL + 'toppings', (req, res, ctx) => res(ctx.status(500)))
  );

  render(<OrderEntry setOrderPhase={jest.fn()} />);

  // const alerts = await screen.findAllByRole('alert', {
  //   name: 'An unexpected error occured. Please try again later.',
  // });

  await waitFor(async () => {
    const alerts = await screen.findAllByRole('alert');
    expect(alerts).toHaveLength(2);
  });
});

test('disable order button if there are no scoops ordered', async () => {
  render(<OrderEntry setOrderPhase={jest.fn()} />);

  const orderButton = screen.getByRole('button', { name: /order sundae/i });
  expect(orderButton).toBeDisabled();

  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });

  await userEvent.clear(vanillaInput);
  await userEvent.type(vanillaInput, '1');
  expect(orderButton).toBeEnabled();

  await userEvent.clear(vanillaInput);
  await userEvent.type(vanillaInput, '0');
  expect(orderButton).toBeDisabled();
});
