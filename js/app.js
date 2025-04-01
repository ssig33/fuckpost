// FuckPost - A minimal Mastodon client
// Main application logic

// Constants
const STORAGE_KEY = "fuckpost_data";
const DEFAULT_STORAGE = {
  draft: {
    content: "",
    updated: null,
  },
  settings: {
    previewMode: "vertical",
  },
};

// App state
let appState = {
  instance: null,
  token: null,
  storage: { ...DEFAULT_STORAGE },
};

// DOM Elements
const loginView = document.getElementById("login-view");
const editorView = document.getElementById("editor-view");
const loginForm = document.getElementById("login-form");
const instanceInput = document.getElementById("instance-url");
const accessTokenInput = document.getElementById("access-token");
const editorContainer = document.getElementById("editor-container");
const editor = document.getElementById("editor");
const preview = document.getElementById("preview");
const postButton = document.getElementById("post-button");
const viewModeRadios = document.querySelectorAll('input[name="view-mode"]');
const editorTab = document.getElementById("editor-tab");
const previewTab = document.getElementById("preview-tab");

// Initialize the application
function init() {
  // Check for existing authentication
  const savedToken = localStorage.getItem("fuckpost_token");
  const savedInstance = localStorage.getItem("fuckpost_instance");

  if (savedToken && savedInstance) {
    appState.token = savedToken;
    appState.instance = savedInstance;
    loadEditor();
  } else {
    showLoginView();
  }

  // Set up event listeners
  setupEventListeners();
}

// Set up event listeners
function setupEventListeners() {
  // Login form submission
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const instance = instanceInput.value.trim();
    const token = accessTokenInput.value.trim();

    if (instance && token) {
      // Store the instance and token
      appState.instance = instance;
      appState.token = token;
      localStorage.setItem("fuckpost_instance", instance);
      localStorage.setItem("fuckpost_token", token);

      // Load the editor
      loadEditor();
    }
  });

  // Editor input for real-time preview
  editor.addEventListener("input", updatePreview);

  // Post button
  postButton.addEventListener("click", submitPost);

  // View mode toggle
  viewModeRadios.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      setViewMode(e.target.value);
    });
  });
}

// Show login view
function showLoginView() {
  loginView.style.display = "block";
  editorView.style.display = "none";

  // Pre-fill the form if we have saved values
  if (appState.instance) {
    instanceInput.value = appState.instance;
  }
  if (appState.token) {
    accessTokenInput.value = appState.token;
  }
}

// Load editor view
function loadEditor() {
  // Load saved draft from localStorage
  loadStorage();

  // Load the draft content
  loadDraft();

  // Set the view mode
  setViewMode(appState.storage.settings.previewMode);

  // Update the preview
  updatePreview();

  // Show the editor view
  loginView.style.display = "none";
  editorView.style.display = "block";
}

// Load storage from localStorage
function loadStorage() {
  const savedStorage = localStorage.getItem(STORAGE_KEY);
  if (savedStorage) {
    try {
      appState.storage = JSON.parse(savedStorage);

      // Ensure the storage has the expected structure
      if (!appState.storage.draft) {
        appState.storage.draft = DEFAULT_STORAGE.draft;
      }
      if (!appState.storage.settings) {
        appState.storage.settings = DEFAULT_STORAGE.settings;
      }
    } catch (e) {
      console.error("Failed to parse storage:", e);
      appState.storage = { ...DEFAULT_STORAGE };
    }
  } else {
    appState.storage = { ...DEFAULT_STORAGE };
  }
}

// Save storage to localStorage
function saveStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appState.storage));
}

// Load the draft
function loadDraft() {
  if (appState.storage.draft && appState.storage.draft.content) {
    editor.value = appState.storage.draft.content;
  } else {
    editor.value = "";
  }
}

// Save the draft
function saveDraft() {
  const content = editor.value;
  appState.storage.draft.content = content;
  appState.storage.draft.updated = new Date().toISOString();
  saveStorage();
}

// Update the Markdown preview
function updatePreview() {
  const content = editor.value;
  preview.innerHTML = marked.parse(content);

  // Auto-save the draft
  saveDraft();
}

// Set the view mode (vertical or horizontal)
function setViewMode(mode) {
  if (mode === "vertical") {
    editorContainer.className = "vertical-mode";
  } else if (mode === "horizontal") {
    editorContainer.className = "horizontal-mode";
  }

  // Save the setting
  appState.storage.settings.previewMode = mode;
  saveStorage();
}

// Submit post to Mastodon
async function submitPost() {
  if (!appState.token || !appState.instance) {
    alert("Not authenticated. Please log in again.");
    showLoginView();
    return;
  }

  const content = editor.value;
  if (!content.trim()) {
    alert("Cannot post empty content.");
    return;
  }

  try {
    postButton.disabled = true;
    postButton.textContent = "Posting...";

    const response = await fetch(
      `https://${appState.instance}/api/v1/statuses`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${appState.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: content,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();

    // Post successful
    alert("Post successful!");

    // Clear the editor
    editor.value = "";
    updatePreview();
  } catch (error) {
    console.error("Error posting:", error);
    alert(`Failed to post: ${error.message}`);
  } finally {
    postButton.disabled = false;
    postButton.textContent = "Post";
  }
}

// Initialize the app when the DOM is loaded
document.addEventListener("DOMContentLoaded", init);
