  var require = (function() {
  
    var require = function (modulename, async, callback, makeglobal) {
    
      var xmlhttp = null;
      if (window.XMLHttpRequest) {
        xmlhttp = new window.XMLHttpRequest;
      }
      else {
        try {
          xmlhttp = new ActiveXObject("MSXML2.XMLHTTP.3.0");
        }
        catch(e) {
          if(console && console.log) {
            console.log('The XmlHttpRequest object does not appear to be supported in your browser');
          }
          return null;
        }
      }
      
      xmlhttp.open("GET","modules/"+modulename+".js", async);
      
      if(async) {
        xmlhttp.onreadystatechange = function() {
          if (xmlhttp.readyState == 4) {
            if(xmlhttp.status == 200) {
              var module = parseJSCode(xmlhttp.responseText);
              if(module === null && console && console.log) {
                console.log("Could not load module "+modulename+": error parsing module");
              }
              
              if(module && makeglobal) {
                window[modulename] = module;
              }
              
              if(callback) {  // Always call the callback if supplied, passing in a null module (and FALSE as the second parameter) if it failed to load due to JS errors in the module
                callback(module, !(module === null));
              }
            }
            else {
              if(console && console.log) {
                console.log("Could not load module "+modulename+": error loading module (http status "+xmlhttp.status+")");
              }
              callback(module, null); // Call the callback with a null module and NULL as the second parameter to indicate there's literally nothing there that could be loaded for parsing
            }
            
          }
        };
      }

      xmlhttp.send();

      if(!async) {
        if(xmlhttp.status == 200) {
          var module = parseJSCode(xmlhttp.responseText);
          if(module === null) {
            if(console && console.log) {
              console.log("Could not load module "+modulename+": error parsing module");
            }
            return false;
          }
          else {
            if(module && makeglobal) {
              window[modulename] = module;
            }
            return module;
          }
        }
        else {
          if(console && console.log) {
            console.log("Could not load module "+modulename+": error loading module (http status "+xmlhttp.status+")");
          }
          return null;
        }
      }
    };
    
    var parseJSCode = function (module_source) {
      // Add wrapper to enable returning of javascript module's "exports" object
      module_source = "(function() { var exports = {}; "+module_source+"\nreturn exports; })();";

      try { // And eval object and return the result (null if module fails to load)
        var module = eval(module_source);
      }
      catch(e) {
        module = null;
      }

      return module;
    };
    
    return require; // Finally, only expose the require() function to external scripts, as that's all they need to access
  })();
