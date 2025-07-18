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

window.handleVideoError = function() {
    console.log('Video failed to load, showing fallback');
    const fallback = document.getElementById('video-fallback');
    const iframe = document.getElementById('video-player');
    if (fallback && iframe) {
        fallback.classList.remove('hidden');
        iframe.style.display = 'none';
    }
};

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

// Show tab function - make globally accessible
window.showTab = function(tabName) {
    const tabButton = document.querySelector(`[data-tab="${tabName}"]`);
    if (tabButton) {
        tabButton.click();
    } else {
        // If no tab button found, try to scroll to the section
        const section = document.getElementById(tabName);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }
};

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
    // Create comprehensive HTML timeline checklist
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Houston Land Development Timeline Checklist - PDF</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', sans-serif;
            line-height: 1.5;
            color: #333;
            background: white;
            font-size: 11pt;
        }
        
        .page {
            width: 8.5in;
            margin: 0 auto;
            background: white;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
            color: white;
            padding: 30px;
            text-align: center;
            position: relative;
        }
        
        .logo-container {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
            gap: 20px;
        }
        
        .main-logo {
            height: 60px;
            width: auto;
            background: white;
            padding: 10px;
            border-radius: 8px;
        }
        
        .texas-icon {
            width: 50px;
            height: 45px;
            position: relative;
        }
        
        .texas-shape {
            width: 100%;
            height: 100%;
            background: #ffc107;
            clip-path: polygon(
                20% 10%, 80% 10%, 100% 25%, 95% 40%, 100% 55%, 
                90% 75%, 75% 90%, 65% 100%, 35% 100%, 25% 90%, 
                10% 75%, 0% 55%, 5% 40%, 0% 25%
            );
            position: relative;
        }
        
        .location-pin {
            position: absolute;
            top: 35%;
            left: 45%;
            transform: translate(-50%, -50%);
            width: 15px;
            height: 20px;
            background: #28a745;
            border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
        }
        
        .location-pin::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 6px;
            height: 6px;
            background: white;
            border-radius: 50%;
        }
        
        .header h1 {
            font-size: 28pt;
            font-weight: 800;
            margin-bottom: 8px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
            letter-spacing: -0.5px;
        }
        
        .header .subtitle {
            font-size: 14pt;
            opacity: 0.95;
            font-weight: 400;
            margin-bottom: 15px;
        }
        
        .header .tagline {
            font-size: 11pt;
            font-weight: 300;
            opacity: 0.9;
        }
        
        .value-section {
            background: #fff8e1;
            border-left: 6px solid #ffc107;
            padding: 25px;
            margin: 0;
        }
        
        .value-section h2 {
            color: #f57c00;
            font-size: 16pt;
            font-weight: 700;
            margin-bottom: 12px;
        }
        
        .value-section p {
            color: #e65100;
            margin-bottom: 15px;
            font-weight: 500;
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            text-align: center;
            margin-top: 15px;
        }
        
        .stat-item {
            background: rgba(255,255,255,0.8);
            padding: 12px;
            border-radius: 8px;
        }
        
        .stat-number {
            font-size: 18pt;
            font-weight: 800;
            color: #28a745;
            display: block;
        }
        
        .stat-label {
            font-size: 9pt;
            color: #666;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .content {
            padding: 25px;
        }
        
        .houston-advantages {
            background: #e8f5e8;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 25px;
            border-left: 6px solid #28a745;
            page-break-inside: avoid;
        }
        
        .houston-advantages h3 {
            color: #28a745;
            font-size: 14pt;
            font-weight: 700;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
        }
        
        .houston-advantages h3::before {
            content: "⭐";
            margin-right: 8px;
            font-size: 16pt;
        }
        
        .phase {
            margin-bottom: 25px;
            border: 2px solid #e9ecef;
            border-radius: 10px;
            overflow: hidden;
            page-break-inside: avoid;
        }
        
        .phase-header {
            background: linear-gradient(135deg, #28a745, #20c997);
            color: white;
            padding: 15px 20px;
        }
        
        .phase-title {
            font-size: 13pt;
            font-weight: 700;
            margin-bottom: 6px;
        }
        
        .phase-meta {
            display: flex;
            gap: 15px;
            font-size: 9pt;
            opacity: 0.95;
            flex-wrap: wrap;
        }
        
        .phase-meta span {
            background: rgba(255,255,255,0.2);
            padding: 3px 8px;
            border-radius: 4px;
            font-weight: 600;
        }
        
        .phase-content {
            padding: 20px;
        }
        
        .checkbox-item {
            display: flex;
            align-items: flex-start;
            margin-bottom: 10px;
            padding: 6px 0;
        }
        
        .checkbox {
            width: 16px;
            height: 16px;
            border: 2px solid #28a745;
            border-radius: 3px;
            margin-right: 10px;
            margin-top: 2px;
            flex-shrink: 0;
            background: white;
        }
        
        .item-content {
            flex: 1;
        }
        
        .item-text {
            font-weight: 600;
            color: #333;
            margin-bottom: 3px;
        }
        
        .item-details {
            font-size: 9pt;
            color: #666;
            font-style: italic;
            margin-left: 0;
        }
        
        .pro-tip {
            background: #e3f2fd;
            border-left: 4px solid #2196f3;
            padding: 12px;
            margin: 12px 0;
            border-radius: 0 6px 6px 0;
            font-size: 10pt;
        }
        
        .pro-tip::before {
            content: "💡 Pro Tip: ";
            font-weight: 700;
            color: #1976d2;
        }
        
        .warning {
            background: #fff3e0;
            border-left: 4px solid #ff9800;
            padding: 12px;
            margin: 12px 0;
            border-radius: 0 6px 6px 0;
            font-size: 10pt;
        }
        
        .warning::before {
            content: "⚠️ Important: ";
            font-weight: 700;
            color: #f57c00;
        }
        
        .footer {
            background: #28a745;
            color: white;
            padding: 25px;
            text-align: center;
            margin-top: 30px;
        }
        
        .footer h3 {
            font-size: 16pt;
            margin-bottom: 12px;
            font-weight: 700;
        }
        
        .footer p {
            margin-bottom: 15px;
            font-size: 11pt;
        }
        
        .contact-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            margin-top: 20px;
            text-align: center;
        }
        
        .contact-item {
            background: rgba(255,255,255,0.1);
            padding: 12px;
            border-radius: 6px;
        }
        
        .contact-label {
            font-size: 9pt;
            opacity: 0.9;
            margin-bottom: 4px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .contact-value {
            font-size: 11pt;
            font-weight: 700;
        }
        
        .watermark {
            position: fixed;
            bottom: 20px;
            right: 30px;
            opacity: 0.1;
            font-size: 8pt;
            color: #28a745;
            transform: rotate(-45deg);
            pointer-events: none;
        }
        
        /* Print-specific styles */
        @media print {
            body {
                font-size: 10pt;
                line-height: 1.4;
            }
            
            .page {
                box-shadow: none;
                margin: 0;
                width: 100%;
            }
            
            .header {
                background: #28a745 !important;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
            
            .phase {
                page-break-inside: avoid;
                margin-bottom: 20px;
            }
            
            .phase-header {
                background: #28a745 !important;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
            
            .watermark {
                display: none;
            }
        }
        
        @page {
            margin: 0.5in;
            size: letter;
        }
    </style>
</head>
<body>
    <div class="page">
        <div class="header">
            <div class="logo-container">
                <!-- Houston Land Guy Logo Placeholder -->
                <div style="background: white; padding: 8px 15px; border-radius: 6px; font-weight: 800; color: #333; font-size: 14pt;">
                    📍 HOUSTON LANDGUY
                </div>
                
                <!-- Texas with Location Pin -->
                <div class="texas-icon">
                    <div class="texas-shape">
                        <div class="location-pin"></div>
                    </div>
                </div>
            </div>
            
            <h1>Houston Land Development<br>Timeline Checklist</h1>
            <p class="subtitle">Navigate Houston's No-Zoning Advantage for Faster Development</p>
            <p class="tagline">The Complete 47-Point System Used by Successful Houston Developers</p>
        </div>
        
        <div class="value-section">
            <h2>Your Complete Houston Development Roadmap</h2>
            <p>This comprehensive checklist has guided over $50M in Houston developments. Use the same proven system that successful developers rely on to navigate Houston's unique regulatory environment and capitalize on the city's growth.</p>
            
            <div class="stats-grid">
                <div class="stat-item">
                    <span class="stat-number">47</span>
                    <span class="stat-label">Critical Tasks</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">10</span>
                    <span class="stat-label">Development Phases</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">$50M+</span>
                    <span class="stat-label">Projects Guided</span>
                </div>
            </div>
        </div>

        <div class="content">
            <div class="houston-advantages">
                <h3>Houston Development Advantages & Key Considerations</h3>
                <div class="checkbox-item">
                    <div class="checkbox"></div>
                    <div class="item-content">
                        <div class="item-text">Leverage no-zoning regulations for flexible development opportunities</div>
                        <div class="item-details">Houston's unique lack of zoning allows for more creative and responsive development</div>
                    </div>
                </div>
                <div class="checkbox-item">
                    <div class="checkbox"></div>
                    <div class="item-content">
                        <div class="item-text">Understand deed restrictions and HOA requirements in target areas</div>
                        <div class="item-details">Private deed restrictions often provide the regulatory framework</div>
                    </div>
                </div>
                <div class="checkbox-item">
                    <div class="checkbox"></div>
                    <div class="item-content">
                        <div class="item-text">Plan for hurricane season construction delays (June-November)</div>
                        <div class="item-details">Weather delays are common and should be built into project timelines</div>
                    </div>
                </div>
                <div class="checkbox-item">
                    <div class="checkbox"></div>
                    <div class="item-content">
                        <div class="item-text">Navigate Harris County vs. City of Houston jurisdictional differences</div>
                        <div class="item-details">Requirements vary significantly between city and county jurisdictions</div>
                    </div>
                </div>
                <div class="checkbox-item">
                    <div class="checkbox"></div>
                    <div class="item-content">
                        <div class="item-text">Consider post-Harvey flooding impact zones and new regulations</div>
                        <div class="item-details">Enhanced drainage requirements and flood zone considerations</div>
                    </div>
                </div>
                <div class="checkbox-item">
                    <div class="checkbox"></div>
                    <div class="item-content">
                        <div class="item-text">Understand Texas MUD financing benefits and formation process</div>
                        <div class="item-details">Municipal Utility Districts can significantly reduce upfront infrastructure costs</div>
                    </div>
                </div>
            </div>

            <div class="phase">
                <div class="phase-header">
                    <div class="phase-title">Phase 1: Pre-Development (2-4 months)</div>
                    <div class="phase-meta">
                        <span>💰 Est. Cost: $25,000-$50,000</span>
                        <span>⏰ Duration: 2-4 months</span>
                        <span>🎯 Critical: Site Selection</span>
                    </div>
                </div>
                <div class="phase-content">
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Initial site assessment and drive-by evaluation</div>
                            <div class="item-details">Look for utilities, access, drainage patterns, neighborhood quality</div>
                        </div>
                    </div>
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Preliminary feasibility study</div>
                            <div class="item-details">Market comps, density analysis, basic financial projections</div>
                        </div>
                    </div>
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Letter of intent negotiation</div>
                            <div class="item-details">Include contingencies for due diligence findings</div>
                        </div>
                    </div>
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Due diligence period initiation</div>
                            <div class="item-details">Typical 30-60 days for thorough investigation</div>
                        </div>
                    </div>
                    
                    <div class="pro-tip">Houston's lack of zoning means fewer regulatory hurdles, but deed restrictions can be just as limiting. Always review the deed restrictions early in your evaluation.</div>
                </div>
            </div>

            <div class="phase">
                <div class="phase-header">
                    <div class="phase-title">Phase 2: Land Acquisition (1-3 months)</div>
                    <div class="phase-meta">
                        <span>💰 Est. Cost: Land Price + 3-5%</span>
                        <span>⏰ Duration: 1-3 months</span>
                        <span>🎯 Critical: Clean Title</span>
                    </div>
                </div>
                <div class="phase-content">
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Purchase agreement finalization</div>
                            <div class="item-details">Include development contingencies and timeline extensions</div>
                        </div>
                    </div>
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Title examination and insurance</div>
                            <div class="item-details">Check for liens, easements, deed restrictions</div>
                        </div>
                    </div>
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Environmental Phase I assessment</div>
                            <div class="item-details">Required by most lenders, critical for liability protection</div>
                        </div>
                    </div>
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Survey and boundary verification</div>
                            <div class="item-details">ALTA survey recommended for development projects</div>
                        </div>
                    </div>
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Closing coordination</div>
                            <div class="item-details">Coordinate with lender, title company, and legal counsel</div>
                        </div>
                    </div>
                    
                    <div class="warning">Houston's rapid growth means property values change quickly. Lock in pricing early and have backup sites identified.</div>
                </div>
            </div>

            <div class="phase">
                <div class="phase-header">
                    <div class="phase-title">Phase 3: Feasibility & Planning (3-6 months)</div>
                    <div class="phase-meta">
                        <span>💰 Est. Cost: $75,000-$150,000</span>
                        <span>⏰ Duration: 3-6 months</span>
                        <span>🎯 Critical: Market Validation</span>
                    </div>
                </div>
                <div class="phase-content">
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Market analysis and absorption study</div>
                            <div class="item-details">Analyze competing developments, pricing trends, buyer profiles</div>
                        </div>
                    </div>
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Preliminary site plan development</div>
                            <div class="item-details">Optimize lot count, street layout, amenity placement</div>
                        </div>
                    </div>
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Utility availability assessment</div>
                            <div class="item-details">Water, sewer, gas, electric capacity and connection costs</div>
                        </div>
                    </div>
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Traffic impact study</div>
                            <div class="item-details">Required for developments generating 1,000+ daily trips</div>
                        </div>
                    </div>
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Environmental assessments</div>
                            <div class="item-details">Wetlands, endangered species, archaeological surveys</div>
                        </div>
                    </div>
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Preliminary cost estimates</div>
                            <div class="item-details">Infrastructure, soft costs, contingencies</div>
                        </div>
                    </div>
                    
                    <div class="pro-tip">Houston's flat terrain is great for development, but pay special attention to drainage. The city requires detailed drainage studies for most new developments.</div>
                </div>
            </div>

            <div class="phase">
                <div class="phase-header">
                    <div class="phase-title">Phase 4: Entitlements & Approvals (6-12 months)</div>
                    <div class="phase-meta">
                        <span>💰 Est. Cost: $100,000-$300,000</span>
                        <span>⏰ Duration: 6-12 months</span>
                        <span>🎯 Critical: Permit Approval</span>
                    </div>
                </div>
                <div class="phase-content">
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Rezoning applications (if required)</div>
                            <div class="item-details">Less common in Houston due to no zoning, but may be needed for specific uses</div>
                        </div>
                    </div>
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Variance requests</div>
                            <div class="item-details">Setbacks, height restrictions, parking requirements</div>
                        </div>
                    </div>
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Plat approval process</div>
                            <div class="item-details">Preliminary plat, then final plat after infrastructure</div>
                        </div>
                    </div>
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Utility district creation/annexation</div>
                            <div class="item-details">MUD formation can take 6-9 months but provides financing</div>
                        </div>
                    </div>
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">MUD/PUD formation</div>
                            <div class="item-details">Municipal Utility District for infrastructure financing</div>
                        </div>
                    </div>
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Development agreement negotiation</div>
                            <div class="item-details">Define responsibilities, timelines, and standards</div>
                        </div>
                    </div>
                    
                    <div class="pro-tip">Houston's MUD system is a huge advantage - you can finance infrastructure through bonds rather than upfront cash. Start this process early as it takes time but saves money.</div>
                </div>
            </div>

            <div class="phase">
                <div class="phase-header">
                    <div class="phase-title">Phase 5: Design & Engineering (4-6 months)</div>
                    <div class="phase-meta">
                        <span>💰 Est. Cost: $150,000-$400,000</span>
                        <span>⏰ Duration: 4-6 months</span>
                        <span>🎯 Critical: Drainage Design</span>
                    </div>
                </div>
                <div class="phase-content">
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Civil engineering plans</div>
                            <div class="item-details">Grading, utilities, streets, drainage - must meet Harris County standards</div>
                        </div>
                    </div>
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Drainage and detention design</div>
                            <div class="item-details">Critical in Houston - must meet Harris County Flood Control requirements</div>
                        </div>
                    </div>
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Street and utility design</div>
                            <div class="item-details">Coordinate with utility providers for service extensions</div>
                        </div>
                    </div>
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Landscape architecture</div>
                            <div class="item-details">Entry features, amenities, common areas</div>
                        </div>
                    </div>
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Lighting design</div>
                            <div class="item-details">Street lighting, security lighting, decorative lighting</div>
                        </div>
                    </div>
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Construction documentation</div>
                            <div class="item-details">Detailed plans and specifications for bidding</div>
                        </div>
                    </div>
                    
                    <div class="warning">Post-Harvey, drainage requirements are stricter. Budget extra time and money for detention ponds and improved drainage systems.</div>
                </div>
            </div>

            <div class="phase">
                <div class="phase-header">
                    <div class="phase-title">Phase 6: Financing & Investment (2-4 months)</div>
                    <div class="phase-meta">
                        <span>💰 Est. Cost: 2-4% of loan amount</span>
                        <span>⏰ Duration: 2-4 months</span>
                        <span>🎯 Critical: Capital Structure</span>
                    </div>
                </div>
                <div class="phase-content">
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Construction loan application</div>
                            <div class="item-details">Shop multiple lenders, compare terms and requirements</div>
                        </div>
                    </div>
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Equity partner negotiations</div>
                            <div class="item-details">Define ownership structure, profit splits, decision rights</div>
                        </div>
                    </div>
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Financial projections update</div>
                            <div class="item-details">Refine based on final engineering and market conditions</div>
                        </div>
                    </div>
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Insurance and bonding</div>
                            <div class="item-details">General liability, builder's risk, performance bonds</div>
                        </div>
                    </div>
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Legal entity formation</div>
                            <div class="item-details">LLC or corporation for liability protection and tax efficiency</div>
                        </div>
                    </div>
                    
                    <div class="pro-tip">Texas has favorable lending markets for development. Consider both traditional banks and specialty development lenders for competitive terms.</div>
                </div>
            </div>

            <div class="phase">
                <div class="phase-header">
                    <div class="phase-title">Phase 7: Construction (12-18 months)</div>
                    <div class="phase-meta">
                        <span>💰 Est. Cost: $15,000-$25,000 per lot</span>
                        <span>⏰ Duration: 12-18 months</span>
                        <span>🎯 Critical: Quality Control</span>
                    </div>
                </div>
                <div class="phase-content">
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Site clearing and grading</div>
                            <div class="item-details">Mass grading, erosion control, tree preservation</div>
                        </div>
                    </div>
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Utility installation</div>
                            <div class="item-details">Water, sewer, gas, electric, telecommunications</div>
                        </div>
                    </div>
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Street construction</div>
                            <div class="item-details">Base, paving, curbs, sidewalks</div>
                        </div>
                    </div>
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Drainage system installation</div>
                            <div class="item-details">Storm sewers, detention ponds, channel improvements</div>
                        </div>
                    </div>
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Lot preparation</div>
                            <div class="item-details">Final grading, utility connections to lot lines</div>
                        </div>
                    </div>
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Quality control inspections</div>
                            <div class="item-details">Regular inspections to ensure compliance with plans</div>
                        </div>
                    </div>
                    
                    <div class="warning">Houston's hurricane season (June-November) can delay construction. Build weather delays into your timeline and consider seasonal construction scheduling.</div>
                </div>
            </div>

            <div class="phase">
                <div class="phase-header">
                    <div class="phase-title">Phase 8: Marketing & Pre-Sales (Ongoing)</div>
                    <div class="phase-meta">
                        <span>💰 Est. Cost: 3-5% of revenue</span>
                        <span>⏰ Duration: Ongoing</span>
                        <span>🎯 Critical: Builder Relationships</span>
                    </div>
                </div>
                <div class="phase-content">
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Marketing plan development</div>
                            <div class="item-details">Target builder profiles, pricing strategy, sales timeline</div>
                        </div>
                    </div>
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Builder negotiations</div>
                            <div class="item-details">Volume discounts, delivery schedules, design standards</div>
                        </div>
                    </div>
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Model home coordination</div>
                            <div class="item-details">Location selection, design guidelines, marketing coordination</div>
                        </div>
                    </div>
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Sales center setup</div>
                            <div class="item-details">Temporary or permanent facility for lot sales</div>
                        </div>
                    </div>
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Digital marketing campaign</div>
                            <div class="item-details">Website, social media, online advertising</div>
                        </div>
                    </div>
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Broker relationships</div>
                            <div class="item-details">Commercial brokers specializing in lot sales</div>
                        </div>
                    </div>
                    
                    <div class="pro-tip">Houston's strong builder market means you can often pre-sell lots before completion. Start marketing to builders early in the construction phase.</div>
                </div>
            </div>

            <div class="phase">
                <div class="phase-header">
                    <div class="phase-title">Phase 9: Final Approvals (2-3 months)</div>
                    <div class="phase-meta">
                        <span>💰 Est. Cost: $25,000-$50,000</span>
                        <span>⏰ Duration: 2-3 months</span>
                        <span>🎯 Critical: Infrastructure Acceptance</span>
                    </div>
                </div>
                <div class="phase-content">
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Final plat approval</div>
                            <div class="item-details">Submit after infrastructure completion and inspection</div>
                        </div>
                    </div>
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Infrastructure inspections</div>
                            <div class="item-details">City/county acceptance of streets, utilities, drainage</div>
                        </div>
                    </div>
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Utility acceptances</div>
                            <div class="item-details">Transfer of utility systems to service providers</div>
                        </div>
                    </div>
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Street dedication</div>
                            <div class="item-details">Transfer streets to city/county for maintenance</div>
                        </div>
                    </div>
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">HOA formation</div>
                            <div class="item-details">Legal documents, management structure, initial funding</div>
                        </div>
                    </div>
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">CC&R recording</div>
                            <div class="item-details">Covenants, Conditions & Restrictions filing</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="phase">
                <div class="phase-header">
                    <div class="phase-title">Phase 10: Project Closeout (3-6 months)</div>
                    <div class="phase-meta">
                        <span>💰 Est. Cost: Variable</span>
                        <span>⏰ Duration: 3-6 months</span>
                        <span>🎯 Critical: Final Sales</span>
                    </div>
                </div>
                <div class="phase-content">
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Lot sales to builders</div>
                            <div class="item-details">Final closings, deed transfers, payment collection</div>
                        </div>
                    </div>
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Infrastructure warranty period</div>
                            <div class="item-details">Typically 1-2 years for streets, utilities, drainage</div>
                        </div>
                    </div>
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">HOA transition</div>
                            <div class="item-details">Transfer control from developer to homeowners</div>
                        </div>
                    </div>
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Final accounting</div>
                            <div class="item-details">Project cost reconciliation, profit calculation</div>
                        </div>
                    </div>
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Investor distributions</div>
                            <div class="item-details">Final profit distributions per partnership agreement</div>
                        </div>
                    </div>
                    <div class="checkbox-item">
                        <div class="checkbox"></div>
                        <div class="item-content">
                            <div class="item-text">Project documentation</div>
                            <div class="item-details">Archive all records for future reference and tax purposes</div>
                        </div>
                    </div>
                    
                    <div class="pro-tip">Keep detailed records throughout the project. Good documentation helps with warranty issues, future projects, and tax planning.</div>
                </div>
            </div>
        </div>

        <div class="footer">
            <h3>Ready to Start Your Houston Development Project?</h3>
            <p>Houston Land Guy has successfully guided over $50M in Houston developments.<br>Let our expertise help you navigate the complexities and maximize your success.</p>
            
            <div class="contact-grid">
                <div class="contact-item">
                    <div class="contact-label">📞 Call Today</div>
                    <div class="contact-value">(713) 828-3701</div>
                </div>
                <div class="contact-item">
                    <div class="contact-label">📧 Get In Touch</div>
                    <div class="contact-value">contact@houstonlandguy.com</div>
                </div>
                <div class="contact-item">
                    <div class="contact-label">🌐 Learn More</div>
                    <div class="contact-value">www.houstonlandguy.com</div>
                </div>
            </div>
            
            <p style="margin-top: 25px; font-size: 10pt; opacity: 0.9;">
                © 2024 Houston Land Guy - Your Trusted Houston Development Partner<br>
                Helping developers succeed in America's 4th largest city
            </p>
        </div>
    </div>

    <div class="watermark">Houston Land Guy - Development Excellence</div>

    <sc` + `ript>
        // Add print button functionality
        function printPDF() {
            window.print();
        }
        
        // Auto-print when user requests
        document.addEventListener('keydown', function(e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
                e.preventDefault();
                printPDF();
            }
        });
    </sc` + `ript>
<\/body>
<\/html>`;

    // Create and download the HTML file
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Houston_Development_Timeline_Checklist.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showNotification('Timeline checklist downloaded successfully!', 'success');
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
