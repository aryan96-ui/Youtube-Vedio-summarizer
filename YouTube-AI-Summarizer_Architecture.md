# YouTube AI Summarizer – Technical Architecture

## 1. Folder & File Structure

```
YouTube-AI-Summarizer/
├── manifest.json                # Chrome Extension Manifest v3 configuration
├── popup/
│   ├── popup.html               # Popup UI for summarization controls and results
│   ├── popup.js                 # Logic for popup interactions, messaging, display
│   └── popup.css                # Styles for popup UI
├── content/
│   └── content.js               # Injected into YouTube pages, fetches transcript, side panel logic
├── background/
│   └── background.js            # Handles context menu, notifications, manages extension state
├── options/
│   ├── options.html             # Options page for API key, settings, preferences
│   ├── options.js               # Logic for settings storage/retrieval
│   └── options.css              # Styles for options page
├── assets/
│   ├── icon_16.png              # Extension icon (16x16)
│   ├── icon_48.png              # Extension icon (48x48)
│   └── icon_128.png             # Extension icon (128x128)
├── utils/
│   ├── openai.js                # Helper for calling OpenAI API, building prompts
│   └── storage.js               # Helper for Chrome storage API (API key, settings)
├── sidepanel/
│   ├── sidepanel.html           # UI for summary display on YouTube page
│   ├── sidepanel.js             # Logic for rendering summary inside side panel
│   └── sidepanel.css            # Styles for side panel
├── _locales/
│   └── en/messages.json         # Localization (English)
└── README.md                    # Project documentation
```

## 2. File Descriptions

### Core Files

- **manifest.json**  
  Defines extension permissions, scripts, background, content, options, icons, context menus, and side panel.

- **popup/popup.html, popup.js, popup.css**  
  UI and logic for extension popup. Lets user trigger summarization, view results, copy/export summary, and see errors.

- **content/content.js**  
  Injected into YouTube video pages.  
  - Detects video URL.
  - Fetches transcript/captions via YouTube API or DOM scraping.
  - Sends transcript to background for summarization.
  - Renders side panel with summary.

- **background/background.js**  
  Runs in background.  
  - Handles context menu "Summarize with AI".
  - Manages communication between popup and content scripts.
  - Calls OpenAI API via utils/openai.js.
  - Sends browser notifications when needed.
  - Central error handler.

- **options/options.html, options.js, options.css**  
  Options/settings page.  
  - Lets user input/store OpenAI API key.
  - Configures preferences (summary length, language, style, notifications).
  - Manages privacy and advanced settings.

- **assets/**  
  Icons for extension browser toolbar and Chrome Web Store.

### Utilities

- **utils/openai.js**  
  - Builds request payloads.
  - Calls OpenAI API securely with stored API key.
  - Handles response parsing and error states.

- **utils/storage.js**  
  - Simplifies interaction with Chrome storage API.
  - Stores/retrieves API key and user settings.

### Side Panel

- **sidepanel/sidepanel.html, sidepanel.js, sidepanel.css**  
  - UI for displaying summary on YouTube pages.
  - Collapsible, draggable as per settings.
  - Allows export/copy actions, theme (dark/light).

### Localization

- **_locales/en/messages.json**  
  Extension text for i18n (en).

### Documentation

- **README.md**  
  Setup guide, feature list, architecture overview, packaging instructions.

## 3. Key Technical Processes

### Manifest v3 Highlights

- `"background"` of type `"service_worker"` (background.js).
- `"content_scripts"` for YouTube URLs (content.js).
- `"action"` for popup.
- `"options_page"` for options.html.
- `"permissions"`: `storage`, `scripting`, `contextMenus`, `notifications`, `activeTab`.

### Transcript Fetching

- *Via content script*:  
  - Scrape YouTube transcript/captions from DOM.
  - Or call YouTube transcript API (if captions available).
  - Handle multi-language and unavailable cases gracefully.

### Communication Flow

- **Popup ↔ Background ↔ Content script**  
  - Popup triggers summarization → sends message to background.
  - Background asks content script for transcript.
  - Content script fetches transcript, replies to background.
  - Background calls OpenAI API, gets summary.
  - Summary sent to popup (and/or content script for side panel display).

### User API Key Storage

- Stored in Chrome `storage.sync` for cross-device sync.
- Accessed via utils/storage.js.
- Options page provides API key entry/update.

### Calling OpenAI API

- openai.js uses stored API key, builds request.
- Handles token limits, errors, retries.
- Summarization parameters configurable via settings.

### Error Handling

- Centralized in background.js and openai.js.
- Friendly messages in popup/side panel.
- Notifications for failures (optional).
- Handles transcript unavailability, API issues, network errors.

### Packaging (.crx)

- Validate manifest and files.
- Use Chrome's Extension Packaging tool to produce .crx file for distribution.
- README.md includes packaging instructions.

---

**This architecture provides a scalable, maintainable structure for developing and publishing the YouTube AI Summarizer Chrome Extension with all required features.**