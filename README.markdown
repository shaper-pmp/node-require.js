# Introduction #

The node-require.js script exposes a single global function - `require()`.

This function may be called to load your node.js modules on the client-side (assuming, of course, that they don't depend on back-end node.js API calls that aren't available on the client-side).

`require()` supports both synchronous and asynchronous modes of operation, and (for convenience, though abusing global variables is not advised) can also inject the loaded module into the window (global) scope as a variable with the same name as the module (`window.`MODULE_NAME).</p>

Module paths passed to `require()` for loading are specified relative to the current HTML page (eg, "./module_name" attempts to load a module called "module_name.js" from the same path as the page it's specified in).

## Example uses ##

First, include node-require.js in your page just like any other script:

<script type='text/javascript' src='http://blahblahblah/node-require.js'></script>

Then use one of the following to load a module:

    // Synchronously load a module (from the same path as the current HTML page):
    var mymodule = require("mymodule");

    // Synchronously load a module (from a "modules" directory that's a sibling of the current path):
    var mymodule = require("../modules/mymodule");

    // Synchronously load a module and automatically inject it into the global namespace as window.mymodule:
    require("mymodule", false, null, true);

    // Asynchronously load a module and use a callback to be notified when it's loaded:
    require("mymodule", true, function(mymodule, result) {
      if(mymodule) {
        // Do something with the module, like assigning it to a global or wider-scoped variable
      }
      else if(result === null) {
        // Module couldn't be loaded (HTTP 404 error, connection timeout, etc).
      }
      else if(result === false) {
        // Module file found and downloaded, but contained javascript errors that prevented it from being parsed successfully
      }
    });

    // Asynchronously load a module and (assuming it loads successfully) automatically inject it into window.mymodule:
    require("mymodule", true, null, true);

##Demo##

A demo page is available at: [http://www.shaper-labs.com/projects/snippets/node-require.js/demo.html](http://www.shaper-labs.com/projects/snippets/node-require.js/demo.html).

##Source Code##

Source code is available [on github](https://github.com/shaper-pmp/node-require.js).
