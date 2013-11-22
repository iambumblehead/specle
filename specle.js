// Filename: specle.js  
// Timestamp: 2013.11.22-00:32:24 (last modified)  
// Author(s): Colin Teal, https://github.com/discordinoffice/spec/blob/master/spec.js
// edited by bumblehead

var specle = ((typeof module === 'object') ? module : {}).exports = function (is) {

  return {
    is: function (candidate, data, opts) {
      if (typeof is === 'object' &&
          typeof is.is === 'function') {
        is = is.is;
      }
      return is(candidate, data, opts);
    },

    and: function (specification) {
      var me = this, sanitized = specification;
      if ("function" !== typeof sanitized.is) {
        sanitized = specle(specification);
      }

      return specle(function (candidate, data, opts) {
        return me.is(candidate, data, opts) ? 
          sanitized.is(candidate, data, opts) : false;
      });
    },

    or: function (specification) {
      var me = this, sanitized = specification;
      if ("function" !== typeof sanitized.is) {
        sanitized = specle(specification);
      }
      return specle(function (candidate, data, opts) {
        return me.is(candidate, data, opts) ? true :
          sanitized.is(candidate, data, opts);
      });
    },

    not: function () {
      var me = this;
      return specle(function (candidate, data, opts) {
        return !me.is(candidate, data, opts);
      });
    }
  };

};

