import {
  render,
  screen,
  waitFor,
} from '../../../test-utils/testing-library-utils';
import OrderEntry from '../OrderEntry';
import { rest } from 'msw';
import { server } from '../../../../mocks/server';

const BASE_URL = 'http://localhost:3030/';

test('handles error for scoops and toppings routes', async () => {
  server.resetHandlers(
    rest.get(BASE_URL + 'scoops', (req, res, ctx) => res(ctx.status(500))),
    rest.get(BASE_URL + 'toppings', (req, res, ctx) => res(ctx.status(500)))
  );

  render(<OrderEntry />);

  // const alerts = await screen.findAllByRole('alert', {
  //   name: 'An unexpected error occured. Please try again later.',
  // });

  await waitFor(async () => {
    const alerts = await screen.findAllByRole('alert');
    expect(alerts).toHaveLength(2);
  });
});
