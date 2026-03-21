// ─────────────────────────────────────────────
//  CONSTANTS
// ─────────────────────────────────────────────
const storeNames = {
    'S001': 'North Austin',
    'S002': 'South Austin',
    'S003': 'Round Rock'
};

// ─────────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────────
function isITIssue(order) {
    return (order.orderStatus === 'Failed'  && order.paymentStatus === 'Paid') ||
        (order.orderStatus === 'Pending' && order.paymentStatus === 'Declined');
}

function getBadgeClass(value) {
    const map = {
        'Failed':        'failed',
        'Pending':       'pending',
        'Canceled':      'canceled',
        'Completed':     'completed',
        'Paid':          'paid',
        'Declined':      'declined',
        'Refunded':      'refunded',
        'Delivery':      'delivery',
        'Pickup':        'pickup',
        'Will Call':     'willcall',
        'Ship to Store': 'shiptostore'
    };
    return map[value] || '';
}

function getMockLineItems(order) {
    const half = order.total / 2;
    return [
        { name: 'Item A', qty: 1, listPrice: +(half * 1.1).toFixed(2), retailPrice: +half.toFixed(2) },
        { name: 'Item B', qty: 1, listPrice: +(half * 1.1).toFixed(2), retailPrice: +half.toFixed(2) }
    ];
}

// ─────────────────────────────────────────────
//  STAT CARDS
// ─────────────────────────────────────────────
function renderStatCards(data) {
    const failed    = data.filter(o => o.orderStatus   === 'Failed').length;
    const declined  = data.filter(o => o.paymentStatus === 'Declined').length;
    const canceled  = data.filter(o => o.orderStatus   === 'Canceled').length;
    const completed = data.filter(o => o.orderStatus   === 'Completed').length;

    document.getElementById('statsBar').innerHTML = `
        <div class="stat-card stat-failed">
            <div class="stat-number">${failed}</div>
            <div class="stat-label">Failed</div>
        </div>
        <div class="stat-card stat-declined">
            <div class="stat-number">${declined}</div>
            <div class="stat-label">Declined</div>
        </div>
        <div class="stat-card stat-canceled">
            <div class="stat-number">${canceled}</div>
            <div class="stat-label">Canceled</div>
        </div>
        <div class="stat-card stat-completed">
            <div class="stat-number">${completed}</div>
            <div class="stat-label">Completed</div>
        </div>
    `;
}

// ─────────────────────────────────────────────
//  TABLE
// ─────────────────────────────────────────────
function renderTable(data) {
    const tbody = document.getElementById('ordersTableBody');
    tbody.innerHTML = '';

    data.forEach(order => {
        const storeName = storeNames[order.storeId] || '';
        const itIssue   = isITIssue(order);
        const tr        = document.createElement('tr');
        tr.innerHTML = `
            <td><button class="clickable" onclick="openOrderModal('${order.id}')">${order.id}</button></td>
            <td><button class="clickable" onclick="openCustomerModal('${order.customerId}')">${order.customer}</button></td>
            <td><span class="store-id">${order.storeId}</span> <span class="store-tag">${storeName}</span></td>
            <td>${order.date}</td>
            <td><span class="badge ${getBadgeClass(order.orderStatus)}">${order.orderStatus}</span></td>
            <td><span class="badge ${getBadgeClass(order.paymentStatus)}">${order.paymentStatus}</span></td>
            <td><span class="badge ${getBadgeClass(order.fulfillment)}">${order.fulfillment}</span></td>
            <td>$${order.total.toFixed(2)}</td>
            <td>${itIssue ? 'Y' : 'N'}</td>
            <td><button class="resolve-btn" onclick="resolveOrder('${order.id}', this)" ${!itIssue ? 'disabled' : ''}>Resolve</button></td>
        `;
        tbody.appendChild(tr);
    });
}

// ─────────────────────────────────────────────
//  FILTERS  (called via oninput / onchange in HTML)
// ─────────────────────────────────────────────
function applyFilters() {
    const search      = document.getElementById('searchInput').value.toLowerCase();
    const storeFilter = document.getElementById('storeFilter').value;

    const filtered = orders.filter(order => {
        const matchSearch = order.id.toLowerCase().includes(search) ||
            order.customer.toLowerCase().includes(search) ||
            order.customerId.toLowerCase().includes(search);
        const matchStore  = !storeFilter || order.storeId === storeFilter;
        return matchSearch && matchStore;
    });

    renderTable(filtered);
    renderStatCards(filtered);
}

// ─────────────────────────────────────────────
//  RESOLVE
// ─────────────────────────────────────────────
function resolveOrder(id, btn) {
    btn.disabled    = true;
    btn.textContent = 'Resolved';
}

// ─────────────────────────────────────────────
//  ORDER MODAL
// ─────────────────────────────────────────────
function openOrderModal(id) {
    const order = orders.find(o => o.id === id);
    if (!order) return;

    const storeName = storeNames[order.storeId] || '';
    const itIssue   = isITIssue(order);

    document.getElementById('orderModalTitle').textContent    = `Order #${order.id}`;
    document.getElementById('orderModalSubtitle').textContent =
        `${order.customer} · ${order.customerId} · ${order.storeId} ${storeName}`;

    document.getElementById('orderModalGrid').innerHTML = `
        <div class="info-item"><div class="info-label">Order ID</div>       <div class="info-value">${order.id}</div></div>
        <div class="info-item"><div class="info-label">Customer</div>       <div class="info-value">${order.customer}</div></div>
        <div class="info-item"><div class="info-label">Customer ID</div>    <div class="info-value">${order.customerId}</div></div>
        <div class="info-item"><div class="info-label">Store</div>          <div class="info-value">${order.storeId} – ${storeName}</div></div>
        <div class="info-item"><div class="info-label">Date</div>           <div class="info-value">${order.date}</div></div>
        <div class="info-item"><div class="info-label">Fulfillment</div>    <div class="info-value">${order.fulfillment}</div></div>
        <div class="info-item"><div class="info-label">Order Status</div>   <div class="info-value"><span class="badge ${getBadgeClass(order.orderStatus)}">${order.orderStatus}</span></div></div>
        <div class="info-item"><div class="info-label">Payment Status</div> <div class="info-value"><span class="badge ${getBadgeClass(order.paymentStatus)}">${order.paymentStatus}</span></div></div>
        <div class="info-item"><div class="info-label">IT Issue</div>       <div class="info-value">${itIssue ? '⚠️ Yes' : 'No'}</div></div>
    `;

    const items = getMockLineItems(order);
    const tbody = document.getElementById('orderItemsBody');
    tbody.innerHTML = '';
    let subtotal = 0;
    items.forEach(item => {
        const lineTotal = item.qty * item.retailPrice;
        const savings   = (item.listPrice - item.retailPrice) * item.qty;
        subtotal += lineTotal;
        tbody.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.qty}</td>
                <td>$${item.listPrice.toFixed(2)}</td>
                <td>$${item.retailPrice.toFixed(2)}</td>
                <td style="color:#00cc66;">${savings > 0 ? '-$' + savings.toFixed(2) : '—'}</td>
                <td>$${lineTotal.toFixed(2)}</td>
            </tr>
        `;
    });

    const tax = subtotal * 0.0825;
    document.getElementById('costBreakdown').innerHTML = `
        <div class="cost-breakdown">
            <div class="cost-row"><span>Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
            <div class="cost-row"><span>Tax (8.25%)</span><span>$${tax.toFixed(2)}</span></div>
            <div class="cost-row total"><span>Total</span><span>$${order.total.toFixed(2)}</span></div>
        </div>
    `;

    document.getElementById('orderModalActions').innerHTML = `
        <button class="btn btn-reprocess" onclick="alert('Reprocess initiated for Order #${order.id}')">🔄 Reprocess</button>
        <button class="btn btn-escalate"  onclick="openITSupportModal('${order.id}')">🎫 IT Support</button>
        <button class="btn btn-cancel"    onclick="openModifyModal('${order.id}')">✏️ Modify</button>
        <button class="btn btn-close"     onclick="closeModal('orderModal')">✕ Close</button>
    `;

    openModal('orderModal');
}

// ─────────────────────────────────────────────
//  CUSTOMER MODAL
// ─────────────────────────────────────────────
function openCustomerModal(customerId) {
    const customerOrders = orders.filter(o => o.customerId === customerId);
    if (!customerOrders.length) return;

    const first = customerOrders[0];
    document.getElementById('customerModalTitle').textContent    = first.customer;
    document.getElementById('customerModalSubtitle').textContent =
        `Customer ID: ${customerId} · ${customerOrders.length} order(s) on file`;

    document.getElementById('customerModalGrid').innerHTML = `
        <div class="info-item"><div class="info-label">Customer ID</div><div class="info-value">${customerId}</div></div>
        <div class="info-item"><div class="info-label">Name</div>       <div class="info-value">${first.customer}</div></div>
        <div class="info-item"><div class="info-label">Total Orders</div><div class="info-value">${customerOrders.length}</div></div>
    `;

    const tbody = document.getElementById('customerOrderHistoryBody');
    tbody.innerHTML = '';
    customerOrders.forEach(o => {
        const storeName = storeNames[o.storeId] || '';
        tbody.innerHTML += `
            <tr>
                <td><button class="clickable" onclick="closeModal('customerModal'); openOrderModal('${o.id}')">${o.id}</button></td>
                <td>${o.storeId} ${storeName}</td>
                <td>${o.date}</td>
                <td><span class="badge ${getBadgeClass(o.orderStatus)}">${o.orderStatus}</span></td>
                <td><span class="badge ${getBadgeClass(o.paymentStatus)}">${o.paymentStatus}</span></td>
                <td>$${o.total.toFixed(2)}</td>
                <td><button class="resolve-btn" onclick="closeModal('customerModal'); openOrderModal('${o.id}')">View</button></td>
            </tr>
        `;
    });

    document.getElementById('customerModalActions').innerHTML = `
        <button class="btn btn-modify" onclick="openModifyCustomerModal('${customerId}')">✏️ Edit Profile</button>
        <button class="btn btn-close"  onclick="closeModal('customerModal')">✕ Close</button>
    `;

    openModal('customerModal');
}

// ─────────────────────────────────────────────
//  MODIFY ORDER MODAL
// ─────────────────────────────────────────────
function openModifyModal(id) {
    const order = orders.find(o => o.id === id);
    if (!order) return;

    document.getElementById('modifyModalTitle').textContent = `Modify Order #${id}`;
    document.getElementById('modifyOrderId').value          = id;
    document.getElementById('modifyOrderStatus').value      = order.orderStatus;
    document.getElementById('modifyFulfillment').value      = order.fulfillment;

    const items = getMockLineItems(order);
    const tbody = document.getElementById('modifyItemsBody');
    tbody.innerHTML = '';
    items.forEach((item, i) => {
        tbody.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>$${item.retailPrice.toFixed(2)}</td>
                <td><input type="number" value="${item.qty}" min="1"
                    style="width:60px; background:#1a1a2e; border:1px solid #3a3a5c;
                           color:#fff; border-radius:4px; padding:4px; text-align:center;"
                    onchange="recalcModify()"></td>
                <td id="modifyLineTotal${i}">$${(item.qty * item.retailPrice).toFixed(2)}</td>
            </tr>
        `;
    });

    recalcModify();
    openModal('modifyModal');
}

function recalcModify() {
    const rows = document.querySelectorAll('#modifyItemsBody tr');
    let subtotal = 0;
    rows.forEach((row, i) => {
        const price = parseFloat(row.cells[1].textContent.replace('$', ''));
        const qty   = parseInt(row.querySelector('input').value) || 1;
        const line  = price * qty;
        subtotal   += line;
        const el    = document.getElementById('modifyLineTotal' + i);
        if (el) el.textContent = '$' + line.toFixed(2);
    });
    const tax = subtotal * 0.0825;
    document.getElementById('modifySubtotal').textContent = '$' + subtotal.toFixed(2);
    document.getElementById('modifyTax').textContent      = '$' + tax.toFixed(2);
    document.getElementById('modifyTotal').textContent    = '$' + (subtotal + tax).toFixed(2);
}

function saveModifyOrder() {
    const id    = document.getElementById('modifyOrderId').value;
    const order = orders.find(o => o.id === id);
    if (!order) return;

    order.orderStatus = document.getElementById('modifyOrderStatus').value;
    order.fulfillment = document.getElementById('modifyFulfillment').value;

    renderTable(orders);
    renderStatCards(orders);
    closeModal('modifyModal');
    alert(`Order #${id} updated successfully.`);
}

// ─────────────────────────────────────────────
//  MODIFY CUSTOMER MODAL
// ─────────────────────────────────────────────
function openModifyCustomerModal(customerId) {
    const customerOrders = orders.filter(o => o.customerId === customerId);
    if (!customerOrders.length) return;

    const first                = customerOrders[0];
    const [firstName, ...rest] = first.customer.split(' ');

    document.getElementById('modifyCustomerTitle').textContent  = `Edit Profile — ${first.customer}`;
    document.getElementById('modifyCustomerId').value           = customerId;
    document.getElementById('modifyCustFirstName').value        = firstName;
    document.getElementById('modifyCustLastName').value         = rest.join(' ');

    openModal('modifyCustomerModal');
}

function saveModifyCustomer() {
    const firstName = document.getElementById('modifyCustFirstName').value.trim();
    const lastName  = document.getElementById('modifyCustLastName').value.trim();
    let valid = true;

    if (!firstName) {
        document.getElementById('modifyCustFirstNameError').textContent = 'First name is required.';
        document.getElementById('modifyCustFirstName').classList.add('invalid');
        valid = false;
    } else {
        document.getElementById('modifyCustFirstNameError').textContent = '';
        document.getElementById('modifyCustFirstName').classList.remove('invalid');
    }
    if (!lastName) {
        document.getElementById('modifyCustLastNameError').textContent = 'Last name is required.';
        document.getElementById('modifyCustLastName').classList.add('invalid');
        valid = false;
    } else {
        document.getElementById('modifyCustLastNameError').textContent = '';
        document.getElementById('modifyCustLastName').classList.remove('invalid');
    }
    if (!valid) return;

    const customerId = document.getElementById('modifyCustomerId').value;
    orders.forEach(o => {
        if (o.customerId === customerId) o.customer = `${firstName} ${lastName}`;
    });

    renderTable(orders);
    closeModal('modifyCustomerModal');
    alert('Customer profile updated.');
}

// ─────────────────────────────────────────────
//  IT SUPPORT MODAL
// ─────────────────────────────────────────────
const itTickets = {};

function openITSupportModal(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    document.getElementById('itSupportModalTitle').textContent    = `IT Support — Order #${orderId}`;
    document.getElementById('itSupportModalSubtitle').textContent =
        `${order.customer} · ${order.orderStatus} / ${order.paymentStatus}`;

    const tickets = itTickets[orderId] || [];
    document.getElementById('itTicketCount').textContent = `${tickets.length} ticket(s) on file`;

    const list = document.getElementById('itTicketList');
    list.innerHTML = '';
    if (!tickets.length) {
        list.innerHTML = '<div style="color:#666; font-size:13px;">No tickets submitted yet.</div>';
    } else {
        tickets.forEach(t => {
            const pClass = t.priority === 'Critical' ? 'failed' :
                t.priority === 'High'     ? 'declined' : 'pending';
            list.innerHTML += `
                <div style="background:#1a1a2e; border:1px solid #2e2e4e; border-radius:8px; padding:14px;">
                    <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
                        <span style="color:#a78bfa; font-weight:600;">${t.title}</span>
                        <span class="badge ${pClass}">${t.priority}</span>
                    </div>
                    <div style="font-size:12px; color:#888;">${t.category} · Submitted ${t.date}</div>
                    <div style="font-size:13px; color:#ccc; margin-top:8px;">${t.description}</div>
                </div>
            `;
        });
    }

    openModal('itSupportModal');
}

function openNewTicketForm() {
    const title   = document.getElementById('itSupportModalTitle').textContent;
    const orderId = title.replace('IT Support — Order #', '');

    document.getElementById('newTicketOrderId').value         = orderId;
    document.getElementById('newTicketOrderInfo').textContent = `Order #${orderId}`;
    document.getElementById('newTicketTitle').value           = '';
    document.getElementById('newTicketDescription').value     = '';
    document.getElementById('newTicketTitleError').textContent       = '';
    document.getElementById('newTicketDescriptionError').textContent = '';

    openModal('newTicketFormModal');
}

function submitNewTicket() {
    const title       = document.getElementById('newTicketTitle').value.trim();
    const description = document.getElementById('newTicketDescription').value.trim();
    let valid = true;

    if (!title) {
        document.getElementById('newTicketTitleError').textContent = 'Title is required.';
        valid = false;
    } else {
        document.getElementById('newTicketTitleError').textContent = '';
    }
    if (!description) {
        document.getElementById('newTicketDescriptionError').textContent = 'Description is required.';
        valid = false;
    } else {
        document.getElementById('newTicketDescriptionError').textContent = '';
    }
    if (!valid) return;

    const orderId = document.getElementById('newTicketOrderId').value;
    if (!itTickets[orderId]) itTickets[orderId] = [];
    itTickets[orderId].push({
        title,
        description,
        category: document.getElementById('newTicketCategory').value,
        priority: document.getElementById('newTicketPriority').value.replace(/^\S+\s/, ''),
        date:     new Date().toLocaleDateString()
    });

    closeModal('newTicketFormModal');
    openITSupportModal(orderId);
}

// ─────────────────────────────────────────────
//  MODAL HELPERS
// ─────────────────────────────────────────────
function openModal(id)  { document.getElementById(id).classList.add('active');    }
function closeModal(id) { document.getElementById(id).classList.remove('active'); }

// ─────────────────────────────────────────────
//  BOOTSTRAP
// ─────────────────────────────────────────────
let orders = [];

async function loadOrders() {
    try {
        const response = await fetch('/api/orders');
        orders = await response.json();
        renderTable(orders);
        renderStatCards(orders);
    } catch (error) {
        console.error('Failed to load orders:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadOrders);
