<div align="center">

<h1>Anti-Youtube</h1>
Watch your favorite creators without getting hooked by the algorithm

</div>

<br>

## Overview

A minimalist YouTube viewer that shows only the latest video from a fixed list of channels. The UI is intentionally boring, no recommendations, no comments, no watch history, and no gamification.

## Tech Stack

Built with **Next.js**, **TypeScript**, and **Tailwind CSS**. Videos are fetched through YouTube RSS feeds using ISR (no API key required).

## Getting Started

#### Clone the repository

```bash
git clone https://github.com/pestanadiego/anti-youtube.git
cd anti-youtube
npm install
```

#### Set up your channel list

This project fetches channel data from a published Google Sheet. To set one up:

1. Create a sheet with two columns, `channel_id` and `name`
2. Fill in your channels
3. Go to **File → Share → Publish to web** and select CSV format
4. Copy the generated URL

#### Configure environment variables

Create a `.env.local` file following the `.env.example` template, then paste the generated URL.

#### Start the server

```bash
npm run dev
```

## License

MIT
