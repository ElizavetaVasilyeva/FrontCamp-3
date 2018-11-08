var assert = require('assert');
var cal = require('../src/calculator.js')

describe('Calculator', function(){
  it('substractPositive', function(){
    assert.equal('2', cal.substractPositive(1, -1));
  });

  it('add', function(){
    assert.equal('2', cal.add(1, 1));
  });
})
