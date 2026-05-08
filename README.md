

[![Netlify Status](https://api.netlify.com/api/v1/badges/00f3abbc-a569-4a22-93d2-e8d6be764523/deploy-status)](https://app.netlify.com/projects/letters-from-the-trenches/deploys)
# Letters from the trenches

A small application that serves as interface between the user and the WWI letters dataset.

![/mockup.webp](/public/mockup.webp)

## Table of contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project structure](#project-structure)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Install](#install)
    - [Scripts](#scripts)
        - [Dev](#dev)
        - [Production build](#production-build)
        - [Preview](#preview)
- [Known limitations and TODOs](#known-limitations-and-todos)

## Features

Letters from the trenches is a small application that consolidates the information within various CSV and JSON files and serves it to the user through an interface that includes filtering tools and a translation service.

- **Dataset compilation:** The original [Kaggle dataset](https://www.kaggle.com/datasets/anthaus/world-war-i-) by Anthaus is consolidated in single data objects to be easily readable through the UI.
- **Sorting and filtering tools:** The  can be filtered through keywords, letter ids, language and year to for quick access and find  within a specific context.
- **Instant translation to more than 32 languges:** The letters can be translated to a preferred language with the click of a button thanks to the underlaying [TranslatePlus.io](https://translateplus.io/) Rest API requests.
- **Responsive Design:** Works on mobile, tablet, and desktop.

## Tech Stack

- **React + Vite** - Reactive framework using vite as bundler.
- **TypeScript** - Type safety.
- **TailwindCSS** - Fast, utility oriented styling.
- **Papaparse** - CSV data parser.

## Project structure

```
src/
├─ components/                        # UI components
│   ├─ ui/                            # Small reusable UI components
│   │  ├─ CustomChecbox.tsx           # Customized modular checkbox
│   │  └─ LanguageFlag.component.tsx  # Customizable flag icon
│   ├─ Entry.component.tsx            # Displays simplified letter data and opens reader.
│   ├─ FilterSearch.component.tsx     # Displays and calls back filtering functions.
│   ├─ LetterDisplay.component.tsx    # Parent component holding data and handling functions.
│   ├─ ReaderModal.component.tsx      # Displays user selected letter data and translation controls.
│   └─ Translator.component.tsx       # Calls back translation functions.
├─ services/
│   └─  translate.ts                  # TranslatePlus Rest API call functions.
├─ types                   
│   └─  types.ts                      # Typescript types
├─ utils 
│   ├─  parsers.ts                    # Dataset parsing into typed JS objects.   
│   └─  truncateText.ts               # Function to show limited character count on Entry components.
├─ index.css                          # Tailwind setup and global styling.
├─ App.tsx                            # Application root component.      
└─ main.tsx                           # React's main component mount function.
```
## Getting started

### Prerequisites
- [Node.js ^18](https://nodejs.org/)
- [NPM](https://www.npmjs.com/)/[PNPM](https://pnpm.io/)

### Install

Reach the desired folder path and introduce the following commands:

#### Clone repository
```bash 
git clone https://github.com/adriangdp/letters-from-the-trenches
```
#### Install dependencies
```bash 
cd letters-from-the-trenches
npm install
```

#### Set API

Get a free API Key from [TranslatePlus](https://app.translateplus.io/api-keys). Then return to the App folder and create a .env file. Within the file, introduce the following data:
```bash 
VITE_TRANSLATE = **Your API key goes here**
```
#### Run and open
```bash 
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Scripts
#### Dev
```bash
npm run dev
```
#### Production build
```bash
npm run build
```
#### Preview
```bash
npm run preview
```
#### Run linter
```bash
npm run lint
```

### Known Limitations

The live example uses [TranslatePlus.io](https://translateplus.io/) free tier; so it is limited up to 5000 request per month (which is actually, very good for this tiny app). For now, the api call will throw an error in the console specifically for running out of requests.
