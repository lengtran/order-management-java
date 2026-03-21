const stores = {
    'S001': 'North Austin',
    'S002': 'South Austin',
    'S003': 'Round Rock'
};

const orders = {
    '1001': {
        id:'1001', customer:'John Smith', customerId:'C001', storeId:'S001',
        orderStatus:'Failed', paymentStatus:'Paid', date:'2026-03-20', total:'$149.99',
        fulfillment:'Delivery',
        items: [
            { name:'DEWALT 20V MAX Cordless Drill', qty:1, listPrice:159.00, retailPrice:129.99 },
            { name:'Drill Bit Set 21-Piece',        qty:1, listPrice: 24.99, retailPrice: 14.99 },
            { name:'Safety Glasses',                qty:2, listPrice:  9.99, retailPrice:  7.99 }
        ],
        breakdown: { subtotal:129.99, tax:12.99, shipping:7.99, discount:0.00, total:149.99 }
    },
    '1002': {
        id:'1002', customer:'Jane Doe', customerId:'C002', storeId:'S002',
        orderStatus:'Pending', paymentStatus:'Declined', date:'2026-03-20', total:'$89.99',
        fulfillment:'Pickup',
        items: [
            { name:'Husky 26 in. Tool Chest',  qty:1, listPrice:199.00, retailPrice:79.99 },
            { name:'Combination Lock 4-Pack',  qty:1, listPrice: 19.99, retailPrice:12.99 }
        ],
        breakdown: { subtotal:79.99, tax:8.00, shipping:0.00, discount:0.00, total:89.99 }
    },
    '1003': {
        id:'1003', customer:'Bob Johnson', customerId:'C003', storeId:'S003',
        orderStatus:'Canceled', paymentStatus:'Refunded', date:'2026-03-19', total:'$59.99',
        fulfillment:'Will Call',
        items: [
            { name:'Paint 5-Gallon Bucket Interior', qty:1, listPrice:89.00, retailPrice:49.99 },
            { name:'Paint Roller Kit',               qty:2, listPrice:14.99, retailPrice: 9.99 }
        ],
        breakdown: { subtotal:49.99, tax:6.00, shipping:0.00, discount:4.00, total:59.99 }
    },
    '1004': {
        id:'1004', customer:'Alice Brown', customerId:'C004', storeId:'S003',
        orderStatus:'Completed', paymentStatus:'Paid', date:'2026-03-18', total:'$199.99',
        fulfillment:'Ship to Store',
        items: [
            { name:'Milwaukee M18 Circular Saw',    qty:1, listPrice:229.00, retailPrice:169.99 },
            { name:'Saw Blade 7-1/4 in. 24-Tooth', qty:2, listPrice: 29.99, retailPrice: 18.99 },
            { name:'Blade Wrench',                  qty:1, listPrice: 12.99, retailPrice:  8.99 }
        ],
        breakdown: { subtotal:169.99, tax:17.00, shipping:13.00, discount:0.00, total:199.99 }
    }
};

const customers = {
    'C001': { id:'C001', name:'John Smith',  email:'john.smith@email.com',  phone:'512-555-0101',
        orders: [
            { id:'1001', storeId:'S001', date:'2026-03-20', orderStatus:'Failed',    payment:'Paid',     total:'$149.99' },
            { id:'1005', storeId:'S001', date:'2026-02-14', orderStatus:'Completed', payment:'Paid',     total:'$39.99'  },
            { id:'1006', storeId:'S002', date:'2026-01-05', orderStatus:'Completed', payment:'Paid',     total:'$79.99'  }
        ]
    },
    'C002': { id:'C002', name:'Jane Doe',    email:'jane.doe@email.com',    phone:'512-555-0102',
        orders: [
            { id:'1002', storeId:'S002', date:'2026-03-20', orderStatus:'Pending',   payment:'Declined', total:'$89.99'  },
            { id:'1007', storeId:'S003', date:'2026-02-28', orderStatus:'Completed', payment:'Paid',     total:'$119.99' }
        ]
    },
    'C003': { id:'C003', name:'Bob Johnson', email:'bob.johnson@email.com', phone:'512-555-0103',
        orders: [
            { id:'1003', storeId:'S003', date:'2026-03-19', orderStatus:'Canceled',  payment:'Refunded', total:'$59.99'  },
            { id:'1008', storeId:'S003', date:'2026-01-22', orderStatus:'Completed', payment:'Paid',     total:'$29.99'  }
        ]
    },
    'C004': { id:'C004', name:'Alice Brown', email:'alice.brown@email.com', phone:'512-555-0104',
        orders: [
            { id:'1004', storeId:'S003', date:'2026-03-18', orderStatus:'Completed', payment:'Paid',     total:'$199.99' },
            { id:'1009', storeId:'S001', date:'2026-03-10', orderStatus:'Failed',    payment:'Paid',     total:'$99.99'  },
            { id:'1010', storeId:'S002', date:'2026-02-01', orderStatus:'Completed', payment:'Paid',     total:'$49.99'  }
        ]
    }
};

function getBadge(status) {
    const map = {
        'Failed':'failed','Declined':'declined','Canceled':'canceled',
        'Completed':'completed','Pending':'pending','Paid':'paid','Refunded':'refunded'
    };
    return `<span class="badge ${map[status] || ''}">${status}</span>`;
}

function getFulfillmentBadge(type) {
    const map = { 'Delivery':'delivery','Pickup':'pickup','Will Call':'willcall','Ship to Store':'shiptostore' };
    return `<span class="badge ${map[type] || ''}">${type}</span>`;
}

function openOrderModal(orderId) {
    const o = orders[orderId];
    if (!o) return;
    document.getElementById('orderModalTitle').textContent = `Order #${o.id}`;
    document.getElementById('orderModalSubtitle').textContent = `Customer: ${o.customer} (${o.customerId})`;
    document.getElementById('orderModalGrid').innerHTML = `
        <div class="info-item"><div class="info-label">Order Status</div><div class="info-value">${getBadge(o.orderStatus)}</div></div>
        <div class="info-item"><div class="info-label">Payment Status</div><div class="info-value">${getBadge(o.paymentStatus)}</div></div>
        <div class="info-item"><div class="info-label">Fulfillment</div><div class="info-value">${getFulfillmentBadge(o.fulfillment)}</div></div>
        <div class="info-item"><div class="info-label">Order Date</div><div class="info-value">${o.date}</div></div>
        <div class="info-item"><div class="info-label">Store</div><div class="info-value"><span class="store-id">${o.storeId}</span><span class="store-tag">${stores[o.storeId]}</span></div></div>
    `;

    const itemRows = o.items.map(item => {
        const lineTotal = (item.qty * item.retailPrice).toFixed(2);
        const savings   = ((item.listPrice - item.retailPrice) * item.qty).toFixed(2);
        return `<tr>
            <td>${item.name}</td>
            <td>${item.qty}</td>
            <td style="text-decoration:line-through;color:#666;">$${item.listPrice.toFixed(2)}</td>
            <td>$${item.retailPrice.toFixed(2)}</td>
            <td>${savings > 0 ? `<span class="savings">-$${savings}</span>` : '—'}</td>
            <td><strong>$${lineTotal}</strong></td>
        </tr>`;
    }).join('');
    document.getElementById('orderItemsBody').innerHTML = itemRows;

    const b = o.breakdown;
    document.getElementById('costBreakdown').innerHTML = `
        <div class="cost-row"><span>Subtotal</span><span>$${b.subtotal.toFixed(2)}</span></div>
        <div class="cost-row"><span>Tax</span><span>$${b.tax.toFixed(2)}</span></div>
        <div class="cost-row"><span>Shipping</span><span>${b.shipping > 0 ? '$' + b.shipping.toFixed(2) : '<span style="color:#00cc66;">FREE</span>'}</span></div>
        ${b.discount > 0 ? `<div class="cost-row discount"><span>Discount</span><span>-$${b.discount.toFixed(2)}</span></div>` : ''}
        <div class="cost-row total"><span>Order Total</span><span>$${b.total.toFixed(2)}</span></div>
    `;

    let actions = '';
    if (o.orderStatus === 'Failed')     actions += `<button class="btn btn-reprocess">Reprocess Order</button>`;
    if (o.paymentStatus === 'Declined') actions += `<button class="btn btn-escalate">Escalate to Payment Team</button>`;
    if (o.orderStatus === 'Canceled')   actions += `<button class="btn btn-cancel">Log Cancellation</button>`;
    document.getElementById('orderModalActions').innerHTML = actions;
    document.getElementById('orderModal').classList.add('active');
}

function openCustomerModal(customerId) {
    const c = customers[customerId];
    if (!c) return;
    document.getElementById('customerModalTitle').textContent = c.name;
    document.getElementById('customerModalSubtitle').textContent = `Customer ID: ${c.id}`;
    document.getElementById('customerModalGrid').innerHTML = `
        <div class="info-item"><div class="info-label">Email</div><div class="info-value">${c.email}</div></div>
        <div class="info-item"><div class="info-label">Phone</div><div class="info-value">${c.phone}</div></div>
        <div class="info-item"><div class="info-label">Total Orders</div><div class="info-value">${c.orders.length}</div></div>
    `;
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
    document.getElementById('customerModal').classList.add('active');
}

function viewOrderFromCustomer(orderId) {
    closeModal('customerModal');
    setTimeout(() => openOrderModal(orderId), 200);
}

function openModifyModal(orderId) {
    const o = orders[orderId];
    if (!o) return;
    document.getElementById('modifyModalTitle').textContent = `Modify Order #${orderId}`;
    document.getElementById('modifyOrderStatus').value = o.orderStatus;
    document.getElementById('modifyFulfillment').value = o.fulfillment;
    document.getElementById('modifyNote').value = '';
    document.getElementById('modifyOrderId').value = orderId;
    closeModal('customerModal');
    setTimeout(() => document.getElementById('modifyModal').classList.add('active'), 200);
}

function saveModifyOrder() {
    const orderId        = document.getElementById('modifyOrderId').value;
    const newStatus      = document.getElementById('modifyOrderStatus').value;
    const newFulfillment = document.getElementById('modifyFulfillment').value;
    const note           = document.getElementById('modifyNote').value;
    if (orders[orderId]) {
        orders[orderId].orderStatus = newStatus;
        orders[orderId].fulfillment = newFulfillment;
    }
    closeModal('modifyModal');
    alert(`✅ Order #${orderId} updated!\nStatus: ${newStatus}\nFulfillment: ${newFulfillment}${note ? '\nNote: ' + note : ''}`);
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}

function applyFilters() {
    const search = document.getElementById("searchInput").value.toLowerCase();
    const store  = document.getElementById("storeFilter").value;
    document.querySelectorAll("#ordersTable tbody tr").forEach(row => {
        const matchSearch = row.innerText.toLowerCase().includes(search);
        const matchStore  = store === "" || row.dataset.store === store;
        row.style.display = matchSearch && matchStore ? "" : "none";
    });
}

function resolveOrder(btn) {
    btn.closest("tr").style.opacity = "0.4";
    btn.textContent = "Resolved";
    btn.disabled = true;
}

document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', function(e) {
        if (e.target === this) this.classList.remove('active');
    });
});
