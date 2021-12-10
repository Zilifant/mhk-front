// Text to Clipboard //
// Copy given text to clipboard and then show a broswer alert to the user.

export default function textToClipboard(text) {
  if (!navigator.clipboard) {
    textToClipboardDeprecated(text);
  } else {
    navigator.clipboard.writeText(text)
    .then(() => alert('Lobby URL copied!'))
    .catch(() => alert('Error: Copying failed.'));
  };
};

// Fallback in case browser does not support `navigator.clipboard`.
function textToClipboardDeprecated(text) {
  const dummy = document.createElement('textarea');
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand('copy'); // Deprecated!
  document.body.removeChild(dummy);
  alert('Lobby URL copied.');
};
