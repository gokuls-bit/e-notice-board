📱 Smart E-Notice Board | MMDU Edition
A dynamic digital display system for Maharishi Markandeshwar (Deemed to be University).

📌 Project Overview
The Smart E-Notice Board is designed to replace traditional paper-based notice boards at MMDU. It provides real-time updates to students and faculty, combining university-specific administrative notices with global tech news powered by Google Search and AI.

🚀 Key Features
Real-Time Admin Updates: Instant display of exam schedules, holiday notices, and placement drives.

Google Current Affairs Integration: A dedicated section fetching the latest global trends in AI, Engineering, and Business.

Achievement Spotlight: Scrolling marquee featuring student successes and research breakthroughs.

Emergency Dashboard: Quick-access contact numbers for campus security and medical services.

Dynamic Visuals: High-resolution carousels (similar to the Navaan Sandhu aesthetic wallpapers) for high engagement.

🛠️ Content Structure
The board cycles through the following priority modules:

Academic: Exam dates, deadlines, and registration links.

Corporate: Training & Placement Cell (TPC) announcements.

Global: "Tech-Talk" segment using Google Search for daily tech headlines.

Campus Life: Seminar photos, cultural events, and sports updates.

📂 Installation
Bash

# Clone the repository
git clone https://github.com/yourusername/mmdu-enotice-board.git

# Navigate to directory
cd mmdu-enotice-board

# Install dependencies
npm install
🖥️ Usage
To run the board in "Kiosk Mode" for campus displays:

Connect the Raspberry Pi/System to the LED display.

Ensure active internet for Google Current Affairs API fetching.

Run: npm start.

🤝 Contributing
Contributions are welcome! If you want to add a new module (e.g., a "Library Availability" tracker), please open a Pull Request.