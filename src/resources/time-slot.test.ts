import mockAxios from 'axios';

import TimeSlot from './time-slot';

it('will set location filter using a number', async () => {
  const resource = new TimeSlot(mockAxios);

  expect(resource.at(1)).toHaveProperty('filters', {
    location: 1,
  });
});

it('will set start and end filters', async () => {
  const resource = new TimeSlot(mockAxios);

  expect(resource.between('2018-01-01', '2018-01-31')).toHaveProperty('filters', {
    end: '2018-01-31',
    start: '2018-01-01',
  });
});

it('will set user filter using a number', async () => {
  const resource = new TimeSlot(mockAxios);

  expect(resource.by(1)).toHaveProperty('filters', {
    user: 1,
  });
});

it('will set service filter using a number', async () => {
  const resource = new TimeSlot(mockAxios);

  expect(resource.for(1)).toHaveProperty('filters', {
    services: 1,
  });
});

it('will set service filter using an array of numbers', async () => {
  const resource = new TimeSlot(mockAxios);

  expect(resource.for([1, 2])).toHaveProperty('filters', {
    services: [1, 2],
  });
});

it('can string all filterable options together', async () => {
  const resource = new TimeSlot(mockAxios);

  const expected = expect(
    resource
      .between('2018-01-01', '2018-01-31')
      .at(1)
      .for([1, 2])
      .by(1),
  );

  expected.toHaveProperty('filters', {
    end: '2018-01-31',
    location: 1,
    services: [1, 2],
    start: '2018-01-01',
    user: 1,
  });
});

it('can get time slots', async () => {
  const resource = new TimeSlot(mockAxios);

  await resource
    .between('2018-01-01', '2018-01-31')
    .at(1)
    .for([1, 2])
    .by(1)
    .get();

  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  expect(mockAxios.get).toHaveBeenCalledWith('times', {
    params: {
      end: '2018-01-31',
      location_id: 1,
      service_id: [1, 2],
      staff_id: 1,
      start: '2018-01-01',
    },
  });
});
