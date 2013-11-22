specle
======
**(c)[Colin Teal][1], [Bumblehead][0], 2013** [MIT-license](#license)

### OVERVIEW:

A rework of [spec.js][1], by Colin Teal. Thank you Colin. Implementing a [specification pattern][2] in javascript was uncharted territory when [spec.js][1] was published two years ago.

'One of the most valuable scripts in my arsenal. `specle.js` is in every form-based web application I've authored in the last two years. 

Some improvements found in this script:

  * An error is fixed which caused the original script to break in IE8. 
  * Meta-data is added to the top of the file so it can be used with [scroungejs][2]. 
  * Unit tests are added. 
  * The ability to call spec functions with two parameters and not just one.
  * The method `isSatisfiedBy` is renamed to `is` for shorter named calls to this method.


[0]: http://www.bumblehead.com                            "bumblehead"
[1]: https://github.com/discordinoffice/spec/blob/master/spec.js
[2]: http://en.wikipedia.org/wiki/Specification_pattern "spec pattern"


---------------------------------------------------------
#### <a id="install"></a>INSTALL:

specle may be downloaded directly or installed through `npm`.

 * **npm**   

 ```bash
 $ npm install specle
 ```

 * **Direct Download**
 
 ```bash  
 $ git clone https://github.com/iambumblehead/specle.git
 ```


---------------------------------------------------------
#### <a id="test"></a>Test:

 to run tests, use `npm test` from a shell.

 ```bash
 $ npm test
 ```

---------------------------------------------------------
#### <a id="test"></a>Test:

Use `specle` functions in your validation methods. If `true` is returned the value has passed validation.

 > **example 1**

 > ```javascript
   var isNum = specle(function (val) {
     return typeof val === 'number';
   });
   var isEven = specle(function (val) {
     return 0 === val % 2;  
   });
   console.log( 
     isNum.is( 0 ) &&
     isNum.and(isEven).is( 0 ) &&
     isNum.not().is( 'fifteen' ) &&
     isNum.not().or(isEven).is( 2 ) &&
     isNum.not().or(isEven).is( 'fifteen' )
   ); // true
   ```

 > **example 2**

 > ```javascript
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
   console.log( 
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
   ); // true
   ```

 > **example 3**

 > ```javascript
   var isMinLength = specle(function (val, opts) {
     return val.length >= opts.min;
   });
   var isMaxLength = specle(function (val, opts) {
     return val.length <= opts.max;
   });
   console.log(   
     isMinLength.is('abcde', { min : 3 }) &&
     isMinLength.or(isMaxLength).is('a', { min : 3, max : 1 }) &&
     isMinLength.and(isMaxLength).is('abcde', { min : 3, max : 5 }) &&
     isMinLength.not().and(isMaxLength).is('abcde', { min : 8, max : 5 })
   ); // true
```

---------------------------------------------------------
#### <a id="license">License:

 ![scrounge](http://github.com/iambumblehead/scroungejs/raw/master/img/hand.png) 

(The MIT License)

Copyright (c) 2013 [Bumblehead][0] <chris@bumblehead.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
