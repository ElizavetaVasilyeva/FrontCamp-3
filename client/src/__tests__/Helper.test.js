import Helper from '../helpers/helper'

describe('Test helper', () => {
  it('Test method errorClass in case adding class', () => {
    let error = "Some error";
    let result = Helper.errorClass(error);
    expect('has-error').toEqual(result);
  });

  it('Test method errorClass in case deleting class', () => {
    let error = "";
    let result = Helper.errorClass(error);
    expect('').toEqual(result);
  });
});