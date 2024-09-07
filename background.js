import Groq from 'groq-sdk';

// Event listener for when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "rewrite-professional",
    title: "Rewrite: Professional",
    contexts: ["selection"]
  });

  chrome.contextMenus.create({
    id: "rewrite-casual",
    title: "Rewrite: Casual",
    contexts: ["selection"]
  });

  chrome.contextMenus.create({
    id: "rewrite-formal",
    title: "Rewrite: Formal",
    contexts: ["selection"]
  });

  chrome.contextMenus.create({
    id: "rewrite-informal",
    title: "Rewrite: Informal",
    contexts: ["selection"]
  });
});

// Listener for context menu clicks
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  console.log(`Menu item clicked: ${info.menuItemId}\nSelected text: ${info.selectionText}`);
  const selectedText = info.selectionText;
  let mode = '';

  switch (info.menuItemId) {
    case "rewrite-professional":
      mode = "Professional";
      break;
    case "rewrite-casual":
      mode = "Casual";
      break;
    case "rewrite-formal":
      mode = "Formal";
      break;
    case "rewrite-informal":
      mode = "Informal";
      break;
    default:
      console.log("Unknown menu item");
      return;
  }

  try {
    const rewrittenText = await rewrite(selectedText, mode);
    console.log(`Rewritten text: ${rewrittenText}`);
    // Optionally send rewritten text back to the page or display it
  } catch (error) {
    console.error("Error rewriting text:", error);
  }
});

// Async function to rewrite text
async function rewrite(text, mode) {
  const groq = new Groq({ apiKey: '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' }); // Replace with your Groq API key

  try {
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Rephrase this text in ${mode}: ${text}`,
        },
      ],
      model: "llama3-8b-8192",
    });

    return response.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("Error in Groq API call:", error);
    throw error;
  }
}
