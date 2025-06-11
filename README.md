# ✨ Auto Slugger for Obsidian ✨

Instantly create neat, useful "slugs" (like `104538-my-note-title`) for your notes in Obsidian!

Slugs are short, URL-friendly identifiers. Auto Slugger makes them for you automatically or with a click, using a timestamp and a couple of important words from your note.

**Why use Auto Slugger?**
*   **Better Organization:** Easily link to notes with clean, predictable IDs.
*   **Web-Ready:** Perfect if you publish your notes online (blogs, digital gardens).
*   **Simple & Automatic:** Set it up once, and let it work its magic!

---

## 🚀 Quick Start: Get Auto Slugger in Your Obsidian

The easiest way to install and keep Auto Slugger updated is using another Obsidian plugin called **BRAT**.

**Step 1: Install BRAT (if you don't have it already)**

1.  Open Obsidian.
2.  Go to `Settings` (the gear icon ⚙️ usually in the bottom-left).
3.  Click on `Community Plugins`.
4.  **Important:** Make sure "Safe mode" is **turned OFF**. If it's on, you can't install community plugins.
5.  Click the `Browse` button to see available community plugins.
6.  In the search bar, type `BRAT`.
7.  Find `Obsidian42 - BRAT` in the list and click `Install`.
8.  After it installs, click `Enable` to activate BRAT.

**Step 2: Add "Auto Slugger" using BRAT**

1.  Now that BRAT is installed and enabled, open Obsidian's **Command Palette**:
    *   Windows/Linux: `Ctrl+P`
    *   macOS: `Cmd+P`
2.  In the Command Palette, type `BRAT` and look for the command `BRAT: Add a beta plugin for testing`. Click it.
3.  A box will pop up asking for a GitHub repository. Paste this exactly:
    `rwnq8/obsidian-auto-slugger`
4.  Click the `Add Plugin` button. BRAT will download and set up Auto Slugger.

**Step 3: Enable "Auto Slugger"**

1.  Go back to Obsidian `Settings` ⚙️ > `Community Plugins`.
2.  You should now see "Auto Slugger" in your list of installed plugins.
3.  **Make sure to turn it ON** by clicking the toggle switch next to its name.

🎉 **That's it! Auto Slugger is now installed.**

*(Want other ways to install? See [Alternative Installation Methods](#-alternative-installation-methods) at the bottom.)*

---

## 🛠️ How to Use Auto Slugger

Once installed and enabled, Auto Slugger can work automatically or when you tell it to.

**1. Automatic Slug Generation (Recommended for most users!)**

*   By default, Auto Slugger might be set to generate slugs automatically when you save a note or click away from it.
*   You can change this behavior in the settings (see [Customizing Auto Slugger](#-customizing-auto-slugger) below).

**2. Manual Slug Generation**

Need a slug right now?
*   **Ribbon Button:** Look for a dice icon (🎲) in Obsidian's left sidebar (the ribbon). Click it while you have a note open.
*   **Command Palette:**
    1.  Open the Command Palette (`Ctrl+P` or `Cmd+P`).
    2.  Type `Generate Slug`.
    3.  Select `Auto Slugger: Generate Slug for Current Note`.

**Where does the slug go?**
The slug is added to the "frontmatter" at the very top of your note. It will look something like this:

```
---
slug: 104538-my-important-words
---

Your note content starts here...
```

---

## ⚙️ Customizing Auto Slugger (Settings)

You can change how Auto Slugger works to fit your style.

1.  Go to Obsidian `Settings` ⚙️ > `Community Plugins`.
2.  Find "Auto Slugger" in the list and click the little gear icon ⚙️ next to it.

**Key Settings You Might Want to Adjust:**

*   **Automatic Slug Generation:** Turn this ON or OFF.
    *   **Trigger Event:** If automatic is ON, choose *when* it makes the slug (e.g., "On Note Save/Focus Lost" is a good default, or "On Note Change" if you want it more immediate).
*   **Slug Frontmatter Key:** (Default: `slug`)
    *   This is the name used in your note's frontmatter. You can change it to `permalink` or `id` if you prefer, but `slug` is common.
*   **Overwrite Existing Slug:** (Default: `Off` for automatic)
    *   If OFF (safer!), automatic generation won't replace a slug if your note already has one. Manual generation usually overwrites.
*   **Timestamp Format:** Choose between a short timestamp (e.g., `104538`) or a longer one with the date (e.g., `231027104538`).
*   **Number of Significant Words:** (Default: `2`)
    *   How many words from your note's content should be in the slug (e.g., `104538-**word-one-word-two**`). You can choose 1 to 5.
*   **Minimum Word Length for Slug:** (Default: `4`)
    *   Ignores very short words when picking significant words.
*   **Enable Word Stemming:** (Default: `On`)
    *   Tries to use the root form of words (e.g., "running" becomes "run"). This can make slugs shorter and group similar ideas. Turn it off if you prefer exact words.
*   **Custom Stop Words:**
    *   Auto Slugger already ignores common words like "the", "a", "is". If there are other words you *never* want in your slugs (like your name, or "project"), you can add them here as a comma-separated list (e.g., `myproject, anothertask, personal`).

**Remember to save your settings if you make changes!** (Most settings save automatically as you change them).

---

## ❓ Help & Questions

*   **Something's not working as expected?**
    *   Double-check the Auto Slugger settings first.
    *   Try restarting Obsidian (turn it off and on again). This solves many small issues!
*   **Found a bug or have a feature idea?**
    *   Please let us know by creating an "Issue" on our GitHub page:
        [https://github.com/rwnq8/obsidian-auto-slugger/issues](https://github.com/rwnq8/obsidian-auto-slugger/issues)

---

## 📜 License

This plugin is provided under the **QNFO Content License Agreement**.
You can read the full terms here: [https://github.com/QNFO/license/blob/main/LICENSE.md](https://github.com/QNFO/license/blob/main/LICENSE.md)

---

## <a id="-alternative-installation-methods"></a>Alternative Installation Methods (If BRAT doesn't work for you)

While BRAT is recommended, here's how to install manually if needed. This is a bit more technical.

1.  **Go to the Releases Page:**
    *   Open this link in your web browser: `https://github.com/rwnq8/obsidian-auto-slugger/releases`
2.  **Download Files:**
    *   Find the latest release.
    *   Under the "Assets" section, download `main.js` AND `manifest.json`.
    *   (If you see a `.zip` file like `auto-slugger-v1.0.0.zip`, download that instead, then open it to find `main.js` and `manifest.json` inside.)
3.  **Place Files in Your Obsidian Vault:**
    *   Open your Obsidian vault folder on your computer.
    *   Inside your vault, find a folder named `.obsidian`. (If you don't see it, you might need to enable "Show hidden files" in your computer's file explorer settings.)
    *   Inside `.obsidian`, find a folder named `plugins`. If it's not there, create it.
    *   Inside `plugins`, create a **new folder** and name it exactly: `auto-slugger`
    *   Copy the `main.js` and `manifest.json` files you downloaded into this new `auto-slugger` folder.
4.  **Enable in Obsidian:**
    *   Close and re-open Obsidian completely.
    *   Go to `Settings` ⚙️ > `Community Plugins`.
    *   Find "Auto Slugger" and **toggle it ON**.

---

Happy Slugging!
