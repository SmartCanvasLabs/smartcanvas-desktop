module.exports = {
  initialize: function() {
    var shell = require('electron').shell;
    var urlParser = require('url-parse');
    
    var currentUrl = urlParser(document.URL);

    var supportExternalLinks = function (e) {
        var href;
        var isExternal = true;

        var checkDomElement = function (element) {
            if (element.nodeName === 'A') {
                href = element.getAttribute('href');
            }

            if (href) {
              var parsedHref = urlParser(href);
              
              var curDomain = currentUrl.protocol + '//' + currentUrl.host;
              var parsedDomain = parsedHref.protocol + '//' + parsedHref.host;
              
              isExternal = (parsedDomain !== curDomain);
              
              if (isExternal) {
                shell.openExternal(href);
                e.preventDefault();
              }
            } else if (element.parentElement) {
                checkDomElement(element.parentElement);
            }
        }

        checkDomElement(e.target);
    }

    document.addEventListener('click', supportExternalLinks, false);
  }
};