# YouTube AI Summarizer Chrome Extension

## Features
- Summarizes YouTube videos using OpenAI (GPT-3.5 or GPT-4)
- Popup UI with dark, 3D effect (Tailwind CSS)
- API key management and settings page
- Handles long transcripts and chunking
- Graceful error handling

## Installation
### 1. Download or Clone the Folder
Place all files in a folder (see structure above).

### 2. Add Your OpenAI API Key
Go to the extension’s Options page and enter your key (format: `sk-...`).

### 3. Load in Chrome
- Open `chrome://extensions/`
- Enable **Developer mode**
- Click **Load unpacked**
- Select your extension folder

### 4. Production Packaging (.crx)
1. **Minify all JS/CSS files** (see instructions above)
2. **Create a ZIP** of your folder.
3. **Use Chrome or CRX tools** to package as `.crx`

## Notes
- You must have an OpenAI API key for this to work.
- Transcript fetching uses youtubetranscript.com (subject to availability).

## Troubleshooting
- If the popup says "Transcript not available" or "Failed to summarize," check the video has captions and your API key is valid.

---