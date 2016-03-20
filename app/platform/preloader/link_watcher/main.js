module.exports = {
  cssStyle: '<style scope="electron-preloader-link-watcher"></style>',
  initialize: function() {
    var $ = require('jquery');

    this.cssStyle = '<style scope="electron-preloader-link-watcher">';
    this.cssStyle += 'span.electron-preloader-link-watcher.link-watcher-tooltip {';
    this.cssStyle += '  display:block;';
    this.cssStyle += '  position:fixed;';
    this.cssStyle += '  bottom: 0px;';
    this.cssStyle += '  left:0px;';
    this.cssStyle += '  border: 1px solid rgba(33, 33, 33, 0.9);';
    this.cssStyle += '  background-color: rgba(97, 97, 97, 0.9);';
    this.cssStyle += '  color: #fff;';
    this.cssStyle += '  z-index: 99999;';
    this.cssStyle += '  max-width: 100%;';
    this.cssStyle += '  white-space: nowrap;';
    this.cssStyle += '  text-overflow: ellipsis;';
    this.cssStyle += '  overflow: hidden;';
    this.cssStyle += '  font-size: 12px;';
    this.cssStyle += '  font-family: Roboto;';
    this.cssStyle += '  font-weight: normal;';
    this.cssStyle += '  line-height: 20px;';
    this.cssStyle += '}';
    this.cssStyle += 'span.electron-preloader-link-watcher.link-watcher-tooltip > span {';
    this.cssStyle += '  margin: 4px;';
    this.cssStyle += '}';
    this.cssStyle += '</style>'; 
    
    this.hrefTip = '<span class="electron-preloader-link-watcher link-watcher-tooltip"></span>';
    
    this.$cssStyle = $(this.cssStyle);
    this.$hrefTip = $(this.hrefTip);
    
    var that = this;   

    $(function () {
      $('head').append(that.$cssStyle);
      $('body').append(that.$hrefTip);
      
      $('body').on('mouseenter', 'a', function() {
        var trimmedHref = (this.href) ? this.href.trim() : '';
        if (trimmedHref.length > 0) {
          that.$hrefTip.html($('<span>' + trimmedHref + '</span>'));
        } else {
          that.$hrefTip.empty();
        }
      });

      $('body').on('mouseleave', 'a', function() {
        that.$hrefTip.empty();
      });
    });
  }
};