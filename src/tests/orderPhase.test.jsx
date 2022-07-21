import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

test('order phases for happy path', async () => {
  render(<App />);

  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });

  await userEvent.clear(vanillaInput);
  await userEvent.type(vanillaInput, '1');

  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });

  await userEvent.clear(chocolateInput);
  await userEvent.type(chocolateInput, '2');

  const cherriesCheckbox = await screen.findByRole('checkbox', {
    name: 'Cherries',
  });

  await userEvent.click(cherriesCheckbox);

  const orderSummaryButton = screen.getByRole('button', {
    name: /order sundae/i,
  });

  await userEvent.click(orderSummaryButton);

  const summaryHeading = screen.getByRole('heading', { name: 'Order Summary' });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole('heading', { name: 'Scoops: $6.00' });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.getByRole('heading', {
    name: 'Toppings: $1.50',
  });
  expect(toppingsHeading).toBeInTheDocument();

  // expect(screen.getByText('1 Vanilla').toBeInTheDocument());
  // expect(screen.getByText('2 Chocolate').toBeInTheDocument());
  // expect(screen.getByText('Cherries').toBeInTheDocument());

  // alternatively...
  const optionsItems = screen.getAllByRole('listitem');
  const optionItemsText = optionsItems.map((item) => item.textContent);
  expect(optionItemsText).toEqual(['1 Vanilla', '2 Chocolate', 'Cherries']);

  const tcCheckbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  await userEvent.click(tcCheckbox);

  const confirmOrderButton = screen.getByRole('button', {
    name: /Confirm order/i,
  });

  await userEvent.click(confirmOrderButton);

  const thankYouHeader = await screen.findByRole('heading', {
    name: /thank you/i,
  });

  expect(thankYouHeader).toBeInTheDocument();

  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  const newOrderButton = screen.getByRole('button', { name: /new order/i });
  await userEvent.click(newOrderButton);

  const scoopsTotal = screen.getByText('Scoops total: $0.00');
  expect(scoopsTotal).toBeInTheDocument();
  const toppingsTotal = screen.getByText('Toppings total: $0.00');
  expect(toppingsTotal).toBeInTheDocument();

  await screen.findByRole('spinbutton', { name: 'Vanilla' });
  await screen.findByRole('checkbox', { name: 'Cherries' });
});

test('Toppings header is not on summary page if no toppings ordered', async () => {
  render(<App />);

  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });

  await userEvent.clear(vanillaInput);
  await userEvent.type(vanillaInput, '1');

  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });

  await userEvent.clear(chocolateInput);
  await userEvent.type(chocolateInput, '2');

  const orderSummaryButton = screen.getByRole('button', {
    name: /Order Sundae!/i,
  });
  await userEvent.click(orderSummaryButton);

  const scoopsHeading = screen.getByRole('heading', { name: 'Scoops: $6.00' });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeadeing = screen.queryByRole('heading', {
    name: /toppings/i,
  });
  expect(toppingsHeadeing).not.toBeInTheDocument();
});
