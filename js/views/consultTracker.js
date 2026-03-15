class ConsultTrackerView {
    constructor() {
        this.element = document.createElement('div');
        this.element.className = 'view-section consult-tracker-view';
    }

    render() {
        this.element.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 32px;">
                <div>
                    <h2 style="font-size: 28px; margin-bottom: 8px;">Consultancy Tracker</h2>
                    <p style="color: var(--text-muted); max-width: 600px;">Don't waste your time tracking appointments across different hospitals. We got it covered. Keep all your upcoming schedules in one easy-to-read list.</p>
                </div>
                <button class="btn-primary" onclick="alert('In a real app, this would open a search for doctors.')"><i class="ri-add-line"></i> Track New</button>
            </div>

            <div class="glass-card" style="margin-bottom: 24px;">
                <div style="display: flex; gap: 16px; margin-bottom: 24px;">
                    <button class="btn-primary" style="padding: 8px 16px; font-size: 14px; border-radius: 20px;">Upcoming</button>
                    <button class="btn-outline" style="padding: 8px 16px; font-size: 14px; border-radius: 20px; border-color: rgba(255,255,255,0.1);">Past History</button>
                </div>

                <div style="display: flex; flex-direction: column; gap: 16px;">
                    <!-- Tracker Item 1 -->
                    <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 16px; padding: 20px; display: grid; grid-template-columns: auto 1fr auto; gap: 24px; align-items: center; transition: var(--transition-fast);" onmouseover="this.style.background='rgba(255,255,255,0.05)'" onmouseout="this.style.background='rgba(255,255,255,0.02)'">
                        <div style="width: 64px; height: 64px; border-radius: 50%; overflow: hidden; border: 2px solid var(--primary);">
                            <img src="https://ui-avatars.com/api/?name=Dr+Sarah+Jenkins&background=10b981&color=fff" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                        
                        <div>
                            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 4px;">
                                <h3 style="font-size: 18px;">Dr. Sarah Jenkins</h3>
                                <span class="badge" style="background: rgba(99, 102, 241, 0.2); color: var(--primary-light);">15 Yrs Exp</span>
                            </div>
                            <p style="color: var(--secondary-light); font-weight: 500; font-size: 14px; margin-bottom: 4px;">Cardiology Specialist</p>
                            <p style="color: var(--text-muted); font-size: 13px;"><i class="ri-hospital-line"></i> Apollo Hospitals, Jubilee Hills</p>
                        </div>

                        <div style="text-align: right; display: flex; flex-direction: column; align-items: flex-end; gap: 12px;">
                            <div style="background: rgba(16, 185, 129, 0.1); color: var(--accent); padding: 8px 16px; border-radius: 8px; font-weight: 600;">
                                <div style="font-size: 12px; margin-bottom: 2px; text-transform: uppercase;">Appointment</div>
                                <div>Today, 2:30 PM</div>
                            </div>
                            <a href="https://www.apollohospitals.com" target="_blank" class="btn-outline" style="padding: 6px 16px; font-size: 13px; text-decoration: none;">
                                Visit Hospital Site <i class="ri-external-link-line" style="margin-left: 4px;"></i>
                            </a>
                        </div>
                    </div>

                    <!-- Tracker Item 2 -->
                    <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 16px; padding: 20px; display: grid; grid-template-columns: auto 1fr auto; gap: 24px; align-items: center; transition: var(--transition-fast);" onmouseover="this.style.background='rgba(255,255,255,0.05)'" onmouseout="this.style.background='rgba(255,255,255,0.02)'">
                        <div style="width: 64px; height: 64px; border-radius: 50%; overflow: hidden; border: 2px solid var(--secondary);">
                            <img src="https://ui-avatars.com/api/?name=Dr+Arun+Kumar&background=ec4899&color=fff" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                        
                        <div>
                            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 4px;">
                                <h3 style="font-size: 18px;">Dr. Arun Kumar</h3>
                                <span class="badge" style="background: rgba(99, 102, 241, 0.2); color: var(--primary-light);">8 Yrs Exp</span>
                            </div>
                            <p style="color: var(--secondary-light); font-weight: 500; font-size: 14px; margin-bottom: 4px;">Dermatologist</p>
                            <p style="color: var(--text-muted); font-size: 13px;"><i class="ri-hospital-line"></i> Yashoda Hospitals, Somajiguda</p>
                        </div>

                        <div style="text-align: right; display: flex; flex-direction: column; align-items: flex-end; gap: 12px;">
                            <div style="background: rgba(245, 158, 11, 0.1); color: var(--warning); padding: 8px 16px; border-radius: 8px; font-weight: 600;">
                                <div style="font-size: 12px; margin-bottom: 2px; text-transform: uppercase;">Appointment</div>
                                <div>Tomorrow, 10:00 AM</div>
                            </div>
                            <a href="https://www.yashodahospitals.com" target="_blank" class="btn-outline" style="padding: 6px 16px; font-size: 13px; text-decoration: none;">
                                Visit Hospital Site <i class="ri-external-link-line" style="margin-left: 4px;"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        return this.element;
    }
}

window.ConsultTrackerView = ConsultTrackerView;
