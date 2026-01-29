# Personal Document Center / 个人文档中心

A pure frontend documentation system built with React, Vite, and Markdown.

## Features

- **Pure Frontend**: No backend database required.
- **Auto Catalog**: Automatically generates sidebar from `public/docs`.
- **Markdown Support**: GFM, Syntax Highlighting.
- **Responsive**: Mobile-friendly design.
- **Search**: Real-time content search.

## Setup & Run

### Prerequisites

- Node.js (v16+)

### Installation

```bash
npm install
```

### Development

Start the dev server:

```bash
npm run dev
```

The system will automatically scan `public/docs` and generate the catalog.

### Build

Build for production:

```bash
npm run build
```

The output will be in `dist/`.

## Adding Documents

1. Place your Markdown files in `public/docs/`.
2. The filename or the first H1 header will be used as the document title.
3. Re-run `npm run dev` or `npm run build` to update the catalog.

## Project Structure

- `public/docs/`: Documentation files.
- `scripts/`: Build scripts (catalog generator).
- `src/components/`: UI components.
- `src/App.tsx`: Main application logic.
