module.exports = {
  getSelectionText: function() {
    var text = '';
    if (window.getSelection) {
      if (document.activeElement &&
        (document.activeElement.tagName.toLowerCase() === 'textarea' ||
          document.activeElement.tagName.toLowerCase() === 'input')) {
        var inputValue = document.activeElement.value;
        text = inputValue.substring(document.activeElement.selectionStart, document.activeElement.selectionEnd);
      }
      else {
        var selRange = window.getSelection();
        text = selRange.toString();
      }
    } else if (document.selection && document.selection.type != 'Control') {
      text = document.selection.createRange().text;
    }

    return text.trim();
  }
};