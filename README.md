# TVK Dynamic Poster Generator

A high-performance web application built with Vue 3 and Vuetify 3 for creating professional, branded election campaign posters for Tamilaga Vettri Kazhagam (TVK).

## Features

- **Ultra-HD Rendering**: Generates posters at 3000px width (DPI suitable for professional printing).
- **Party Branding**: Includes a high-resolution header with the party leader (Vijay) and key historical figures (Periyar, Velunachiyar, Kamarajar, Ambedkar, and Anjalaiyammal).
- **Multi-Image Support**: Upload and automatically grid multiple images in the white content area.
- **Dynamic Data Fields**: Customizable fields for Constituency, Part No, Street, Date, and Description.
- **Footer Integration**: Automatically positions key election information in the branded footer.

## Tech Stack

- **Frontend**: Vue 3 (Options API)
- **UI Framework**: Vuetify 3
- **State Management**: Pinia
- **Build Tool**: Vite
- **Canvas Engine**: HTML5 Canvas API (Ultra-HD optimized)

## Getting Started

### Prerequisites

- Node.js (v16.18+ or v18+)
- npm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Project Structure

- `src/components/PosterCreator`: Core logic for the poster workspace and canvas engine.
- `src/assets`: Branded templates and static assets.
- `src/plugins/vuetify.js`: Custom theme configuration (Maroon & Gold).

## License

MIT
