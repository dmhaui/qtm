
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      if (request.action == "importText") {
        // sendToProcessingSystem(request.text);
        writeToClipboard(request.text);
      }
      return true;
  }
);


function sendToProcessingSystem(text) {
    // fetch('http://', {
    //   method: 'POST',
    //   body: JSON.stringify({ text: text }),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    // .then(response => response.json())
    // .then(data => {
    //   writeToClipboard(data.result);
    // })
    // .catch(error => console.error('Error:', error));
  }


function writeToClipboard(text) {
  const input = document.createElement('textarea');
  input.style.position = 'fixed';
  input.style.opacity = 0;
  input.value = text;
  document.body.appendChild(input);
  input.focus();
  input.select();
  
  try {
      const success = document.execCommand('copy');
      if (success) {
          console.log('Text copied to clipboard');
      } else {
          console.error('Unable to copy text');
      }
  } catch (error) {
      console.error('Unable to copy text: ', error);
  } finally {
      document.body.removeChild(input);
  }
}
