const expect = require('expect');

const utils = require('./utils');

it('should add two numbers', () => {
  var res = utils.add(33, 11);

  expect(res).toBe(44).toBeA('number');
});

it('should async add two numbers', (done) => {
  utils.asyncAdd(4, 3, (sum) => {
    expect(sum).toBe(7).toBeA('number');
    done();
  });
});

it('should square a number', () => {
  var res = utils.square(3);

  expect(res).toBe(9).toBeA('number');
});

it('should async square a number', (done) => {
  utils.asyncSquare(3, (res) => {
    expect(res).toBe(9).toBeA('number');
    done();
  });
});

// should verify that first and last names are set
it('should set firstName and lastName', () => {
  var user = {
    age: 24,
    location: 'Montreal'
  };

  var res = utils.setName(user, 'Ryan Hotton');

  // expect(user).toEqual(res);

  expect(res).toInclude({
    firstName: 'Ryan',
    lastName: 'Hotton'
  }).toBeA('object');
});

// it('should expect some values', () => {
//   // expect(12).toNotBe(12);
//   // expect({name: 'ryan'}).toNotEqual({name: 'Ryan'});
//   // expect([2,3,4]).toExclude(1);
//   expect({
//     name: 'Ryan',
//     age: 24,
//     location: 'Montreal'
//   }).toExclude({
//     age: 23
//   });
// });
