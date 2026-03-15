class MedicineFinderView {
    constructor() {
        this.element = document.createElement('div');
        this.element.className = 'view-section medicine-finder-view';
    }

    render() {
        this.element.innerHTML = `
            <div class="mb-8" style="margin-bottom: 32px;">
                <h2 style="font-size: 28px; margin-bottom: 8px;">Find Your Medicine</h2>
                <p style="color: var(--text-muted);">Don't waste your time searching in different sites, we got it covered. Search for a product to find the best delivery options and prices all in one place.</p>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px;">
                <!-- Left Column: Search & Upload -->
                <div class="glass-card">
                    <div style="margin-bottom: 24px;">
                        <label style="display: block; margin-bottom: 8px; font-weight: 500; font-size: 14px;">Product Name</label>
                        <div class="search-bar" style="width: 100%;">
                            <i class="ri-medicine-bottle-line"></i>
                            <input type="text" id="productInput" placeholder="e.g., Dolo 650, Aspirin...">
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 24px;">
                        <label style="display: block; margin-bottom: 8px; font-weight: 500; font-size: 14px;">Estimated Price (₹) - For testing</label>
                        <div class="search-bar" style="width: 100%;">
                            <i class="ri-money-rupee-circle-line"></i>
                            <input type="number" id="priceInput" placeholder="e.g., 60">
                        </div>
                    </div>

                    <div style="margin-bottom: 24px;">
                        <label style="display: block; margin-bottom: 8px; font-weight: 500; font-size: 14px;">Your Location</label>
                        <div class="search-bar" style="width: 100%;">
                            <i class="ri-map-pin-line"></i>
                            <input type="text" id="locationInput" placeholder="Enter your area or pincode...">
                        </div>
                    </div>

                    <div style="margin-bottom: 24px;">
                        <label style="display: block; margin-bottom: 8px; font-weight: 500; font-size: 14px;">Or Upload Prescription</label>
                        <div id="uploadZone" style="border: 2px dashed rgba(99, 102, 241, 0.5); border-radius: var(--radius-md); padding: 20px; text-align: center; cursor: pointer; transition: var(--transition-fast); background: rgba(99, 102, 241, 0.05);">
                            <div style="width: 48px; height: 48px; border-radius: 50%; background: var(--bg-surface); color: var(--primary); display: flex; align-items: center; justify-content: center; font-size: 24px; margin: 0 auto 12px;">
                                <i class="ri-upload-cloud-2-line"></i>
                            </div>
                            <h4 style="margin-bottom: 4px; font-size: 14px;">Click or drag file</h4>
                        </div>
                        <input type="file" id="prescriptionFile" style="display: none;" accept="image/*,.pdf">
                    </div>

                    <button id="findBtn" class="btn-primary" style="width: 100%; justify-content: center;">
                        <i class="ri-search-eye-line"></i> Search Across Stores
                    </button>
                    
                    <div id="loadingState" style="display: none; text-align: center; padding: 20px; margin-top: 20px;">
                        <i class="ri-loader-4-line" style="font-size: 32px; color: var(--primary); animation: spin 1s linear infinite; display: inline-block;"></i>
                        <p style="margin-top: 12px; color: var(--text-muted);">Scanning Apollo, Pharmeasy, Netmeds...</p>
                    </div>
                </div>

                <!-- Right Column: Results -->
                <div class="glass-card" style="display: flex; flex-direction: column; position: relative;" id="resultsContainer">
                    <h3 style="margin-bottom: 16px;">Delivery Options</h3>
                    
                    <div id="emptyResults" style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; opacity: 0.5;">
                        <i class="ri-store-2-line" style="font-size: 64px; margin-bottom: 16px;"></i>
                        <p>Search a product to see results.</p>
                    </div>

                    <div id="resultsList" style="display: none; flex-direction: column; gap: 16px; flex: 1; overflow-y: auto;">
                        <!-- Results injected via JS -->
                    </div>
                    
                    <!-- Order Edit Modal (Inline) -->
                    <div id="orderModal" style="display: none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: var(--bg-glass); backdrop-filter: blur(8px); border-radius: var(--radius-lg); z-index: 10; padding: 24px; flex-direction: column;">
                        <h3 style="margin-bottom: 20px; font-size: 20px;">Review & Edit Order</h3>
                        <div style="margin-bottom: 16px;">
                            <label style="display: block; margin-bottom: 8px; font-size: 13px; color: var(--text-muted);">Product Name</label>
                            <input type="text" id="editProductName" style="width: 100%; background: var(--bg-surface); border: 1px solid rgba(255,255,255,0.1); padding: 10px; border-radius: var(--radius-sm); color: white;" value="">
                        </div>
                        <div style="margin-bottom: 16px;">
                            <label style="display: block; margin-bottom: 8px; font-size: 13px; color: var(--text-muted);">Store</label>
                            <input type="text" id="editStoreName" readonly style="width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 10px; border-radius: var(--radius-sm); color: var(--text-muted);" value="">
                        </div>
                        <div style="margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-weight: 500;">Final Price</span>
                            <span id="editPrice" style="color: var(--primary); font-size: 20px; font-weight: 700;"></span>
                        </div>
                        <div style="display: flex; gap: 12px; margin-top: auto;">
                            <button id="cancelOrderBtn" class="btn-outline" style="flex: 1;">Cancel</button>
                            <button id="confirmOrderBtn" class="btn-primary" style="flex: 1; justify-content: center;">Confirm Booking</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.attachEvents();
        return this.element;
    }

    attachEvents() {
        const uploadZone = this.element.querySelector('#uploadZone');
        const fileInput = this.element.querySelector('#prescriptionFile');
        const findBtn = this.element.querySelector('#findBtn');
        const loadingState = this.element.querySelector('#loadingState');
        const emptyResults = this.element.querySelector('#emptyResults');
        const resultsList = this.element.querySelector('#resultsList');
        
        const orderModal = this.element.querySelector('#orderModal');
        const cancelOrderBtn = this.element.querySelector('#cancelOrderBtn');
        const confirmOrderBtn = this.element.querySelector('#confirmOrderBtn');

        uploadZone.addEventListener('click', () => fileInput.click());
        
        uploadZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadZone.style.borderColor = 'var(--primary)';
        });

        uploadZone.addEventListener('dragleave', () => {
            uploadZone.style.borderColor = 'rgba(99, 102, 241, 0.5)';
        });

        fileInput.addEventListener('change', (e) => {
            if(e.target.files[0]) {
                const name = e.target.files[0].name;
                uploadZone.innerHTML = `
                    <div style="color: var(--accent); font-size: 24px; margin-bottom: 8px;"><i class="ri-check-line"></i></div>
                    <div style="font-size: 12px; overflow: hidden; text-overflow: ellipsis;">${name}</div>
                `;
            }
        });

        findBtn.addEventListener('click', () => {
            const loc = this.element.querySelector('#locationInput').value;
            const product = this.element.querySelector('#productInput').value.trim() || 'Prescription Items';
            
            // Getting base price (default to 60 if not provided for realism based on user request)
            let rawPrice = this.element.querySelector('#priceInput').value;
            const basePrice = rawPrice ? parseInt(rawPrice) : 60; 

            if(!loc) {
                alert("Please enter a location for accurate quick commerce results.");
                return;
            }

            findBtn.style.display = 'none';
            loadingState.style.display = 'block';
            emptyResults.style.display = 'none';
            resultsList.style.display = 'none';
            orderModal.style.display = 'none';

            // Simulate API Call
            setTimeout(() => {
                loadingState.style.display = 'none';
                findBtn.style.display = 'flex';
                resultsList.style.display = 'flex';
                
                this.renderMockResults(basePrice, product);
            }, 2000);
        });

        // Close modal
        cancelOrderBtn.addEventListener('click', () => {
            orderModal.style.display = 'none';
        });

        // Confirm
        confirmOrderBtn.addEventListener('click', () => {
            const name = this.element.querySelector('#editProductName').value;
            if(window.showToast) {
                window.showToast(`Order confirmed for ${name}!`);
            } else {
                alert(`Order confirmed for ${name}!`);
            }
            orderModal.style.display = 'none';
        });
    }

    renderMockResults(basePrice, productName) {
        const resultsList = this.element.querySelector('#resultsList');
        
        // Generate mock rating
        const mockRating = (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1);
        const mockReviews = (Math.floor(Math.random() * 50) + 10) * 100 + Math.floor(Math.random() * 100);
        
        const ratingHtml = `
            <div class="glass-card" style="margin-bottom: 8px; padding: 16px; border: 1px solid var(--primary-glow); background: rgba(99, 102, 241, 0.05);">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <h4 style="font-size: 18px; margin-bottom: 4px; text-transform: capitalize;">${productName}</h4>
                        <p style="color: var(--text-muted); font-size: 13px;">Overall Product Rating</p>
                    </div>
                    <div style="text-align: right;">
                        <div style="display: flex; color: var(--warning); font-size: 18px; justify-content: flex-end;">
                            <i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="${parseFloat(mockRating) >= 4.5 ? 'ri-star-half-fill' : 'ri-star-line'}"></i>
                        </div>
                        <div style="font-size: 14px; font-weight: 700;">${mockRating} / 5.0 <span style="font-weight: 400; font-size: 12px; color: var(--text-muted);">(${mockReviews} reviews)</span></div>
                    </div>
                </div>
            </div>
            <h4 style="margin: 8px 0 16px; font-size: 16px; color: var(--text-muted);">Compare Stores</h4>
        `;

        // Generate prices based on the base price provided
        // Instamart/Blinkit have slight delivery markup, Pharmeasy has discount, etc.
        const platforms = [
            { id: 1, name: 'Blinkit', time: '12 mins', price: basePrice + 15, tag: 'Fastest', color: '#facc15', icon: 'ri-flashlight-fill' },
            { id: 2, name: 'Instamart', time: '15 mins', price: basePrice + 12, tag: 'Quick', color: '#f97316', icon: 'ri-shopping-bag-3-fill' },
            { id: 3, name: 'Apollo 24/7', time: '2 hours', price: basePrice + 5, tag: 'Reliable', color: '#0ea5e9', icon: 'ri-capsule-fill' },
            { id: 4, name: 'Pharmeasy', time: 'Same Day', price: Math.max(10, basePrice - 8), tag: 'Best Price', color: '#10b981', icon: 'ri-medicine-bottle-fill' }
        ];

        const platformsHtml = platforms.map(p => `
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px; background: rgba(255,255,255,0.03); border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); transition: var(--transition-fast);" onmouseover="this.style.background='rgba(255,255,255,0.08)'" onmouseout="this.style.background='rgba(255,255,255,0.03)'">
                <div style="display: flex; align-items: center; gap: 16px;">
                    <div style="width: 48px; height: 48px; border-radius: 12px; background: ${p.color}22; color: ${p.color}; display: flex; align-items: center; justify-content: center; font-size: 24px;">
                        <i class="${p.icon}"></i>
                    </div>
                    <div>
                        <h4 style="font-size: 16px; margin-bottom: 4px;">${p.name}</h4>
                        <div style="display: flex; gap: 8px; align-items: center;">
                            <span style="font-size: 12px; color: var(--text-muted);"><i class="ri-time-line"></i> ${p.time}</span>
                            <span style="font-size: 10px; padding: 2px 6px; border-radius: 4px; background: ${p.color}33; color: ${p.color};">${p.tag}</span>
                        </div>
                    </div>
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 18px; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">₹${p.price}</div>
                    <button class="btn-primary" onclick="window.openOrderModal('${p.name}', ${p.price}, '${productName.replace(/'/g, "\\'")}')" style="padding: 6px 12px; font-size: 12px;">Order</button>
                </div>
            </div>
        `).join('');
        
        resultsList.innerHTML = ratingHtml + platformsHtml;
        
        // Attach global function temporarily for onclick handlers
        window.openOrderModal = (store, price, product) => {
            const modal = this.element.querySelector('#orderModal');
            this.element.querySelector('#editStoreName').value = store;
            this.element.querySelector('#editPrice').textContent = `₹${price}`;
            this.element.querySelector('#editProductName').value = product;
            modal.style.display = 'flex';
        };
    }
}

window.MedicineFinderView = MedicineFinderView;
