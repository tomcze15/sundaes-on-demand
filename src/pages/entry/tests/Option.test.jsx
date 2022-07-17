import { render, screen } from '../../../test-utils/testing-library-utils';

import Options from '../Options';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';

test('displays image for each scoop option from server', async () => {
  render(<Options optionType="scoops" />);

  // find images
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('displays image for each toppings option from server', async () => {
  render(<Options optionType="toppings" />);

  const images = await screen.findAllByRole('img', { name: /topping$/i });

  expect(images).toHaveLength(3);

  const imagesTitles = images.map((img) => img.alt);
  expect(imagesTitles).toEqual([
    'Cherries topping',
    'M&Ms topping',
    'Hot fudge topping',
  ]);
});
