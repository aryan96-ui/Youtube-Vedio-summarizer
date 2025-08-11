document.addEventListener("DOMContentLoaded", () => {
  const summarizeBtn = document.getElementById("summarizeBtn");
  const spinner = document.getElementById("spinner");
  const summaryArea = document.getElementById("summaryArea");
  const errorMsg = document.getElementById("errorMsg");

  function showLoading() {
    spinner.style.display = "flex";
    summarizeBtn.disabled = true;
    summaryArea.value = "";
    errorMsg.style.display = "none";
  }

  function hideLoading() {
    spinner.style.display = "none";
    summarizeBtn.disabled = false;
  }

  function showError(msg) {
    errorMsg.textContent = msg;
    errorMsg.style.display = "block";
  }

  summarizeBtn.addEventListener("click", async () => {
    showLoading();

    // Send message to background to summarize current YouTube video
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      const tab = tabs[0];
      chrome.runtime.sendMessage(
        {action: "summarize_video", tabId: tab.id, url: tab.url},
        function(response) {
          hideLoading();
          if (response && response.success) {
            summaryArea.value = response.summary;
          } else {
            showError(response && response.error ? response.error : "Failed to summarize video.");
          }
        }
      );
    });
  });
});