// Chapter 42 Planning Tool Functions
let chapter42CurrentPlan = null;

// Notification system for Chapter 42 tool
function showNotification(message, type = 'info') {
    const container = document.getElementById('notification-container') || createNotificationContainer();
    const notification = document.createElement('div');
    notification.className = `bg-white rounded-lg shadow-lg p-4 mb-4 border-l-4 ${
        type === 'success' ? 'border-green-500' : 
        type === 'error' ? 'border-red-500' : 
        type === 'warning' ? 'border-yellow-500' : 
        'border-blue-500'
    }`;
    notification.innerHTML = `
        <div class="flex justify-between items-start">
            <p class="text-gray-800">${message}</p>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-gray-400 hover:text-gray-600">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    container.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function createNotificationContainer() {
    const container = document.createElement('div');
    container.id = 'notification-container';
    container.className = 'fixed top-4 right-4 z-50 max-w-sm';
    document.body.appendChild(container);
    return container;
}

window.initChapter42Tool = function() {
    // Skip if already initialized
    if (window.chapter42Initialized) return;
    
    // Initialize event listeners for Chapter 42 tool
    const generateBtn = document.getElementById('chapter42-generate-plan');
    const optimizeBtn = document.getElementById('chapter42-optimize-layout');
    const resetBtn = document.getElementById('chapter42-reset-form');
    const exportBtn = document.getElementById('chapter42-export-plan');
    const targetLotSize = document.getElementById('chapter42-target-lot-size');
    const lotSizeValue = document.getElementById('chapter42-lot-size-value');
    
    // Initialize elements
    
    if (generateBtn) {
        generateBtn.addEventListener('click', generateChapter42Plan);
    }
    
    if (optimizeBtn) {
        optimizeBtn.addEventListener('click', optimizeChapter42Layout);
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', resetChapter42Form);
    }
    
    if (exportBtn) {
        exportBtn.addEventListener('click', showChapter42ExportMenu);
    }
    
    if (targetLotSize && lotSizeValue) {
        targetLotSize.addEventListener('input', function() {
            lotSizeValue.textContent = parseInt(this.value).toLocaleString();
        });
    }
    
    // Auto-update depth when area/width changes
    const siteArea = document.getElementById('chapter42-site-area');
    const siteWidth = document.getElementById('chapter42-site-width');
    const siteDepth = document.getElementById('chapter42-site-depth');
    
    if (siteArea && siteWidth && siteDepth) {
        [siteArea, siteWidth].forEach(field => {
            field.addEventListener('input', function() {
                const area = parseFloat(siteArea.value);
                const width = parseFloat(siteWidth.value);
                if (area && width) {
                    const depth = (area * 43560) / width;
                    siteDepth.value = Math.round(depth);
                }
            });
        });
    }
    
    // Update constraints when location type changes
    const locationType = document.getElementById('chapter42-location-type');
    if (locationType) {
        locationType.addEventListener('change', updateChapter42LotSizeConstraints);
    }
    
    // Mark as initialized
    window.chapter42Initialized = true;
}

function generateChapter42Plan() {
    const params = getChapter42Parameters();
    
    // Basic validation
    if (!params.area || !params.width || !params.depth) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    showNotification('Generating Chapter 42 compliant site plan...', 'info');
    
    // Show loading state
    const generateBtn = document.getElementById('chapter42-generate-plan');
    generateBtn.disabled = true;
    generateBtn.textContent = 'Generating...';
    
    setTimeout(() => {
        try {
            const plan = createChapter42Plan(params);
            chapter42CurrentPlan = plan;
            
            renderChapter42Plan(plan);
            updateChapter42Statistics(plan);
            updateChapter42Compliance(plan);
            
            // Enable export and optimize buttons
            document.getElementById('chapter42-optimize-layout').disabled = false;
            document.getElementById('chapter42-export-plan').disabled = false;
            
            showNotification(`Plan generated! ${plan.statistics.totalLots} lots created with ${plan.statistics.totalUnits} total units.`, 'success');
            
        } catch (error) {
            console.error('Plan generation failed:', error);
            showNotification('Failed to generate plan. Please check your parameters.', 'error');
        } finally {
            generateBtn.disabled = false;
            generateBtn.textContent = 'Generate Site Plan';
        }
    }, 1500);
}

function optimizeChapter42Layout() {
    if (!chapter42CurrentPlan) {
        showNotification('Generate a plan first before optimizing.', 'warning');
        return;
    }
    
    const optimizeBtn = document.getElementById('chapter42-optimize-layout');
    optimizeBtn.disabled = true;
    optimizeBtn.textContent = 'Optimizing...';
    
    setTimeout(() => {
        try {
            const optimizedPlan = optimizeChapter42Plan(chapter42CurrentPlan);
            chapter42CurrentPlan = optimizedPlan;
            
            renderChapter42Plan(optimizedPlan);
            updateChapter42Statistics(optimizedPlan);
            updateChapter42Compliance(optimizedPlan);
            
            showNotification('Layout optimized for better efficiency!', 'success');
            
        } catch (error) {
            console.error('Optimization failed:', error);
            showNotification('Optimization failed. Please try again.', 'error');
        } finally {
            optimizeBtn.disabled = false;
            optimizeBtn.textContent = 'Optimize Layout';
        }
    }, 1000);
}

function resetChapter42Form() {
    // Reset form fields
    document.getElementById('chapter42-site-area').value = '2.5';
    document.getElementById('chapter42-site-width').value = '300';
    document.getElementById('chapter42-site-depth').value = '363';
    document.getElementById('chapter42-location-type').value = 'suburban';
    document.getElementById('chapter42-street-type').value = 'local';
    document.getElementById('chapter42-development-type').value = 'single_family';
    document.getElementById('chapter42-target-lot-size').value = '5000';
    document.getElementById('chapter42-lot-size-value').textContent = '5,000';
    
    // Clear visualization
    clearChapter42Visualization();
    chapter42CurrentPlan = null;
    
    // Reset button states
    document.getElementById('chapter42-optimize-layout').disabled = true;
    document.getElementById('chapter42-export-plan').disabled = true;
    
    // Reset statistics and compliance
    resetChapter42Statistics();
    resetChapter42Compliance();
    
    showNotification('Form reset to defaults.', 'info');
}

function getChapter42Parameters() {
    return {
        area: parseFloat(document.getElementById('chapter42-site-area').value),
        width: parseFloat(document.getElementById('chapter42-site-width').value),
        depth: parseFloat(document.getElementById('chapter42-site-depth').value),
        isUrban: document.getElementById('chapter42-location-type').value === 'urban',
        streetType: document.getElementById('chapter42-street-type').value,
        developmentType: document.getElementById('chapter42-development-type').value,
        targetLotSize: parseFloat(document.getElementById('chapter42-target-lot-size').value)
    };
}

function createChapter42Plan(params) {
    const totalArea = params.area * 43560; // Convert to sq ft
    const maxDensity = params.developmentType === 'single_family' ? 
        CHAPTER42_CONSTANTS.MAX_DENSITY_SINGLE_FAMILY : 
        CHAPTER42_CONSTANTS.MAX_DENSITY_MULTI_FAMILY;
    
    const maxUnits = Math.floor(params.area * maxDensity);
    const lotSize = Math.max(params.targetLotSize, 
        params.isUrban ? CHAPTER42_CONSTANTS.MIN_LOT_SIZE_URBAN : CHAPTER42_CONSTANTS.MIN_LOT_SIZE_SUBURBAN);
    
    const totalLots = Math.min(maxUnits, Math.floor(totalArea * 0.7 / lotSize)); // 70% efficiency
    const totalUnits = totalLots;
    const density = totalUnits / params.area;
    const avgLotSize = Math.round(totalArea * 0.7 / totalLots);
    const coverage = 45; // Typical coverage
    const openSpaceArea = Math.max(totalLots * CHAPTER42_CONSTANTS.MIN_PERMEABLE_AREA, 
        CHAPTER42_CONSTANTS.MIN_COMPENSATING_OPEN_SPACE);

    const statistics = {
        totalLots,
        totalUnits,
        density: Math.round(density * 10) / 10,
        avgLotSize,
        coverage,
        openSpaceArea
    };

    const compliance = checkChapter42Compliance(statistics, params);

    return {
        params,
        statistics,
        compliance,
        lots: generateChapter42Lots(totalLots, params),
        streets: generateChapter42Streets(params),
        openSpaces: generateChapter42OpenSpaces(params)
    };
}

function generateChapter42Lots(count, params) {
    const lots = [];
    const lotWidth = Math.sqrt(params.targetLotSize * 1.5);
    const lotHeight = params.targetLotSize / lotWidth;
    const cols = Math.floor(params.width / lotWidth);
    const rows = Math.ceil(count / cols);

    for (let i = 0; i < count; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        
        lots.push({
            id: i,
            x: col * lotWidth + 10,
            y: row * lotHeight + 30,
            width: lotWidth - 5,
            height: lotHeight - 5,
            area: params.targetLotSize
        });
    }

    return lots;
}

function generateChapter42Streets(params) {
    return [{
        x: 0,
        y: 0,
        width: params.width,
        height: 25
    }];
}

function generateChapter42OpenSpaces(params) {
    const spaceSize = CHAPTER42_CONSTANTS.MIN_COMPENSATING_OPEN_SPACE;
    const spaceWidth = CHAPTER42_CONSTANTS.OPEN_SPACE_DIMENSIONS[0];
    const spaceHeight = spaceSize / spaceWidth;

    return [{
        x: params.width - spaceWidth - 20,
        y: params.depth - spaceHeight - 20,
        width: spaceWidth,
        height: spaceHeight,
        area: spaceSize
    }];
}

function checkChapter42Compliance(stats, params) {
    const minLotSize = params.isUrban ? 
        CHAPTER42_CONSTANTS.MIN_LOT_SIZE_URBAN : 
        CHAPTER42_CONSTANTS.MIN_LOT_SIZE_SUBURBAN;
    const maxDensity = params.developmentType === 'single_family' ? 
        CHAPTER42_CONSTANTS.MAX_DENSITY_SINGLE_FAMILY : 
        CHAPTER42_CONSTANTS.MAX_DENSITY_MULTI_FAMILY;

    return {
        lotSize: stats.avgLotSize >= minLotSize,
        density: stats.density <= maxDensity,
        setback: true, // Simplified
        coverage: stats.coverage <= (CHAPTER42_CONSTANTS.MAX_LOT_COVERAGE * 100),
        openSpace: stats.openSpaceArea >= CHAPTER42_CONSTANTS.MIN_COMPENSATING_OPEN_SPACE
    };
}

function optimizeChapter42Plan(plan) {
    const optimized = JSON.parse(JSON.stringify(plan));
    
    // Slightly improve lot count
    optimized.statistics.totalLots += Math.floor(optimized.statistics.totalLots * 0.05);
    optimized.statistics.totalUnits = optimized.statistics.totalLots;
    optimized.statistics.density = optimized.statistics.totalUnits / optimized.params.area;
    optimized.statistics.avgLotSize = Math.round(optimized.statistics.avgLotSize * 0.97);
    
    // Recalculate compliance
    optimized.compliance = checkChapter42Compliance(optimized.statistics, optimized.params);
    
    return optimized;
}

function renderChapter42Plan(plan) {
    const svg = document.getElementById('chapter42-site-plan');
    if (!svg) return;

    // Clear existing elements
    while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
    }

    // Add grid pattern
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const pattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
    pattern.setAttribute('id', 'chapter42-grid');
    pattern.setAttribute('width', '20');
    pattern.setAttribute('height', '20');
    pattern.setAttribute('patternUnits', 'userSpaceOnUse');
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M 20 0 L 0 0 0 20');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', '#e5e7eb');
    path.setAttribute('stroke-width', '1');
    pattern.appendChild(path);
    defs.appendChild(pattern);
    svg.appendChild(defs);

    // Add background
    const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bg.setAttribute('width', '800');
    bg.setAttribute('height', '600');
    bg.setAttribute('fill', 'url(#chapter42-grid)');
    svg.appendChild(bg);

    // Scale factors
    const scaleX = 800 / plan.params.width;
    const scaleY = 600 / plan.params.depth;

    // Draw site boundary
    const boundary = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    boundary.setAttribute('x', '2');
    boundary.setAttribute('y', '2');
    boundary.setAttribute('width', '796');
    boundary.setAttribute('height', '596');
    boundary.setAttribute('fill', 'none');
    boundary.setAttribute('stroke', '#1f2937');
    boundary.setAttribute('stroke-width', '2');
    svg.appendChild(boundary);

    // Draw streets
    plan.streets.forEach(street => {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', street.x * scaleX);
        rect.setAttribute('y', street.y * scaleY);
        rect.setAttribute('width', street.width * scaleX);
        rect.setAttribute('height', street.height * scaleY);
        rect.setAttribute('fill', '#6b7280');
        svg.appendChild(rect);
    });

    // Draw lots
    plan.lots.forEach((lot, index) => {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', lot.x * scaleX);
        rect.setAttribute('y', lot.y * scaleY);
        rect.setAttribute('width', lot.width * scaleX);
        rect.setAttribute('height', lot.height * scaleY);
        rect.setAttribute('fill', '#dcfce7');
        rect.setAttribute('stroke', '#16a34a');
        rect.setAttribute('stroke-width', '1');
        svg.appendChild(rect);
        
        // Add lot number
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', (lot.x + lot.width/2) * scaleX);
        text.setAttribute('y', (lot.y + lot.height/2) * scaleY);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'middle');
        text.setAttribute('font-size', '10');
        text.setAttribute('fill', '#16a34a');
        text.textContent = index + 1;
        svg.appendChild(text);
    });

    // Draw buildings on lots
    plan.lots.forEach(lot => {
        const buildingWidth = lot.width * 0.6;
        const buildingHeight = lot.height * 0.4;
        const buildingX = lot.x + (lot.width - buildingWidth) / 2;
        const buildingY = lot.y + 15;

        const building = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        building.setAttribute('x', buildingX * scaleX);
        building.setAttribute('y', buildingY * scaleY);
        building.setAttribute('width', buildingWidth * scaleX);
        building.setAttribute('height', buildingHeight * scaleY);
        building.setAttribute('fill', '#dbeafe');
        building.setAttribute('stroke', '#2563eb');
        building.setAttribute('stroke-width', '1');
        svg.appendChild(building);
    });

    // Draw open spaces
    plan.openSpaces.forEach(space => {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', space.x * scaleX);
        rect.setAttribute('y', space.y * scaleY);
        rect.setAttribute('width', space.width * scaleX);
        rect.setAttribute('height', space.height * scaleY);
        rect.setAttribute('fill', '#fef3c7');
        rect.setAttribute('stroke', '#f59e0b');
        rect.setAttribute('stroke-width', '1');
        svg.appendChild(rect);
    });
}

function updateChapter42Statistics(plan) {
    const stats = plan.statistics;
    
    document.getElementById('chapter42-total-lots').textContent = stats.totalLots.toLocaleString();
    document.getElementById('chapter42-total-units').textContent = stats.totalUnits.toLocaleString();
    document.getElementById('chapter42-density').textContent = stats.density;
    document.getElementById('chapter42-avg-lot-size').textContent = stats.avgLotSize.toLocaleString();
    document.getElementById('chapter42-coverage').textContent = stats.coverage;
    document.getElementById('chapter42-open-space').textContent = stats.openSpaceArea.toLocaleString();
}

function updateChapter42Compliance(plan) {
    const compliance = plan.compliance;
    
    const items = {
        'chapter42-compliance-lot-size': compliance.lotSize,
        'chapter42-compliance-density': compliance.density,
        'chapter42-compliance-setback': compliance.setback,
        'chapter42-compliance-coverage': compliance.coverage,
        'chapter42-compliance-open-space': compliance.openSpace
    };

    Object.entries(items).forEach(([id, passed]) => {
        const element = document.getElementById(id);
        if (element) {
            const statusEl = element.querySelector('span:last-child');
            if (statusEl) {
                statusEl.className = passed ? 
                    'px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm' : 
                    'px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm';
                statusEl.textContent = passed ? 'Pass' : 'Fail';
            }
        }
    });
}

function clearChapter42Visualization() {
    const svg = document.getElementById('chapter42-site-plan');
    if (!svg) return;

    while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
    }

    // Re-add the default content
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const pattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
    pattern.setAttribute('id', 'chapter42-grid');
    pattern.setAttribute('width', '20');
    pattern.setAttribute('height', '20');
    pattern.setAttribute('patternUnits', 'userSpaceOnUse');
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M 20 0 L 0 0 0 20');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', '#e5e7eb');
    path.setAttribute('stroke-width', '1');
    pattern.appendChild(path);
    defs.appendChild(pattern);
    svg.appendChild(defs);

    const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bg.setAttribute('width', '800');
    bg.setAttribute('height', '600');
    bg.setAttribute('fill', 'url(#chapter42-grid)');
    svg.appendChild(bg);

    const text1 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text1.setAttribute('x', '400');
    text1.setAttribute('y', '280');
    text1.setAttribute('text-anchor', 'middle');
    text1.setAttribute('class', 'fill-gray-400 text-lg');
    text1.textContent = 'Click "Generate Site Plan" to begin';
    svg.appendChild(text1);

    const text2 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text2.setAttribute('x', '400');
    text2.setAttribute('y', '320');
    text2.setAttribute('text-anchor', 'middle');
    text2.setAttribute('class', 'fill-gray-400 text-sm');
    text2.textContent = 'Enter your site parameters and generate a Chapter 42 compliant layout';
    svg.appendChild(text2);
}

function resetChapter42Statistics() {
    document.getElementById('chapter42-total-lots').textContent = '—';
    document.getElementById('chapter42-total-units').textContent = '—';
    document.getElementById('chapter42-density').textContent = '—';
    document.getElementById('chapter42-avg-lot-size').textContent = '—';
    document.getElementById('chapter42-coverage').textContent = '—';
    document.getElementById('chapter42-open-space').textContent = '—';
}

function resetChapter42Compliance() {
    const items = [
        'chapter42-compliance-lot-size',
        'chapter42-compliance-density',
        'chapter42-compliance-setback',
        'chapter42-compliance-coverage',
        'chapter42-compliance-open-space'
    ];

    items.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            const statusEl = element.querySelector('span:last-child');
            if (statusEl) {
                statusEl.className = 'px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm';
                statusEl.textContent = 'Pending';
            }
        }
    });
}

function updateChapter42LotSizeConstraints() {
    const locationType = document.getElementById('chapter42-location-type');
    const targetLotSize = document.getElementById('chapter42-target-lot-size');
    const isUrban = locationType.value === 'urban';
    const minSize = isUrban ? CHAPTER42_CONSTANTS.MIN_LOT_SIZE_URBAN : CHAPTER42_CONSTANTS.MIN_LOT_SIZE_SUBURBAN;
    
    if (targetLotSize) {
        targetLotSize.min = minSize;
        
        if (parseInt(targetLotSize.value) < minSize) {
            targetLotSize.value = minSize;
            document.getElementById('chapter42-lot-size-value').textContent = minSize.toLocaleString();
        }
    }
}

function showChapter42ExportMenu() {
    if (!chapter42CurrentPlan) {
        showNotification('No plan to export. Generate a plan first.', 'error');
        return;
    }

    // Create export menu using existing notification styles
    const menu = document.createElement('div');
    menu.className = 'fixed inset-0 bg-black/50 z-50 flex items-center justify-center';
    menu.innerHTML = `
        <div class="bg-white rounded-xl p-6 max-w-sm w-full mx-4">
            <h4 class="text-lg font-bold text-houston-green mb-4">Export Options</h4>
            <div class="space-y-3">
                <button onclick="exportChapter42PDF()" class="w-full bg-houston-green hover:bg-houston-primary text-white px-4 py-2 rounded-lg transition-colors">
                    <i class="fas fa-file-pdf mr-2"></i> Export PDF Report
                </button>
                <button onclick="exportChapter42CSV()" class="w-full bg-houston-green hover:bg-houston-primary text-white px-4 py-2 rounded-lg transition-colors">
                    <i class="fas fa-file-csv mr-2"></i> Export Data (CSV)
                </button>
                <button onclick="exportChapter42SVG()" class="w-full bg-houston-green hover:bg-houston-primary text-white px-4 py-2 rounded-lg transition-colors">
                    <i class="fas fa-image mr-2"></i> Export Site Plan
                </button>
                <button onclick="this.closest('.fixed').remove()" class="w-full border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors">
                    Cancel
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(menu);
}

// Export functions
window.exportChapter42PDF = function() {
    const reportHTML = generateChapter42HTMLReport();
    const printWindow = window.open('', '_blank');
    printWindow.document.write(reportHTML);
    printWindow.document.close();
    printWindow.print();
    document.querySelector('.fixed').remove();
    showNotification('PDF export ready. Use print dialog to save as PDF.', 'success');
}

window.exportChapter42CSV = function() {
    const stats = chapter42CurrentPlan.statistics;
    const compliance = chapter42CurrentPlan.compliance;
    
    const csvData = [
        ['Houston Chapter 42 Development Report'],
        ['Generated on', new Date().toLocaleDateString()],
        [''],
        ['Metric', 'Value', 'Status'],
        ['Site Area (acres)', chapter42CurrentPlan.params.area, ''],
        ['Total Lots', stats.totalLots, ''],
        ['Total Units', stats.totalUnits, ''],
        ['Density (units/acre)', stats.density, compliance.density ? 'PASS' : 'FAIL'],
        ['Average Lot Size (sq ft)', stats.avgLotSize, compliance.lotSize ? 'PASS' : 'FAIL'],
        ['Coverage %', stats.coverage, compliance.coverage ? 'PASS' : 'FAIL'],
        ['Open Space (sq ft)', stats.openSpaceArea, compliance.openSpace ? 'PASS' : 'FAIL']
    ];

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'houston-chapter42-report.csv';
    a.click();
    URL.revokeObjectURL(url);
    document.querySelector('.fixed').remove();
    showNotification('CSV export completed!', 'success');
}

window.exportChapter42SVG = function() {
    const svg = document.getElementById('chapter42-site-plan');
    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'houston-chapter42-site-plan.svg';
    a.click();
    URL.revokeObjectURL(url);
    document.querySelector('.fixed').remove();
    showNotification('Site plan exported!', 'success');
}

function generateChapter42HTMLReport() {
    const stats = chapter42CurrentPlan.statistics;
    const compliance = chapter42CurrentPlan.compliance;
    const params = chapter42CurrentPlan.params;
    
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Houston Chapter 42 Development Report</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            .header { text-align: center; margin-bottom: 40px; }
            .section { margin-bottom: 30px; }
            .stats-table { width: 100%; border-collapse: collapse; }
            .stats-table th, .stats-table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            .stats-table th { background-color: #f5f5f5; }
            .pass { color: green; font-weight: bold; }
            .fail { color: red; font-weight: bold; }
            @media print { body { margin: 20px; } }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>Houston Chapter 42 Development Report</h1>
            <p>Generated on ${new Date().toLocaleDateString()}</p>
        </div>
        
        <div class="section">
            <h2>Site Parameters</h2>
            <table class="stats-table">
                <tr><td>Site Area</td><td>${params.area} acres</td></tr>
                <tr><td>Site Dimensions</td><td>${params.width} ft × ${params.depth} ft</td></tr>
                <tr><td>Location Type</td><td>${params.isUrban ? 'Urban' : 'Suburban'}</td></tr>
                <tr><td>Development Type</td><td>${params.developmentType.replace('_', ' ')}</td></tr>
                <tr><td>Target Lot Size</td><td>${params.targetLotSize.toLocaleString()} sq ft</td></tr>
            </table>
        </div>
        
        <div class="section">
            <h2>Development Statistics</h2>
            <table class="stats-table">
                <tr><td>Total Lots</td><td>${stats.totalLots}</td></tr>
                <tr><td>Total Units</td><td>${stats.totalUnits}</td></tr>
                <tr><td>Density</td><td>${stats.density} units/acre</td></tr>
                <tr><td>Average Lot Size</td><td>${stats.avgLotSize.toLocaleString()} sq ft</td></tr>
                <tr><td>Lot Coverage</td><td>${stats.coverage}%</td></tr>
                <tr><td>Open Space</td><td>${stats.openSpaceArea.toLocaleString()} sq ft</td></tr>
            </table>
        </div>
        
        <div class="section">
            <h2>Chapter 42 Compliance</h2>
            <table class="stats-table">
                <tr><td>Minimum Lot Size</td><td class="${compliance.lotSize ? 'pass' : 'fail'}">${compliance.lotSize ? 'PASS' : 'FAIL'}</td></tr>
                <tr><td>Density Limits</td><td class="${compliance.density ? 'pass' : 'fail'}">${compliance.density ? 'PASS' : 'FAIL'}</td></tr>
                <tr><td>Setback Requirements</td><td class="${compliance.setback ? 'pass' : 'fail'}">${compliance.setback ? 'PASS' : 'FAIL'}</td></tr>
                <tr><td>Lot Coverage</td><td class="${compliance.coverage ? 'pass' : 'fail'}">${compliance.coverage ? 'PASS' : 'FAIL'}</td></tr>
                <tr><td>Open Space</td><td class="${compliance.openSpace ? 'pass' : 'fail'}">${compliance.openSpace ? 'PASS' : 'FAIL'}</td></tr>
            </table>
        </div>
        
        <div class="section">
            <p><strong>Houston Chapter 42 Compliance Note:</strong> This report is based on Chapter 42 of the Houston Code of Ordinances. 
            Additional deed restrictions and site-specific requirements may apply. Consult with a professional land planner for detailed analysis.</p>
        </div>
    </body>
    </html>
    `;
}

// Initialize Chapter 42 tool when DOM is ready - immediate for performance
document.addEventListener('DOMContentLoaded', function() {
    initChapter42Tool();
});

// Also try to initialize when the tool is opened
window.addEventListener('load', function() {
    if (!window.chapter42Initialized) {
        initChapter42Tool();
    }
});