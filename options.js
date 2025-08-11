document.addEventListener("DOMContentLoaded", () => {
  const apiKeyInput = document.getElementById("apiKeyInput");
  const saveBtn = document.getElementById("saveBtn");
  const saveStatus = document.getElementById("saveStatus");
  const errorStatus = document.getElementById("errorStatus");

  // Load existing API key
  chrome.storage.sync.get(["openai_api_key"], function(data) {
    if (data.openai_api_key) {
      apiKeyInput.value = data.openai_api_key;
    }
  });

  saveBtn.addEventListener("click", () => {
    const key = apiKeyInput.value.trim();
    saveStatus.textContent = "";
    errorStatus.textContent = "";

    if (!key || !key.startsWith("sk-")) {
      errorStatus.textContent = "Please enter a valid OpenAI API key.";
      return;
    }

    chrome.storage.sync.set({"openai_api_key": key}, function() {
      saveStatus.textContent = "API key saved!";
      setTimeout(() => { saveStatus.textContent = ""; }, 2000);
    });
  });
});