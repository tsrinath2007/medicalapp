class ReportAnalyzerView {
    constructor() {
        this.element = document.createElement('div');
        this.element.className = 'view-section report-analyzer-view';
    }

    render() {
        this.element.innerHTML = `
            <div style="margin-bottom: 32px; text-align: center;">
                <div style="display: inline-flex; align-items: center; justify-content: center; width: 64px; height: 64px; border-radius: 20px; background: linear-gradient(135deg, var(--primary), var(--secondary)); color: white; font-size: 32px; margin-bottom: 16px; box-shadow: 0 10px 25px var(--primary-glow);">
                    <i class="ri-magic-line"></i>
                </div>
                <h2 style="font-size: 32px; margin-bottom: 8px;">AI Report Analyzer</h2>
                <p style="color: var(--text-muted); max-width: 600px; margin: 0 auto;">Don't waste your time trying to decode complex medical jargon. We got it covered. Upload your blood tests or medical reports. Our AI will break it down into simple, colorful insights.</p>
            </div>

            <!-- Upload Area -->
            <div id="reportUploadZone" class="glass-card" style="max-width: 600px; margin: 0 auto 32px; text-align: center; border: 2px dashed rgba(236, 72, 153, 0.5); cursor: pointer; transition: var(--transition-fast);">
                <div style="font-size: 48px; color: var(--secondary); margin-bottom: 16px;">
                    <i class="ri-file-upload-line"></i>
                </div>
                <h3 style="margin-bottom: 8px;">Upload Medical Report</h3>
                <p style="color: var(--text-muted); margin-bottom: 24px;">Drag & drop PDF, JPG, or PNG here</p>
                <div style="display: inline-block;">
                    <button class="btn-primary" style="background: linear-gradient(135deg, var(--secondary), var(--primary));">Select File</button>
                </div>
                <input type="file" id="reportFile" style="display: none;" accept="image/*,.pdf">
            </div>

            <div id="analyzingState" style="display: none; text-align: center; padding: 40px;">
                <div style="position: relative; width: 120px; height: 120px; margin: 0 auto 24px;">
                    <svg viewBox="0 0 100 100" style="width: 100%; height: 100%; animation: spin 2s linear infinite;">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="4"></circle>
                        <circle cx="50" cy="50" r="45" fill="none" stroke="url(#gradient)" stroke-width="4" stroke-dasharray="283" stroke-dashoffset="70" stroke-linecap="round"></circle>
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stop-color="var(--primary)" />
                                <stop offset="100%" stop-color="var(--secondary)" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 24px; color: white;">
                        <i class="ri-brain-line"></i>
                    </div>
                </div>
                <h3 class="text-gradient">Analyzing Report Data...</h3>
                <p style="color: var(--text-muted); margin-top: 8px;" id="analyzingText">Extracting key biomarkers</p>
            </div>

            <!-- Results Area -->
            <div id="reportResults" style="display: none; max-width: 800px; margin: 0 auto;">
                <div class="glass-card" style="margin-bottom: 24px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px;">
                        <div>
                            <h3 style="font-size: 24px; margin-bottom: 4px;">Health Score</h3>
                            <p style="color: var(--text-muted);">Based on our AI analysis</p>
                        </div>
                        <div style="text-align: right;">
                            <div style="font-size: 48px; font-weight: 800; font-family: var(--font-heading); color: var(--accent);">8.5<span style="font-size: 24px; color: var(--text-muted);">/10</span></div>
                            <div style="color: var(--accent); font-weight: 600;">Excellent</div>
                        </div>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 20px;">
                        <!-- Metric 1 -->
                        <div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                <span style="font-weight: 500;">Vitamin D</span>
                                <span style="color: var(--accent);">Optimal (45 ng/mL)</span>
                            </div>
                            <div style="height: 12px; background: rgba(255,255,255,0.1); border-radius: 6px; overflow: hidden;">
                                <div style="height: 100%; width: 75%; background: var(--accent); border-radius: 6px;"></div>
                            </div>
                        </div>

                        <!-- Metric 2 -->
                        <div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                <span style="font-weight: 500;">Hemoglobin</span>
                                <span style="color: var(--primary-light);">Normal (14.2 g/dL)</span>
                            </div>
                            <div style="height: 12px; background: rgba(255,255,255,0.1); border-radius: 6px; overflow: hidden;">
                                <div style="height: 100%; width: 60%; background: var(--primary-light); border-radius: 6px;"></div>
                            </div>
                        </div>

                        <!-- Metric 3 -->
                        <div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                <span style="font-weight: 500;">Cholesterol (LDL)</span>
                                <span style="color: var(--warning);">Slightly High (135 mg/dL)</span>
                            </div>
                            <div style="height: 12px; background: rgba(255,255,255,0.1); border-radius: 6px; overflow: hidden;">
                                <div style="height: 100%; width: 85%; background: var(--warning); border-radius: 6px;"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
                    <div class="glass-card" style="background: rgba(16, 185, 129, 0.05); border-color: rgba(16, 185, 129, 0.2);">
                        <h4 style="color: var(--accent); margin-bottom: 12px; display: flex; align-items: center; gap: 8px;"><i class="ri-thumb-up-line"></i> The Good News</h4>
                        <ul style="color: var(--text-main); font-size: 14px; padding-left: 20px; line-height: 1.6;">
                            <li>Your iron levels are perfectly balanced.</li>
                            <li>Thyroid function represents excellent harmony.</li>
                            <li>Blood sugar is well within the healthy range.</li>
                        </ul>
                    </div>
                    
                    <div class="glass-card" style="background: rgba(245, 158, 11, 0.05); border-color: rgba(245, 158, 11, 0.2);">
                        <h4 style="color: var(--warning); margin-bottom: 12px; display: flex; align-items: center; gap: 8px;"><i class="ri-error-warning-line"></i> Areas to Watch</h4>
                        <ul style="color: var(--text-main); font-size: 14px; padding-left: 20px; line-height: 1.6;">
                            <li>Slightly elevated LDL cholesterol. Consider reducing saturated fats.</li>
                            <li>Hydration levels appear slightly low.</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;

        this.attachEvents();
        return this.element;
    }

    attachEvents() {
        const uploadZone = this.element.querySelector('#reportUploadZone');
        const fileInput = this.element.querySelector('#reportFile');
        const analyzingState = this.element.querySelector('#analyzingState');
        const analyzingText = this.element.querySelector('#analyzingText');
        const resultsArea = this.element.querySelector('#reportResults');

        uploadZone.addEventListener('click', () => fileInput.click());

        fileInput.addEventListener('change', (e) => {
            if(e.target.files.length > 0) {
                uploadZone.style.display = 'none';
                analyzingState.style.display = 'block';
                
                // Simulate AI stages
                setTimeout(() => analyzingText.textContent = "Scanning for anomalies...", 1000);
                setTimeout(() => analyzingText.textContent = "Generating readable insights...", 2000);
                
                setTimeout(() => {
                    analyzingState.style.display = 'none';
                    resultsArea.style.display = 'block';
                }, 3000);
            }
        });
    }
}

window.ReportAnalyzerView = ReportAnalyzerView;
