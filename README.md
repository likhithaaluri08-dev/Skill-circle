# SkillCircle – Learn Without Money
> **AI-Powered Peer-to-Peer Reciprocal Skill Exchange Ecosystem**  
> *"Exchange skills instead of paying for courses."*

---

## 1. Product Vision

**SkillCircle** is a production-grade, full-stack peer-to-peer knowledge exchange platform where students teach skills they already know and learn skills they need without paying money.

### The Core Innovation: Reciprocal Skill Matching
Unlike traditional tutoring sites that only find one-way mentors:
$$\text{Ananya (Teaches Canva, Wants Python)} \quad \rightleftharpoons \quad \text{Rahul (Teaches Python, Wants Canva)}$$
SkillCircle's **Reciprocal AI Algorithm** identifies complementary pairs, calculates mutual compatibility percentages, explains *"Why this match?"*, and creates structured reciprocal exchange plans.

---

## 2. Key Architecture & Features

### 1. Reciprocal AI Matching (Hero Feature)
- **Multi-Factor Algorithm**: Evaluates mutual skill overlap, proficiency delta, availability windows, and mentor ratings.
- **Visual Reciprocal Flow**: Dynamic SVG animated connection lines with pulsing energy particles connecting matched students.
- **Detailed Match Reasons**: Displays explicit bulleted justifications (*"They teach Python", "You teach Canva", "Both free on weekends"*).

### 2. Skill Gap Bridge (Unique Feature)
- When an exact 1-to-1 match isn't available, the platform never displays a dead-end.
- Displays *"You're one step away"* with 3-tier bridge suggestions: prerequisite skills, learning pods, and multi-hop exchange paths.

### 3. Live Virtual Learning Room (`/video-room`)
- **Real Webcam & Microphone Stream**: Direct WebRTC / `navigator.mediaDevices.getUserMedia` integration with autoPlay and un-mirrored controls.
- **Graceful Permission Handling**: Clear status banners and interactive virtual previews if physical camera access is restricted.
- **Synchronized Interactive Whiteboard**: Freehand pen, highlighter, shapes (rectangle, line, circle), color palette, stroke slider, undo, clear board, and PNG export.
- **High-Readability Notes Panel**: Custom font sizing with dedicated Zoom In (`A+`) and Zoom Out (`A-`) controls, fullscreen expander modal, and debounced auto-save to persistent storage.
- **Interactive Timer**: Real-time countup session stopwatch with pause/resume controls.

### 4. Complete Student Profile Management (`/profile`)
- View and edit full student profile: Name, Username, College, Year, Bio, Experience Level, Languages, Availability.
- **Profile Picture Upload**: File input with instant `FileReader` preview and persistent storage.
- **Save & Cancel Safety**: Validates required fields, provides loading spinners, and warns users before discarding unsaved changes.

### 5. Time Credit Wallet (`/wallet`)
- **Non-Monetary Economy**: Strictly governed by the rule: **30 minutes teaching = 30 Time Credits**.
- Complete ledger tracking earned credits, redeemed coaching, and verified transaction histories.

### 6. Interactive AI Learning Roadmap (`/roadmap`)
- Users input custom career targets (e.g. *"Full Stack Web Developer"*, *"Data Scientist"*).
- Generates structured, clickable milestones with estimated hours and recommended peer skills to swap for.

### 7. Learning Pods (`/pods`)
- Small cohorts of 3–5 students collaborating weekly on shared milestones (e.g. *"Frontend Beginners Circle"*).
- Functional **Join Pod** and **Leave Pod** management with dynamic participant avatar piles.

### 8. Full-Featured Peer Chat (`/chat`)
- Real-time conversation threads with typing indicators and double-tick read receipts.
- Interactive emoji picker, image/file attachment preview, and simulated voice message recording.
- 1-Click "Launch Video Room" direct launcher.

### 9. Gamification & Weekly Leaderboards (`/gamification`)
- XP progression bar with automatic level promotions.
- Unlocked achievement badges (*First Exchange*, *Community Helper*, *Python Mentor*, *Design Master*).
- Weekly university mentor leaderboards with animated confetti celebrations.

### 10. Floating CircleBot AI Assistant
- Expandable smart assistant answering student questions about matching, credit rules, and peer mentors.

### 11. Platform Accessibility & Dark Mode
- Full Dark Mode & Light Mode support.
- High Contrast Mode toggle.
- Large Text Accessibility scaling toggle.

---

## 3. Demo Personas & Quick Access

Judges can toggle demo personas with 1 click from the navbar menu or login page:

1. **Ananya Sharma** (Default User)
   - Email: `ananya@skillcircle.dev`
   - Teaches: **Canva**, **UI Design**, **Graphic Design**
   - Wants: **Python**, **Data Analytics**, **Web Development**
   - College: National Institute of Design (NID)

2. **Rahul Verma** (Direct Reciprocal Match)
   - Email: `rahul@skillcircle.dev`
   - Teaches: **Python**, **Data Structures**, **Django**
   - Wants: **Canva**, **UI Design**, **Figma**
   - College: IIT Delhi

3. **Platform Administrator**
   - Email: `admin@skillcircle.dev`
   - Route: `/admin` (User directory, dispute resolution, featured skills curation, broadcast announcements)

---

## 4. How to Run

### Frontend
```bash
cd SIH
npm install
npm run build   # Compiles TypeScript and builds Vite bundle
npm run dev     # Runs local dev server on http://localhost:5173
```

### Backend (Optional FastAPI Service)
```bash
cd backend
python run.py   # Starts FastAPI on http://localhost:8000
```
