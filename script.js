* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --primary: #2563eb;
  --primary-light: #eff6ff;
  --text: #172033;
  --muted: #718096;
  --border: #e6eaf0;
  --bg: #f5f7fb;
  --white: #ffffff;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  background: var(--bg);
  color: var(--text);
}

button,
a {
  font-family: inherit;
}

button {
  cursor: pointer;
}

/* Screens */

.screen {
  display: none;
}

.screen.active {
  display: flex;
}


/* WELCOME */

#welcomePage {
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.panel {
  background: white;
  border: 1px solid var(--border);
  box-shadow: 0 20px 60px rgba(20, 35, 60, 0.08);
}

.welcome-panel {
  width: 100%;
  max-width: 440px;
  padding: 42px 28px;
  border-radius: 25px;
  text-align: center;
}

.logo {
  width: 70px;
  height: 70px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background: var(--primary);
  color: white;
  font-size: 30px;
  font-weight: 800;
}

.badge {
  display: inline-block;
  margin-top: 22px;
  padding: 7px 13px;
  border-radius: 50px;
  background: var(--primary-light);
  color: var(--primary);
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 1px;
}

.welcome-panel h1 {
  margin-top: 15px;
  font-size: 28px;
}

.welcome-panel p {
  margin: 12px 0 25px;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.6;
}

.telegram-btn,
.continue-btn {
  width: 100%;
  height: 52px;
  border-radius: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 14px;
  font-weight: bold;
  transition: .2s;
}

.telegram-btn {
  text-decoration: none;
  background: #229ed9;
  color: white;
  margin-bottom: 12px;
}

.continue-btn {
  border: 1px solid var(--border);
  background: white;
  color: var(--text);
}

.telegram-btn:hover,
.continue-btn:hover {
  transform: translateY(-2px);
}

.welcome-panel small {
  display: block;
  margin-top: 20px;
  color: #9aa3b2;
  font-size: 10px;
}


/* DASHBOARD */

.dashboard-page {
  min-height: 100vh;
  display: none !important;
  flex-direction: column;
}

.dashboard-page.active {
  display: flex !important;
}


/* TOPBAR */

.topbar {
  height: 72px;
  background: white;
  border-bottom: 1px solid var(--border);
  padding: 0 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  display: flex;
  align-items: center;
  gap: 11px;
}

.mini-logo {
  width: 40px;
  height: 40px;
  border-radius: 11px;
  background: var(--primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
}

.brand strong,
.brand small {
  display: block;
}

.brand small {
  color: var(--muted);
  font-size: 10px;
  margin-top: 3px;
}

.menu-btn {
  display: none;
  border: 1px solid var(--border);
  background: white;
  border-radius: 10px;
  width: 42px;
  height: 42px;
  font-size: 20px;
}


/* LAYOUT */

.dashboard-layout {
  display: flex;
  flex: 1;
}

.sidebar {
  width: 235px;
  min-height: calc(100vh - 72px);
  background: white;
  border-right: 1px solid var(--border);
  padding: 22px 14px;
}

.profile {
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 25px;
}

.profile-avatar {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: var(--primary-light);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.profile strong,
.profile span {
  display: block;
}

.profile span {
  margin-top: 4px;
  color: var(--muted);
  font-size: 11px;
}

.nav-item {
  width: 100%;
  height: 45px;
  margin-bottom: 6px;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: #647084;
  text-align: left;
  padding: 0 13px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
}

.nav-item:hover,
.nav-item.active {
  background: var(--primary-light);
  color: var(--primary);
}


/* CONTENT */

.content {
  flex: 1;
  padding: 30px;
  max-width: 1250px;
}

.content-section {
  display: none;
}

.content-section.active-section {
  display: block;
  animation: fade .25s ease;
}

.page-heading {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 25px;
}

.page-heading span {
  color: var(--primary);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1px;
}

.page-heading h1 {
  margin-top: 5px;
  font-size: 28px;
}

.page-heading p {
  margin-top: 6px;
  color: var(--muted);
  font-size: 13px;
}

.online {
  background: #ecfdf3;
  color: #15803d;
  padding: 8px 12px;
  border-radius: 50px;
  font-size: 11px;
  font-weight: bold;
}

.online i {
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #22c55e;
  margin-right: 5px;
}


/* STATS */

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.stat-card {
  background: white;
  border: 1px solid var(--border);
  border-radius: 17px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.stat-icon {
  width: 45px;
  height: 45px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.blue {
  background: #eff6ff;
}

.green {
  background: #ecfdf3;
}

.purple {
  background: #f5f3ff;
}

.stat-card span,
.stat-card strong {
  display: block;
}

.stat-card span {
  color: var(--muted);
  font-size: 11px;
}

.stat-card strong {
  margin-top: 5px;
  font-size: 19px;
}


/* TOOLS */

.section-title {
  margin: 30px 0 14px;
}

.section-title h2 {
  font-size: 18px;
}

.section-title span {
  color: var(--muted);
  font-size: 11px;
}

.tool-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.tool-card,
.big-card,
.settings-card,
.notice {
  background: white;
  border: 1px solid var(--border);
  border-radius: 17px;
  padding: 22px;
}

.tool-icon,
.large-icon {
  font-size: 25px;
}

.tool-card h3 {
  margin-top: 15px;
  font-size: 15px;
}

.tool-card p {
  margin-top: 7px;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.5;
}

.tool-card button,
.big-card button {
  width: 100%;
  margin-top: 17px;
  padding: 11px;
  border: 0;
  border-radius: 10px;
  background: var(--primary-light);
  color: var(--primary);
  font-weight: bold;
}

.notice {
  margin-top: 15px;
  display: flex;
  gap: 13px;
}

.notice-icon {
  min-width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--primary-light);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.notice strong {
  font-size: 13px;
}

.notice p {
  margin-top: 5px;
  color: var(--muted);
  font-size: 11px;
  line-height: 1.5;
}


/* OTHER PAGES */

.big-card {
  max-width: 600px;
}

.big-card h2 {
  margin-top: 15px;
}

.big-card p {
  margin-top: 8px;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.6;
}


/* SETTINGS */

.setting-row {
  padding: 18px 0;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.setting-row:last-child {
  border-bottom: 0;
}

.setting-row strong,
.setting-row span {
  display: block;
}

.setting-row span {
  margin-top: 5px;
  color: var(--muted);
  font-size: 11px;
}


/* SWITCH */

.switch input {
  display: none;
}

.switch span {
  width: 43px;
  height: 24px;
  display: block;
  background: #d9dee7;
  border-radius: 30px;
  position: relative;
}

.switch span:after {
  content: "";
  width: 18px;
  height: 18px;
  background: white;
  border-radius: 50%;
  position: absolute;
  top: 3px;
  left: 3px;
  transition: .2s;
}

.switch input:checked + span {
  background: var(--primary);
}

.switch input:checked + span:after {
  left: 22px;
}


/* TOAST */

#toast {
  position: fixed;
  left: 50%;
  bottom: 20px;
  transform: translate(-50%, 70px);
  background: #172033;
  color: white;
  padding: 12px 18px;
  border-radius: 10px;
  font-size: 12px;
  opacity: 0;
  transition: .25s;
}

#toast.show {
  opacity: 1;
  transform: translate(-50%, 0);
}


/* ANIMATION */

@keyframes fade {
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}


/* MOBILE */

@media (max-width: 700px) {

  .welcome-panel {
    padding: 35px 20px;
  }

  .topbar {
    padding: 0 15px;
  }

  .menu-btn {
    display: block;
  }

  .dashboard-layout {
    position: relative;
  }

  .sidebar {
    position: fixed;
    z-index: 10;
    top: 72px;
    left: -250px;
    transition: .25s;
    box-shadow: 10px 20px 40px rgba(0,0,0,.08);
  }

  .sidebar.open {
    left: 0;
  }

  .content {
    width: 100%;
    padding: 20px 14px;
  }

  .page-heading {
    display: block;
  }

  .online {
    display: inline-block;
    margin-top: 12px;
  }

  .stats-grid,
  .tool-grid {
    grid-template-columns: 1fr;
  }

  .page-heading h1 {
    font-size: 24px;
  }
}
