// script.js

// Cost mappings for each question
const costData = {
    websiteType: {
      Business: 2000,
      Ecommerce: 3000,
      Blog: 1500,
      WebApp: 4000
    },
    pages: {
      "1-5": 500,
      "6-10": 1000,
      "11-20": 2000,
      "20+": 3000
    },
    designCustom: {
      Template: 500,
      Light: 1000,
      Custom: 2000
    },
    ecommerce: {
      No: 0,
      Basic: 1000,
      Advanced: 2000
    },
    features: {
      ContactForms: 300,
      LiveChat: 400,
      Booking: 500,
      SEO: 600
    },
    cms: {
      WordPress: 500,
      Joomla: 600,
      Custom: 1500,
      None: 0
    },
    responsive: {
      Essential: 800,
      Optional: 400,
      NotRequired: 0
    },
    integration: {
      None: 0,
      Few: 500,
      Multiple: 1000
    },
    services: {
      Hosting: 200,
      Maintenance: 300,
      ContentCreation: 400,
      Photography: 500,
      VideoProduction: 600
    },
    seoSetup: {
      Basic: 500,
      Advanced: 1000,
      None: 0
    },
    interactivity: {
      Static: 0,
      Light: 300,
      Advanced: 700
    },
    traffic: {
      Under1000: 0,
      "1000-5000": 300,
      "5000-10000": 600,
      Over10000: 1000
    },
    support: {
      No: 0,
      Basic: 400,
      Full: 1000
    },
    branding: {
      Yes: 200,
      No: 0
    },
    multilingual: {
      Yes: 800,
      No: 0
    },
    contentProvided: {
      Yes: 0,
      No: 500
    }
  };
  
  // Object to store current form selections (default values based on HTML)
  let formValues = {
    websiteType: "Business",
    pages: "6-10",
    designCustom: "Custom",
    ecommerce: "Advanced",
    features: 0,
    cms: "WordPress",
    responsive: "Essential",
    integration: "Multiple",
    services: 0,
    seoSetup: "None",
    interactivity: "Static",
    traffic: "Under1000",
    support: "Full",
    branding: "Yes",
    multilingual: "No",
    contentProvided: "Yes"
  };
  
  // Update cost breakdown display function
  function updateCostBreakdown() {
    // Section 1 calculations
    const websiteCost = costData.websiteType[document.querySelector('input[name="websiteType"]:checked').value] || 0;
    const pagesCost = costData.pages[document.querySelector('select[name="pages"]').value] || 0;
    const designCost = costData.designCustom[document.querySelector('input[name="designCustom"]:checked').value] || 0;
    const ecommerceCost = costData.ecommerce[document.querySelector('input[name="ecommerce"]:checked').value] || 0;
    
    let featuresCost = 0;
    document.querySelectorAll('input[name="features"]:checked').forEach(el => {
      featuresCost += costData.features[el.value] || 0;
    });
    
    // Section 2 calculations
    const cmsCost = costData.cms[document.querySelector('select[name="cms"]').value] || 0;
    const responsiveCost = costData.responsive[document.querySelector('input[name="responsive"]:checked').value] || 0;
    const integrationCost = costData.integration[document.querySelector('input[name="integration"]:checked').value] || 0;
    
    let servicesCost = 0;
    document.querySelectorAll('input[name="services"]:checked').forEach(el => {
      servicesCost += costData.services[el.value] || 0;
    });
    
    // Section 3 calculations
    const seoCost = costData.seoSetup[document.querySelector('input[name="seoSetup"]:checked').value] || 0;
    const interactivityCost = costData.interactivity[document.querySelector('input[name="interactivity"]:checked').value] || 0;
    const trafficCost = costData.traffic[document.querySelector('input[name="traffic"]:checked').value] || 0;
    const supportCost = costData.support[document.querySelector('input[name="support"]:checked').value] || 0;
    const brandingCost = costData.branding[document.querySelector('input[name="branding"]:checked').value] || 0;
    const multilingualCost = costData.multilingual[document.querySelector('input[name="multilingual"]:checked').value] || 0;
    const contentCost = costData.contentProvided[document.querySelector('input[name="contentProvided"]:checked').value] || 0;
    
    // Update DOM elements with calculated cost values
    document.getElementById("costWebsiteType").textContent = "$" + websiteCost;
    document.getElementById("costPages").textContent = "$" + pagesCost;
    document.getElementById("costDesign").textContent = "$" + designCost;
    document.getElementById("costEcommerce").textContent = "$" + ecommerceCost;
    document.getElementById("costFeatures").textContent = "$" + featuresCost;
    document.getElementById("costCMS").textContent = "$" + cmsCost;
    document.getElementById("costResponsive").textContent = "$" + responsiveCost;
    document.getElementById("costIntegration").textContent = "$" + integrationCost;
    document.getElementById("costServices").textContent = "$" + servicesCost;
    document.getElementById("costSEO").textContent = "$" + seoCost;
    document.getElementById("costInteractivity").textContent = "$" + interactivityCost;
    document.getElementById("costTraffic").textContent = "$" + trafficCost;
    document.getElementById("costSupport").textContent = "$" + supportCost;
    document.getElementById("costBranding").textContent = "$" + brandingCost;
    document.getElementById("costMultilingual").textContent = "$" + multilingualCost;
    document.getElementById("costContent").textContent = "$" + contentCost;
    
    // Calculate total cost
    const total = websiteCost + pagesCost + designCost + ecommerceCost + featuresCost +
                  cmsCost + responsiveCost + integrationCost + servicesCost + seoCost +
                  interactivityCost + trafficCost + supportCost + brandingCost + multilingualCost + contentCost;
    document.getElementById("totalCost").textContent = "$" + total;
  }
  
  // Multi-step form navigation
  const formSteps = document.querySelectorAll(".form-step");
  const nextBtns = document.querySelectorAll(".next-btn");
  const prevBtns = document.querySelectorAll(".prev-btn");
  const progressIndicator = document.getElementById("progressIndicator");
  let currentStep = 0;
  
  function showStep(step) {
    formSteps.forEach((el, index) => {
      el.classList.toggle("active", index === step);
    });
    // Update progress bar (assuming 3 steps)
    const progressPercent = ((step + 1) / formSteps.length) * 100;
    progressIndicator.style.width = progressPercent + "%";
  }
  
  // Event listeners for navigation buttons
  nextBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (currentStep < formSteps.length - 1) {
        currentStep++;
        showStep(currentStep);
      }
    });
  });
  
  prevBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    });
  });
  
  // Event listeners for Section 1 inputs
  document.querySelectorAll('input[name="websiteType"]').forEach(el => {
    el.addEventListener("change", updateCostBreakdown);
  });
  document.querySelector('select[name="pages"]').addEventListener("change", updateCostBreakdown);
  document.querySelectorAll('input[name="designCustom"]').forEach(el => {
    el.addEventListener("change", updateCostBreakdown);
  });
  document.querySelectorAll('input[name="ecommerce"]').forEach(el => {
    el.addEventListener("change", updateCostBreakdown);
  });
  document.querySelectorAll('input[name="features"]').forEach(el => {
    el.addEventListener("change", updateCostBreakdown);
  });
  
  // Event listeners for Section 2 inputs
  document.querySelector('select[name="cms"]').addEventListener("change", updateCostBreakdown);
  document.querySelectorAll('input[name="responsive"]').forEach(el => {
    el.addEventListener("change", updateCostBreakdown);
  });
  document.querySelectorAll('input[name="integration"]').forEach(el => {
    el.addEventListener("change", updateCostBreakdown);
  });
  document.querySelectorAll('input[name="services"]').forEach(el => {
    el.addEventListener("change", updateCostBreakdown);
  });
  
  // Event listeners for Section 3 inputs
  document.querySelectorAll('input[name="seoSetup"]').forEach(el => {
    el.addEventListener("change", updateCostBreakdown);
  });
  document.querySelectorAll('input[name="interactivity"]').forEach(el => {
    el.addEventListener("change", updateCostBreakdown);
  });
  document.querySelectorAll('input[name="traffic"]').forEach(el => {
    el.addEventListener("change", updateCostBreakdown);
  });
  document.querySelectorAll('input[name="support"]').forEach(el => {
    el.addEventListener("change", updateCostBreakdown);
  });
  document.querySelectorAll('input[name="branding"]').forEach(el => {
    el.addEventListener("change", updateCostBreakdown);
  });
  document.querySelectorAll('input[name="multilingual"]').forEach(el => {
    el.addEventListener("change", updateCostBreakdown);
  });
  document.querySelectorAll('input[name="contentProvided"]').forEach(el => {
    el.addEventListener("change", updateCostBreakdown);
  });
  
  // Initial setup
  showStep(currentStep);
  updateCostBreakdown();
  
  // Optional: Listen for form submission
  document.getElementById("multiStepForm").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Form submitted! Total cost: " + document.getElementById("totalCost").textContent);
  });
  