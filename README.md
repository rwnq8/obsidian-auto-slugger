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

## 🚀 Getting Started: Installation (For End Users)

If you just want to use the plugin, choose **one** of the methods below. You do **not** need any special tools for this.

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

Download specific versions of the plugin directly. This is the recommended manual method.

1.  **Download Files:**
    *   Go to: `https://github.com/rwnq8/obsidian-auto-slugger/releases`
    *   Find the latest release (or a version you want).
    *   Under "Assets", download `main.js` and `manifest.json`.
        *   (If there's a `.zip` file containing these, download it and open it to find `main.js` and `manifest.json` inside.)

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

### Method 3: Manual Install from Repository (Very latest code, potentially less stable)

Get the absolute newest code directly from the repository. This is for users who understand this might be less tested than a release.

1.  **Go to GitHub:**
    *   `https://github.com/rwnq8/obsidian-auto-slugger`

2.  **Download `main.js`:**
    *   Click on `main.js` in the file list.
    *   On the next page, click the "Raw" button (or a download icon).
    *   If code appears, right-click > "Save As..." and save it as `main.js`. *(Make sure this is the built `main.js`, not the source TypeScript file if one exists at the root).*

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

## 🧑‍💻 For Developers: Building the Plugin

If you want to modify the plugin or build it from the source code:

### 1. Local Development Setup

You'll need Node.js and npm (or yarn) installed on your computer.

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/rwnq8/obsidian-auto-slugger.git
    cd obsidian-auto-slugger
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    # OR if you use yarn:
    # yarn install
    ```

3.  **Build the Plugin:**
    *   **For development (watches for changes and rebuilds automatically):**
        ```bash
        npm run dev
        ```
    *   **For a production build (creates optimized files):**
        ```bash
        npm run build
        ```
    This will typically generate `main.js` (the compiled plugin code) and update `manifest.json` in the project's root directory or a `dist/` folder, depending on the `rollup.config.js` setup.

4.  **Test in Obsidian:**
    *   Copy the built `main.js` and the `manifest.json` from your project folder.
    *   Paste them into your Obsidian test vault at: `<YourTestVault>/.obsidian/plugins/auto-slugger/` (create the `auto-slugger` folder if it doesn't exist).
    *   Reload Obsidian (Ctrl/Cmd+R or use the command palette "Reload app without saving").
    *   Enable the plugin in `Settings` > `Community Plugins`.

### 2. Automated Builds with GitHub Actions (For Repository Maintainers)

To automatically build the plugin and create release assets (`main.js`, `manifest.json`) whenever you tag a new version on GitHub, you can use GitHub Actions.

1.  **Create a Workflow File:**
    Create a file named `.github/workflows/release.yml` in your repository with content similar to this:

    ```yaml
    name: Build Plugin and Create Release

    on:
      push:
        tags:
          - 'v*' # Trigger on version tags like v1.0.0, v0.2.1

    jobs:
      build_and_release:
        runs-on: ubuntu-latest
        steps:
          - name: Checkout code
            uses: actions/checkout@v3

          - name: Set up Node.js
            uses: actions/setup-node@v3
            with:
              node-version: '18' # Use a current LTS version

          - name: Install dependencies
            run: npm ci # 'ci' is generally preferred for CI environments

          - name: Build plugin
            run: npm run build # This should output main.js, manifest.json

          - name: Create Release
            id: create_release
            uses: actions/create-release@v1
            env:
              GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
            with:
              tag_name: ${{ github.ref }}
              release_name: Release ${{ github.ref_name }}
              draft: false
              prerelease: false

          - name: Upload main.js to Release
            uses: actions/upload-release-asset@v1
            env:
              GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
            with:
              upload_url: ${{ steps.create_release.outputs.upload_url }}
              asset_path: ./main.js # Adjust path if build outputs to dist/
              asset_name: main.js
              asset_content_type: application/javascript

          - name: Upload manifest.json to Release
            uses: actions/upload-release-asset@v1
            env:
              GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
            with:
              upload_url: ${{ steps.create_release.outputs.upload_url }}
              asset_path: ./manifest.json # Adjust path if build outputs to dist/
              asset_name: manifest.json
              asset_content_type: application/json

          # Optional: Create a zip archive of the plugin files
          - name: Create ZIP archive
            run: zip auto-slugger-plugin.zip main.js manifest.json # Add styles.css if present

          - name: Upload ZIP to Release
            uses: actions/upload-release-asset@v1
            env:
              GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
            with:
              upload_url: ${{ steps.create_release.outputs.upload_url }}
              asset_path: ./auto-slugger-plugin.zip
              asset_name: auto-slugger-plugin-${{ github.ref_name }}.zip
              asset_content_type: application/zip
    ```
    *Note: Ensure the `asset_path` for `main.js` and `manifest.json` in the upload steps matches where your `npm run build` command places these files (e.g., project root or a `dist/` folder).*

2.  **Using the Workflow:**
    *   Commit and push this `.github/workflows/release.yml` file to your repository.
    *   When you are ready to release a new version:
        1.  Ensure your `manifest.json` has the correct new version number.
        2.  Commit any changes.
        3.  Create a git tag: `git tag v1.0.1` (replace `v1.0.1` with your new version).
        4.  Push the tag to GitHub: `git push origin v1.0.1`.
    *   GitHub Actions will automatically run the workflow, build the plugin, create a new GitHub Release, and upload `main.js`, `manifest.json`, and the zip file as assets. These assets are what users will download in "Method 2: Manual Install from GitHub Releases".

---

## 🤝 Contributing & Support

Found a bug or have an idea? Please open an issue on the [GitHub repository issues page](https://github.com/rwnq8/obsidian-auto-slugger/issues)! Pull requests are also welcome.

---

## 📜 License

This plugin and its content are licensed under the **QNFO Content License Agreement**.
You can view the full license terms here: [https://github.com/QNFO/license/blob/main/LICENSE.md](https://github.com/QNFO/license/blob/main/LICENSE.md)

By using, distributing, or contributing to this plugin, you agree to be bound by the terms of this license. Please review the full license for details on usage, attribution, and other conditions.

---

Happy slugging!
