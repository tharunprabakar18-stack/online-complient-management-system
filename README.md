# ResolveDesk - Online Complaint Management System

**ResolveDesk** is an enterprise-grade customer support and incident tracking helpdesk web application built with vanilla **HTML5**, **CSS3**, and modern **JavaScript**. It incorporates a sleek dark helpdesk aesthetic (charcoal backgrounds, indigo and violet accents, status badges, and interactive lifecycle timelines) designed to simulate modern customer support software.

---

## 🌟 Key Features

### 1. **Support Operations Dashboard**
- **KPI Metrics Grid:** Real-time counters for Total Complaints, Pending Review, In Progress, and Resolved Incidents.
- **Critical Severity Alerts:** Highlights urgent blockers needing immediate attention.
- **Resolution SLA Rate:** Dynamically calculates resolution percentage.
- **Severity Breakdown:** Visual triage meters quantifying Urgent, High, Medium, and Low tickets.
- **Department Tag Cloud:** Displays category breakdown across Billing, Engineering, Hardware, Facilities, etc.
- **Recent Incident Stream:** Feed of newest incident cards with click-to-manage shortcuts.

### 2. **Complaint Submission & Unique Ticket Generation**
- Clean modal dialog for customer support ticket registration.
- **Input Validation:**
  - Full complainant name (minimum 2 characters).
  - Valid contact email regex format.
  - Category selection.
  - Priority / Severity assignment (`Urgent`, `High`, `Medium`, `Low`).
  - Complaint subject line (minimum 5 characters).
  - Detailed incident description (minimum 10 characters).
- **Unique Ticket ID Generator:** Produces structured IDs formatted as `RES-2026-XXXX`.

### 3. **Incident & Complaint Directory**
- **Omni-Search:** Instant real-time filtering across Ticket ID, Subject, Description, and Complainant info.
- **Multi-Filter Bar:**
  - Status Filter: *All Statuses*, *Pending*, *In Progress*, *Resolved*.
  - Priority Filter: *All Priorities*, *Urgent*, *High*, *Medium*, *Low*.
  - Category Filter: *Billing & Payments*, *Technical / Software Bug*, *Hardware & Devices*, *Customer Service*, *Account & Access*, *Facility & Office*, *Other*.
- **Multi-Sort Options:**
  - Sort by Newest First.
  - Sort by Oldest First.
  - Sort by Severity (Urgent first).
  - Sort by Title (A-Z).
- Empty state indicator with an instant filter reset button.

### 4. **Complaint Status Lifecycle Timeline & Ticket Management**
- **Visual 3-Stage Stepper:**
  1. **Complaint Submitted** (Timestamp & unique ID logged).
  2. **Under Investigation** (Active engineering/support tier assignment).
  3. **Issue Resolved** (Closing notes & final resolution timestamp).
- **Status Transitions & Resolution Notes:**
  - Shift tickets between *Pending*, *In Progress*, and *Resolved*.
  - Add dated staff activity and resolution notes with author attribution.
  - Auto-generated audit trail notes for status changes.
- **Incident Deletion:** Permanent deletion option with confirmation safeguard.

### 5. **CSV Data Export**
- One-click export of complete complaint logs to a properly formatted `.csv` file (`resolvedesk-complaints-[YYYY-MM-DD].csv`).
- Sanitized quotation handling preventing CSV injection or malformed records.

### 6. **Local Persistence & Demo Data Reset**
- Uses browser `localStorage` to save all complaints, notes, and sequential counters.
- Built-in **"Reset Demo Complaints"** button to restore sample complaints at any time.

---

## 📁 Project Structure

```text
complaint-management-system/
├── index.html       # Semantic HTML5 layout with sidebar, modals & timelines
├── style.css        # Charcoal dark helpdesk design system with animations
├── script.js        # Ticket state engine, search/sort, modals, and CSV export
└── README.md        # Documentation and execution instructions
```

---

## 🚀 How to Run on Windows

You can run **ResolveDesk** on Windows using any modern browser (Chrome, Edge, Firefox, Brave).

### Option 1: Direct File Open (Quickest)
1. Navigate to the project directory in Windows File Explorer:
   ```cmd
   explorer "c:\Users\THARUN\Downloads\tharun projects\complaint-management-system"
   ```
2. Double-click **`index.html`** or right-click &rarr; **Open with** &rarr; **Google Chrome** (or **Microsoft Edge**).

### Option 2: Using Python HTTP Server (Recommended)
1. Open PowerShell or Command Prompt in the project folder:
   ```powershell
   cd "c:\Users\THARUN\Downloads\tharun projects\complaint-management-system"
   ```
2. Start the lightweight local HTTP server:
   ```powershell
   python -m http.server 8098
   ```
3. Open your browser and navigate to:
   ```
   http://localhost:8098
   ```

### Option 3: Using Node.js `npx serve` or `http-server`
If Node.js is installed on your Windows system:
```powershell
npx --yes serve "c:\Users\THARUN\Downloads\tharun projects\complaint-management-system" -l 8098
```
Then visit `http://localhost:8098`.

---

## 📋 Sample Tickets Included
The system pre-populates 6 realistic enterprise tickets:
- **`RES-2026-1042`**: *API Webhook timeout on international billing settlements* (Urgent &bull; In Progress)
- **`RES-2026-1039`**: *Single Sign-On (SSO) SAML certificate renewal verification* (High &bull; Pending)
- **`RES-2026-1035`**: *Warehouse handheld barcode scanners dropping 5GHz WiFi roaming* (Urgent &bull; Pending)
- **`RES-2026-1028`**: *Customer receipt invoice PDF fails to render UTF-8 currency glyphs* (Medium &bull; Resolved)
- **`RES-2026-1014`**: *Request for dual-monitor ergonomic arms in 4th floor finance hub* (Low &bull; Resolved)
- **`RES-2026-1008`**: *Customer VIP loyalty tier perks not syncing to mobile app account* (High &bull; In Progress)
