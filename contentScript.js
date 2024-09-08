chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.rewrittenText) {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect(); // Get the position of the selected text
    const rewrittenText = message.rewrittenText;

    // Create the pop-up div
    const popup = document.createElement('div');
    popup.style.position = 'absolute';
    popup.style.top = `${window.scrollY + rect.bottom}px`;
    popup.style.left = `${rect.left}px`;
    popup.style.padding = '10px';
    popup.style.zIndex = '10000';
    popup.style.fontSize = '14px';
    popup.style.maxWidth = '300px';
    popup.style.wordWrap = 'break-word';
    popup.style.borderRadius = '5px';
    popup.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';

    // Detect if the user is in dark mode
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (isDarkMode) {
      // Dark mode styles
      popup.style.backgroundColor = '#2c2c2c'; // Dark background
      popup.style.color = '#ffffff'; // Light text
      popup.style.border = '1px solid #444'; // Slightly lighter border
    } else {
      // Light mode styles
      popup.style.backgroundColor = '#ffffff'; // Light background
      popup.style.color = '#000000'; // Dark text
      popup.style.border = '1px solid #ddd'; // Light border
    }

    popup.innerText = rewrittenText;

    document.body.appendChild(popup);

    // Auto-hide the pop-up after a few seconds
    setTimeout(() => {
      popup.remove();
    }, 10000); // Adjust time as needed
  }
});
