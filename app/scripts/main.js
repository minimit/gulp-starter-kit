(function() {

  'use strict';

  /* =====================================================
     Includes
  ======================================================== */
  // @codekit-prepend ../../bower_components/jquery/dist/jquery.min.js
  // @codekit-prepend ../../bower_components/bootstrap/dist/js/bootstrap.min.js

  // test includes
  if (typeof jQuery != 'undefined') {
    alert ('jquery working');
  }
  if(typeof $().modal == 'function'){
    alert ('bootstrap working');
  }

  /* ===================================================== */

}());
