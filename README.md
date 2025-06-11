# ✨ Auto Slugger for Obsidian ✨

[![Obsidian Build Version](https://img.shields.io/badge/Obsidian-v0.15.0+-purple.svg)](https://obsidian.md)
<!-- You can add more badges later, like a release version, if you set up GitHub Actions -->

Automatically or manually create clean, descriptive slugs for your Obsidian notes (e.g., `104538-auto-slugger-plugin`). Great for permalinks, better organization, and web publishing!

---

## 🌟 What It Does

*   **Creates Slugs:** Generates a unique identifier for your notes.
*   **Timestamped:** Starts with a 6-digit (HHMMSS) or 12-digit (YYMMDDHHMMSS) timestamp.
*   **Smart Words:** Adds 1-5 important words from your note's content.
*   **Automatic or Manual:**
    *   **Auto:** Makes slugs when you change, save, or click away from a note (you choose).
    *   **Manual:** Make a slug anytime with a button or command.
*   **Customizable:** You control where the slug is stored (frontmatter key), if it overwrites old slugs, and more!

---

## 🚀 Getting Started: Installation

Choose **one** of the methods below to install Auto Slugger.

### Method 1: Using BRAT (Easiest for updates & latest versions)

BRAT is an Obsidian plugin that helps you install other plugins directly from GitHub.

1.  **Install BRAT Plugin:**
    *   In Obsidian, go to `Settings` ⚙️ > `Community Plugins`.
    *   Turn **OFF** "Safe mode".
    *   Click `Browse`, search for `BRAT`, and click `Install`.
    *   After installing, click `Enable` for BRAT.

2.  **Add "Auto Slugger" with BRAT:**
    *   Open Obsidian's Command Palette (Windows/Linux: `Ctrl+P`, macOS: `Cmd+P`).
    *   Type `BRAT` and select `BRAT: Add a beta plugin for testing`.
    *   Paste this into the box: `rwnq8/obsidian-auto-slugger`
    *   Click `Add Plugin`.

3.  **Enable "Auto Slugger":**
    *   Go back to `Settings` ⚙️ > `Community Plugins`.
    *   Find "Auto Slugger" in your list and **toggle it ON**.

---

### Method 2: Manual Install from GitHub Releases (Specific, stable versions)

Download specific versions of the plugin directly.

1.  **Download Files:**
    *   Go to: `https://github.com/rwnq8/obsidian-auto-slugger/releases`
    *   Find the latest release (or a version you want).
    *   Under "Assets", download `main.js` and `manifest.json`.
        *   (If there's a `.zip` file, download it and open it to find `main.js` and `manifest.json` inside.)

2.  **Put Files in Obsidian:**
    *   Open your Obsidian vault folder on your computer.
    *   Go into the `.obsidian` folder (if you don't see it, enable "Show hidden files" in your computer's file explorer).
    *   Go into the `plugins` folder (if it's not there, create it).
    *   Create a **new folder** inside `plugins` named exactly: `auto-slugger`
    *   Move the downloaded `main.js` and `manifest.json` into this `auto-slugger` folder.

3.  **Enable "Auto Slugger":**
    *   Close and re-open Obsidian.
    *   Go to `Settings` ⚙️ > `Community Plugins`.
    *   Find "Auto Slugger" and **toggle it ON**.

---

### Method 3: Manual Install from Repository (Very latest code)

Get the absolute newest code, which might be less tested.

1.  **Go to GitHub:**
    *   `https://github.com/rwnq8/obsidian-auto-slugger`

2.  **Download `main.js`:**
    *   Click on `main.js` in the file list.
    *   On the next page, click the "Raw" button (or a download icon).
    *   If code appears, right-click > "Save As..." and save it as `main.js`.

3.  **Download `manifest.json`:**
    *   Go back to the main file list on GitHub.
    *   Click on `manifest.json`.
    *   Download it the same way you got `main.js`.

4.  **Put Files in Obsidian & Enable:**
    *   Follow **Step 2 ("Put Files in Obsidian")** and **Step 3 ("Enable Auto Slugger")** from **Method 2** above.

---

## 🛠️ How to Use

1.  **Configure (Optional but Recommended):**
    *   In Obsidian, go to `Settings` ⚙️ > `Community Plugins`.
    *   Find "Auto Slugger" and click the gear icon ⚙️ next to it for options. (See [Settings Explained](#-settings-explained) below).

2.  **Generate Slugs:**
    *   **Manually:**
        *   Click the dice icon (🎲) in the left sidebar (ribbon).
        *   Or, open the Command Palette (`Ctrl/Cmd+P`), type "Generate Slug", and select `Auto Slugger: Generate Slug for Current Note`.
    *   **Automatically:**
        *   If enabled in settings, slugs will be created based on your chosen trigger (e.g., when you stop typing or save).

The slug will appear in the frontmatter (at the top) of your note, like `slug: 123456-my-note`.

---

## ⚙️ Settings Explained

Access these in `Settings` > `Community Plugins` > `Auto Slugger` (gear icon).

*   **Automatic Slug Generation:** (Default: `Off`)
    *   Turn ON to make slugs automatically.
*   **Trigger Event (for Automatic):** (Default: `On Note Save/Focus Lost`)
    *   `On Note Change`: Makes slug shortly after you stop typing.
    *   `On Note Save/Focus Lost`: Makes slug when note saves or you click elsewhere.
*   **Slug Frontmatter Key:** (Default: `slug`)
    *   The name used in frontmatter (e.g., `slug`, `permalink`).
*   **Overwrite Existing Slug:** (Default: `Off`)
    *   If ON, will replace an existing slug. If OFF, only adds if no slug is present (safer for auto-mode).
*   **Timestamp Format:** (Default: `HHMMSS`)
    *   `HHMMSS`: e.g., `104538`
    *   `YYMMDDHHMMSS`: e.g., `231027104538`
*   **Number of Significant Words:** (Default: `2`)
    *   How many words (1-5) from your note to use in the slug.
*   **Minimum Word Length:** (Default: `4`)
    *   Shortest word length to consider for the slug.
*   **Custom Stop Words:** (Default: *empty*)
    *   Your own list of words to ignore (comma-separated, e.g., `project, myname`). These are in addition to common English stop words.

---

## 🤝 Contributing & Support

Found a bug or have an idea? Please open an issue on the [GitHub repository issues page](https://github.com/rwnq8/obsidian-auto-slugger/issues)!

---

## 📜 License

This plugin is released under the [MIT License](LICENSE).
*(You'll need to add a `LICENSE` file with the MIT license text to your repository: `https://github.com/rwnq8/auto-slugger/blob/main/LICENSE` if you add one)*

---

Happy slugging!
