var specle = require('../specle');

describe("specle", function () {
  var isNum = specle(function (val) {
    return typeof val === 'number';
  });

  var isEven = specle(function (val) {
    return 0 === val % 2;  
  });

  var isStrictMatchingVals = specle(function (data) {
    var v1 = data.val1, 
        v2 = data.val2;

    return v1 === v2;
  });

  var isMatchingVals = specle(function (data) {
    var v1 = data.val1, 
        v2 = data.val2;

    return v1 == v2;
  });

  var isTypeMatchingVals = specle(function (data) {
    var v1 = data.val1, 
        v2 = data.val2;

    return typeof v1 === typeof v2;
  });

  var isMinLength = specle(function (val, opts) {
    return val.length >= opts.min;
  });

  var isMaxLength = specle(function (val, opts) {
    return val.length <= opts.max;
  });
  
  it("should construct a spec object with methods `is`, `and`, `or` and `not`", function () {
    expect( 
      isMatchingVals.hasOwnProperty('is') &&
      isMatchingVals.hasOwnProperty('and') &&
      isMatchingVals.hasOwnProperty('or') &&
      isMatchingVals.hasOwnProperty('not')
    ).toBe( true);
  });

  it("should should operate on primitive data", function () {    
    expect( 
      isNum.is( 0 ) &&
      isNum.and(isEven).is( 0 ) &&
      isNum.not().is( 'fifteen' ) &&
      isNum.not().or(isEven).is( 2 ) &&
      isNum.not().or(isEven).is( 'fifteen' )
    ).toBe( true );
  });

  it("should should operate on object data", function () {    
     expect( 
       isStrictMatchingVals.is({
         val1 : 'match',
         val2 : 'match'
       }) &&
       isStrictMatchingVals.not().is({
         val1 : 'match',
         val2 : 'matching?'
       }) &&
       isMatchingVals.and(isStrictMatchingVals).is({
         val1 : 'match',
         val2 : 'match'
       }) &&
       isTypeMatchingVals.or(isMatchingVals).is({
         val1 : true,
         val2 : 1
       })
     ).toBe( true );
  });

  it("should should operate on data with optional parameter", function () {    
    expect(   
      isMinLength.is('abcde', { min : 3 }) &&
      isMinLength.or(isMaxLength).is('a', { min : 3, max : 1 }) &&
      isMinLength.and(isMaxLength).is('abcde', { min : 3, max : 5 }) &&
      isMinLength.not().and(isMaxLength).is('abcde', { min : 8, max : 5 })
    ).toBe(true);
  });
});
