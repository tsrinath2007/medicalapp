class DashboardView {
    constructor() {
        this.element = document.createElement('div');
        this.element.className = 'view-section dashboard-view';
    }

    render() {
        const hour = new Date().getHours();
        let greeting = 'Good Evening';
        if(hour < 12) greeting = 'Good Morning';
        else if(hour < 18) greeting = 'Good Afternoon';

        this.element.innerHTML = `
            <div class="dashboard-header mb-8">
                <h1 class="text-gradient" style="font-size: 32px; margin-bottom: 8px;">${greeting}, Srinath</h1>
                <p style="color: var(--text-muted);">Here's what's happening with your health today.</p>
            </div>

            <div class="stats-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px; margin-bottom: 32px;">
                <div class="glass-card stat-card" style="padding: 24px;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
                        <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(99, 102, 241, 0.1); color: var(--primary); display: flex; align-items: center; justify-content: center; font-size: 24px;">
                            <i class="ri-heart-pulse-line"></i>
                        </div>
                        <span class="badge" style="background: rgba(16, 185, 129, 0.2); color: var(--accent);">+2.5%</span>
                    </div>
                    <h3 style="font-size: 24px; margin-bottom: 4px;">98 bpm</h3>
                    <p style="color: var(--text-muted); font-size: 14px;">Avg. Heart Rate</p>
                </div>

                <div class="glass-card stat-card" style="padding: 24px;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
                        <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(236, 72, 153, 0.1); color: var(--secondary); display: flex; align-items: center; justify-content: center; font-size: 24px;">
                            <i class="ri-fire-line"></i>
                        </div>
                        <span class="badge" style="background: rgba(16, 185, 129, 0.2); color: var(--accent);">Target</span>
                    </div>
                    <h3 style="font-size: 24px; margin-bottom: 4px;">2,450 kcal</h3>
                    <p style="color: var(--text-muted); font-size: 14px;">Calories Burned</p>
                </div>

                <div class="glass-card stat-card" style="padding: 24px;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
                        <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(16, 185, 129, 0.1); color: var(--accent); display: flex; align-items: center; justify-content: center; font-size: 24px;">
                            <i class="ri-moon-line"></i>
                        </div>
                        <span class="badge" style="background: rgba(245, 158, 11, 0.2); color: var(--warning);">-45m</span>
                    </div>
                    <h3 style="font-size: 24px; margin-bottom: 4px;">6h 45m</h3>
                    <p style="color: var(--text-muted); font-size: 14px;">Sleep Duration</p>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px;">
                <div class="glass-card">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                        <h3>Upcoming Consultations</h3>
                        <button class="btn-outline" style="padding: 8px 16px; font-size: 14px;" onclick="document.querySelector('[data-view=consultTracker]').click()">View All</button>
                    </div>
                    
                    <div style="display: flex; flex-direction: column; gap: 16px;">
                        <div style="display: flex; align-items: center; gap: 16px; padding: 16px; background: rgba(255, 255, 255, 0.02); border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.05);">
                            <div style="width: 50px; height: 50px; border-radius: 50%; background: #334155; overflow: hidden;">
                                <img src="https://ui-avatars.com/api/?name=Dr+Sarah&background=10b981&color=fff" style="width: 100%; height: 100%; object-fit: cover;">
                            </div>
                            <div style="flex: 1;">
                                <h4 style="margin-bottom: 4px;">Dr. Sarah Jenkins</h4>
                                <p style="color: var(--text-muted); font-size: 13px;">Cardiologist • Apollo Hospital</p>
                            </div>
                            <div style="text-align: right;">
                                <div style="color: var(--primary); font-weight: 600; margin-bottom: 4px;">Today, 2:30 PM</div>
                                <span class="badge" style="background: rgba(99, 102, 241, 0.2); color: var(--primary-light);">Confirmed</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="glass-card" style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(236, 72, 153, 0.1)); border: 1px solid rgba(236, 72, 153, 0.2);">
                    <div style="text-align: center; padding: 20px 0;">
                        <div style="width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(135deg, var(--primary), var(--secondary)); display: flex; align-items: center; justify-content: center; font-size: 32px; color: white; margin: 0 auto 16px; box-shadow: 0 0 20px var(--primary-glow);">
                            <i class="ri-robot-2-line"></i>
                        </div>
                        <h3 style="margin-bottom: 8px;">AI Health Assistant</h3>
                        <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 24px; line-height: 1.6;">Analyze reports or get medicine recommendations instantly.</p>
                        
                        <div style="display: flex; flex-direction: column; gap: 12px;">
                            <button class="btn-primary" style="width: 100%; justify-content: center;" onclick="document.querySelector('[data-view=reportAnalyzer]').click()">
                                <i class="ri-file-search-line"></i> Analyze Report
                            </button>
                            <button class="btn-outline" style="width: 100%; justify-content: center; border-color: rgba(255, 255, 255, 0.1);" onclick="document.querySelector('[data-view=medicineRecommender]').click()">
                                <i class="ri-star-smile-line"></i> Get Recommendations
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        return this.element;
    }
}

window.DashboardView = DashboardView;
