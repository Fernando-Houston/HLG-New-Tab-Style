// Houston Land Guy - Main JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Video handling functions - make globally accessible
window.handleVideoLoad = function() {
    console.log('Video loaded successfully');
    const fallback = document.getElementById('video-fallback');
    if (fallback) {
        fallback.classList.add('hidden');
    }
};

function handleVideoError() {
    console.log('Video failed to load, showing fallback');
    const fallback = document.getElementById('video-fallback');
    const iframe = document.getElementById('video-player');
    if (fallback && iframe) {
        fallback.classList.remove('hidden');
        iframe.style.display = 'none';
    }
}

window.playVideoFallback = function() {
    const iframe = document.getElementById('video-player');
    const fallback = document.getElementById('video-fallback');
    
    // Try to reload the video
    if (iframe) {
        iframe.style.display = 'block';
        iframe.src = iframe.src; // Reload iframe
        fallback.classList.add('hidden');
    }
}

// Initialize application
function initializeApp() {
    // Core functionality
    initNavigation();
    initTabNavigation();
    initMobileMenu();
    
    // Performance optimizations (load early)
    initPerformanceOptimizations();
    initMemoryOptimizations();
    optimizeResourceLoading();
    
    // Visual enhancements
    initScrollAnimations();
    initCounterAnimations();
    initActivityTicker();
    initMobileEnhancements();
    initMicroInteractions();
    addPageTransitions();
    
    // User interactions
    initForms();
    initTooltips();
    initNotifications();
    initPropertyValuation();
    initAudienceCards();
}

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Check if the target is a tab section
                const tabSections = ['#sellers', '#developers', '#investors'];
                if (tabSections.includes(targetId)) {
                    // Activate the corresponding tab
                    const tabName = targetId.substring(1); // Remove the #
                    const tabButton = document.querySelector(`[data-tab="${tabName}"]`);
                    const tabContents = document.querySelectorAll('.tab-content');
                    const tabButtons = document.querySelectorAll('.tab-button');
                    
                    // Remove active class from all tabs
                    tabButtons.forEach(btn => {
                        btn.classList.remove('active', 'border-green-600', 'text-green-600');
                        btn.classList.add('border-transparent', 'text-gray-500');
                    });
                    
                    // Hide all tab contents
                    tabContents.forEach(content => {
                        content.classList.remove('active');
                        content.classList.add('hidden');
                    });
                    
                    // Activate the target tab
                    if (tabButton) {
                        tabButton.classList.add('active', 'border-green-600', 'text-green-600');
                        tabButton.classList.remove('border-transparent', 'text-gray-500');
                    }
                    
                    // Show target content
                    targetElement.classList.remove('hidden');
                    targetElement.classList.add('active');
                }
                
                // Scroll to the element
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    toggleMobileMenu();
                }
            }
        });
    });

    // Update active navigation on scroll
    window.addEventListener('scroll', updateActiveNavigation);
}

// Update active navigation based on scroll position
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const scrollPos = window.pageYOffset + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-houston-primary');
        link.classList.add('text-houston-gray');
        
        if (link.getAttribute('href') === '#' + current) {
            link.classList.remove('text-houston-gray');
            link.classList.add('text-houston-primary');
        }
    });
}

// Tab navigation functionality
function initTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons
            tabButtons.forEach(btn => {
                btn.classList.remove('active', 'border-green-600', 'text-green-600');
                btn.classList.add('border-transparent', 'text-gray-500');
            });
            
            // Add active class to clicked button
            this.classList.add('active', 'border-green-600', 'text-green-600');
            this.classList.remove('border-transparent', 'text-gray-500');
            
            // Hide all tab contents
            tabContents.forEach(content => {
                content.classList.remove('active');
                content.classList.add('hidden');
            });
            
            // Show target tab content
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
                targetContent.classList.remove('hidden');
                
                // Scroll to the top of the section
                const headerOffset = 80;
                const elementPosition = targetContent.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Trigger scroll animations for newly visible content
                triggerScrollAnimations(targetContent);
            }
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', toggleMobileMenu);
    }
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.querySelector('#mobile-menu-button i');
    
    if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('animate-fade-in-up');
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
    } else {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('animate-fade-in-up');
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.property-card, .investment-card, .feature-icon, .testimonial-card');
    animateElements.forEach(el => observer.observe(el));
}

function triggerScrollAnimations(container) {
    const elements = container.querySelectorAll('.property-card, .investment-card, .feature-icon, .testimonial-card');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('animate-fade-in-up');
        }, index * 100);
    });
}

// Audience cards functionality
function initAudienceCards() {
    const audienceCards = document.querySelectorAll('.audience-card');
    
    audienceCards.forEach(card => {
        card.addEventListener('click', function() {
            const audience = this.getAttribute('data-audience');
            const tabButton = document.querySelector(`[data-tab="${audience}"]`);
            
            if (tabButton) {
                // Scroll to tabs section
                const tabsSection = document.querySelector('.sticky');
                if (tabsSection) {
                    tabsSection.scrollIntoView({ behavior: 'smooth' });
                }
                
                // Activate the corresponding tab after a short delay
                setTimeout(() => {
                    tabButton.click();
                }, 500);
            }
        });
    });
}

// Form handling
function initForms() {
    // Property Valuation Form
    const propertyForm = document.getElementById('property-valuation-form');
    if (propertyForm) {
        propertyForm.addEventListener('submit', handlePropertyValuationSubmit);
    }

    // Developer Consultation Form
    const developerForm = document.getElementById('developer-consultation-form');
    if (developerForm) {
        developerForm.addEventListener('submit', handleDeveloperConsultationSubmit);
    }

    // Investment Interest Form
    const investmentForm = document.getElementById('investment-interest-form');
    if (investmentForm) {
        investmentForm.addEventListener('submit', handleInvestmentInterestSubmit);
    }
}

// Property valuation form handler
function handlePropertyValuationSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Show loading state
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Processing...';
    submitButton.disabled = true;
    submitButton.classList.add('loading');

    // Simulate API call
    setTimeout(() => {
        // Calculate estimated value
        const estimatedValue = calculatePropertyValue(data);
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        submitButton.classList.remove('loading');
        
        // Show results
        showPropertyValuationResults(data, estimatedValue);
        
        // Show success notification
        showNotification('Your property valuation has been calculated! We\'ll contact you within 24 hours.', 'success');
        
        // Reset form
        e.target.reset();
    }, 2000);
}

// Developer consultation form handler
function handleDeveloperConsultationSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Get selected areas
    const selectedAreas = Array.from(e.target.querySelectorAll('input[name="areas"]:checked'))
        .map(checkbox => checkbox.value);
    data.areas = selectedAreas;
    
    // Show loading state
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Scheduling...';
    submitButton.disabled = true;
    submitButton.classList.add('loading');

    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        submitButton.classList.remove('loading');
        
        // Show success notification
        showNotification('Thank you! We\'ll contact you within 24 hours to schedule your consultation.', 'success');
        
        // Reset form
        e.target.reset();
    }, 1500);
}

// Investment interest form handler
function handleInvestmentInterestSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Get selected investment focus
    const selectedFocus = Array.from(e.target.querySelectorAll('input[name="focus"]:checked'))
        .map(checkbox => checkbox.value);
    data.focus = selectedFocus;
    
    // Show loading state
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Processing...';
    submitButton.disabled = true;
    submitButton.classList.add('loading');

    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        submitButton.classList.remove('loading');
        
        // Show success notification
        showNotification('Thank you for your interest! Investment information will be sent to your email.', 'success');
        
        // Reset form
        e.target.reset();
    }, 1500);
}

// Property value calculation
function calculatePropertyValue(data) {
    // Base value per acre based on property type
    const baseValues = {
        'vacant-land': 50000,
        'development-site': 150000,
        'commercial': 300000,
        'distressed': 75000,
        'estate': 100000
    };
    
    const baseValue = baseValues[data.propertyType] || 100000;
    const size = parseFloat(data.size) || 1;
    
    // Apply timeline multiplier
    const timelineMultipliers = {
        'immediate': 0.95,
        '30-days': 0.98,
        '60-days': 1.0,
        '6-months': 1.05,
        'no-rush': 1.1
    };
    
    const timelineMultiplier = timelineMultipliers[data.timeline] || 1.0;
    
    // Calculate estimated value
    const estimatedValue = baseValue * size * timelineMultiplier;
    
    return Math.round(estimatedValue);
}

// Show property valuation results
function showPropertyValuationResults(data, estimatedValue) {
    const modal = createPropertyValuationModal(data, estimatedValue);
    document.body.appendChild(modal);
    
    // Show modal
    setTimeout(() => {
        modal.classList.add('show');
    }, 100);
}

// Create property valuation modal
function createPropertyValuationModal(data, estimatedValue) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 opacity-0 transition-all duration-300';
    
    modal.innerHTML = `
        <div class="bg-white rounded-xl p-8 max-w-2xl w-full max-h-90vh overflow-y-auto">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-2xl font-bold text-houston-green">Property Valuation Results</h3>
                <button onclick="closeModal(this)" class="text-houston-gray hover:text-houston-green">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            
            <div class="space-y-6">
                <div class="bg-houston-light rounded-lg p-6 text-center">
                    <div class="text-sm text-houston-gray mb-2">Estimated Market Value</div>
                    <div class="text-4xl font-bold text-houston-green">$${estimatedValue.toLocaleString()}</div>
                    <div class="text-sm text-houston-gray mt-2">Based on current Houston market data</div>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                    <div class="bg-white border border-gray-200 rounded-lg p-4">
                        <div class="text-sm text-houston-gray">Property Type</div>
                        <div class="font-semibold text-houston-green capitalize">${data.propertyType.replace('-', ' ')}</div>
                    </div>
                    <div class="bg-white border border-gray-200 rounded-lg p-4">
                        <div class="text-sm text-houston-gray">Size</div>
                        <div class="font-semibold text-houston-green">${data.size} acres</div>
                    </div>
                    <div class="bg-white border border-gray-200 rounded-lg p-4">
                        <div class="text-sm text-houston-gray">Timeline</div>
                        <div class="font-semibold text-houston-green capitalize">${data.timeline.replace('-', ' ')}</div>
                    </div>
                    <div class="bg-white border border-gray-200 rounded-lg p-4">
                        <div class="text-sm text-houston-gray">Value per Acre</div>
                        <div class="font-semibold text-houston-green">$${Math.round(estimatedValue / parseFloat(data.size)).toLocaleString()}</div>
                    </div>
                </div>
                
                <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 class="font-semibold text-green-800 mb-2">Next Steps</h4>
                    <ul class="text-green-700 text-sm space-y-1">
                        <li>• We'll contact you within 24 hours to discuss your property</li>
                        <li>• Schedule a free property inspection if needed</li>
                        <li>• Receive a formal cash offer within 48 hours</li>
                        <li>• Close in as little as 7 days</li>
                    </ul>
                </div>
                
                <div class="flex space-x-4">
                    <button onclick="closeModal(this)" class="flex-1 border border-houston-green text-houston-green px-6 py-3 rounded-lg font-medium hover:bg-houston-green hover:text-white transition-colors">
                        Close
                    </button>
                    <a href="tel:713-828-3701" class="flex-1 bg-houston-green text-white px-6 py-3 rounded-lg font-medium text-center hover:bg-houston-primary transition-colors">
                        Call Now
                    </a>
                </div>
            </div>
        </div>
    `;
    
    return modal;
}

// Property valuation tool
function initPropertyValuation() {
    // Add real-time validation and calculations
    const propertyForm = document.getElementById('property-valuation-form');
    if (propertyForm) {
        const inputs = propertyForm.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('change', updatePropertyEstimate);
        });
    }
}

function updatePropertyEstimate() {
    const form = document.getElementById('property-valuation-form');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Only calculate if we have essential data
    if (data.propertyType && data.size) {
        const estimatedValue = calculatePropertyValue(data);
        
        // Show mini preview
        let preview = document.getElementById('value-preview');
        if (!preview) {
            preview = document.createElement('div');
            preview.id = 'value-preview';
            preview.className = 'mt-4 p-3 bg-houston-light rounded-lg text-center';
            form.appendChild(preview);
        }
        
        preview.innerHTML = `
            <div class="text-sm text-houston-gray">Estimated Value</div>
            <div class="text-xl font-bold text-houston-green">$${estimatedValue.toLocaleString()}</div>
        `;
    }
}

// ROI Calculator
function calculateROI() {
    const landCost = parseFloat(document.getElementById('land-cost').value) || 0;
    const developmentCost = parseFloat(document.getElementById('development-cost').value) || 0;
    const salePrice = parseFloat(document.getElementById('sale-price').value) || 0;
    const timeline = parseFloat(document.getElementById('timeline').value) || 24;
    const financingRate = parseFloat(document.getElementById('financing-rate').value) || 0;
    
    if (landCost === 0 || developmentCost === 0 || salePrice === 0) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Calculate results
    const totalInvestment = landCost + developmentCost;
    const financingCosts = (totalInvestment * (financingRate / 100) * (timeline / 12));
    const totalCosts = totalInvestment + financingCosts;
    const totalProfit = salePrice - totalCosts;
    const roi = (totalProfit / totalInvestment) * 100;
    const annualizedROI = roi * (12 / timeline);
    
    // Display results
    document.getElementById('total-investment').textContent = `$${totalInvestment.toLocaleString()}`;
    document.getElementById('total-profit').textContent = `$${totalProfit.toLocaleString()}`;
    document.getElementById('roi-percentage').textContent = `${roi.toFixed(1)}%`;
    document.getElementById('annualized-roi').textContent = `${annualizedROI.toFixed(1)}%`;
    document.getElementById('financing-costs').textContent = `$${financingCosts.toLocaleString()}`;
    
    // Add color coding
    const profitElement = document.getElementById('total-profit');
    const roiElement = document.getElementById('roi-percentage');
    const annualizedElement = document.getElementById('annualized-roi');
    
    if (totalProfit > 0) {
        profitElement.className = 'text-2xl font-bold text-green-600';
        roiElement.className = 'text-2xl font-bold text-green-600';
        annualizedElement.className = 'text-2xl font-bold text-green-600';
    } else {
        profitElement.className = 'text-2xl font-bold text-red-600';
        roiElement.className = 'text-2xl font-bold text-red-600';
        annualizedElement.className = 'text-2xl font-bold text-red-600';
    }
}

// Advanced ROI Calculator Functions
const ASSUMPTIONS = {
    constructionCostPerSqft: 115,
    softCostsPerUnit: 37857,
    realtorFeePct: 0.06,
    closingCosts: 5235,
    buyerConcessions: 10000,
};

const CHART_COLORS = {
    primary: '#15803d', // houston-green
    secondary: '#22c55e', // houston-accent
    tertiary: '#16a34a', // houston-primary
    gray: '#64748b',
    light: '#f8fafc'
};

let costChart = null;
let summaryChart = null;

function calculateAdvancedROI() {
    // Get input values
    const landPrice = parseFloat(document.getElementById('landPrice').value) || 0;
    const units = parseInt(document.getElementById('numberOfUnits').value, 10) || 0;
    const unitSize = parseFloat(document.getElementById('unitSize').value) || 0;
    const salesPrice = parseFloat(document.getElementById('salesPrice').value) || 0;
    
    // Validate inputs
    if (!validateROIInputs()) {
        return;
    }
    
    // Show loading
    document.getElementById('loadingOverlay').classList.remove('hidden');
    
    // Simulate calculation time for UX
    setTimeout(() => {
        performAdvancedCalculation();
        document.getElementById('loadingOverlay').classList.add('hidden');
    }, 300);
}

function validateROIInputs() {
    let isValid = true;
    const errors = {
        landPrice: document.getElementById('error-landPrice'),
        numberOfUnits: document.getElementById('error-numberOfUnits'),
        unitSize: document.getElementById('error-unitSize'),
        salesPrice: document.getElementById('error-salesPrice')
    };
    
    // Clear previous errors
    Object.values(errors).forEach(el => {
        el.textContent = '';
        el.classList.add('hidden');
    });
    
    const landPrice = parseFloat(document.getElementById('landPrice').value);
    const units = parseInt(document.getElementById('numberOfUnits').value, 10);
    const unitSize = parseFloat(document.getElementById('unitSize').value);
    const salesPrice = parseFloat(document.getElementById('salesPrice').value);
    
    if (isNaN(landPrice) || landPrice <= 0) {
        errors.landPrice.textContent = 'Please enter a valid land price.';
        errors.landPrice.classList.remove('hidden');
        isValid = false;
    }
    
    if (isNaN(units) || units < 1 || units > 100) {
        errors.numberOfUnits.textContent = 'Units must be between 1 and 100.';
        errors.numberOfUnits.classList.remove('hidden');
        isValid = false;
    }
    
    if (isNaN(unitSize) || unitSize < 500 || unitSize > 5000) {
        errors.unitSize.textContent = 'Size must be between 500 and 5000 sq ft.';
        errors.unitSize.classList.remove('hidden');
        isValid = false;
    }
    
    if (isNaN(salesPrice) || salesPrice <= 0) {
        errors.salesPrice.textContent = 'Please enter a valid sales price.';
        errors.salesPrice.classList.remove('hidden');
        isValid = false;
    }
    
    return isValid;
}

function performAdvancedCalculation() {
    const landPrice = parseFloat(document.getElementById('landPrice').value);
    const units = parseInt(document.getElementById('numberOfUnits').value, 10);
    const unitSize = parseFloat(document.getElementById('unitSize').value);
    const salesPrice = parseFloat(document.getElementById('salesPrice').value);
    
    // Cost calculations
    const landCostPerUnit = landPrice / units;
    const constructionCostPerUnit = unitSize * ASSUMPTIONS.constructionCostPerSqft;
    const softCostPerUnit = ASSUMPTIONS.softCostsPerUnit;
    const totalCostPerUnit = landCostPerUnit + constructionCostPerUnit + softCostPerUnit;
    const totalProjectCost = totalCostPerUnit * units;
    
    // Revenue calculations
    const realtorFees = salesPrice * ASSUMPTIONS.realtorFeePct;
    const netRevenuePerUnit = salesPrice - realtorFees - ASSUMPTIONS.closingCosts - ASSUMPTIONS.buyerConcessions;
    const totalNetRevenue = netRevenuePerUnit * units;
    
    // Profit calculations
    const profitPerUnit = netRevenuePerUnit - totalCostPerUnit;
    const totalProfit = profitPerUnit * units;
    const roi = (totalProfit / totalProjectCost) * 100;
    const profitMargin = (totalProfit / totalNetRevenue) * 100;
    const breakEvenUnits = netRevenuePerUnit > 0 ? Math.ceil(totalProjectCost / netRevenuePerUnit) : 'N/A';
    
    // Update tables
    updateCostTable({
        landCostPerUnit,
        constructionCostPerUnit,
        softCostPerUnit,
        totalCostPerUnit,
        totalProjectCost,
        units
    });
    
    updateRevenueTable({
        salesPrice,
        realtorFees,
        closingCosts: ASSUMPTIONS.closingCosts,
        buyerConcessions: ASSUMPTIONS.buyerConcessions,
        netRevenuePerUnit,
        totalNetRevenue,
        units
    });
    
    updateProfitTable({
        profitPerUnit,
        totalProfit,
        roi,
        profitMargin,
        breakEvenUnits,
        units
    });
    
    // Update charts
    updateCharts({
        landCost: landPrice,
        constructionCost: constructionCostPerUnit * units,
        softCosts: softCostPerUnit * units,
        totalRevenue: salesPrice * units,
        totalCosts: totalProjectCost,
        totalProfit
    });
}

function updateCostTable(data) {
    const table = document.getElementById('costTable');
    table.innerHTML = `
        <tbody class="text-sm">
            <tr class="border-b border-gray-100">
                <td class="py-3 text-houston-gray">Land Cost per Unit</td>
                <td class="py-3 text-right font-semibold">${formatCurrency(data.landCostPerUnit)}</td>
            </tr>
            <tr class="border-b border-gray-100">
                <td class="py-3 text-houston-gray">Construction Cost per Unit</td>
                <td class="py-3 text-right font-semibold">${formatCurrency(data.constructionCostPerUnit)}</td>
            </tr>
            <tr class="border-b border-gray-100">
                <td class="py-3 text-houston-gray">Soft Costs per Unit</td>
                <td class="py-3 text-right font-semibold">${formatCurrency(data.softCostPerUnit)}</td>
            </tr>
            <tr class="border-b border-gray-200">
                <td class="py-3 font-bold text-houston-green">Total Cost per Unit</td>
                <td class="py-3 text-right font-bold text-houston-green">${formatCurrency(data.totalCostPerUnit)}</td>
            </tr>
            <tr>
                <td class="py-3 font-bold text-houston-green">Total Project Cost (${data.units} units)</td>
                <td class="py-3 text-right font-bold text-houston-green text-lg">${formatCurrency(data.totalProjectCost)}</td>
            </tr>
        </tbody>
    `;
}

function updateRevenueTable(data) {
    const table = document.getElementById('revenueTable');
    table.innerHTML = `
        <tbody class="text-sm">
            <tr class="border-b border-gray-100">
                <td class="py-3 text-houston-gray">Sales Price per Unit</td>
                <td class="py-3 text-right font-semibold">${formatCurrency(data.salesPrice)}</td>
            </tr>
            <tr class="border-b border-gray-100">
                <td class="py-3 text-houston-gray">Less: Realtor Fees (6%)</td>
                <td class="py-3 text-right font-semibold text-red-600">-${formatCurrency(data.realtorFees)}</td>
            </tr>
            <tr class="border-b border-gray-100">
                <td class="py-3 text-houston-gray">Less: Closing Costs</td>
                <td class="py-3 text-right font-semibold text-red-600">-${formatCurrency(data.closingCosts)}</td>
            </tr>
            <tr class="border-b border-gray-100">
                <td class="py-3 text-houston-gray">Less: Buyer Concessions</td>
                <td class="py-3 text-right font-semibold text-red-600">-${formatCurrency(data.buyerConcessions)}</td>
            </tr>
            <tr class="border-b border-gray-200">
                <td class="py-3 font-bold text-houston-green">Net Revenue per Unit</td>
                <td class="py-3 text-right font-bold text-houston-green">${formatCurrency(data.netRevenuePerUnit)}</td>
            </tr>
            <tr>
                <td class="py-3 font-bold text-houston-green">Total Net Revenue (${data.units} units)</td>
                <td class="py-3 text-right font-bold text-houston-green text-lg">${formatCurrency(data.totalNetRevenue)}</td>
            </tr>
        </tbody>
    `;
}

function updateProfitTable(data) {
    const table = document.getElementById('profitTable');
    const profitClass = data.totalProfit > 0 ? 'text-green-600' : 'text-red-600';
    
    table.innerHTML = `
        <tbody class="text-sm">
            <tr class="border-b border-gray-100">
                <td class="py-3 text-houston-gray">Profit per Unit</td>
                <td class="py-3 text-right font-semibold ${profitClass}">${formatCurrency(data.profitPerUnit)}</td>
            </tr>
            <tr class="border-b border-gray-100">
                <td class="py-3 text-houston-gray">Total Project Profit</td>
                <td class="py-3 text-right font-bold ${profitClass} text-lg">${formatCurrency(data.totalProfit)}</td>
            </tr>
            <tr class="border-b border-gray-100">
                <td class="py-3 text-houston-gray">Return on Investment (ROI)</td>
                <td class="py-3 text-right font-bold ${profitClass} text-lg">${data.roi.toFixed(1)}%</td>
            </tr>
            <tr class="border-b border-gray-100">
                <td class="py-3 text-houston-gray">Profit Margin</td>
                <td class="py-3 text-right font-semibold">${data.profitMargin.toFixed(1)}%</td>
            </tr>
            <tr>
                <td class="py-3 text-houston-gray">Break-even Units</td>
                <td class="py-3 text-right font-semibold">${data.breakEvenUnits} of ${data.units}</td>
            </tr>
        </tbody>
    `;
}

function updateCharts(data) {
    // Destroy existing charts if they exist
    if (costChart) {
        costChart.destroy();
    }
    if (summaryChart) {
        summaryChart.destroy();
    }
    
    // Cost Composition Chart
    const costCtx = document.getElementById('costChart').getContext('2d');
    costChart = new Chart(costCtx, {
        type: 'doughnut',
        data: {
            labels: ['Land Cost', 'Construction', 'Soft Costs'],
            datasets: [{
                data: [data.landCost, data.constructionCost, data.softCosts],
                backgroundColor: [CHART_COLORS.primary, CHART_COLORS.secondary, CHART_COLORS.tertiary],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 10,
                        font: {
                            size: 12
                        }
                    }
                }
            }
        }
    });
    
    // Project Summary Chart
    const summaryCtx = document.getElementById('summaryChart').getContext('2d');
    summaryChart = new Chart(summaryCtx, {
        type: 'bar',
        data: {
            labels: ['Total Revenue', 'Total Costs', 'Total Profit'],
            datasets: [{
                data: [data.totalRevenue, data.totalCosts, data.totalProfit],
                backgroundColor: [CHART_COLORS.secondary, CHART_COLORS.gray, data.totalProfit > 0 ? CHART_COLORS.primary : '#ef4444'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + (value / 1000000).toFixed(1) + 'M';
                        }
                    }
                }
            }
        }
    });
}

function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    }).format(value);
}

function resetROICalculator() {
    // Reset all inputs
    document.getElementById('landPrice').value = '';
    document.getElementById('numberOfUnits').value = '';
    document.getElementById('unitSize').value = '';
    document.getElementById('salesPrice').value = '';
    
    // Clear errors
    const errorElements = document.querySelectorAll('[id^="error-"]');
    errorElements.forEach(el => {
        el.textContent = '';
        el.classList.add('hidden');
    });
    
    // Reset tables
    document.getElementById('costTable').innerHTML = '<tbody class="text-sm"><tr class="border-b border-gray-100"><td class="py-2 text-houston-gray">Awaiting calculation...</td></tr></tbody>';
    document.getElementById('revenueTable').innerHTML = '<tbody class="text-sm"><tr class="border-b border-gray-100"><td class="py-2 text-houston-gray">Awaiting calculation...</td></tr></tbody>';
    document.getElementById('profitTable').innerHTML = '<tbody class="text-sm"><tr class="border-b border-gray-100"><td class="py-2 text-houston-gray">Awaiting calculation...</td></tr></tbody>';
    
    // Destroy charts
    if (costChart) {
        costChart.destroy();
        costChart = null;
    }
    if (summaryChart) {
        summaryChart.destroy();
        summaryChart = null;
    }
}

// Tool management - make globally accessible
window.openTool = function(toolName) {
    // Hide all tools first
    const allTools = document.querySelectorAll('[id$="-tool"]');
    allTools.forEach(tool => {
        tool.classList.add('hidden');
    });
    
    // Show selected tool
    const toolId = toolName + '-tool';
    const tool = document.getElementById(toolId);
    
    if (tool) {
        tool.classList.remove('hidden');
        tool.scrollIntoView({ behavior: 'auto', block: 'center' });
        
        // Re-initialize Chapter 42 tool if needed (no delay for speed)
        if ((toolName === 'chapter42' || toolName === 'chapter42-tool') && typeof initChapter42Tool === 'function') {
            if (!window.chapter42Initialized) {
                initChapter42Tool();
            }
        }
    }
}

window.closeTool = function(toolName) {
    // Handle both full IDs and partial names
    const toolId = toolName.endsWith('-tool') ? toolName : toolName + '-tool';
    const tool = document.getElementById(toolId);
    if (tool) {
        tool.classList.add('hidden');
    }
}

// Close modal
window.closeModal = function(element) {
    const modal = element.closest('.fixed');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Houston Development Timeline Functions
function togglePhaseDetails(element) {
    const details = element.querySelector('.phase-details');
    const icon = element.querySelector('.expand-icon');
    
    if (details && icon) {
        details.classList.toggle('hidden');
        icon.classList.toggle('rotate-180');
    }
}

function downloadTimelinePDF() {
    // Show notification that PDF generation would be implemented
    showNotification('PDF download functionality would be implemented here', 'info');
}

function downloadTimelineChecklist() {
    // Generate a simple checklist text file
    let checklist = "Houston Land Development Timeline Checklist\n";
    checklist += "==========================================\n\n";
    
    const phases = [
        { name: "Pre-Development Phase", duration: "2-4 months", tasks: ["Initial site assessment", "Preliminary feasibility study", "Letter of intent negotiation", "Due diligence period"] },
        { name: "Land Acquisition", duration: "1-3 months", tasks: ["Purchase agreement finalization", "Title examination and insurance", "Environmental Phase I assessment", "Survey and boundary verification", "Closing coordination"] },
        { name: "Feasibility & Planning", duration: "3-6 months", tasks: ["Market analysis and absorption study", "Preliminary site plan development", "Utility availability assessment", "Traffic impact study", "Environmental assessments", "Preliminary cost estimates"] },
        { name: "Entitlements & Approvals", duration: "6-12 months", tasks: ["Rezoning applications", "Variance requests", "Plat approval process", "Utility district creation/annexation", "MUD/PUD formation", "Development agreement negotiation"] },
        { name: "Design & Engineering", duration: "4-6 months", tasks: ["Civil engineering plans", "Drainage and detention design", "Street and utility design", "Landscape architecture", "Lighting design", "Construction documentation"] },
        { name: "Financing & Investment", duration: "2-4 months", tasks: ["Construction loan application", "Equity partner negotiations", "Financial projections update", "Insurance and bonding", "Legal entity formation"] },
        { name: "Construction Phase", duration: "12-18 months", tasks: ["Site clearing and grading", "Utility installation", "Street construction", "Drainage system installation", "Lot preparation", "Quality control inspections"] },
        { name: "Marketing & Pre-Sales", duration: "Ongoing", tasks: ["Marketing plan development", "Builder negotiations", "Model home coordination", "Sales center setup", "Digital marketing campaign", "Broker relationships"] },
        { name: "Final Approvals", duration: "2-3 months", tasks: ["Final plat approval", "Infrastructure inspections", "Utility acceptances", "Street dedication", "HOA formation", "CC&R recording"] },
        { name: "Project Closeout", duration: "3-6 months", tasks: ["Lot sales to builders", "Infrastructure warranty period", "HOA transition", "Final accounting", "Investor distributions", "Project documentation"] }
    ];
    
    phases.forEach((phase, index) => {
        checklist += `${index + 1}. ${phase.name} (${phase.duration})\n`;
        phase.tasks.forEach(task => {
            checklist += `   [ ] ${task}\n`;
        });
        checklist += "\n";
    });
    
    checklist += "\nNotes:\n";
    checklist += "- Timeline can vary based on location and project complexity\n";
    checklist += "- Houston's lack of zoning may expedite some phases\n";
    checklist += "- MUD/PUD formation is critical for infrastructure financing\n";
    checklist += "- Consider seasonal factors (hurricane season, drainage)\n";
    
    // Create download link
    const blob = new Blob([checklist], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'houston-development-timeline-checklist.txt';
    a.click();
    window.URL.revokeObjectURL(url);
    
    showNotification('Checklist downloaded successfully!', 'success');
}

function calculateProjectCosts() {
    // Switch to ROI calculator
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector('[onclick*="tools"]').classList.add('active');
    
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.add('hidden');
    });
    document.getElementById('tools').classList.remove('hidden');
    
    // Open ROI calculator
    openTool('roi-calculator');
    
    showNotification('Switched to ROI Calculator', 'info');
}

// Houston Chapter 42 Constants
const CHAPTER42_CONSTANTS = {
    MIN_LOT_SIZE_URBAN: 3500,
    MIN_LOT_SIZE_SUBURBAN: 5000,
    MIN_LOT_SIZE_REDUCED: 1400,
    MAX_DENSITY_SINGLE_FAMILY: 27,
    MAX_DENSITY_MULTI_FAMILY: 30,
    SETBACK_MAJOR_THOROUGHFARE: 25,
    SETBACK_COLLECTOR_STREET: 10,
    SETBACK_LOCAL_STREET_FRONT: 10,
    SETBACK_LOCAL_STREET_SIDE: 10,
    SETBACK_SHARED_DRIVEWAY: 3,
    PARKING_SINGLE_FAMILY: 2,
    PARKING_MULTI_FAMILY: {
        efficiency: 1.25,
        one_bedroom: 1.333,
        two_bedroom: 1.666,
        three_plus_bedroom: 2.0
    },
    MIN_LOT_WIDTH: 15,
    MIN_AVG_LOT_WIDTH: 18,
    MAX_LOT_COVERAGE: 0.6,
    MIN_PERMEABLE_AREA: 150,
    MIN_COMPENSATING_OPEN_SPACE: 240,
    OPEN_SPACE_DIMENSIONS: [20, 12]
};

// Chapter 42 state - defined in chapter42.js

// Notifications
function initNotifications() {
    // Create notification container
    if (!document.getElementById('notification-container')) {
        const container = document.createElement('div');
        container.id = 'notification-container';
        container.className = 'fixed top-4 right-4 z-50 space-y-2';
        document.body.appendChild(container);
    }
}

function showNotification(message, type = 'info', duration = 5000) {
    const container = document.getElementById('notification-container');
    if (!container) {
        initNotifications();
    }
    const notification = document.createElement('div');
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle',
        warning: 'fa-exclamation-triangle'
    };
    
    const colors = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-blue-500',
        warning: 'bg-yellow-500'
    };
    
    notification.className = `${colors[type]} text-white p-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 flex items-center space-x-3 max-w-sm`;
    notification.innerHTML = `
        <i class="fas ${icons[type]} text-lg flex-shrink-0"></i>
        <span class="flex-1">${message}</span>
        <button onclick="removeNotification(this)" class="text-white hover:text-gray-200 flex-shrink-0">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    container.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        removeNotification(notification);
    }, duration);
    
    return notification;
}

function removeNotification(element) {
    const notification = element.closest('.bg-green-500, .bg-red-500, .bg-blue-500, .bg-yellow-500');
    if (notification) {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }
}

// Tooltips
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(e) {
    const message = e.target.getAttribute('data-tooltip');
    const tooltip = document.createElement('div');
    tooltip.className = 'fixed bg-black text-white px-2 py-1 rounded text-sm z-50 pointer-events-none';
    tooltip.textContent = message;
    tooltip.id = 'tooltip';
    
    document.body.appendChild(tooltip);
    
    const rect = e.target.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
}

function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/\D/g, ''));
}

// Local storage utilities
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.warn('Failed to save to localStorage:', e);
    }
}

function loadFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.warn('Failed to load from localStorage:', e);
        return null;
    }
}

// Performance monitoring
function logPerformance() {
    if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
    }
}

// Initialize performance monitoring
window.addEventListener('load', logPerformance);

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Could send error to analytics service here
});

// Unhandled promise rejection handling
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    // Could send error to analytics service here
});

// Service worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment when service worker is ready
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

// Analytics tracking (placeholder for Google Analytics)
function trackEvent(category, action, label = null, value = null) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value
        });
    }
}

// Track form submissions
document.addEventListener('submit', function(e) {
    const formId = e.target.id;
    if (formId) {
        trackEvent('Form', 'Submit', formId);
    }
});

// Track button clicks
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
        const button = e.target.tagName === 'BUTTON' ? e.target : e.target.closest('button');
        const buttonText = button.textContent.trim();
        trackEvent('Button', 'Click', buttonText);
    }
});

// FAQ Toggle Function
function toggleFAQ(button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector('i');
    
    // Toggle visibility
    content.classList.toggle('hidden');
    
    // Rotate icon
    icon.classList.toggle('rotate-180');
    
    // Add smooth transition
    if (!content.classList.contains('hidden')) {
        content.style.maxHeight = content.scrollHeight + 'px';
    } else {
        content.style.maxHeight = '0';
    }
}

// Counter Animation Functions
function initCounterAnimations() {
    const counters = document.querySelectorAll('.counter');
    const options = {
        threshold: 0.7,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                observer.unobserve(counter);
            }
        });
    }, options);

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(counter) {
    const target = parseInt(counter.dataset.target);
    const suffix = counter.dataset.suffix || '';
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        counter.textContent = Math.floor(current).toLocaleString() + suffix;
    }, 16);
}

// Activity Ticker Function
function initActivityTicker() {
    const ticker = document.getElementById('activity-ticker');
    if (!ticker) return;

    const activities = [
        "Sarah M. generated a 5-lot subdivision plan",
        "Mike R. calculated density for 2.5-acre site",
        "Jennifer L. exported site plan to PDF",
        "David K. optimized layout for maximum units",
        "Lisa P. checked Chapter 42 compliance",
        "Tom W. created presentation-ready report",
        "Maria S. designed suburban development",
        "John D. validated setback requirements"
    ];

    let currentIndex = 0;

    function updateTicker() {
        ticker.style.opacity = '0';
        
        setTimeout(() => {
            ticker.textContent = activities[currentIndex];
            ticker.style.opacity = '1';
            currentIndex = (currentIndex + 1) % activities.length;
        }, 300);
    }

    // Initial display
    ticker.textContent = activities[0];
    currentIndex = 1;

    // Update every 4 seconds
    setInterval(updateTicker, 4000);
}

// Video Demo Function
function playVideoDemo() {
    // Placeholder for video demo functionality
    console.log('Video demo would open here');
    // Could open a modal with embedded video or redirect to video page
    trackEvent('Hero', 'Video Demo Click');
}

// Mobile Experience Enhancements
function initMobileEnhancements() {
    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Add mobile class to body
        document.body.classList.add('mobile-device');
        
        // Enhance touch interactions for tools
        enhanceTouchInteractions();
        
        // Optimize chart display for mobile
        optimizeChartsForMobile();
        
        // Add mobile-specific styles
        addMobileSpecificStyles();
    }
}

function enhanceTouchInteractions() {
    // Add touch feedback to buttons
    const buttons = document.querySelectorAll('button, .btn');
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Enhance form inputs for mobile
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        // Prevent zoom on iOS
        if (input.type === 'number' || input.type === 'text' || input.type === 'email') {
            input.style.fontSize = '16px';
        }
        
        // Add mobile-friendly classes
        input.classList.add('mobile-friendly-input');
    });
}

function optimizeChartsForMobile() {
    // Add responsive chart containers
    const chartContainers = document.querySelectorAll('canvas');
    chartContainers.forEach(container => {
        const parent = container.parentElement;
        if (parent) {
            parent.classList.add('mobile-chart-container');
        }
    });
}

function addMobileSpecificStyles() {
    // Create mobile-specific style overrides
    const mobileStyles = `
        .mobile-device .tool-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
        }
        
        .mobile-device .tool-input-section {
            order: 1;
        }
        
        .mobile-device .tool-chart-section {
            order: 2;
            max-height: 400px;
            overflow-y: auto;
        }
        
        .mobile-device .mobile-chart-container {
            height: 300px;
            width: 100%;
        }
        
        .mobile-device input, 
        .mobile-device select, 
        .mobile-device textarea {
            font-size: 16px !important;
            min-height: 44px;
        }
        
        .mobile-device button,
        .mobile-device .btn {
            min-height: 44px;
            min-width: 44px;
            font-size: 16px;
        }
    `;
    
    // Add styles to document
    const styleSheet = document.createElement('style');
    styleSheet.textContent = mobileStyles;
    document.head.appendChild(styleSheet);
}

// Enhanced Loading States and Progress Indicators
function showProgressIndicator(taskName, steps = []) {
    const progressModal = createProgressModal(taskName, steps);
    document.body.appendChild(progressModal);
    return new ProgressTracker(progressModal, steps);
}

function createProgressModal(taskName, steps) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/50 z-50 flex items-center justify-center progress-modal';
    modal.innerHTML = `
        <div class="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div class="text-center mb-6">
                <h3 class="text-xl font-bold text-houston-green mb-2">${taskName}</h3>
                <div class="progress-bar bg-gray-200 rounded-full h-3 mb-4">
                    <div class="progress-fill bg-houston-green rounded-full h-full transition-all duration-500" style="width: 0%"></div>
                </div>
                <p class="text-houston-gray current-step">Initializing...</p>
            </div>
            <div class="steps-list space-y-2">
                ${steps.map((step, index) => `
                    <div class="step-item flex items-center text-sm text-gray-500" data-step="${index}">
                        <div class="step-indicator w-4 h-4 rounded-full border-2 border-gray-300 mr-3 flex-shrink-0">
                            <div class="step-check hidden w-full h-full bg-houston-green rounded-full"></div>
                        </div>
                        <span>${step}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    return modal;
}

class ProgressTracker {
    constructor(modal, steps) {
        this.modal = modal;
        this.steps = steps;
        this.currentStep = 0;
        this.progressFill = modal.querySelector('.progress-fill');
        this.currentStepText = modal.querySelector('.current-step');
        this.stepItems = modal.querySelectorAll('.step-item');
    }
    
    updateProgress(stepIndex, stepText = null) {
        this.currentStep = stepIndex;
        const progress = ((stepIndex + 1) / this.steps.length) * 100;
        
        // Update progress bar
        this.progressFill.style.width = `${progress}%`;
        
        // Update current step text
        if (stepText) {
            this.currentStepText.textContent = stepText;
        } else {
            this.currentStepText.textContent = this.steps[stepIndex] || 'Processing...';
        }
        
        // Update step indicators
        this.stepItems.forEach((item, index) => {
            const indicator = item.querySelector('.step-indicator');
            const check = item.querySelector('.step-check');
            
            if (index < stepIndex) {
                // Completed step
                indicator.classList.add('border-houston-green', 'bg-houston-green');
                check.classList.remove('hidden');
                item.classList.add('text-houston-green');
            } else if (index === stepIndex) {
                // Current step
                indicator.classList.add('border-houston-accent');
                item.classList.add('text-houston-primary');
            } else {
                // Future step
                indicator.classList.remove('border-houston-green', 'bg-houston-green', 'border-houston-accent');
                check.classList.add('hidden');
                item.classList.remove('text-houston-green', 'text-houston-primary');
            }
        });
    }
    
    complete(successText = 'Process completed successfully!') {
        this.progressFill.style.width = '100%';
        this.currentStepText.textContent = successText;
        
        // Mark all steps as complete
        this.stepItems.forEach(item => {
            const indicator = item.querySelector('.step-indicator');
            const check = item.querySelector('.step-check');
            indicator.classList.add('border-houston-green', 'bg-houston-green');
            check.classList.remove('hidden');
            item.classList.add('text-houston-green');
        });
        
        // Auto-close after 2 seconds
        setTimeout(() => this.close(), 2000);
    }
    
    error(errorText = 'An error occurred. Please try again.') {
        this.currentStepText.textContent = errorText;
        this.currentStepText.classList.add('text-red-600');
        
        // Add close button
        const closeButton = document.createElement('button');
        closeButton.className = 'mt-4 bg-red-600 text-white px-4 py-2 rounded-lg w-full';
        closeButton.textContent = 'Close';
        closeButton.onclick = () => this.close();
        this.modal.querySelector('.bg-white').appendChild(closeButton);
    }
    
    close() {
        if (this.modal && this.modal.parentNode) {
            this.modal.parentNode.removeChild(this.modal);
        }
    }
}

// Enhanced button loading states
function setButtonLoading(button, isLoading = true, loadingText = 'Loading...') {
    if (isLoading) {
        button.dataset.originalText = button.textContent;
        button.innerHTML = `
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            ${loadingText}
        `;
        button.disabled = true;
        button.classList.add('opacity-75', 'cursor-not-allowed');
    } else {
        button.textContent = button.dataset.originalText || button.textContent;
        button.disabled = false;
        button.classList.remove('opacity-75', 'cursor-not-allowed');
    }
}

// Global loading overlay
function showGlobalLoading(message = 'Loading...') {
    const overlay = document.createElement('div');
    overlay.id = 'global-loading';
    overlay.className = 'fixed inset-0 bg-black/50 z-50 flex items-center justify-center';
    overlay.innerHTML = `
        <div class="bg-white rounded-xl p-8 max-w-sm w-full mx-4 text-center shadow-2xl">
            <div class="animate-spin rounded-full h-12 w-12 border-b-4 border-houston-green mx-auto mb-4"></div>
            <p class="text-houston-gray font-medium">${message}</p>
        </div>
    `;
    document.body.appendChild(overlay);
    return overlay;
}

function hideGlobalLoading() {
    const overlay = document.getElementById('global-loading');
    if (overlay) {
        overlay.remove();
    }
}

// Subtle Animations and Micro-Interactions
function initMicroInteractions() {
    // Add entrance animations to cards
    addEntranceAnimations();
    
    // Enhance form interactions
    enhanceFormInteractions();
    
    // Add ripple effects to buttons
    addRippleEffects();
    
    // Initialize intersection observer for scroll animations
    initScrollAnimations();
    
    // Add hover effects to tool cards
    enhanceToolCardInteractions();
}

function addEntranceAnimations() {
    // Add staggered animation to audience cards
    const cards = document.querySelectorAll('.bg-white.rounded-xl');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.animation = `fadeInUp 0.6s ease-in-out ${index * 0.1}s forwards`;
    });
}

function enhanceFormInteractions() {
    const inputs = document.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        // Add focus/blur animations
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('input-focused');
            this.classList.add('form-valid');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('input-focused');
            
            // Basic validation feedback
            if (this.required && !this.value) {
                this.classList.remove('form-valid');
                this.classList.add('form-invalid');
                setTimeout(() => this.classList.remove('form-invalid'), 500);
            } else if (this.value) {
                this.classList.add('form-valid');
                this.classList.remove('form-invalid');
            }
        });
    });
}

function addRippleEffects() {
    const buttons = document.querySelectorAll('button, .btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple element
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple animation to CSS
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function enhanceToolCardInteractions() {
    const toolCards = document.querySelectorAll('.bg-white.rounded-xl');
    
    toolCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.tab-content, .chart-container, .tool-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Enhanced counter animation with micro-interactions
function animateCounter(counter) {
    const target = parseInt(counter.dataset.target);
    const suffix = counter.dataset.suffix || '';
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    counter.classList.add('counting');
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
            counter.classList.remove('counting');
            
            // Add completion animation
            counter.style.transform = 'scale(1.1)';
            setTimeout(() => {
                counter.style.transform = 'scale(1)';
            }, 200);
        }
        counter.textContent = Math.floor(current).toLocaleString() + suffix;
    }, 16);
}

// Add smooth page transitions
function addPageTransitions() {
    // Fade in body content
    document.body.style.opacity = '0';
    window.addEventListener('load', () => {
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        document.body.style.opacity = '1';
    });
    
    // Smooth link transitions
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Performance Optimizations
function initPerformanceOptimizations() {
    // Lazy load images
    lazyLoadImages();
    
    // Debounce scroll events
    debounceScrollEvents();
    
    // Preload critical resources
    preloadCriticalResources();
    
    // Enable passive event listeners
    enablePassiveListeners();
    
    // Optimize animations for performance
    optimizeAnimations();
}

function lazyLoadImages() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

function debounceScrollEvents() {
    let scrollTimeout;
    const scrollHandlers = [];
    
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = requestAnimationFrame(() => {
            scrollHandlers.forEach(handler => handler());
        });
    }, { passive: true });
    
    // Replace direct scroll listeners with debounced version
    window.addOptimizedScrollListener = (handler) => {
        scrollHandlers.push(handler);
    };
}

function preloadCriticalResources() {
    // Preload critical fonts
    const fontUrls = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
    ];
    
    fontUrls.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = url;
        document.head.appendChild(link);
    });
    
    // Preload Chart.js if needed
    if (document.querySelector('[data-chart]')) {
        const script = document.createElement('link');
        script.rel = 'preload';
        script.as = 'script';
        script.href = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
        document.head.appendChild(script);
    }
}

function enablePassiveListeners() {
    // Override addEventListener for better performance
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    
    EventTarget.prototype.addEventListener = function(type, listener, options) {
        const passiveEvents = ['scroll', 'wheel', 'touchstart', 'touchmove', 'touchend'];
        
        if (passiveEvents.includes(type) && typeof options !== 'object') {
            options = { passive: true };
        } else if (typeof options === 'object' && options.passive === undefined && passiveEvents.includes(type)) {
            options.passive = true;
        }
        
        return originalAddEventListener.call(this, type, listener, options);
    };
}

function optimizeAnimations() {
    // Use CSS containment for better rendering performance
    const animatedElements = document.querySelectorAll('.bg-white.rounded-xl, .counter, .btn');
    animatedElements.forEach(el => {
        el.style.contain = 'layout style paint';
    });
    
    // Use transform instead of changing layout properties
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.willChange = 'transform, opacity';
            } else {
                entry.target.style.willChange = 'auto';
            }
        });
    });
    
    animatedElements.forEach(el => observer.observe(el));
}

// Resource Management
function optimizeResourceLoading() {
    // Defer non-critical JavaScript
    deferNonCriticalJS();
    
    // Optimize CSS loading
    optimizeCSSLoading();
    
    // Enable browser caching hints
    enableCachingHints();
}

function deferNonCriticalJS() {
    // Mark non-critical scripts for deferred loading
    const nonCriticalScripts = document.querySelectorAll('script[data-defer]');
    nonCriticalScripts.forEach(script => {
        script.defer = true;
    });
}

function optimizeCSSLoading() {
    // Load non-critical CSS asynchronously
    const nonCriticalCSS = document.querySelectorAll('link[data-async]');
    nonCriticalCSS.forEach(link => {
        link.media = 'print';
        link.onload = function() {
            this.media = 'all';
        };
    });
}

function enableCachingHints() {
    // Add cache-friendly headers via meta tags
    const cacheHints = [
        { name: 'Cache-Control', content: 'public, max-age=31536000' },
        { name: 'Expires', content: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString() }
    ];
    
    cacheHints.forEach(hint => {
        const meta = document.createElement('meta');
        meta.httpEquiv = hint.name;
        meta.content = hint.content;
        document.head.appendChild(meta);
    });
}

// Memory Management
function initMemoryOptimizations() {
    // Clean up event listeners on page unload
    window.addEventListener('beforeunload', () => {
        // Remove all custom event listeners
        document.querySelectorAll('*').forEach(el => {
            el.removeEventListener?.();
        });
        
        // Clear intervals and timeouts
        for (let i = 1; i < 99999; i++) {
            clearInterval(i);
            clearTimeout(i);
        }
    });
    
    // Implement efficient DOM manipulation
    optimizeDOMOperations();
}

function optimizeDOMOperations() {
    // Batch DOM updates
    window.batchDOMUpdates = (updates) => {
        requestAnimationFrame(() => {
            updates.forEach(update => update());
        });
    };
    
    // Optimize frequent DOM queries
    const elementCache = new Map();
    window.getCachedElement = (selector) => {
        if (!elementCache.has(selector)) {
            elementCache.set(selector, document.querySelector(selector));
        }
        return elementCache.get(selector);
    };
}
