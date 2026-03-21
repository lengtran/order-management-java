console.log("app.js loaded");

// ============================================================
// STORE LOOKUP
// Maps store IDs to human-readable store names
// ============================================================
const stores = {
    'S001': 'North Austin',
    'S002': 'South Austin',
    'S003': 'Round Rock'
};

// ============================================================
// ORDERS DATA
// Each order contains: customer info, status, fulfillment type,
// line items (sku, name, qty, prices), and cost breakdown
// ============================================================
const orders = {
    '1001': {
        id:'1001', customer:'John Smith', customerId:'C001', storeId:'S001',
        orderStatus:'Failed', paymentStatus:'Paid', date:'2026-03-20', total:'$149.99',
        fulfillment:'Delivery',
        items: [
            { sku:'DW-20V-DRL-001', name:'DEWALT 20V MAX Cordless Drill', qty:1, listPrice:159.00, retailPrice:129.99 },
            { sku:'DW-BIT-SET-021', name:'Drill Bit Set 21-Piece',        qty:1, listPrice: 24.99, retailPrice: 14.99 },
            { sku:'SF-GLASSES-001', name:'Safety Glasses',                qty:2, listPrice:  9.99, retailPrice:  7.99 }
        ],
        breakdown: { subtotal:129.99, tax:12.99, shipping:7.99, discount:0.00, total:149.99 }
    },
    '1002': {
        id:'1002', customer:'Jane Doe', customerId:'C002', storeId:'S002',
        orderStatus:'Pending', paymentStatus:'Declined', date:'2026-03-20', total:'$89.99',
        fulfillment:'Pickup',
        items: [
            { sku:'HK-CHEST-26IN', name:'Husky 26 in. Tool Chest', qty:1, listPrice:199.00, retailPrice:79.99 },
            { sku:'HK-LOCK-4PK',   name:'Combination Lock 4-Pack', qty:1, listPrice: 19.99, retailPrice:12.99 }
        ],
        breakdown: { subtotal:79.99, tax:8.00, shipping:0.00, discount:0.00, total:89.99 }
    },
    '1003': {
        id:'1003', customer:'Bob Johnson', customerId:'C003', storeId:'S003',
        orderStatus:'Canceled', paymentStatus:'Refunded', date:'2026-03-19', total:'$59.99',
        fulfillment:'Will Call',
        items: [
            { sku:'PT-5GAL-INT-001', name:'Paint 5-Gallon Bucket Interior', qty:1, listPrice:89.00, retailPrice:49.99 },
            { sku:'PT-ROLLER-KIT',   name:'Paint Roller Kit',               qty:2, listPrice:14.99, retailPrice: 9.99 }
        ],
        breakdown: { subtotal:49.99, tax:6.00, shipping:0.00, discount:4.00, total:59.99 }
    },
    '1004': {
        id:'1004', customer:'Alice Brown', customerId:'C004', storeId:'S003',
        orderStatus:'Completed', paymentStatus:'Paid', date:'2026-03-18', total:'$199.99',
        fulfillment:'Ship to Store',
        items: [
            { sku:'MW-M18-SAW-001', name:'Milwaukee M18 Circular Saw',    qty:1, listPrice:229.00, retailPrice:169.99 },
            { sku:'MW-BLADE-7QTR',  name:'Saw Blade 7-1/4 in. 24-Tooth', qty:2, listPrice: 29.99, retailPrice: 18.99 },
            { sku:'MW-BLADE-WRNCH', name:'Blade Wrench',                  qty:1, listPrice: 12.99, retailPrice:  8.99 }
        ],
        breakdown: { subtotal:169.99, tax:17.00, shipping:13.00, discount:0.00, total:199.99 }
    },
    '1011': {
        id:'1011', customer:'Marcus Johnson', customerId:'C005', storeId:'S001',
        orderStatus:'Failed', paymentStatus:'Paid', date:'2026-03-20', total:'$245.97',
        fulfillment:'Delivery',
        items: [
            { sku:'RY-40V-STR-001', name:'Ryobi 40V String Trimmer',       qty:1, listPrice:249.00, retailPrice:189.99 },
            { sku:'RY-SPOOL-3PK',   name:'Ryobi Replacement Spool 3-Pack', qty:2, listPrice: 19.99, retailPrice: 15.99 }
        ],
        breakdown: { subtotal:205.99, tax:20.60, shipping:19.38, discount:0.00, total:245.97 }
    },
    '1012': {
        id:'1012', customer:'Marcus Johnson', customerId:'C005', storeId:'S002',
        orderStatus:'Completed', paymentStatus:'Paid', date:'2026-03-15', total:'$89.99',
        fulfillment:'Pickup',
        items: [
            { sku:'IR-STUD-FIND', name:'Irwin Stud Finder Pro', qty:1, listPrice:49.99, retailPrice:34.99 },
            { sku:'IR-LEVEL-48',  name:'48 in. Magnetic Level', qty:1, listPrice:64.99, retailPrice:54.99 }
        ],
        breakdown: { subtotal:79.99, tax:8.00, shipping:0.00, discount:0.00, total:89.99 }
    },
    '1013': {
        id:'1013', customer:'Sara Williams', customerId:'C006', storeId:'S001',
        orderStatus:'Pending', paymentStatus:'Declined', date:'2026-03-20', total:'$312.45',
        fulfillment:'Ship to Store',
        items: [
            { sku:'MK-TILE-SAW-7', name:'Makita 7 in. Tile Saw', qty:1, listPrice:399.00, retailPrice:269.98 },
            { sku:'MK-BLADE-DIA',  name:'Diamond Blade 7 in.',    qty:1, listPrice: 39.99, retailPrice: 29.99 }
        ],
        breakdown: { subtotal:269.98, tax:27.00, shipping:15.47, discount:0.00, total:312.45 }
    },
    '1014': {
        id:'1014', customer:'Sara Williams', customerId:'C006', storeId:'S003',
        orderStatus:'Completed', paymentStatus:'Paid', date:'2026-03-10', total:'$54.99',
        fulfillment:'Will Call',
        items: [
            { sku:'GE-CAULK-WHT', name:'GE Silicone Caulk White', qty:3, listPrice:8.99,  retailPrice:6.99  },
            { sku:'GE-CAULK-GUN', name:'Professional Caulk Gun',   qty:1, listPrice:34.99, retailPrice:25.99 }
        ],
        breakdown: { subtotal:49.99, tax:5.00, shipping:0.00, discount:0.00, total:54.99 }
    },
    '1015': {
        id:'1015', customer:'David Lee', customerId:'C007', storeId:'S002',
        orderStatus:'Canceled', paymentStatus:'Refunded', date:'2026-03-19', total:'$178.50',
        fulfillment:'Delivery',
        items: [
            { sku:'EG-GEN-3500W', name:'Energizer 3500W Generator', qty:1, listPrice:499.00, retailPrice:154.99 }
        ],
        breakdown: { subtotal:154.99, tax:15.51, shipping:8.00, discount:0.00, total:178.50 }
    },
    '1016': {
        id:'1016', customer:'David Lee', customerId:'C007', storeId:'S001',
        orderStatus:'Completed', paymentStatus:'Paid', date:'2026-03-12', total:'$99.99',
        fulfillment:'Pickup',
        items: [
            { sku:'BF-HOSE-50FT',  name:'Flexzilla 50 ft. Garden Hose', qty:1, listPrice:79.99, retailPrice:59.99 },
            { sku:'BF-NOZZLE-7PT', name:'7-Pattern Hose Nozzle',         qty:2, listPrice:19.99, retailPrice:14.99 }
        ],
        breakdown: { subtotal:89.99, tax:9.00, shipping:0.00, discount:1.00, total:99.99 }
    },
    '1017': {
        id:'1017', customer:'Priya Patel', customerId:'C008', storeId:'S003',
        orderStatus:'Failed', paymentStatus:'Paid', date:'2026-03-20', total:'$421.98',
        fulfillment:'Delivery',
        items: [
            { sku:'LG-VENT-KIT-6', name:'LG 6 in. Dryer Vent Kit',    qty:1, listPrice: 49.99, retailPrice: 39.99 },
            { sku:'LG-WSHR-HOSE',  name:'Washing Machine Fill Hose',   qty:2, listPrice: 24.99, retailPrice: 19.99 },
            { sku:'EC-GFCI-OUTL',  name:'Leviton GFCI Outlet 4-Pack', qty:3, listPrice: 39.99, retailPrice: 29.99 },
            { sku:'EC-WR-14AWG',   name:'14 AWG Wire 25 ft. Roll',     qty:2, listPrice: 29.99, retailPrice: 22.99 }
        ],
        breakdown: { subtotal:369.98, tax:37.00, shipping:15.00, discount:0.00, total:421.98 }
    },
    '1018': {
        id:'1018', customer:'Priya Patel', customerId:'C008', storeId:'S002',
        orderStatus:'Pending', paymentStatus:'Declined', date:'2026-03-18', total:'$67.50',
        fulfillment:'Will Call',
        items: [
            { sku:'GD-DOOR-LOCK', name:'Schlage Deadbolt Lock',   qty:1, listPrice:79.99, retailPrice:59.99 },
            { sku:'GD-DOOR-KNOB', name:'Schlage Door Knob Satin', qty:1, listPrice:44.99, retailPrice:34.99 }
        ],
        breakdown: { subtotal:59.99, tax:6.01, shipping:0.00, discount:1.50, total:67.50 }
    }
};

// ============================================================
// CUSTOMERS DATA
// Includes split name (first, middle initial, last),
// split address (street, city, state, zip), phone type,
// contact preference (Call/Text/Email), account type,
// tax ID (locked once set), tax exempt flag (business only)
// ============================================================
const customers = {
    'C001': {
        id:'C001', firstName:'John', middleInit:null, lastName:'Smith',
        email:'john.smith@email.com', phone:'512-555-0101', phoneType:'Mobile',
        contactPref:'Text', street:'4521 Lamar Blvd', city:'Austin', state:'TX', zip:'78756',
        customerType:'Residential', taxId:null, taxExempt:false,
        orders: [
            { id:'1001', storeId:'S001', date:'2026-03-20', orderStatus:'Failed',    payment:'Paid', total:'$149.99' },
            { id:'1005', storeId:'S001', date:'2026-02-14', orderStatus:'Completed', payment:'Paid', total:'$39.99'  },
            { id:'1006', storeId:'S002', date:'2026-01-05', orderStatus:'Completed', payment:'Paid', total:'$79.99'  }
        ]
    },
    'C002': {
        id:'C002', firstName:'Jane', middleInit:null, lastName:'Doe',
        email:'jane.doe@email.com', phone:'512-555-0102', phoneType:'Home',
        contactPref:'Call', street:'812 Congress Ave', city:'Austin', state:'TX', zip:'78701',
        customerType:'Residential', taxId:null, taxExempt:false,
        orders: [
            { id:'1002', storeId:'S002', date:'2026-03-20', orderStatus:'Pending',   payment:'Declined', total:'$89.99'  },
            { id:'1007', storeId:'S003', date:'2026-02-28', orderStatus:'Completed', payment:'Paid',     total:'$119.99' }
        ]
    },
    'C003': {
        id:'C003', firstName:'Bob', middleInit:'R', lastName:'Johnson',
        email:'bob.johnson@email.com', phone:'512-555-0103', phoneType:'Work',
        contactPref:'Call', street:'3309 Speedway', city:'Austin', state:'TX', zip:'78705',
        customerType:'Business', taxId:'TX-98234571', taxExempt:true,
        orders: [
            { id:'1003', storeId:'S003', date:'2026-03-19', orderStatus:'Canceled',  payment:'Refunded', total:'$59.99' },
            { id:'1008', storeId:'S003', date:'2026-01-22', orderStatus:'Completed', payment:'Paid',     total:'$29.99' }
        ]
    },
    'C004': {
        id:'C004', firstName:'Alice', middleInit:'M', lastName:'Brown',
        email:'alice.brown@email.com', phone:'512-555-0104', phoneType:'Mobile',
        contactPref:'Text', street:'620 W 6th St', city:'Austin', state:'TX', zip:'78701',
        customerType:'Residential', taxId:null, taxExempt:false,
        orders: [
            { id:'1004', storeId:'S003', date:'2026-03-18', orderStatus:'Completed', payment:'Paid', total:'$199.99' },
            { id:'1009', storeId:'S001', date:'2026-03-10', orderStatus:'Failed',    payment:'Paid', total:'$99.99'  },
            { id:'1010', storeId:'S002', date:'2026-02-01', orderStatus:'Completed', payment:'Paid', total:'$49.99'  }
        ]
    },
    'C005': {
        id:'C005', firstName:'Marcus', middleInit:null, lastName:'Johnson',
        email:'marcus.johnson@email.com', phone:'512-555-0105', phoneType:'Mobile',
        contactPref:'Text', street:'1104 S 1st St', city:'Austin', state:'TX', zip:'78704',
        customerType:'Residential', taxId:null, taxExempt:false,
        orders: [
            { id:'1011', storeId:'S001', date:'2026-03-20', orderStatus:'Failed',    payment:'Paid', total:'$245.97' },
            { id:'1012', storeId:'S002', date:'2026-03-15', orderStatus:'Completed', payment:'Paid', total:'$89.99'  }
        ]
    },
    'C006': {
        id:'C006', firstName:'Sara', middleInit:'L', lastName:'Williams',
        email:'sara.williams@email.com', phone:'512-555-0106', phoneType:'Work',
        contactPref:'Email', street:'7801 N Lamar Blvd', city:'Austin', state:'TX', zip:'78752',
        customerType:'Business', taxId:'TX-77412309', taxExempt:false,
        orders: [
            { id:'1013', storeId:'S001', date:'2026-03-20', orderStatus:'Pending',   payment:'Declined', total:'$312.45' },
            { id:'1014', storeId:'S003', date:'2026-03-10', orderStatus:'Completed', payment:'Paid',     total:'$54.99'  }
        ]
    },
    'C007': {
        id:'C007', firstName:'David', middleInit:null, lastName:'Lee',
        email:'david.lee@email.com', phone:'512-555-0107', phoneType:'Mobile',
        contactPref:'Call', street:'2214 Barton Springs Rd', city:'Austin', state:'TX', zip:'78746',
        customerType:'Residential', taxId:null, taxExempt:false,
        orders: [
            { id:'1015', storeId:'S002', date:'2026-03-19', orderStatus:'Canceled',  payment:'Refunded', total:'$178.50' },
            { id:'1016', storeId:'S001', date:'2026-03-12', orderStatus:'Completed', payment:'Paid',     total:'$99.99'  }
        ]
    },
    'C008': {
        id:'C008', firstName:'Priya', middleInit:'S', lastName:'Patel',
        email:'priya.patel@email.com', phone:'512-555-0108', phoneType:'Work',
        contactPref:'Email', street:'500 E Whitestone Blvd', city:'Round Rock', state:'TX', zip:'78664',
        customerType:'Business', taxId:'TX-55018847', taxExempt:true,
        orders: [
            { id:'1017', storeId:'S003', date:'2026-03-20', orderStatus:'Failed',   payment:'Paid',     total:'$421.98' },
            { id:'1018', storeId:'S002', date:'2026-03-18', orderStatus:'Pending',  payment:'Declined', total:'$67.50'  }
        ]
    }
};

// ============================================================
// BADGE HELPERS
// Returns a colored <span> badge for order/payment statuses
// and fulfillment types — used in modals and tables
// ============================================================
function getBadge(status) {
    const map = {
        'Failed':'failed', 'Declined':'declined', 'Canceled':'canceled',
        'Completed':'completed', 'Pending':'pending', 'Paid':'paid', 'Refunded':'refunded'
    };
    return `<span class="badge ${map[status] || ''}">${status}</span>`;
}

function getFulfillmentBadge(type) {
    const map = {
        'Delivery':'delivery', 'Pickup':'pickup',
        'Will Call':'willcall', 'Ship to Store':'shiptostore'
    };
    return `<span class="badge ${map[type] || ''}">${type}</span>`;
}

// ============================================================
// ORDER DETAIL MODAL
// Opens when clicking an Order ID in the main table.
// Displays order info, line items, cost breakdown, and action
// buttons (Reprocess, Escalate, Log Cancellation).
// Always includes Modify Order and Close buttons.
// ============================================================
function openOrderModal(orderId) {
    const o = orders[orderId];
    if (!o) return;

    document.getElementById('orderModalTitle').textContent    = `Order #${o.id}`;
    document.getElementById('orderModalSubtitle').textContent = `Customer: ${o.customer} (${o.customerId})`;

    document.getElementById('orderModalGrid').innerHTML = `
        <div class="info-item"><div class="info-label">Order Status</div><div class="info-value">${getBadge(o.orderStatus)}</div></div>
        <div class="info-item"><div class="info-label">Payment Status</div><div class="info-value">${getBadge(o.paymentStatus)}</div></div>
        <div class="info-item"><div class="info-label">Fulfillment</div><div class="info-value">${getFulfillmentBadge(o.fulfillment)}</div></div>
        <div class="info-item"><div class="info-label">Order Date</div><div class="info-value">${o.date}</div></div>
        <div class="info-item"><div class="info-label">Store</div><div class="info-value">
            <span class="store-id">${o.storeId}</span><span class="store-tag">${stores[o.storeId]}</span>
        </div></div>
    `;

    // Build item rows — show "Removed" badge if qty is 0
    const itemRows = o.items.map(item => {
        const lineTotal  = (item.qty * item.retailPrice).toFixed(2);
        const savings    = ((item.listPrice - item.retailPrice) * item.qty).toFixed(2);
        const qtyDisplay = item.qty === 0 ? `<span class="badge canceled">Removed</span>` : item.qty;
        return `<tr>
            <td><span style="color:#aaa;font-size:12px;">${item.sku}</span><br>${item.name}</td>
            <td>${qtyDisplay}</td>
            <td style="text-decoration:line-through;color:#666;">$${item.listPrice.toFixed(2)}</td>
            <td>$${item.retailPrice.toFixed(2)}</td>
            <td>${savings > 0 ? `<span class="savings">-$${savings}</span>` : '—'}</td>
            <td><strong>${item.qty === 0 ? '—' : '$' + lineTotal}</strong></td>
        </tr>`;
    }).join('');
    document.getElementById('orderItemsBody').innerHTML = itemRows;

    renderCostBreakdown(o);

    // Conditional action buttons based on order/payment status
    let actions = '';
    if (o.orderStatus === 'Failed')     actions += `<button class="btn btn-reprocess">Reprocess Order</button>`;
    if (o.paymentStatus === 'Declined') actions += `<button class="btn btn-escalate">Escalate to Payment Team</button>`;
    if (o.orderStatus === 'Canceled')   actions += `<button class="btn btn-cancel">Log Cancellation</button>`;

    // Always show Modify and Close buttons
    actions += `<button class="btn btn-modify" onclick="openModifyFromOrder('${o.id}')">✏️ Modify Order</button>`;
    actions += `<button class="btn btn-close"  onclick="closeModal('orderModal')">✕ Close</button>`;

    document.getElementById('orderModalActions').innerHTML = actions;
    document.getElementById('orderModal').classList.add('active');
}

// ============================================================
// COST BREAKDOWN RENDERER
// Renders the subtotal / tax / shipping / discount / total
// section inside the Order Detail modal
// ============================================================
function renderCostBreakdown(o) {
    const b = o.breakdown;
    document.getElementById('costBreakdown').innerHTML = `
        <div class="cost-row"><span>Subtotal</span><span>$${b.subtotal.toFixed(2)}</span></div>
        <div class="cost-row"><span>Tax</span><span>$${b.tax.toFixed(2)}</span></div>
        <div class="cost-row"><span>Shipping</span><span>${b.shipping > 0
        ? '$' + b.shipping.toFixed(2)
        : '<span style="color:#00cc66;">FREE</span>'}</span></div>
        ${b.discount > 0
        ? `<div class="cost-row discount"><span>Discount</span><span>-$${b.discount.toFixed(2)}</span></div>`
        : ''}
        <div class="cost-row total"><span>Order Total</span><span>$${b.total.toFixed(2)}</span></div>
    `;
}

// ============================================================
// CUSTOMER DETAIL MODAL
// Displays full customer profile: split name, contact info,
// address, account type, tax ID, tax exempt, contact pref,
// and order history. Includes Edit Profile button.
// ============================================================
function openCustomerModal(customerId) {
    const c = customers[customerId];
    if (!c) return;

    const fullName = c.middleInit
        ? `${c.firstName} ${c.middleInit}. ${c.lastName}`
        : `${c.firstName} ${c.lastName}`;

    const fullAddress = `${c.street}, ${c.city}, ${c.state} ${c.zip}`;

    document.getElementById('customerModalTitle').textContent    = fullName;
    document.getElementById('customerModalSubtitle').textContent = `Customer ID: ${c.id}`;

    const typeBadge = c.customerType === 'Business'
        ? `<span class="badge declined">Business</span>`
        : `<span class="badge completed">Residential</span>`;

    const phoneDisplay = `${c.phone} <span style="color:#aaa;font-size:12px;">(${c.phoneType})</span>`;

    const prefMap   = { Call:'📞 Prefers Call', Text:'💬 Prefers Text', Email:'✉️ Prefers Email' };
    const prefColor = { Call:'#60a5fa', Text:'#a78bfa', Email:'#34d399' };
    const prefDisplay = `<span style="color:${prefColor[c.contactPref] || '#ccc'};">${prefMap[c.contactPref] || c.contactPref}</span>`;

    // Show tax exempt badge only for business accounts
    const taxExemptDisplay = c.customerType === 'Business'
        ? (c.taxExempt
            ? `<span class="badge completed">✔ Tax Exempt</span>`
            : `<span class="badge canceled">Not Exempt</span>`)
        : '<span style="color:#555;">N/A</span>';

    document.getElementById('customerModalGrid').innerHTML = `
        <div class="info-item"><div class="info-label">Email</div><div class="info-value">${c.email}</div></div>
        <div class="info-item"><div class="info-label">Phone</div><div class="info-value">${phoneDisplay}</div></div>
        <div class="info-item"><div class="info-label">Contact Preference</div><div class="info-value">${prefDisplay}</div></div>
        <div class="info-item"><div class="info-label">Address</div><div class="info-value">${fullAddress}</div></div>
        <div class="info-item"><div class="info-label">Account Type</div><div class="info-value">${typeBadge}</div></div>
        <div class="info-item"><div class="info-label">Tax ID</div><div class="info-value">${c.taxId || '<span style="color:#555;">N/A</span>'}</div></div>
        <div class="info-item"><div class="info-label">Tax Exempt</div><div class="info-value">${taxExemptDisplay}</div></div>
        <div class="info-item"><div class="info-label">Total Orders</div><div class="info-value">${c.orders.length}</div></div>
    `;

    // Order history rows
    const rows = c.orders.map(o => `
        <tr>
            <td>${o.id}</td>
            <td><span class="store-id">${o.storeId}</span><span class="store-tag">${stores[o.storeId]}</span></td>
            <td>${o.date}</td>
            <td>${getBadge(o.orderStatus)}</td>
            <td>${getBadge(o.payment)}</td>
            <td>${o.total}</td>
            <td style="display:flex; gap:8px;">
                <button class="resolve-btn" onclick="viewOrderFromCustomer('${o.id}')">📋 View Order</button>
                <button class="resolve-btn" style="background-color:#3a5c4a;" onclick="openModifyModal('${o.id}')">✏️ Modify</button>
            </td>
        </tr>
    `).join('');
    document.getElementById('customerOrderHistoryBody').innerHTML = rows;

    document.getElementById('customerModalActions').innerHTML = `
        <button class="btn btn-modify" onclick="openModifyCustomerModal('${c.id}')">✏️ Edit Profile</button>
        <button class="btn btn-close"  onclick="closeModal('customerModal')">✕ Close</button>
    `;

    document.getElementById('customerModal').classList.add('active');
}

// ============================================================
// VIEW ORDER FROM CUSTOMER MODAL
// Closes the customer modal then opens the order detail modal
// for the selected order (200ms delay for smooth transition)
// ============================================================
function viewOrderFromCustomer(orderId) {
    closeModal('customerModal');
    setTimeout(() => openOrderModal(orderId), 200);
}

// ============================================================
// OPEN MODIFY FROM ORDER MODAL
// Closes the order detail modal then opens the modify modal
// for the same order (200ms delay for smooth transition)
// ============================================================
function openModifyFromOrder(orderId) {
    closeModal('orderModal');
    setTimeout(() => openModifyModal(orderId), 200);
}

// ============================================================
// OPEN MODIFY CUSTOMER MODAL
// Fixes "undefined" title by using firstName/lastName.
// Required fields: firstName, lastName, email, phone,
// street, city, state, zip.
// MI is optional. Tax ID is locked if it already has a value.
// Tax Exempt checkbox is locked if Tax ID has a value.
// Tax ID and Tax Exempt only show for Business account type.
// ============================================================
function openModifyCustomerModal(customerId) {
    const c = customers[customerId];
    if (!c) return;

    const fullName = [c.firstName, c.middleInit ? c.middleInit + '.' : null, c.lastName]
        .filter(Boolean).join(' ') || 'Customer';

    document.getElementById('modifyCustomerTitle').textContent = `Edit Profile — ${fullName}`;
    document.getElementById('modifyCustomerId').value          = customerId;

    // Pre-fill name
    document.getElementById('modifyCustFirstName').value  = c.firstName  || '';
    document.getElementById('modifyCustMiddleInit').value = c.middleInit || '';
    document.getElementById('modifyCustLastName').value   = c.lastName   || '';

    // Pre-fill contact
    document.getElementById('modifyCustEmail').value     = c.email     || '';
    document.getElementById('modifyCustPhone').value     = c.phone     || '';
    document.getElementById('modifyCustPhoneType').value = c.phoneType || 'Mobile';

    // Pre-fill address
    document.getElementById('modifyCustStreet').value = c.street || '';
    document.getElementById('modifyCustCity').value   = c.city   || '';
    document.getElementById('modifyCustState').value  = c.state  || '';
    document.getElementById('modifyCustZip').value    = c.zip    || '';

    // Tax ID — lock if already has a value
    const taxIdInput        = document.getElementById('modifyCustTaxId');
    taxIdInput.value        = c.taxId || '';
    taxIdInput.disabled     = !!c.taxId;
    taxIdInput.style.opacity = c.taxId ? '0.45' : '1';
    taxIdInput.style.cursor  = c.taxId ? 'not-allowed' : 'text';

    // Tax Exempt — lock if Tax ID is already set
    const taxExemptCheck        = document.getElementById('modifyCustTaxExempt');
    taxExemptCheck.checked      = !!c.taxExempt;
    taxExemptCheck.disabled     = !!c.taxId;
    taxExemptCheck.style.opacity = c.taxId ? '0.45' : '1';
    taxExemptCheck.style.cursor  = c.taxId ? 'not-allowed' : 'pointer';

    // Set radios
    document.querySelector(`input[name="modifyCustType"][value="${c.customerType || 'Residential'}"]`).checked = true;
    document.querySelector(`input[name="modifyCustPref"][value="${c.contactPref  || 'Call'}"]`).checked        = true;

    // Clear any previous validation errors
    document.querySelectorAll('.field-error').forEach(el => el.textContent = '');
    document.querySelectorAll('.form-control.invalid').forEach(el => el.classList.remove('invalid'));

    toggleBusinessFields();

    closeModal('customerModal');
    setTimeout(() => document.getElementById('modifyCustomerModal').classList.add('active'), 200);
}

// ============================================================
// TOGGLE BUSINESS FIELDS
// Shows Tax ID and Tax Exempt section only for Business type.
// Called on account type radio change and on modal open.
// ============================================================
function toggleBusinessFields() {
    const isBusiness = document.querySelector('input[name="modifyCustType"]:checked')?.value === 'Business';
    document.getElementById('businessFieldsRow').style.display = isBusiness ? 'flex' : 'none';
}

// ============================================================
// SAVE MODIFY CUSTOMER
// Validates all required fields before saving.
// Skips locked Tax ID — never overwrites an existing tax ID.
// Writes all other fields back into the customers object.
// ============================================================
function saveModifyCustomer() {
    const customerId = document.getElementById('modifyCustomerId').value;
    const c          = customers[customerId];
    if (!c) return;

    // Required field validation
    const required = [
        { id:'modifyCustFirstName', label:'First Name' },
        { id:'modifyCustLastName',  label:'Last Name'  },
        { id:'modifyCustEmail',     label:'Email'      },
        { id:'modifyCustPhone',     label:'Phone'      },
        { id:'modifyCustStreet',    label:'Street'     },
        { id:'modifyCustCity',      label:'City'       },
        { id:'modifyCustState',     label:'State'      },
        { id:'modifyCustZip',       label:'Zip'        }
    ];

    let hasError = false;
    required.forEach(field => {
        const input   = document.getElementById(field.id);
        const errorEl = document.getElementById(field.id + 'Error');
        if (!input.value.trim()) {
            input.classList.add('invalid');
            if (errorEl) errorEl.textContent = `${field.label} is required.`;
            hasError = true;
        } else {
            input.classList.remove('invalid');
            if (errorEl) errorEl.textContent = '';
        }
    });

    if (hasError) return;

    // Write fields — never overwrite a locked Tax ID
    c.firstName    = document.getElementById('modifyCustFirstName').value.trim();
    c.middleInit   = document.getElementById('modifyCustMiddleInit').value.trim() || null;
    c.lastName     = document.getElementById('modifyCustLastName').value.trim();
    c.email        = document.getElementById('modifyCustEmail').value.trim();
    c.phone        = document.getElementById('modifyCustPhone').value.trim();
    c.phoneType    = document.getElementById('modifyCustPhoneType').value;
    c.street       = document.getElementById('modifyCustStreet').value.trim();
    c.city         = document.getElementById('modifyCustCity').value.trim();
    c.state        = document.getElementById('modifyCustState').value.trim().toUpperCase();
    c.zip          = document.getElementById('modifyCustZip').value.trim();
    c.customerType = document.querySelector('input[name="modifyCustType"]:checked').value;
    c.contactPref  = document.querySelector('input[name="modifyCustPref"]:checked').value;

    if (!c.taxId) {
        c.taxId = document.getElementById('modifyCustTaxId').value.trim() || null;
    }
    if (!document.getElementById('modifyCustTaxExempt').disabled) {
        c.taxExempt = document.getElementById('modifyCustTaxExempt').checked;
    }

    const fullName = c.middleInit
        ? `${c.firstName} ${c.middleInit}. ${c.lastName}`
        : `${c.firstName} ${c.lastName}`;

    closeModal('modifyCustomerModal');
    alert(`✅ Profile updated for ${fullName}!`);
}

// ============================================================
// MODIFY ORDER MODAL
// Opens the modify modal for a given order.
// Pre-populates status, fulfillment, and item quantities.
// Recalculates totals live as quantities are changed.
// Called from both the Order Detail modal and Customer modal.
// ============================================================
function openModifyModal(orderId) {
    const o = orders[orderId];
    if (!o) return;

    document.getElementById('modifyModalTitle').textContent = `Modify Order #${orderId}`;
    document.getElementById('modifyOrderStatus').value      = o.orderStatus;
    document.getElementById('modifyFulfillment').value      = o.fulfillment;
    document.getElementById('modifyNote').value             = '';
    document.getElementById('modifyOrderId').value          = orderId;

    // Build editable item rows with qty inputs
    const itemRows = o.items.map((item, index) => {
        const isRemoved = item.qty === 0;
        return `
        <tr id="modify-item-row-${index}">
            <td>
                <span style="color:#aaa;font-size:11px;">${item.sku}</span><br>${item.name}
                ${isRemoved ? '<span class="badge canceled" style="margin-left:8px;">Removed</span>' : ''}
            </td>
            <td>$${item.retailPrice.toFixed(2)}</td>
            <td>
                <input type="number" min="0" value="${item.qty}"
                    style="width:60px;padding:4px 8px;border-radius:4px;border:1px solid #3a3a5c;
                           background:#1e1e2e;color:#fff;font-size:13px;text-align:center;"
                    onchange="recalculateModifyTotal('${orderId}')"
                    id="modify-qty-${index}">
            </td>
            <td id="modify-line-${index}"><strong>$${(item.qty * item.retailPrice).toFixed(2)}</strong></td>
        </tr>`;
    }).join('');

    document.getElementById('modifyItemsBody').innerHTML = itemRows;
    recalculateModifyTotal(orderId);

    closeModal('customerModal');
    setTimeout(() => document.getElementById('modifyModal').classList.add('active'), 200);
}

// ============================================================
// RECALCULATE MODIFY TOTAL
// Fires whenever a qty input changes in the modify modal.
// Re-calculates subtotal, tax (proportional), and new total.
// Updates all line total cells and the summary breakdown live.
// ============================================================
function recalculateModifyTotal(orderId) {
    const o = orders[orderId];
    if (!o) return;

    let newSubtotal = 0;
    o.items.forEach((item, index) => {
        const input     = document.getElementById(`modify-qty-${index}`);
        const qty       = input ? Math.max(0, parseInt(input.value) || 0) : item.qty;
        const lineTotal = qty * item.retailPrice;
        newSubtotal    += lineTotal;

        const lineEl = document.getElementById(`modify-line-${index}`);
        if (lineEl) lineEl.innerHTML = qty === 0
            ? '<span style="color:#666;">—</span>'
            : `<strong>$${lineTotal.toFixed(2)}</strong>`;
    });

    const taxRate  = o.breakdown.subtotal > 0 ? o.breakdown.tax / o.breakdown.subtotal : 0;
    const newTax   = newSubtotal * taxRate;
    const newTotal = newSubtotal + newTax + o.breakdown.shipping - o.breakdown.discount;

    document.getElementById('modifySubtotal').textContent = `$${newSubtotal.toFixed(2)}`;
    document.getElementById('modifyTax').textContent      = `$${newTax.toFixed(2)}`;
    document.getElementById('modifyTotal').textContent    = `$${newTotal.toFixed(2)}`;
}

// ============================================================
// SAVE MODIFY ORDER
// Commits changes from the modify modal back into the orders
// object in memory. Updates: item qtys, status, fulfillment,
// and recalculates the stored breakdown totals.
// Shows a confirmation alert with a summary of changes made.
// ============================================================
function saveModifyOrder() {
    const orderId        = document.getElementById('modifyOrderId').value;
    const newStatus      = document.getElementById('modifyOrderStatus').value;
    const newFulfillment = document.getElementById('modifyFulfillment').value;
    const note           = document.getElementById('modifyNote').value;
    const o              = orders[orderId];
    if (!o) return;

    o.items.forEach((item, index) => {
        const input = document.getElementById(`modify-qty-${index}`);
        if (input) item.qty = Math.max(0, parseInt(input.value) || 0);
    });

    let newSubtotal      = o.items.reduce((sum, item) => sum + item.qty * item.retailPrice, 0);
    const taxRate        = o.breakdown.subtotal > 0 ? o.breakdown.tax / o.breakdown.subtotal : 0;
    const newTax         = newSubtotal * taxRate;
    const newTotal       = newSubtotal + newTax + o.breakdown.shipping - o.breakdown.discount;
    o.breakdown.subtotal = newSubtotal;
    o.breakdown.tax      = newTax;
    o.breakdown.total    = newTotal;
    o.orderStatus        = newStatus;
    o.fulfillment        = newFulfillment;

    closeModal('modifyModal');
    alert(`✅ Order #${orderId} updated!\nStatus: ${newStatus}\nFulfillment: ${newFulfillment}\nNew Total: $${newTotal.toFixed(2)}${note ? '\nNote: ' + note : ''}`);
}

// ============================================================
// CLOSE MODAL
// Generic modal close — removes the 'active' class from any
// modal overlay by its element ID
// ============================================================
function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}

// ============================================================
// FILTER / SEARCH
// Runs on every keystroke in the search box or store dropdown.
// Hides table rows that don't match both filters simultaneously.
// ============================================================
function applyFilters() {
    const search = document.getElementById("searchInput").value.toLowerCase();
    const store  = document.getElementById("storeFilter").value;
    document.querySelectorAll("#ordersTable tbody tr").forEach(row => {
        const matchSearch = row.innerText.toLowerCase().includes(search);
        const matchStore  = store === "" || row.dataset.store === store;
        row.style.display = matchSearch && matchStore ? "" : "none";
    });
}

// ============================================================
// RESOLVE ORDER (TABLE ROW)
// Called by the Resolve button in the main orders table.
// Fades the row and disables the button to mark it resolved.
// ============================================================
function resolveOrder(btn) {
    btn.closest("tr").style.opacity = "0.4";
    btn.textContent = "Resolved";
    btn.disabled    = true;
}

// ============================================================
// MODAL OVERLAY CLICK-TO-CLOSE
// Clicking outside the modal box (on the dark overlay)
// will close that modal automatically
// ============================================================
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', function(e) {
        if (e.target === this) this.classList.remove('active');
    });
});
