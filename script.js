/**
 * ResolveDesk - Professional Customer Support & Incident Management
 * Enterprise Ticket Lifecycle Engine with Real-Time Timeline & SLA Triage
 */

(function () {
  'use strict';

  // Storage Keys
  const STORAGE_KEY = 'resolvedesk_complaints_v1';
  const SEQ_KEY = 'resolvedesk_seq_counter';

  // Sample seed data to populate on first run
  const SAMPLE_COMPLAINTS = [
    {
      id: 'RES-2026-1042',
      title: 'API Webhook timeout on international billing settlements',
      description: 'Payment transactions from European partner accounts are failing with a 504 Gateway Timeout error when attempting to reconcile SEPA batch transactions over 50k EUR.',
      category: 'Billing & Payments',
      priority: 'Urgent',
      status: 'In Progress',
      complainantName: 'Sarah Connor',
      complainantEmail: 's.connor@cyberdyne-intl.com',
      createdAt: '2026-10-22T09:15:00.000Z',
      timeline: {
        submittedAt: 'Oct 22, 2026 09:15 AM',
        inProgressAt: 'Oct 22, 2026 10:30 AM',
        resolvedAt: null
      },
      notes: [
        {
          id: 'note-1',
          author: 'Alex Morgan (Staff Engineer)',
          timestamp: 'Oct 22, 2026 10:30 AM',
          statusChange: 'In Progress',
          text: 'Investigating gateway timeout logs. Escalated priority to Tier 3 Infrastructure team.'
        },
        {
          id: 'note-2',
          author: 'David Chen (Database Admin)',
          timestamp: 'Oct 22, 2026 02:45 PM',
          statusChange: 'In Progress',
          text: 'Identified database deadlock in batch processor. Hotfix patch currently being prepared in staging.'
        }
      ]
    },
    {
      id: 'RES-2026-1039',
      title: 'Single Sign-On (SSO) SAML certificate renewal verification warning',
      description: 'Corporate Okta tenant warning indicates the SAML SP signing certificate will expire in 14 days. Needs proactive certificate renewal before corporate auth locks out 400+ employees.',
      category: 'Account & Access',
      priority: 'High',
      status: 'Pending',
      complainantName: 'Marcus Vance',
      complainantEmail: 'm.vance@techcorp.io',
      createdAt: '2026-10-23T04:20:00.000Z',
      timeline: {
        submittedAt: 'Oct 23, 2026 04:20 AM',
        inProgressAt: null,
        resolvedAt: null
      },
      notes: [
        {
          id: 'note-101',
          author: 'System Automator',
          timestamp: 'Oct 23, 2026 04:20 AM',
          statusChange: 'Pending',
          text: 'Ticket created via enterprise security alert feed. Assigned to Security Operations triage.'
        }
      ]
    },
    {
      id: 'RES-2026-1035',
      title: 'Warehouse handheld barcode scanners dropping 5GHz WiFi roaming',
      description: 'Logistics shift supervisor reports 8 Zebra scanner units continuously drop connection when roaming between Access Point 4 and Access Point 7 in loading dock B.',
      category: 'Hardware & Devices',
      priority: 'Urgent',
      status: 'Pending',
      complainantName: 'Elena Rostova',
      complainantEmail: 'elena.r@logistics-hub.net',
      createdAt: '2026-10-23T07:45:00.000Z',
      timeline: {
        submittedAt: 'Oct 23, 2026 07:45 AM',
        inProgressAt: null,
        resolvedAt: null
      },
      notes: []
    },
    {
      id: 'RES-2026-1028',
      title: 'Customer receipt invoice PDF fails to render UTF-8 currency glyphs',
      description: 'Invoices generated for Japanese (JPY) and British (GBP) clients are printing unprintable box characters instead of proper currency glyphs in the monthly summary.',
      category: 'Technical / Software Bug',
      priority: 'Medium',
      status: 'Resolved',
      complainantName: 'Kenji Sato',
      complainantEmail: 'kenji.sato@globalreach.jp',
      createdAt: '2026-10-20T11:00:00.000Z',
      timeline: {
        submittedAt: 'Oct 20, 2026 11:00 AM',
        inProgressAt: 'Oct 20, 2026 01:15 PM',
        resolvedAt: 'Oct 21, 2026 03:30 PM'
      },
      notes: [
        {
          id: 'note-201',
          author: 'Liam Wright (Frontend Dev)',
          timestamp: 'Oct 20, 2026 01:15 PM',
          statusChange: 'In Progress',
          text: 'Diagnosed font fallback in headless PDF renderer. Updating bundled font config to Noto Sans.'
        },
        {
          id: 'note-202',
          author: 'Liam Wright (Frontend Dev)',
          timestamp: 'Oct 21, 2026 03:30 PM',
          statusChange: 'Resolved',
          text: 'Released v4.2.1 PDF generator patch. Tested Yen, Pound, and Euro glyphs. Customer validated fix.'
        }
      ]
    },
    {
      id: 'RES-2026-1014',
      title: 'Request for dual-monitor ergonomic arms in 4th floor finance hub',
      description: 'Finance reporting team requires 4 heavy-duty dual-monitor desk mounts for Q4 consolidation reporting stations.',
      category: 'Facility & Office',
      priority: 'Low',
      status: 'Resolved',
      complainantName: 'Rachel Green',
      complainantEmail: 'r.green@centralfin.org',
      createdAt: '2026-10-18T08:30:00.000Z',
      timeline: {
        submittedAt: 'Oct 18, 2026 08:30 AM',
        inProgressAt: 'Oct 18, 2026 10:00 AM',
        resolvedAt: 'Oct 19, 2026 04:00 PM'
      },
      notes: [
        {
          id: 'note-301',
          author: 'IT Facilities Desk',
          timestamp: 'Oct 19, 2026 04:00 PM',
          statusChange: 'Resolved',
          text: 'Dual-monitor arms mounted and cable management organized at desks 412 through 415.'
        }
      ]
    },
    {
      id: 'RES-2026-1008',
      title: 'Customer VIP loyalty tier perks not syncing to mobile app account',
      description: 'Diamond tier customer upgraded account 48 hours ago, but complimentary shipping and concierge phone line are still locked in the iOS client application.',
      category: 'Customer Service',
      priority: 'High',
      status: 'In Progress',
      complainantName: 'Amara Okafor',
      complainantEmail: 'amara.okafor@vip-retail.com',
      createdAt: '2026-10-21T15:10:00.000Z',
      timeline: {
        submittedAt: 'Oct 21, 2026 03:10 PM',
        inProgressAt: 'Oct 22, 2026 09:00 AM',
        resolvedAt: null
      },
      notes: [
        {
          id: 'note-401',
          author: 'Customer Experience Lead',
          timestamp: 'Oct 22, 2026 09:00 AM',
          statusChange: 'In Progress',
          text: 'Triggered manual sync token via CRM admin console. Waiting for customer confirmation.'
        }
      ]
    }
  ];

  // Application State
  let complaints = [];
  let activeTab = 'dashboard';
  let activeSelectedTicketId = null;

  // DOM Elements
  const dom = {
    // Nav items
    navDashboard: document.getElementById('nav-dashboard'),
    navTickets: document.getElementById('nav-tickets'),
    navPending: document.getElementById('nav-pending'),
    navInProgress: document.getElementById('nav-in-progress'),
    navResolved: document.getElementById('nav-resolved'),
    sidebar: document.getElementById('sidebar'),
    sidebarBackdrop: document.getElementById('sidebarBackdrop'),
    sidebarCloseBtn: document.getElementById('sidebarCloseBtn'),
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    sidebarBtnNewTicket: document.getElementById('sidebarBtnNewTicket'),
    btnResetDemoData: document.getElementById('btnResetDemoData'),

    // Topbar
    pageTitle: document.getElementById('pageTitle'),
    pageSubtitle: document.getElementById('pageSubtitle'),
    currentDateDisplay: document.getElementById('currentDateDisplay'),
    topBtnExport: document.getElementById('topBtnExport'),
    topBtnNewTicket: document.getElementById('topBtnNewTicket'),

    // Badges
    badgeTotalComplaints: document.getElementById('badgeTotalComplaints'),
    badgePendingCount: document.getElementById('badgePendingCount'),
    badgeInProgressCount: document.getElementById('badgeInProgressCount'),
    badgeResolvedCount: document.getElementById('badgeResolvedCount'),

    // Views
    viewDashboard: document.getElementById('view-dashboard'),
    viewTickets: document.getElementById('view-tickets'),

    // Dashboard KPIs
    kpiTotal: document.getElementById('kpiTotal'),
    kpiPending: document.getElementById('kpiPending'),
    kpiPendingUrgent: document.getElementById('kpiPendingUrgent'),
    kpiInProgress: document.getElementById('kpiInProgress'),
    kpiResolved: document.getElementById('kpiResolved'),
    kpiResolutionRate: document.getElementById('kpiResolutionRate'),
    dashRecentTickets: document.getElementById('dashRecentTickets'),
    prioCountUrgent: document.getElementById('prioCountUrgent'),
    prioCountHigh: document.getElementById('prioCountHigh'),
    prioCountMedium: document.getElementById('prioCountMedium'),
    prioCountLow: document.getElementById('prioCountLow'),
    dashCategoryPills: document.getElementById('dashCategoryPills'),

    // Directory table & triage
    btnExportCSV: document.getElementById('btnExportCSV'),
    ticketSearchInput: document.getElementById('ticketSearchInput'),
    filterStatus: document.getElementById('filterStatus'),
    filterPriority: document.getElementById('filterPriority'),
    filterCategory: document.getElementById('filterCategory'),
    sortBy: document.getElementById('sortBy'),
    ticketsTable: document.getElementById('ticketsTable'),
    ticketsTableBody: document.getElementById('ticketsTableBody'),
    ticketsEmptyState: document.getElementById('ticketsEmptyState'),
    btnResetFilters: document.getElementById('btnResetFilters'),

    // New Ticket Modal
    newTicketModal: document.getElementById('newTicketModal'),
    btnCloseNewModal: document.getElementById('btnCloseNewModal'),
    btnCancelNewModal: document.getElementById('btnCancelNewModal'),
    newComplaintForm: document.getElementById('newComplaintForm'),
    complainantName: document.getElementById('complainantName'),
    complainantEmail: document.getElementById('complainantEmail'),
    complaintCategory: document.getElementById('complaintCategory'),
    complaintPriority: document.getElementById('complaintPriority'),
    complaintTitle: document.getElementById('complaintTitle'),
    complaintDescription: document.getElementById('complaintDescription'),
    errName: document.getElementById('errName'),
    errEmail: document.getElementById('errEmail'),
    errCategory: document.getElementById('errCategory'),
    errTitle: document.getElementById('errTitle'),
    errDesc: document.getElementById('errDesc'),

    // Ticket Detail Modal
    ticketDetailModal: document.getElementById('ticketDetailModal'),
    btnCloseDetailModal: document.getElementById('btnCloseDetailModal'),
    btnCloseDetailFooter: document.getElementById('btnCloseDetailFooter'),
    detailTicketId: document.getElementById('detailTicketId'),
    detailTicketTitle: document.getElementById('detailTicketTitle'),
    detailTicketCategory: document.getElementById('detailTicketCategory'),
    detailStatusBadge: document.getElementById('detailStatusBadge'),
    detailPriorityBadge: document.getElementById('detailPriorityBadge'),
    detailTimestamp: document.getElementById('detailTimestamp'),
    detailAvatar: document.getElementById('detailAvatar'),
    detailRequesterName: document.getElementById('detailRequesterName'),
    detailRequesterEmail: document.getElementById('detailRequesterEmail'),
    detailDescription: document.getElementById('detailDescription'),
    stepLogged: document.getElementById('stepLogged'),
    timelineLoggedDate: document.getElementById('timelineLoggedDate'),
    stepInProgress: document.getElementById('stepInProgress'),
    timelineInProgressDate: document.getElementById('timelineInProgressDate'),
    stepResolved: document.getElementById('stepResolved'),
    timelineResolvedDate: document.getElementById('timelineResolvedDate'),
    detailNotesThread: document.getElementById('detailNotesThread'),
    updateStatusSelect: document.getElementById('updateStatusSelect'),
    newResolutionNote: document.getElementById('newResolutionNote'),
    btnSaveStatusUpdate: document.getElementById('btnSaveStatusUpdate'),
    btnDeleteComplaint: document.getElementById('btnDeleteComplaint'),

    // Toast notifications
    toastContainer: document.getElementById('toastContainer')
  };

  /**
   * Initialize App
   */
  function init() {
    loadComplaints();
    renderCurrentDate();
    attachEventListeners();
    updateUI();
  }

  /**
   * Format display date
   */
  function renderCurrentDate() {
    const now = new Date();
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    if (dom.currentDateDisplay) {
      dom.currentDateDisplay.textContent = now.toLocaleDateString('en-US', options);
    }
  }

  /**
   * Load complaints from LocalStorage or seed defaults
   */
  function loadComplaints() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        complaints = JSON.parse(stored);
      } else {
        complaints = JSON.parse(JSON.stringify(SAMPLE_COMPLAINTS));
        saveComplaints();
      }
    } catch (e) {
      console.error('Error loading complaints from localStorage:', e);
      complaints = JSON.parse(JSON.stringify(SAMPLE_COMPLAINTS));
    }
  }

  /**
   * Save complaints to LocalStorage
   */
  function saveComplaints() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(complaints));
    } catch (e) {
      console.error('Error saving complaints to localStorage:', e);
      showToast('Storage quota exceeded or unavailable', 'rose');
    }
  }

  /**
   * Generate next sequential ticket ID (e.g., RES-2026-1045)
   */
  function generateTicketId() {
    let nextNum = 1045;
    try {
      const storedSeq = localStorage.getItem(SEQ_KEY);
      if (storedSeq) {
        nextNum = parseInt(storedSeq, 10) + 1;
      } else {
        // Find highest existing ID in seed data
        complaints.forEach(c => {
          const match = c.id && c.id.match(/RES-\d{4}-(\d+)/);
          if (match && match[1]) {
            const num = parseInt(match[1], 10);
            if (num >= nextNum) nextNum = num + 1;
          }
        });
      }
      localStorage.setItem(SEQ_KEY, nextNum.toString());
    } catch (e) {
      nextNum = Math.floor(1000 + Math.random() * 9000);
    }
    const currentYear = new Date().getFullYear();
    return `RES-${currentYear}-${nextNum}`;
  }

  /**
   * Format date time nicely
   */
  function formatTimestamp(isoString) {
    if (!isoString) return '';
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const m = months[date.getMonth()];
    const d = date.getDate();
    const y = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${m} ${d}, ${y} ${hours}:${minutes} ${ampm}`;
  }

  function formatShortDate(isoString) {
    if (!isoString) return '';
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  }

  /**
   * Update full UI
   */
  function updateUI() {
    updateBadges();
    updateDashboardMetrics();
    renderTicketsDirectory();
  }

  /**
   * Update badges on sidebar navigation
   */
  function updateBadges() {
    const total = complaints.length;
    const pending = complaints.filter(c => c.status === 'Pending').length;
    const inProgress = complaints.filter(c => c.status === 'In Progress').length;
    const resolved = complaints.filter(c => c.status === 'Resolved').length;

    if (dom.badgeTotalComplaints) dom.badgeTotalComplaints.textContent = total;
    if (dom.badgePendingCount) dom.badgePendingCount.textContent = pending;
    if (dom.badgeInProgressCount) dom.badgeInProgressCount.textContent = inProgress;
    if (dom.badgeResolvedCount) dom.badgeResolvedCount.textContent = resolved;
  }

  /**
   * Update Dashboard KPIs and feeds
   */
  function updateDashboardMetrics() {
    const total = complaints.length;
    const pending = complaints.filter(c => c.status === 'Pending').length;
    const pendingUrgent = complaints.filter(c => c.status === 'Pending' && c.priority === 'Urgent').length;
    const inProgress = complaints.filter(c => c.status === 'In Progress').length;
    const resolved = complaints.filter(c => c.status === 'Resolved').length;

    // Counters
    if (dom.kpiTotal) dom.kpiTotal.textContent = total;
    if (dom.kpiPending) dom.kpiPending.textContent = pending;
    if (dom.kpiPendingUrgent) {
      dom.kpiPendingUrgent.textContent = `${pendingUrgent} critical priority`;
    }
    if (dom.kpiInProgress) dom.kpiInProgress.textContent = inProgress;
    if (dom.kpiResolved) dom.kpiResolved.textContent = resolved;

    if (dom.kpiResolutionRate) {
      const rate = total > 0 ? Math.round((resolved / total) * 100) : 0;
      dom.kpiResolutionRate.textContent = `${rate}% Resolution Rate`;
    }

    // Priority Meters
    const urgentCount = complaints.filter(c => c.priority === 'Urgent').length;
    const highCount = complaints.filter(c => c.priority === 'High').length;
    const mediumCount = complaints.filter(c => c.priority === 'Medium').length;
    const lowCount = complaints.filter(c => c.priority === 'Low').length;

    if (dom.prioCountUrgent) dom.prioCountUrgent.textContent = urgentCount;
    if (dom.prioCountHigh) dom.prioCountHigh.textContent = highCount;
    if (dom.prioCountMedium) dom.prioCountMedium.textContent = mediumCount;
    if (dom.prioCountLow) dom.prioCountLow.textContent = lowCount;

    // Category breakdown
    if (dom.dashCategoryPills) {
      const catCounts = {};
      complaints.forEach(c => {
        catCounts[c.category] = (catCounts[c.category] || 0) + 1;
      });

      const categories = Object.keys(catCounts);
      if (categories.length === 0) {
        dom.dashCategoryPills.innerHTML = '<span class="text-dim" style="font-size:0.8rem;">No categories logged yet</span>';
      } else {
        dom.dashCategoryPills.innerHTML = categories.map(cat => `
          <div class="category-chip">
            <span>${escapeHTML(cat)}</span>
            <strong>${catCounts[cat]}</strong>
          </div>
        `).join('');
      }
    }

    // Recent incident stream (Top 4 most recent)
    if (dom.dashRecentTickets) {
      const sortedRecent = [...complaints].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

      if (sortedRecent.length === 0) {
        dom.dashRecentTickets.innerHTML = `
          <div class="text-center" style="padding: 24px; color: var(--text-muted); font-size: 0.85rem;">
            No complaint incidents logged. Click "+ Submit Complaint" to add one.
          </div>
        `;
      } else {
        dom.dashRecentTickets.innerHTML = sortedRecent.map(ticket => `
          <div class="ticket-stream-card" data-ticket-id="${escapeHTML(ticket.id)}">
            <div class="ticket-stream-left">
              <div class="flex-align-gap">
                <span class="ticket-id-tag">${escapeHTML(ticket.id)}</span>
                <span class="priority-badge ${getPriorityBadgeClass(ticket.priority)}">${escapeHTML(ticket.priority)}</span>
              </div>
              <strong class="ticket-stream-title">${escapeHTML(ticket.title)}</strong>
              <span class="ticket-stream-meta">${escapeHTML(ticket.category)} &bull; Requester: ${escapeHTML(ticket.complainantName)}</span>
            </div>
            <div>
              <span class="status-badge ${getStatusBadgeClass(ticket.status)}">${escapeHTML(ticket.status)}</span>
            </div>
          </div>
        `).join('');

        // Attach click listeners to cards
        dom.dashRecentTickets.querySelectorAll('.ticket-stream-card').forEach(card => {
          card.addEventListener('click', () => {
            const id = card.getAttribute('data-ticket-id');
            openDetailModal(id);
          });
        });
      }
    }
  }

  /**
   * Filter and sort tickets list
   */
  function getFilteredTickets() {
    const searchTerm = dom.ticketSearchInput ? dom.ticketSearchInput.value.trim().toLowerCase() : '';
    const statusFilter = dom.filterStatus ? dom.filterStatus.value : 'ALL';
    const priorityFilter = dom.filterPriority ? dom.filterPriority.value : 'ALL';
    const categoryFilter = dom.filterCategory ? dom.filterCategory.value : 'ALL';
    const sortVal = dom.sortBy ? dom.sortBy.value : 'date_desc';

    return complaints.filter(ticket => {
      // Status Filter
      if (statusFilter !== 'ALL' && ticket.status !== statusFilter) {
        return false;
      }
      // Priority Filter
      if (priorityFilter !== 'ALL' && ticket.priority !== priorityFilter) {
        return false;
      }
      // Category Filter
      if (categoryFilter !== 'ALL' && ticket.category !== categoryFilter) {
        return false;
      }
      // Search
      if (searchTerm) {
        const idMatch = ticket.id && ticket.id.toLowerCase().includes(searchTerm);
        const titleMatch = ticket.title && ticket.title.toLowerCase().includes(searchTerm);
        const descMatch = ticket.description && ticket.description.toLowerCase().includes(searchTerm);
        const nameMatch = ticket.complainantName && ticket.complainantName.toLowerCase().includes(searchTerm);
        const emailMatch = ticket.complainantEmail && ticket.complainantEmail.toLowerCase().includes(searchTerm);
        if (!idMatch && !titleMatch && !descMatch && !nameMatch && !emailMatch) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortVal === 'date_desc') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (sortVal === 'date_asc') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      if (sortVal === 'prio_desc') {
        const prioScore = { 'Urgent': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
        return (prioScore[b.priority] || 0) - (prioScore[a.priority] || 0);
      }
      if (sortVal === 'title_asc') {
        return (a.title || '').localeCompare(b.title || '');
      }
      return 0;
    });
  }

  /**
   * Render table of complaints
   */
  function renderTicketsDirectory() {
    if (!dom.ticketsTableBody) return;

    const filtered = getFilteredTickets();

    if (filtered.length === 0) {
      dom.ticketsTable.style.display = 'none';
      if (dom.ticketsEmptyState) dom.ticketsEmptyState.classList.remove('hidden');
      dom.ticketsTableBody.innerHTML = '';
      return;
    }

    dom.ticketsTable.style.display = 'table';
    if (dom.ticketsEmptyState) dom.ticketsEmptyState.classList.add('hidden');

    dom.ticketsTableBody.innerHTML = filtered.map(ticket => `
      <tr data-ticket-id="${escapeHTML(ticket.id)}">
        <td>
          <span class="font-mono text-violet font-bold" style="color: var(--violet-400); font-weight:700;">
            ${escapeHTML(ticket.id)}
          </span>
        </td>
        <td class="ticket-title-col">
          <strong>${escapeHTML(ticket.title)}</strong>
          <p>${escapeHTML(ticket.description)}</p>
        </td>
        <td>
          <span class="text-dim" style="font-size: 0.82rem;">${escapeHTML(ticket.category)}</span>
        </td>
        <td>
          <div style="line-height: 1.25;">
            <strong style="font-size: 0.85rem; color: var(--text-bright);">${escapeHTML(ticket.complainantName)}</strong>
            <div style="font-size: 0.74rem; color: var(--text-dim);">${escapeHTML(ticket.complainantEmail)}</div>
          </div>
        </td>
        <td>
          <span class="priority-badge ${getPriorityBadgeClass(ticket.priority)}">
            ${escapeHTML(ticket.priority)}
          </span>
        </td>
        <td>
          <span class="status-badge ${getStatusBadgeClass(ticket.status)}">
            ${escapeHTML(ticket.status)}
          </span>
        </td>
        <td>
          <span class="font-mono" style="font-size: 0.78rem; color: var(--text-dim);">
            ${escapeHTML(formatShortDate(ticket.createdAt))}
          </span>
        </td>
        <td class="text-right">
          <button class="btn btn-secondary btn-sm btn-view-ticket" data-ticket-id="${escapeHTML(ticket.id)}">
            Manage
          </button>
        </td>
      </tr>
    `).join('');

    // Attach click listeners to rows & view buttons
    dom.ticketsTableBody.querySelectorAll('tr').forEach(row => {
      row.addEventListener('click', (e) => {
        const id = row.getAttribute('data-ticket-id');
        openDetailModal(id);
      });
    });
  }

  /**
   * Helper class getters for badges
   */
  function getStatusBadgeClass(status) {
    switch (status) {
      case 'Pending': return 'status-pending';
      case 'In Progress': return 'status-in-progress';
      case 'Resolved': return 'status-resolved';
      default: return 'status-pending';
    }
  }

  function getPriorityBadgeClass(priority) {
    switch (priority) {
      case 'Urgent': return 'prio-urgent';
      case 'High': return 'prio-high';
      case 'Medium': return 'prio-medium';
      case 'Low': return 'prio-low';
      default: return 'prio-medium';
    }
  }

  /**
   * Tab Navigation Switcher
   */
  window.switchTab = function (tabName, filterStatusOverride) {
    activeTab = tabName;

    // Reset active nav buttons
    [dom.navDashboard, dom.navTickets, dom.navPending, dom.navInProgress, dom.navResolved].forEach(btn => {
      if (btn) btn.classList.remove('active');
    });

    // Hide all view panes
    if (dom.viewDashboard) dom.viewDashboard.classList.remove('active');
    if (dom.viewTickets) dom.viewTickets.classList.remove('active');

    // Close mobile sidebar if open
    closeMobileSidebar();

    if (tabName === 'dashboard') {
      if (dom.navDashboard) dom.navDashboard.classList.add('active');
      if (dom.viewDashboard) dom.viewDashboard.classList.add('active');
      if (dom.pageTitle) dom.pageTitle.textContent = 'Support Operations Dashboard';
      if (dom.pageSubtitle) dom.pageSubtitle.textContent = 'Real-time incident resolution tracking and SLA management';
      updateDashboardMetrics();
    } else {
      // In Tickets Directory view
      if (dom.viewTickets) dom.viewTickets.classList.add('active');
      if (dom.pageTitle) dom.pageTitle.textContent = 'Incident & Complaint Directory';
      if (dom.pageSubtitle) dom.pageSubtitle.textContent = 'Manage, investigate, update, and resolve customer support tickets';

      if (tabName === 'pending') {
        if (dom.navPending) dom.navPending.classList.add('active');
        if (dom.filterStatus) dom.filterStatus.value = 'Pending';
      } else if (tabName === 'in-progress') {
        if (dom.navInProgress) dom.navInProgress.classList.add('active');
        if (dom.filterStatus) dom.filterStatus.value = 'In Progress';
      } else if (tabName === 'resolved') {
        if (dom.navResolved) dom.navResolved.classList.add('active');
        if (dom.filterStatus) dom.filterStatus.value = 'Resolved';
      } else {
        if (dom.navTickets) dom.navTickets.classList.add('active');
        if (dom.filterStatus) dom.filterStatus.value = 'ALL';
      }

      if (filterStatusOverride && dom.filterStatus) {
        dom.filterStatus.value = filterStatusOverride;
      }

      renderTicketsDirectory();
    }
  };

  /**
   * New Complaint Modal Controls
   */
  window.openNewTicketModal = function () {
    resetNewComplaintForm();
    if (dom.newTicketModal) {
      dom.newTicketModal.classList.add('open');
      dom.complainantName.focus();
    }
  };

  function closeNewTicketModal() {
    if (dom.newTicketModal) {
      dom.newTicketModal.classList.remove('open');
    }
    resetNewComplaintForm();
  }

  function resetNewComplaintForm() {
    if (!dom.newComplaintForm) return;
    dom.newComplaintForm.reset();
    clearValidationErrors();
  }

  function clearValidationErrors() {
    [dom.errName, dom.errEmail, dom.errCategory, dom.errTitle, dom.errDesc].forEach(el => {
      if (el) el.textContent = '';
    });
    const errorContainers = document.querySelectorAll('.form-group.has-error');
    errorContainers.forEach(container => container.classList.remove('has-error'));
  }

  /**
   * Validate and Submit Complaint Form
   */
  function handleComplaintSubmit(e) {
    e.preventDefault();
    clearValidationErrors();

    const name = dom.complainantName ? dom.complainantName.value.trim() : '';
    const email = dom.complainantEmail ? dom.complainantEmail.value.trim() : '';
    const category = dom.complaintCategory ? dom.complaintCategory.value.trim() : '';
    const priority = dom.complaintPriority ? dom.complaintPriority.value : 'Medium';
    const title = dom.complaintTitle ? dom.complaintTitle.value.trim() : '';
    const desc = dom.complaintDescription ? dom.complaintDescription.value.trim() : '';

    let isValid = true;

    // Validate Name
    if (!name || name.length < 2) {
      dom.errName.textContent = 'Please provide full requester name (min 2 characters).';
      dom.complainantName.closest('.form-group').classList.add('has-error');
      isValid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      dom.errEmail.textContent = 'Please provide a valid contact email address.';
      dom.complainantEmail.closest('.form-group').classList.add('has-error');
      isValid = false;
    }

    // Validate Category
    if (!category) {
      dom.errCategory.textContent = 'Please choose an incident category.';
      dom.complaintCategory.closest('.form-group').classList.add('has-error');
      isValid = false;
    }

    // Validate Title
    if (!title || title.length < 5) {
      dom.errTitle.textContent = 'Please provide a descriptive complaint summary (min 5 characters).';
      dom.complaintTitle.closest('.form-group').classList.add('has-error');
      isValid = false;
    }

    // Validate Description
    if (!desc || desc.length < 10) {
      dom.errDesc.textContent = 'Please provide sufficient incident details (min 10 characters).';
      dom.complaintDescription.closest('.form-group').classList.add('has-error');
      isValid = false;
    }

    if (!isValid) return;

    // Create New Ticket Record
    const newId = generateTicketId();
    const nowIso = new Date().toISOString();
    const formattedNow = formatTimestamp(nowIso);

    const newTicket = {
      id: newId,
      title: title,
      description: desc,
      category: category,
      priority: priority,
      status: 'Pending',
      complainantName: name,
      complainantEmail: email,
      createdAt: nowIso,
      timeline: {
        submittedAt: formattedNow,
        inProgressAt: null,
        resolvedAt: null
      },
      notes: [
        {
          id: 'note-' + Date.now(),
          author: 'System Intake Desk',
          timestamp: formattedNow,
          statusChange: 'Pending',
          text: `Complaint ticket opened by ${name} (${email}). Initial triage required.`
        }
      ]
    };

    // Prepend to top
    complaints.unshift(newTicket);
    saveComplaints();
    closeNewTicketModal();
    updateUI();

    showToast(`Complaint ${newId} logged successfully!`, 'emerald');

    // Switch to tickets view to show the new ticket
    window.switchTab('tickets');
  }

  /**
   * Ticket Detail Modal & Status Timeline Logic
   */
  function openDetailModal(ticketId) {
    const ticket = complaints.find(c => c.id === ticketId);
    if (!ticket) {
      showToast('Ticket record not found', 'rose');
      return;
    }

    activeSelectedTicketId = ticketId;

    // Populate Headers & Meta
    if (dom.detailTicketId) dom.detailTicketId.textContent = ticket.id;
    if (dom.detailTicketTitle) dom.detailTicketTitle.textContent = ticket.title;
    if (dom.detailTicketCategory) dom.detailTicketCategory.textContent = `Category: ${ticket.category}`;

    if (dom.detailStatusBadge) {
      dom.detailStatusBadge.textContent = ticket.status;
      dom.detailStatusBadge.className = `status-badge ${getStatusBadgeClass(ticket.status)}`;
    }

    if (dom.detailPriorityBadge) {
      dom.detailPriorityBadge.textContent = ticket.priority;
      dom.detailPriorityBadge.className = `priority-badge ${getPriorityBadgeClass(ticket.priority)}`;
    }

    if (dom.detailTimestamp) {
      dom.detailTimestamp.textContent = formatTimestamp(ticket.createdAt);
    }

    if (dom.detailRequesterName) dom.detailRequesterName.textContent = ticket.complainantName;
    if (dom.detailRequesterEmail) dom.detailRequesterEmail.textContent = ticket.complainantEmail;
    if (dom.detailDescription) dom.detailDescription.textContent = ticket.description;

    // Update Step Timeline
    updateTimelineVisuals(ticket);

    // Populate Resolution Notes Thread
    renderNotesThread(ticket.notes);

    // Set Status Select to current ticket status
    if (dom.updateStatusSelect) {
      dom.updateStatusSelect.value = ticket.status;
    }
    if (dom.newResolutionNote) {
      dom.newResolutionNote.value = '';
    }

    if (dom.ticketDetailModal) {
      dom.ticketDetailModal.classList.add('open');
    }
  }

  function closeDetailModal() {
    if (dom.ticketDetailModal) {
      dom.ticketDetailModal.classList.remove('open');
    }
    activeSelectedTicketId = null;
  }

  /**
   * Render the 3-step lifecycle timeline
   */
  function updateTimelineVisuals(ticket) {
    // Clear classes
    [dom.stepLogged, dom.stepInProgress, dom.stepResolved].forEach(step => {
      if (step) {
        step.classList.remove('step-complete', 'step-current');
      }
    });

    const status = ticket.status;
    const submittedTime = ticket.timeline.submittedAt || formatTimestamp(ticket.createdAt);
    const inProgressTime = ticket.timeline.inProgressAt || 'Awaiting triage assignment';
    const resolvedTime = ticket.timeline.resolvedAt || 'Awaiting final resolution';

    if (dom.timelineLoggedDate) dom.timelineLoggedDate.textContent = submittedTime;
    if (dom.timelineInProgressDate) dom.timelineInProgressDate.textContent = inProgressTime;
    if (dom.timelineResolvedDate) dom.timelineResolvedDate.textContent = resolvedTime;

    if (status === 'Pending') {
      dom.stepLogged.classList.add('step-complete');
    } else if (status === 'In Progress') {
      dom.stepLogged.classList.add('step-complete');
      dom.stepInProgress.classList.add('step-current');
    } else if (status === 'Resolved') {
      dom.stepLogged.classList.add('step-complete');
      dom.stepInProgress.classList.add('step-complete');
      dom.stepResolved.classList.add('step-complete');
    }
  }

  /**
   * Render staff notes thread in ticket modal
   */
  function renderNotesThread(notes) {
    if (!dom.detailNotesThread) return;

    if (!notes || notes.length === 0) {
      dom.detailNotesThread.innerHTML = `
        <div class="text-dim" style="font-size: 0.8rem; padding: 10px; text-align: center;">
          No staff or resolution notes logged yet for this ticket.
        </div>
      `;
      return;
    }

    dom.detailNotesThread.innerHTML = notes.map(note => `
      <div class="note-bubble">
        <div class="note-header">
          <strong>${escapeHTML(note.author || 'Support Specialist')}</strong>
          <span>${escapeHTML(note.timestamp || '')}</span>
        </div>
        <p>${escapeHTML(note.text)}</p>
      </div>
    `).join('');

    // Scroll to bottom of notes
    dom.detailNotesThread.scrollTop = dom.detailNotesThread.scrollHeight;
  }

  /**
   * Handle Status Update & Resolution Note Addition
   */
  function handleSaveStatusUpdate() {
    if (!activeSelectedTicketId) return;

    const ticketIndex = complaints.findIndex(c => c.id === activeSelectedTicketId);
    if (ticketIndex === -1) return;

    const ticket = complaints[ticketIndex];
    const newStatus = dom.updateStatusSelect.value;
    const noteText = dom.newResolutionNote.value.trim();
    const oldStatus = ticket.status;

    if (newStatus === oldStatus && !noteText) {
      showToast('No changes made. Status is already ' + newStatus, 'rose');
      return;
    }

    const nowIso = new Date().toISOString();
    const formattedNow = formatTimestamp(nowIso);

    // Update status
    ticket.status = newStatus;

    // Update Timeline stamps
    if (newStatus === 'In Progress' && !ticket.timeline.inProgressAt) {
      ticket.timeline.inProgressAt = formattedNow;
    }
    if (newStatus === 'Resolved') {
      if (!ticket.timeline.inProgressAt) {
        ticket.timeline.inProgressAt = formattedNow;
      }
      ticket.timeline.resolvedAt = formattedNow;
    }
    if (newStatus === 'Pending' && oldStatus === 'Resolved') {
      // Reopening ticket
      ticket.timeline.resolvedAt = null;
    }

    // Build Activity Note
    let finalNoteText = noteText;
    if (newStatus !== oldStatus) {
      if (noteText) {
        finalNoteText = `[Status Transition: ${oldStatus} -> ${newStatus}] ${noteText}`;
      } else {
        finalNoteText = `Status transitioned from ${oldStatus} to ${newStatus}.`;
      }
    }

    if (finalNoteText) {
      ticket.notes.push({
        id: 'note-' + Date.now(),
        author: 'Support Engineer',
        timestamp: formattedNow,
        statusChange: newStatus,
        text: finalNoteText
      });
    }

    saveComplaints();
    updateUI();

    // Re-render modal details
    openDetailModal(activeSelectedTicketId);

    showToast(`Ticket ${ticket.id} updated to ${newStatus}`, 'emerald');
  }

  /**
   * Delete Complaint Ticket
   */
  function handleDeleteComplaint() {
    if (!activeSelectedTicketId) return;

    const confirmDelete = confirm(`Are you sure you want to permanently delete ticket ${activeSelectedTicketId}? This action cannot be undone.`);
    if (!confirmDelete) return;

    const deletedId = activeSelectedTicketId;
    complaints = complaints.filter(c => c.id !== deletedId);
    saveComplaints();
    closeDetailModal();
    updateUI();

    showToast(`Ticket ${deletedId} deleted`, 'emerald');
  }

  /**
   * Export complaints to CSV
   */
  function exportComplaintsToCSV() {
    if (complaints.length === 0) {
      showToast('No complaint records available to export', 'rose');
      return;
    }

    const headers = [
      'Ticket ID',
      'Title',
      'Category',
      'Priority',
      'Status',
      'Complainant Name',
      'Complainant Email',
      'Created Date',
      'Submitted Timestamp',
      'In Progress Timestamp',
      'Resolved Timestamp',
      'Notes Count'
    ];

    const rows = complaints.map(c => [
      c.id,
      escapeCSV(c.title),
      escapeCSV(c.category),
      c.priority,
      c.status,
      escapeCSV(c.complainantName),
      escapeCSV(c.complainantEmail),
      c.createdAt,
      escapeCSV(c.timeline.submittedAt || ''),
      escapeCSV(c.timeline.inProgressAt || ''),
      escapeCSV(c.timeline.resolvedAt || ''),
      (c.notes ? c.notes.length : 0)
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement('a');
    const filenameDate = new Date().toISOString().slice(0, 10);
    downloadAnchor.href = url;
    downloadAnchor.setAttribute('download', `resolvedesk-complaints-${filenameDate}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
    URL.revokeObjectURL(url);

    showToast(`Exported ${complaints.length} tickets to CSV`, 'emerald');
  }

  function escapeCSV(val) {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  }

  /**
   * Reset Demo Complaints to Default Seed Data
   */
  function resetDemoData() {
    const confirmReset = confirm('Reset ResolveDesk sample complaints to initial demonstration dataset? Any custom complaints created will be replaced.');
    if (!confirmReset) return;

    complaints = JSON.parse(JSON.stringify(SAMPLE_COMPLAINTS));
    saveComplaints();
    updateUI();
    showToast('Reset to default demonstration complaints', 'emerald');
  }

  /**
   * Mobile Sidebar Drawer Controls
   */
  function openMobileSidebar() {
    if (dom.sidebar) dom.sidebar.classList.add('open');
    if (dom.sidebarBackdrop) dom.sidebarBackdrop.classList.add('open');
  }

  function closeMobileSidebar() {
    if (dom.sidebar) dom.sidebar.classList.remove('open');
    if (dom.sidebarBackdrop) dom.sidebarBackdrop.classList.remove('open');
  }

  /**
   * Toast notification helper
   */
  function showToast(message, type = 'indigo') {
    if (!dom.toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type === 'rose' ? 'toast-rose' : type === 'emerald' ? 'toast-emerald' : ''}`;
    toast.textContent = message;

    dom.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 250);
    }, 3500);
  }

  /**
   * HTML escape sanitizer
   */
  function escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * Event Listeners Binding
   */
  function attachEventListeners() {
    // Nav Items
    if (dom.navDashboard) dom.navDashboard.addEventListener('click', () => switchTab('dashboard'));
    if (dom.navTickets) dom.navTickets.addEventListener('click', () => switchTab('tickets'));
    if (dom.navPending) dom.navPending.addEventListener('click', () => switchTab('pending'));
    if (dom.navInProgress) dom.navInProgress.addEventListener('click', () => switchTab('in-progress'));
    if (dom.navResolved) dom.navResolved.addEventListener('click', () => switchTab('resolved'));

    // Reset Demo Data
    if (dom.btnResetDemoData) dom.btnResetDemoData.addEventListener('click', resetDemoData);

    // Mobile Sidebar
    if (dom.mobileMenuBtn) dom.mobileMenuBtn.addEventListener('click', openMobileSidebar);
    if (dom.sidebarCloseBtn) dom.sidebarCloseBtn.addEventListener('click', closeMobileSidebar);
    if (dom.sidebarBackdrop) dom.sidebarBackdrop.addEventListener('click', closeMobileSidebar);

    // Open New Ticket Modal Buttons
    if (dom.sidebarBtnNewTicket) dom.sidebarBtnNewTicket.addEventListener('click', openNewTicketModal);
    if (dom.topBtnNewTicket) dom.topBtnNewTicket.addEventListener('click', openNewTicketModal);

    // Close New Ticket Modal
    if (dom.btnCloseNewModal) dom.btnCloseNewModal.addEventListener('click', closeNewTicketModal);
    if (dom.btnCancelNewModal) dom.btnCancelNewModal.addEventListener('click', closeNewTicketModal);

    // New Complaint Form Submit
    if (dom.newComplaintForm) dom.newComplaintForm.addEventListener('submit', handleComplaintSubmit);

    // Detail Modal Close Buttons
    if (dom.btnCloseDetailModal) dom.btnCloseDetailModal.addEventListener('click', closeDetailModal);
    if (dom.btnCloseDetailFooter) dom.btnCloseDetailFooter.addEventListener('click', closeDetailModal);

    // Status & Notes Update
    if (dom.btnSaveStatusUpdate) dom.btnSaveStatusUpdate.addEventListener('click', handleSaveStatusUpdate);

    // Delete Ticket
    if (dom.btnDeleteComplaint) dom.btnDeleteComplaint.addEventListener('click', handleDeleteComplaint);

    // Export CSV Buttons
    if (dom.topBtnExport) dom.topBtnExport.addEventListener('click', exportComplaintsToCSV);
    if (dom.btnExportCSV) dom.btnExportCSV.addEventListener('click', exportComplaintsToCSV);

    // Search and Filters in Directory
    if (dom.ticketSearchInput) {
      dom.ticketSearchInput.addEventListener('input', () => {
        renderTicketsDirectory();
      });
    }

    if (dom.filterStatus) {
      dom.filterStatus.addEventListener('change', () => {
        renderTicketsDirectory();
      });
    }

    if (dom.filterPriority) {
      dom.filterPriority.addEventListener('change', () => {
        renderTicketsDirectory();
      });
    }

    if (dom.filterCategory) {
      dom.filterCategory.addEventListener('change', () => {
        renderTicketsDirectory();
      });
    }

    if (dom.sortBy) {
      dom.sortBy.addEventListener('change', () => {
        renderTicketsDirectory();
      });
    }

    // Reset filters button
    if (dom.btnResetFilters) {
      dom.btnResetFilters.addEventListener('click', () => {
        if (dom.ticketSearchInput) dom.ticketSearchInput.value = '';
        if (dom.filterStatus) dom.filterStatus.value = 'ALL';
        if (dom.filterPriority) dom.filterPriority.value = 'ALL';
        if (dom.filterCategory) dom.filterCategory.value = 'ALL';
        if (dom.sortBy) dom.sortBy.value = 'date_desc';
        renderTicketsDirectory();
      });
    }

    // Close Modals on Backdrop Click (outside dialog)
    window.addEventListener('click', (e) => {
      if (e.target === dom.newTicketModal) closeNewTicketModal();
      if (e.target === dom.ticketDetailModal) closeDetailModal();
    });

    // Close Modals on ESC Key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (dom.newTicketModal && dom.newTicketModal.classList.contains('open')) {
          closeNewTicketModal();
        }
        if (dom.ticketDetailModal && dom.ticketDetailModal.classList.contains('open')) {
          closeDetailModal();
        }
      }
    });
  }

  // Kickstart on DOM Content Loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
