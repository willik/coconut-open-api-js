import mockAxios from 'axios';

import Timezone from './timezone';

it('can get timezones', async () => {
  const resource = new Timezone(mockAxios);

  await resource.get();

  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  expect(mockAxios.get).toHaveBeenCalledWith('timezones');
});

it('can get timezones for a specific country', async () => {
  const resource = new Timezone(mockAxios);

  await resource.get('ca');

  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  expect(mockAxios.get).toHaveBeenCalledWith('timezones/ca');
});
