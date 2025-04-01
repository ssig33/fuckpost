# FuckPost - Mastodon Client Specification

## Overview

This document outlines the specifications for FuckPost, a lightweight Mastodon client that focuses on post creation with Markdown support. The client is implemented using only HTML, CSS, and JavaScript, with no server-side dependencies, utilizing the Mastodon API with direct access token authentication.

## Core Features

1. Authentication with Mastodon instances using direct access token input
2. Large text editor for post composition
3. Real-time Markdown preview with two viewing modes:
   - Stacked (editor on top, preview below)
   - Side by Side (editor on left, preview on right)
4. Single draft auto-save functionality using localStorage
5. Post submission to Mastodon API
6. Dark mode support based on system preferences

## Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Authentication**: Direct access token input
- **Markdown Processing**: marked.js
- **Storage**: localStorage (for draft and settings)
- **API Communication**: Fetch API
- **UI Framework**: None - custom CSS only

## Architecture

The application follows a modular architecture with these main components:

1. **Authentication Module**: Handles token management and API authentication
2. **Editor Module**: Manages the text input and Markdown processing
3. **Preview Module**: Renders Markdown in real-time
4. **Storage Module**: Handles draft saving and retrieval
5. **API Module**: Communicates with Mastodon API endpoints

## Authentication Flow

1. User enters their Mastodon instance URL (e.g., "mastodon.social")
2. User enters their access token (obtained from their Mastodon instance settings)
3. Application stores the token and instance URL in localStorage
4. Application proceeds to the editor interface

## User Interface

The UI consists of these main screens:

1. **Login Screen**: 
   - Instance URL input field
   - Access token input field
   - Login button
   - Help text for obtaining access token

2. **Editor Screen**: 
   - Large text area for post composition
   - Preview area (stacked or side by side)
   - Toggle for preview mode
   - Post button

## Draft Management System

### Data Structure

The draft is stored in localStorage as a JSON object with the following structure:

```
{
  "draft": {
    "content": "Draft content with markdown",
    "updated": "timestamp"
  },
  "settings": {
    "previewMode": "vertical or horizontal"
  }
}
```

### Draft Operations

The application supports these draft operations:

1. **Auto-Save Draft**:
   - Update content and timestamp
   - Save to localStorage automatically when editing

2. **Load Draft**:
   - Retrieve draft from localStorage
   - Populate editor with content

## Preview Modes

1. **Stacked Mode**:
   - Editor displayed on top (70% height)
   - Preview displayed below (30% height)
   - Full width utilization for both

2. **Side by Side Mode**:
   - Editor displayed on left (50% width)
   - Preview displayed on right (50% width)
   - Full height utilization for both

## Markdown Features

The preview supports standard Markdown features:
- Headings
- Lists (ordered and unordered)
- Links
- Images
- Bold/Italic formatting
- Code blocks
- Blockquotes
- Tables

## API Integration

### Mastodon API Endpoints

The application primarily uses this Mastodon API endpoint:

1. **Post Creation**: `/api/v1/statuses` for creating new posts

### Error Handling

The application handles these API-related errors:
- Authentication failures
- Network connectivity issues
- API errors

## Security Considerations

1. **Token Storage**:
   - Access tokens are stored in localStorage
   - No encryption is implemented in the current version

2. **Data Privacy**:
   - All data remains client-side
   - No server storage of user content

## Design Features

1. **Light and Dark Mode**:
   - Automatic theme switching based on system preferences
   - Custom color schemes for both modes
   - Consistent styling across the application

2. **UI Elements**:
   - Clean, minimal interface
   - Clear visual separation between editor and preview
   - Responsive buttons and controls

## Implementation Details

1. **CSS Variables**:
   - Theme colors defined using CSS custom properties
   - Easy switching between light and dark modes

2. **Markdown Styling**:
   - Consistent typography for rendered Markdown
   - Syntax highlighting for code blocks
   - Proper spacing for all elements

3. **Responsive Layout**:
   - Adapts to different screen sizes
   - Maintains usability on smaller screens