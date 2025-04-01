# FuckPost

A minimal Mastodon client for posting with Markdown support. Built with pure HTML, CSS, and JavaScript.

## Features

- Direct access token authentication with Mastodon instances
- Large text editor with real-time Markdown preview
- Two preview modes: Stacked and Side by Side
- Auto-save draft functionality
- Dark mode support based on system preferences
- No server-side dependencies - works entirely in your browser

## Usage

1. Get your access token from your Mastodon instance's settings page
2. Enter your instance URL (e.g., mastodon.social) and access token
3. Write your post with Markdown formatting
4. Preview your post in real-time
5. Click "Post" to publish

## Development

This is a pure frontend application with no build process. To run locally:

```
python3 -m http.server
```

Then open http://localhost:8000 in your browser.

## License

This project is licensed under the WTFPL - see the LICENSE file for details.