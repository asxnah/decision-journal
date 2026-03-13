**# Decision Journal**

A modern web app for capturing, reflecting on, and learning from your most important decisions over time. Built with Next.js, it uses Redux + persistence to track current decision forms and a history of past decisions.

## ✨ Features

- **Multi-step decision creation** at `/create-decision` (conditional rendering via `stepNumber` + dynamic Redux `set({ key, value })` updates)
- **Persistent state** – decisions saved automatically to browser `localStorage` via Redux Persist (whitelists `decision` and `decisions` slices)
- **Separate Redux slices**:
  - `decision`: current decision being edited (form fields + reset)
  - `decisions`: array of completed decisions (add action)
- Dedicated routes for deeper reflection:
  - `/decision-detail`
  - `/expectations`
  - `/review-date`
  - `/timeline`
- Clean, custom UI with Tailwind CSS 4, custom color theme, and the Epilogue variable font
- Fully typed in TypeScript
- Ready for unique IDs (uuid dependency ready for use)

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router) + React 19
- **Language**: TypeScript
- **State**: Redux Toolkit + react-redux + redux-persist
- **Styling**: Tailwind CSS 4 + PostCSS
- **Utilities**: uuid
- **Linting**: ESLint (Next.js config)

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/asxnah/decision-journal.git
cd decision-journal
npm install
```

### 2. Run locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### 3. Build & Start
```bash
npm run build
npm start
```

### Scripts
- `dev` – development server
- `build` – production build
- `start` – production server
- `lint` – run ESLint

## 📁 Project Structure

```
decision-journal/
├── app/                          # App Router
│   ├── layout.tsx                # Root layout + metadata + ReduxProvider
│   ├── page.tsx                  # Home (currently empty placeholder)
│   ├── globals.css               # Tailwind + Epilogue font + custom theme
│   ├── reduxProvider.tsx         # <Provider> + <PersistGate>
│   ├── create-decision/
│   │   ├── page.tsx              # Multi-step form (stepNumber logic)
│   │   └── widgets/              # Form-specific widgets
│   ├── decision-detail/
│   ├── expectations/
│   ├── review-date/
│   └── timeline/
├── src/
│   ├── store/
│   │   ├── index.ts              # configureStore + persistReducer
│   │   ├── rootReducer.tsx       # combineReducers (decision + decisions)
│   │   └── slices/
│   │       ├── decision.tsx      # Current decision form slice
│   │       └── decisions.tsx     # History list slice (add/reset)
│   └── widgets/
│       └── header/               # Shared header component
├── public/
│   └── fonts/
│       └── Epilogue-VariableFont_wght.ttf
├── next.config.ts
├── tsconfig.json
├── package.json
└── .gitignore
```

## 🔧 State Management Details

The store is fully persisted:

```ts
// src/store/index.ts (key excerpts)
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["decision", "decisions"],
};
```

- `decision` slice → dynamic field updates + reset (used by create-decision form)
- `decisions` slice → `add` action that pushes completed decisions to the array
- Types exported: `RootState`, `AppDispatch`

All state survives page refreshes thanks to `PersistGate` and `redux-persist`.

## 📝 Metadata & Branding

- Title: **Decision Journal**
- Description: "Capture, reflect on and learn from your most important decisions over time"
- Font: **Epilogue** (variable weight)
- Theme colors defined in `globals.css` (black/gray palette)

## 📌 Notes / Roadmap

- Home page (`/`) is currently a minimal placeholder — ready for a dashboard or decision list.
- Several route pages are in early stages (widgets and forms are being built).
- No backend yet (fully client-side with local persistence — perfect for personal use).
- Easy to extend: add delete/update actions, export to JSON, charts for timeline, etc.
