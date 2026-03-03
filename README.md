# Xmas Watch & The Big Adventure 2026

A festive, interactive static website featuring a real-time Christmas countdown and a dynamic travel dashboard for the "Big Adventure 2026" trip with friends.

## 🎄 Features (Main Page)

- **Dynamic Christmas Countdown:** Automatically calculates and displays the time remaining until the next December 25th.
- **"I Feel Lucky" Button:** A festive easter egg that triggers one of 12+ randomized weird effects (Rainbow Disco, Screen Spin, Blizzard, Floating Reindeer, etc.).
- **Snowfall Effect:** Interactive falling snow across the entire screen.
- **Mobile Responsive:** Optimized layout for both desktop and smartphone viewing.

## 🏝️ The Big Adventure 2026 (Sub-page)

Accessible at `/philippines/`, this is a dedicated dashboard for the upcoming trip from Tokyo to Istanbul.

- **Interactive Itinerary:** 
    - Automatically crosses out past dates.
    - Highlights the current location with a gold background and a ✅ checkmark.
- **Dynamic Status:** Shows exactly where the group is "Currently" and what the "Next Destination" is.
- **Tropical Snow:** Replaces traditional snowflakes with a mix of tropical and destination-themed emojis: 🥥, 🌴, 🍹, 🏄, 🍣, 🗼, 🥙, 🕌.
- **Announcement System:**
    - **Live Feed:** A hovering panel that displays messages sent within the last 12 hours.
    - **Zero-Backend Storage:** Powered by `ntfy.sh` (messages automatically expire after 12h).
- **Time-Travel Debugging:** Allows testing the itinerary by adding a `?date=YYYY-MM-DD` parameter to the URL.

## 🔐 Secret Features

### Admin Post Box
To post a new announcement to the dashboard:
1. Navigate to the `/philippines/` page.
2. **Triple-click** the "Our Journey" title.
3. Enter the secret password (`philippinesPeople2026`) and your message.
4. Click **Post**.

### Clear All Messages
In the same secret Admin box, you can use the **"Clear All"** button (requires password) to hide all existing messages from the feed immediately.

## 🛠️ Technical Details

- **Tech Stack:** Vanilla JavaScript, HTML5, CSS3.
- **Fonts:** 
  - Main Page: *Great Vibes* (Festive)
  - Adventure Page: *Montserrat* (Modern Travel)
- **External Integration:**
  - `ntfy.sh`: Used as a lightweight, subscription-free "dead drop" for messages.
  - `crypto.subtle`: Used for client-side SHA-256 password hashing.
  - `snowstorm.js`: Powering the snowfall and emoji effects.

## 🚀 Getting Started

To run the project locally for development or testing:

1. Clone the repository.
2. Start a local server (to ensure all paths and parameters work correctly):
   ```bash
   python3 -m http.server 8000
   ```
3. Open `http://localhost:8000` in your browser.

## 📄 License

This project is open-source. The `snowstorm.js` library is provided under the BSD License.
