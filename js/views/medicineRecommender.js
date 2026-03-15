class MedicineRecommenderView {
    constructor() {
        this.element = document.createElement('div');
        this.element.className = 'view-section medicine-recommender-view';
    }

    render() {
        this.element.innerHTML = `
            <div style="margin-bottom: 32px; text-align: center;">
                <div style="display: inline-flex; align-items: center; justify-content: center; width: 64px; height: 64px; border-radius: 20px; background: linear-gradient(135deg, var(--warning), var(--accent)); color: white; font-size: 32px; margin-bottom: 16px; box-shadow: 0 10px 25px rgba(245, 158, 11, 0.3);">
                    <i class="ri-star-smile-fill"></i>
                </div>
                <h2 style="font-size: 32px; margin-bottom: 8px;">AI Medicine Recommender</h2>
                <p style="color: var(--text-muted); max-width: 600px; margin: 0 auto;">Don't waste your time figuring out which medicine is best. We got it covered. Tell us what you're experiencing, and we'll compare the top options for you based on effectiveness, speed, and safety.</p>
            </div>

            <div class="glass-card" style="max-width: 600px; margin: 0 auto 24px;">
                <div id="step1">
                    <label style="display: block; margin-bottom: 8px; font-weight: 500; font-size: 15px;">What's your primary symptom?</label>
                    <div class="search-bar" style="width: 100%; margin-bottom: 24px;">
                        <i class="ri-search-line"></i>
                        <input type="text" id="symptomInput" placeholder="e.g., Fever, Headache, Cold">
                    </div>
                    <button class="btn-primary" id="btnContinue" style="width: 100%; justify-content: center;">Continue</button>
                </div>

                <div id="step2" style="display: none;">
                    <!-- Injected dynamically -->
                </div>

                <div id="loadingRecs" style="display: none; text-align: center; padding: 40px 0;">
                    <i class="ri-loader-4-line" style="font-size: 48px; color: var(--primary); animation: spin 1s linear infinite; display: inline-block;"></i>
                    <h3 style="margin-top: 16px;">Comparing top medicines...</h3>
                    <p style="color: var(--text-muted); margin-top: 8px;">Analyzing effectiveness and side effects</p>
                </div>
            </div>

            <div id="recommendations" style="display: none; max-width: 800px; margin: 0 auto;">
                <!-- Injected dynamically -->
            </div>
        `;

        this.attachEvents();
        return this.element;
    }

    attachEvents() {
        const step1 = this.element.querySelector('#step1');
        const step2 = this.element.querySelector('#step2');
        const loadingRecs = this.element.querySelector('#loadingRecs');
        const recommendations = this.element.querySelector('#recommendations');
        
        const btnContinue = this.element.querySelector('#btnContinue');
        const symptomInput = this.element.querySelector('#symptomInput');

        btnContinue.addEventListener('click', () => {
            const symptom = symptomInput.value.trim().toLowerCase();
            if(!symptom) {
                alert("Please enter a symptom.");
                return;
            }
            
            let questionHtml = '';
            let inputHtml = '';
            
            if(symptom.includes('fever')) {
                questionHtml = 'What is your current body temperature? (Optional)';
                inputHtml = '<i class="ri-temp-hot-line"></i><input type="number" id="detailInput" placeholder="e.g., 101.5"><span style="color: var(--text-muted);">°F</span>';
            } else if(symptom.includes('headache')) {
                questionHtml = 'How severe is the pain on a scale of 1-10? (Optional)';
                inputHtml = '<i class="ri-pulse-line"></i><input type="number" id="detailInput" placeholder="e.g., 7"><span style="color: var(--text-muted);">/10</span>';
            } else {
                questionHtml = 'How many days have you had this symptom? (Optional)';
                inputHtml = '<i class="ri-calendar-line"></i><input type="number" id="detailInput" placeholder="e.g., 2"><span style="color: var(--text-muted);">Days</span>';
            }

            step2.innerHTML = `
                <button class="btn-outline" id="btnBack" style="padding: 6px 12px; margin-bottom: 16px; border: none;"><i class="ri-arrow-left-line"></i> Back</button>
                <h3 style="margin-bottom: 16px;">We noticed you have a <span style="color: var(--primary); text-transform: capitalize;">${symptom}</span></h3>
                <label style="display: block; margin-bottom: 8px; font-weight: 500; font-size: 14px;">${questionHtml}</label>
                <div class="search-bar" style="width: 100%; margin-bottom: 24px;">
                    ${inputHtml}
                </div>
                <button class="btn-primary" id="btnAnalyze" style="width: 100%; justify-content: center;">Get Recommendations</button>
            `;

            step2.querySelector('#btnBack').addEventListener('click', () => {
                step2.style.display = 'none';
                step1.style.display = 'block';
            });

            step2.querySelector('#btnAnalyze').addEventListener('click', () => {
                step2.style.display = 'none';
                loadingRecs.style.display = 'block';
                
                setTimeout(() => {
                    loadingRecs.style.display = 'none';
                    this.renderRecommendations(symptom);
                    recommendations.style.display = 'block';
                }, 2000);
            });

            step1.style.display = 'none';
            step2.style.display = 'block';
        });
    }

    renderRecommendations(symptom) {
        const container = this.element.querySelector('#recommendations');
        let optionsHtml = '';

        if(symptom.includes('headache')) {
            optionsHtml = 
                this.getMockCard("1", "Saridon", "Propyphenazone + Paracetamol - Fast headache relief", "9.5", "9.0", "7.5", "4.7", true) +
                this.getMockCard("2", "Disprin", "Aspirin 325mg - Dissolves quickly", "8.0", "8.5", "7.0", "4.1", false) +
                this.getMockCard("3", "Aspirin", "Aspirin 500mg - Classic relief", "7.5", "7.5", "7.0", "4.0", false) +
                this.getMockCard("4", "Ibuprofen", "Ibuprofen 400mg - Anti-inflammatory", "8.5", "8.0", "8.0", "4.3", false) +
                this.getMockCard("5", "Tylenol Extra Strength", "Acetaminophen 500mg", "8.5", "8.0", "9.0", "4.5", false) +
                this.getMockCard("6", "Excedrin Migraine", "Acetaminophen + Aspirin + Caffeine", "9.0", "9.5", "7.5", "4.6", false) +
                this.getMockCard("7", "Advil Dual Action", "Ibuprofen + Acetaminophen", "9.0", "8.5", "8.0", "4.4", false) +
                this.getMockCard("8", "Aleve", "Naproxen Sodium 220mg - Long lasting", "8.0", "7.0", "8.5", "4.2", false) +
                this.getMockCard("9", "Motrin IB", "Ibuprofen 200mg", "7.5", "7.5", "8.5", "4.1", false) +
                this.getMockCard("10", "Dolo 650", "Paracetamol 650mg", "7.0", "7.0", "9.0", "4.0", false);
        } else if(symptom.includes('fever')) {
            optionsHtml = 
                this.getMockCard("1", "Dolo 650", "Paracetamol 650mg - Fast acting fever reducer", "9.5", "8.0", "9.0", "4.8", true) +
                this.getMockCard("2", "Crocin Advance", "Paracetamol 500mg - Standard relief", "7.5", "8.5", "9.0", "4.2", false) +
                this.getMockCard("3", "Calpol 500", "Paracetamol 500mg", "8.0", "8.0", "9.0", "4.3", false) +
                this.getMockCard("4", "Tylenol", "Acetaminophen 500mg", "8.5", "8.0", "9.0", "4.5", false) +
                this.getMockCard("5", "Ibuprofen", "Ibuprofen 400mg - Anti-inflammatory", "8.5", "8.0", "8.0", "4.3", false) +
                this.getMockCard("6", "Advil", "Ibuprofen 200mg", "8.0", "8.0", "8.0", "4.1", false) +
                this.getMockCard("7", "Aleve", "Naproxen Sodium 220mg", "7.5", "7.0", "8.5", "4.0", false) +
                this.getMockCard("8", "Motrin", "Ibuprofen 200mg", "8.0", "7.5", "8.0", "4.1", false) +
                this.getMockCard("9", "Nurofen", "Ibuprofen 200mg", "8.0", "8.0", "8.0", "4.2", false) +
                this.getMockCard("10", "Aspirin", "Aspirin 500mg", "7.0", "7.5", "7.0", "3.9", false);
        } else {
            optionsHtml = 
                this.getMockCard("1", "General Relief Pro", "Multi-symptom formula", "8.5", "8.0", "8.5", "4.5", true) +
                this.getMockCard("2", "Basic Care Plus", "Standard active ingredients", "7.0", "7.5", "9.0", "4.0", false) +
                this.getMockCard("3", "DayQuil", "Cold & Flu Relief", "8.5", "8.5", "8.0", "4.4", false) +
                this.getMockCard("4", "NyQuil", "Nighttime Relief", "9.0", "8.0", "8.0", "4.5", false) +
                this.getMockCard("5", "Theraflu", "Severe Cold Relief - Liquid Powder", "8.5", "9.0", "8.5", "4.6", false) +
                this.getMockCard("6", "Mucinex DM", "Expectorant & Cough Suppressant", "8.0", "7.0", "8.5", "4.2", false) +
                this.getMockCard("7", "Robitussin", "Cough & Chest Congestion DM", "7.5", "7.5", "9.0", "4.1", false) +
                this.getMockCard("8", "Sudafed", "Nasal Decongestant", "8.0", "8.5", "8.0", "4.3", false) +
                this.getMockCard("9", "Claritin", "Allergy Relief", "8.5", "7.0", "9.5", "4.4", false) +
                this.getMockCard("10", "Zyrtec", "Allergy Relief - Fast Acting", "9.0", "8.5", "9.0", "4.6", false);
        }

        container.innerHTML = `
            <h3 style="margin-bottom: 16px; text-align: center; text-transform: capitalize;">Top Comparisons for ${symptom}</h3>
            <div style="display: grid; gap: 24px;">
                ${optionsHtml}
            </div>
        `;
    }

    getMockCard(id, name, desc, eff, speed, safety, rating, isTopPick) {
        const topPickHtml = isTopPick ? `<div style="position: absolute; top: 0; right: 0; background: var(--accent); color: var(--bg-base); padding: 4px 16px; font-weight: 700; font-size: 12px; border-bottom-left-radius: 12px;">TOP PICK</div>` : '';
        const borderStyle = isTopPick ? `border: 1px solid var(--accent);` : '';
        
        // Convert string ratings to percentages for bars
        const effPct = parseFloat(eff) * 10;
        const speedPct = parseFloat(speed) * 10;
        const safetyPct = parseFloat(safety) * 10;

        return `
            <div class="glass-card" style="${borderStyle} position: relative; overflow: hidden;">
                ${topPickHtml}
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px;">
                    <div>
                        <h3 style="font-size: 24px; margin-bottom: 4px; display: flex; align-items: center; gap: 8px;">${name} ${isTopPick ? '<i class="ri-verified-badge-fill" style="color: var(--primary); font-size: 20px;"></i>' : ''}</h3>
                        <p style="color: var(--text-muted); font-size: 14px;">${desc}</p>
                    </div>
                    <div style="text-align: right;">
                        <div style="display: flex; color: var(--warning); font-size: 20px;">
                            <i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="ri-star-fill"></i><i class="${parseFloat(rating) >= 4.5 ? 'ri-star-half-fill' : 'ri-star-line'}"></i>
                        </div>
                        <div style="font-weight: 700; font-size: 14px;">${rating} / 5.0 Rating</div>
                    </div>
                </div>

                <div style="display: grid; gap: 16px;">
                    <div>
                        <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 4px;">
                            <span>Effectiveness (0-10)</span>
                            <span style="font-weight: 700;">${eff}</span>
                        </div>
                        <div style="height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden;">
                            <div style="height: 100%; width: ${effPct}%; background: var(--accent);"></div>
                        </div>
                    </div>
                    <div>
                        <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 4px;">
                            <span>Speed of Relief</span>
                            <span style="font-weight: 700;">${speed}</span>
                        </div>
                        <div style="height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden;">
                            <div style="height: 100%; width: ${speedPct}%; background: var(--primary-light);"></div>
                        </div>
                    </div>
                    <div>
                        <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 4px;">
                            <span>Safety Profile</span>
                            <span style="font-weight: 700;">${safety}</span>
                        </div>
                        <div style="height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden;">
                            <div style="height: 100%; width: ${safetyPct}%; background: var(--secondary);"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

window.MedicineRecommenderView = MedicineRecommenderView;
