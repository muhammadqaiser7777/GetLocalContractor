import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { allServices } from "../Components/servicesData";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Utility function to check if a script is already in the DOM
const isScriptAlreadyAdded = (src) => {
  return document.querySelector(`script[src="${src}"]`) !== null;
};

// Function to load TrustedForm script (updated)
const loadTrustedFormScript = () => {
  // Remove any previous TrustedForm script
  const prev = document.querySelector('script[src*="trustedform.js"]');
  if (prev) prev.remove();

  const trustedFormSrc =
    (document.location.protocol === "https:" ? "https" : "http") +
    '://api.trustedform.com/trustedform.js?field=xxTrustedFormCertUrl&use_tagged_consent=true&l=' +
    new Date().getTime() + Math.random();

  if (!isScriptAlreadyAdded(trustedFormSrc)) {
    const trustedFormScript = document.createElement("script");
    trustedFormScript.type = "text/javascript";
    trustedFormScript.async = true;
    trustedFormScript.src = trustedFormSrc;
    document.body.appendChild(trustedFormScript);
    return () => {
      if (document.body.contains(trustedFormScript)) {
        document.body.removeChild(trustedFormScript);
      }
    };
  }
};

// Function to fetch initial form data
const fetchInitialData = (setFieldValue) => {
  fetch("https://api.ipify.org?format=json")
    .then((response) => response.json())
    .then((data) => {
      setFieldValue("ipAddress", data.ip);
    })
    .catch((error) => console.error("Failed to fetch IP address:", error));

  setFieldValue("userAgent", navigator.userAgent);

  const urlParams = new URLSearchParams(window.location.search);
  const affid = urlParams.get("affid") || "";
  const rid = urlParams.get("rid") || "";
  const tid = urlParams.get("tid") || "";

  setFieldValue("affid", affid);
  setFieldValue("rid", rid);
  setFieldValue("tid", tid);
  setFieldValue("url", window.location.href);

  const start = new Date().getTime();
  const min = Math.floor(start / 60000);
  setFieldValue("start", start);
  setFieldValue("min", min);
};

const ServiceDetails = () => {
  const fetchProviders = async (query) => {
    if (!query.trim()) {
      setProviderSuggestions([]);
      return;
    }
    setProviderLoading(true);
    try {
      const res = await fetch(`https://steermarketeer.com/API/providers.php?q=${encodeURIComponent(query)}`);
      if (res.ok) {
        const data = await res.json();
        // Sort by most matching: prioritize names that start with query, then contain it
        const sortedData = data.sort((a, b) => {
          const queryLower = query.toLowerCase();
          const aLower = a.name.toLowerCase();
          const bLower = b.name.toLowerCase();
          const aStarts = aLower.startsWith(queryLower);
          const bStarts = bLower.startsWith(queryLower);
          if (aStarts && !bStarts) return -1;
          if (!aStarts && bStarts) return 1;
          const aIndex = aLower.indexOf(queryLower);
          const bIndex = bLower.indexOf(queryLower);
          if (aIndex === -1 && bIndex === -1) return 0;
          if (aIndex === -1) return 1;
          if (bIndex === -1) return -1;
          return aIndex - bIndex;
        });
        setProviderSuggestions(sortedData);
      } else {
        setProviderSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching providers:', error);
      setProviderSuggestions([]);
    }
    setProviderLoading(false);
  };
  const { title } = useParams();
  const navigate = useNavigate();
  const decodedTitle = decodeURIComponent(title);
  const service = allServices.find(
    (service) => service.title.toLowerCase() === decodedTitle.toLowerCase()
  );

  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [providerSuggestions, setProviderSuggestions] = useState([]);
  const [providerLoading, setProviderLoading] = useState(false);
  const [selectedProviderId, setSelectedProviderId] = useState(null);
  const debounceRef = useRef(null);

  // --- Affiliate param logic START ---
  // Store affiliate params only on first load
  const affiliateParamsRef = useRef(null);

  useEffect(() => {
    if (!affiliateParamsRef.current) {
      const urlParams = new URLSearchParams(window.location.search);
      const paramsToStore = {};
      // Capture only aff_id, transaction_id, sub_aff_id if present
      ["aff_id", "transaction_id", "sub_aff_id"].forEach((key) => {
        const value = urlParams.get(key);
        if (value) paramsToStore[key] = value;
      });
      affiliateParamsRef.current = paramsToStore;

      // Remove query params from URL (clean URL)
      if (window.history.replaceState) {
        const cleanUrl =
          window.location.origin +
          window.location.pathname +
          window.location.hash;
        window.history.replaceState({}, document.title, cleanUrl);
      }
    }
  }, []);
  // --- Affiliate param logic END ---

  if (!service) {
    return (
      <div className="container mx-auto px-6 py-12 pt-24 text-center">
        <h1 className="text-3xl text-red-500">Service Not Found</h1>
        <p className="text-gray-600">
          Please check the URL or select a valid service.
        </p>
      </div>
    );
  }

  // Include all service inputs, including 'Project status?'
  const serviceFields = service.inputs.map((input) => ({
    name: input.question,
    label: input.question,
    type: input.options ? "select" : "text",
    options: input.options || null,
  }));

  const personalInfoFields = [
    { name: "state", label: "State", type: "select", options: [
      "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming", "Puerto Rico", "Washington DC", "Virgin Islands"
    ] },
    { name: "zipCode", label: "Zip Code", type: "text" },
    { name: "city", label: "City", type: "text" },
    { name: "streetAddress", label: "Street Address", type: "text" },
    { name: "firstName", label: "First Name", type: "text" },
    { name: "lastName", label: "Last Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "phone", label: "Phone Number", type: "tel" },
  ];

  const additionalFields = [
    {
      name: "HomeOwner",
      label: "Home Owner:",
      type: "select",
      options: ["Yes", "No"],
    },
    {
      name: "PropertyType",
      label: "Property Type?",
      type: "select",
      options: ["Commercial", "Multi-Unit", "Residential"],
    },
    {
      name: "PurchaseTimeFrame",
      label: "Purchase TimeFrame",
      type: "select",
      options: [
        "1-2 weeks",
        "3-4 weeks",
        "5-6 weeks",
        "7-8 weeks",
        "Time Is Flexible",
      ],
    },
    {
      name: "BestTimeToCall",
      label: "What is the best time to call you?",
      type: "select",
      options: ["Anytime", "Morning", "Afternoon", "Evening"],
    },
    {
      name: "Brief data about requirements",
      label: "Tell us about your service requirements in brief",
      type: "textarea",
    },
    { name: "agreement", label: "Agreement", type: "checkbox" },
  ];

  const allFields = [
    ...serviceFields,
    ...personalInfoFields,
    ...additionalFields,
  ];
  const totalSteps = allFields.length;

  const initialValues = {
    ...service.inputs.reduce((acc, input) => {
      acc[input.question] = "";
      return acc;
    }, {}),
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    HomeOwner: "",
    PropertyType: "",
    PurchaseTimeFrame: "",
    BestTimeToCall: "",
    "Brief data about requirements": "",
    agreement: false,
    affid: "",
    rid: "",
    tid: "",
    url: "",
    start: "",
    min: "",
    ipAddress: "",
    userAgent: "",
    xxTrustedFormCertUrl: "",
    universalLeadid: "",
    ElectricalEnergyProviderId: "",
  };

  const fieldValidationSchemas = {
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
    streetAddress: Yup.string().required("Street address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zipCode: Yup.string()
      .matches(/^\d{5}$/, "Zip code must be exactly 5 digits")
      .required("Zip code is required"),
    HomeOwner: Yup.string().required("Please select an option"),
    PropertyType: Yup.string().required("Please select an option"),
    PurchaseTimeFrame: Yup.string().required("Please select an option"),
    BestTimeToCall: Yup.string().required("Please select an option"),
    "Brief data about requirements": Yup.string().required(
      "Please describe your requirements"
    ),
    agreement: Yup.boolean().oneOf(
      [true],
      "You must agree to the terms and conditions"
    ),
    xxTrustedFormCertUrl: Yup.string().required("TrustedForm certificate is required. Please wait for the form to fully load."),
    userAgent: Yup.string().required("Browser info is required"),
  };

  service.inputs.forEach((input) => {
    fieldValidationSchemas[input.question] = Yup.string().required(
      "This field is required"
    );
  });

  const validationSchema = Yup.object(fieldValidationSchemas);

const TcpaText =
  "By providing my phone number, I consent to receive marketing calls and/or text messages, including from automated systems, at the phone number provided, from Get Local Contractors and its affiliates. I understand that consent is not required for purchase. I also understand that message and data rates may apply. I can revoke my consent at any time by replying “STOP” to any text message or contacting PingTree Systems directly. For more information, please refer to PTS's Privacy Policy.";

const handleSubmit = (values, { resetForm }) => {
  setLoading(true);
  setApiError("");
  let formDataObj = { ...values };

  // Convert state to abbreviation
  if (formDataObj.state) {
    formDataObj.state = stateAbbreviations[formDataObj.state] || formDataObj.state;
  }

  // --- Affiliate param logic for API payload ---
  if (affiliateParamsRef.current) {
    formDataObj = { ...formDataObj, ...affiliateParamsRef.current };
  }
  // --- End affiliate param logic ---

  // Get TrustedForm certificate value
  const tfInput = document.querySelector('input[name="xxTrustedFormCertUrl"]');
  if (tfInput && tfInput.value) {
    formDataObj.xxTrustedFormCertUrl = tfInput.value;
  } else {
    formDataObj.xxTrustedFormCertUrl = '';
  }

  // Get LeadiD token value and send as universalLeadid
  const leadiDInput = document.getElementById('leadid_token');
  if (leadiDInput && leadiDInput.value) {
    formDataObj.universalLeadid = leadiDInput.value;
  } else if (values.universalLeadid) {
    formDataObj.universalLeadid = values.universalLeadid;
  } else {
    formDataObj.universalLeadid = '';
  }


  // Rename 'Brief data about requirements' to 'BriefRequirement' for API
  if (formDataObj["Brief data about requirements"]) {
    formDataObj.BriefRequirement = formDataObj["Brief data about requirements"];
    delete formDataObj["Brief data about requirements"];
  }

  // LeadiD extraction (DISABLED)
  // const leadiDInput = document.getElementById('LeadiD_token');
  // if (leadiDInput && leadiDInput.value) {
  //   formDataObj.universalLeadid = leadiDInput.value;
  // } else {
  //   formDataObj.universalLeadid = '';
  // }

  // Rename variables for API payload as per user requirements
  if (formDataObj.streetAddress) {
    formDataObj.address = formDataObj.streetAddress;
    delete formDataObj.streetAddress;
  }
  if (formDataObj.zipCode) {
    formDataObj.zip = formDataObj.zipCode;
    delete formDataObj.zipCode;
  }
  if (formDataObj.ipAddress) {
    formDataObj.ipaddress = formDataObj.ipAddress;
    delete formDataObj.ipAddress;
  }

  // Map HomeOwner to homeOwner and code Yes as 1, No as 2
  if (formDataObj.HomeOwner) {
    if (formDataObj.HomeOwner === "Yes") {
      formDataObj.homeOwner = 1;
    } else if (formDataObj.HomeOwner === "No") {
      formDataObj.homeOwner = 2;
    } else {
      formDataObj.homeOwner = "";
    }
    delete formDataObj.HomeOwner;
  }
  // PropertyType mapping: send as Propertytype, 1 for Commercial, 2 for Multi-Unit, 3 for Residential
  if (formDataObj.PropertyType) {
    const propertyTypeOptions = ["Commercial", "Multi-Unit", "Residential"];
    const selectedPropertyType = formDataObj.PropertyType;
    const propertyTypeCode = propertyTypeOptions.indexOf(selectedPropertyType) + 1;
    formDataObj["Propertytype"] = propertyTypeCode > 0 ? propertyTypeCode : "";
    delete formDataObj.PropertyType;
  }
  // PurchaseTimeFrame mapping: send as Purchasetimeframe, 1-5 for respective options
  if (formDataObj.PurchaseTimeFrame) {
    const purchaseTimeFrameOptions = [
      "1-2 weeks",
      "3-4 weeks",
      "5-6 weeks",
      "7-8 weeks",
      "Time Is Flexible"
    ];
    const selectedPurchaseTimeFrame = formDataObj.PurchaseTimeFrame;
    const purchaseTimeFrameCode = purchaseTimeFrameOptions.indexOf(selectedPurchaseTimeFrame) + 1;
    formDataObj["Purchasetimeframe"] = purchaseTimeFrameCode > 0 ? purchaseTimeFrameCode : "";
    delete formDataObj.PurchaseTimeFrame;
  }
  // BestTimeToCall mapping: send as Timetocall, 1-4 for respective options
  if (formDataObj.BestTimeToCall) {
    const bestTimeToCallOptions = ["Anytime", "Morning", "Afternoon", "Evening"];
    const selectedBestTimeToCall = formDataObj.BestTimeToCall;
    const bestTimeToCallCode = bestTimeToCallOptions.indexOf(selectedBestTimeToCall) + 1;
    formDataObj["Timetocall"] = bestTimeToCallCode > 0 ? bestTimeToCallCode : "";
    delete formDataObj.BestTimeToCall;
  }

  // Solar-specific mappings
  if (service.title === "Solar") {
    // Currency bill mapping
    if (formDataObj["How much is your currency bill?"]) {
      const billOptions = [
        "50$",
        "100$",
        "200$",
        "300$",
        "400$",
        "500$",
        "600$",
        "700$",
        "800$",
        "900$",
        "More than 900$",
      ];
      const selected = formDataObj["How much is your currency bill?"];
      const mappedValue = billOptions.indexOf(selected) + 1;
      formDataObj["SolarCurrencyBill"] = mappedValue > 0 ? mappedValue : "";
      delete formDataObj["How much is your currency bill?"];
    }
    // Sun hits roof mapping
    if (formDataObj["How much sun hits your roof?"]) {
      const sunOptions = [
        "Full sun",
        "Partially shaded",
        "Mostly shaded",
        "Not sure",
      ];
      const selectedSun = formDataObj["How much sun hits your roof?"];
      const sunCode = sunOptions.indexOf(selectedSun) + 1;
      formDataObj["HowMuchSun"] = sunCode > 0 ? sunCode : "";
      delete formDataObj["How much sun hits your roof?"];
    }
    // Energy provider mapping
    if (formDataObj["Who is your energy provider?"]) {
      formDataObj["ElectricalEnergyProvider"] = formDataObj["Who is your energy provider?"];
      delete formDataObj["Who is your energy provider?"];
      delete formDataObj["ElectricalEnergyProviderId"];
    }
  }

  // Project status mapping for any service and other mappings
  Object.keys(formDataObj).forEach((key) => {
    if (key === "Project status?") {
      if (formDataObj[key] === "Ready to hire") {
        formDataObj["ProjectStatus"] = 1;
      } else if (formDataObj[key] === "Planning and budgeting") {
        formDataObj["ProjectStatus"] = 2;
      } else {
        formDataObj["ProjectStatus"] = "";
      }
      delete formDataObj[key];
    }
    // ProjectNature mapping for all services
    if (key === "What is the nature of your project?") {
      const selectedValue = formDataObj[key];
      // Find the service and question definition
      const serviceDef = allServices.find(s => s.title === service.title);
      if (serviceDef) {
        const natureInput = serviceDef.inputs.find(
          input => input.question === "What is the nature of your project?"
        );
        if (natureInput && Array.isArray(natureInput.options)) {
          const selectedIndex = natureInput.options.findIndex(opt => opt === selectedValue);
          let code;
          if (natureInput.options.length === 3) {
            code = selectedIndex + 1; // 1,2,3
          } else if (natureInput.options.length === 2) {
            code = selectedIndex === 0 ? 1 : 3; // 1 or 3
          }
          formDataObj["ProjectNature"] = code;
        }
      }
      delete formDataObj[key];
    }
    // windowsMaterial mapping for Windows service
    if (key === "What is the material of your windows") {
      const materialOptions = ["Vinyl", "Wood", "Aluminium", "Brick", "Stone", "Metal","Windows Cleaning"];
      const selectedMaterial = formDataObj[key];
      const materialCode = materialOptions.indexOf(selectedMaterial) + 1;
      formDataObj["windowsMaterial"] = materialCode > 0 ? materialCode : "";
      delete formDataObj[key];
    }
    // windowsType mapping for Windows service
    if (key === "How many windows are involved?") {
      // Map to code 1-5 for each option, based on its index in the options array (1-based)
      // You may want to update the options array if needed
      const windowCountOptions = [
        "1 window",
          "2 windows",
          "3-5 windows",
          "6-9 windows",
          "10+ windows",
      ];
      const selectedWindowCount = formDataObj[key];
      const windowTypeCode = windowCountOptions.indexOf(selectedWindowCount) + 1;
      formDataObj["windowsType"] = windowTypeCode > 0 ? windowTypeCode : "";
      delete formDataObj[key];
    }
    // roofingType mapping for Roofing service
    if (key === "What type of material do you need") {
      const roofingOptions = ["Asphalt Shingle",
          "Cedar Shake",
          "Metal",
          "Natural Slate",
          "Tar",
          "Commercial Roofing",
          "Flat, Foam, or Single Ply Roofing",
          "Traditional Tile Roofing",
          "Wood or Composite Roofing",
          "Water proof coatings",
          "Roof Removal",
          "Roof Maintenance or Cleaning",
          "Other"];
      const selectedRoofing = formDataObj[key];
      const roofingCode = roofingOptions.indexOf(selectedRoofing) + 1;
      formDataObj["roofingType"] = roofingCode > 0 ? roofingCode : "";
      delete formDataObj[key];
    }
    // HVACType mapping for HVAC service
    if (key === "What type of HVAC do you need") {
      const hvacOptions = [
        "Air Ducts Repair & Replace",
        "Boiler & Radiators New Install",
        "Central air Cleaning & maintenance",
        "Central Air-New Install",
        "Central Air-Repair",
        "Commercial Cooling",
        "Commercial Heat-New Install",
        "Commercial Heat-Repair",
        "Ductless Air Conditioning",
        "Furnaces-New Install",
        "Furnaces-Repair",
        "Gas Heat-New install",
        "Gas Heat-Repair",
        "Geothermal Systems",
        "Heating-New Install",
        "Heating-Repair",
        "Heat Pumps-New Install",
        "Heat Pumps-Repair",
        "Oil Heat-New Install",
        "Oil Heat-Repair",
        "Radiant Floor System",
        "Thermostats",
        "Boiler & Radiators Repair",
        "Ductless AC Repair",
        "Ducts and Vents Install",
      ];
      const selectedHVAC = formDataObj[key];
      const hvacCode = hvacOptions.indexOf(selectedHVAC) + 1;
      formDataObj["HVACType"] = hvacCode > 0 ? hvacCode : "";
      delete formDataObj[key];
    }
    // PaintType mapping for Painting service
    if (key === "Type of painting needed") {
      const paintOptions = [
        "Exterior painting - Trim/Shutters",
        "Exterior painting - Whole House",
        "Paint or Stain - Deck/Fence/Porch",
        "Interior Painting 1-2 Rooms",
        "Interior Painting 3+ Rooms",
        "Wallpaper Hanging/Removal",
        "Speciality- Faux Finishes",
        "Speciality - Textures",
        "Commercial",
        "Paint Removal or Stripping"
      ];
      const selectedPaint = formDataObj[key];
      const paintCode = paintOptions.indexOf(selectedPaint) + 1;
      formDataObj["PaintType"] = paintCode > 0 ? paintCode : "";
      delete formDataObj[key];
    }
    // PlumberType mapping for Plumbing service
    if (key === "Type of plumbing needed?") {
      const plumbingOptions = [
        "Basement Drainage Channel",
          "Bathtubs",
          "Commercial Industrial Plumbing",
          "Faucets Fixtures Pipes",
          "Gas pipes",
          "General Repair",
          "Leak Detection And Repair",
          "Remodeling and construction",
          "Sewer and Drain",
          "Walk-In Bath Install",
          "Fire Sprinkler System",
          "Pump out a septic tank",
          "Septic system install",
          "Septic system repair",
          "SUMP pump repair",
          "Water heater install",
          "Water heater repair",
          "Water Line",
          "Water main install",
          "Water main repair",
          "Other Install",
      ];
      const selectedPlumbing = formDataObj[key];
      const plumbingCode = plumbingOptions.indexOf(selectedPlumbing) + 1;
      formDataObj["PlumberType"] = plumbingCode > 0 ? plumbingCode : "";
      delete formDataObj[key];
    }
    // Guttertype mapping for Gutters service
    if (key === "Type of product needed") {
      const gutterOptions = ["Galvanized", "Seamless Metal", "PVC","Wood","Gutter Cleaning","Gutter Protection","Other"];
      const selectedGutter = formDataObj[key];
      const gutterCode = gutterOptions.indexOf(selectedGutter) + 1;
      formDataObj["Guttertype"] = gutterCode > 0 ? gutterCode : "";
      delete formDataObj[key];
    }
    // HomeSecurity mapping for HomeSecurity service
    if (key === "Type of service needed") {
      const homeSecurityOptions = [
        "Equipment Only",
        "New System Installation",
        "Reactivating The Existing System"
      ];
      const selectedHomeSecurity = formDataObj[key];
      const homeSecurityCode = homeSecurityOptions.indexOf(selectedHomeSecurity) + 1;
      formDataObj["HomeSecurity"] = homeSecurityCode > 0 ? homeSecurityCode : "";
      delete formDataObj[key];
    }
    // Kitchentype mapping for Kitchen service
    if (key === "Type of remodeling needed?") {
      const kitchenOptions = [
        "Appliances",
        "Cabinets",
        "Cabinet Repair",
        "Counter Tops or Sinks",
        "Floor Plan",
        "Flooring",
        "Full Kitchen"
      ];
      const selectedKitchen = formDataObj[key];
      const kitchenCode = kitchenOptions.indexOf(selectedKitchen) + 1;
      formDataObj["Kitchentype"] = kitchenCode > 0 ? kitchenCode : "";
      delete formDataObj[key];
    }
    // Sidingtype mapping for Siding service
    if (key === "What type of project") {
      const sidingOptions = [
        "Aluminium - Install/Replace",
          "Aluminium Repair",
          "BrickFace Install/Replace",
          "BrickFace Repair",
          "Composite Wood - Install/Replace",
          "Composite Wood - Repair",
          "StoneFace- Install/Replace",
          "StoneFace- Repair",
          "Stucco- Install/Replace",
          "Stucco - Repair",
          "Vinyl- Install/Replace",
          "Vinyl-Repair",
          "Other Repair",
      ];
      const selectedSiding = formDataObj[key];
      const sidingCode = sidingOptions.indexOf(selectedSiding) + 1;
      formDataObj["Sidingtype"] = sidingCode > 0 ? sidingCode : "";
      delete formDataObj[key];
    }
    // MovingDate mapping for Movers service
    if (key === "When are you planning to move") {
      formDataObj["MovingDate"] = formDataObj[key];
      delete formDataObj[key];
    }
    // Movesize mapping for Movers service
    if (key === "Move size") {
      const moveSizeOptions = [
        "Studio",
        "1 Bedroom",
        "2 Bedrooms",
        "3 Bedrooms",
        "4 Bedrooms",
        "Over 4 Bedrooms",
        "Partial Home"
      ];
      const selectedMoveSize = formDataObj[key];
      const moveSizeCode = moveSizeOptions.indexOf(selectedMoveSize) + 1;
      formDataObj["Movesize"] = moveSizeCode > 0 ? moveSizeCode : "";
      delete formDataObj[key];
    }
    if (key === "Moving Distance") {
      const movingDistanceOptions = [
        "Local",
        "Long Distance",
        "Other"
      ];
      const selectedMovingDistance = formDataObj[key];
      const movingDistanceCode = movingDistanceOptions.indexOf(selectedMovingDistance) + 1;
      formDataObj["movingDistance"] = movingDistanceCode > 0 ? movingDistanceCode : "";
      delete formDataObj[key];
    }
    // Moverszip mapping for Movers service
    if (key === "Current zip code") {
      formDataObj["Moverszip"] = formDataObj[key];
      delete formDataObj[key];
    }
    // Moverszip2 mapping for Movers service
    if (key === "Moving zip code") {
      formDataObj["Moverszip2"] = formDataObj[key];
      delete formDataObj[key];
    }
    // Floortype mapping for Flooring service
    if (key === "Floor Type?") {
      const floorOptions = [
        "Carpet - install",
        "Carpet- Repair or Refasten",
        "Epoxy Flooring",
        "Hardwood Floor- Install",
        "Laminate Floor- Install",
        "Laminate Floor- Repair",
        "Tile Floor- Install/Repair",
        "Vinyl Or Linoleum Floor-Install",
        "Vinyl Or Linoleum Floor - Repair",
        "Wood Floor - Refinishing",
        "Wood Floor - Repair or Partially Replace"
      ];
      const selectedFloor = formDataObj[key];
      const floorCode = floorOptions.indexOf(selectedFloor) + 1;
      formDataObj["Floortype"] = floorCode > 0 ? floorCode : "";
      delete formDataObj[key];
    }
    // Fencingtype mapping for Fencing service
    if (key === "Type of fencing project?") {
      const fencingOptions = [
        "Wood Fence Install/Replace",
        "Wood Fence Repair",
        "Vinyl or PVC Fence Install/Replace",
        "Vinyl or PVC Fence Repair",
        "Chain Link Fence Install/Replace",
        "Chain Link Fence Repair",
        "Wrought Iron Fence Install/Replace",
        "Wrought Iron Fence Repair",
        "Aluminium Or Steel Fence Install/Replace",
        "Aluminium Or Steel Fence Repair",
        "Barbed Wired Fence Install/Replace",
        "Barbed Wired Fence Repair",
        "Electric Pet Fence Install/Replace",
        "Electric Pet Fence Repair"
      ];
      const selectedFencing = formDataObj[key];
      const fencingCode = fencingOptions.indexOf(selectedFencing) + 1;
      formDataObj["Fencingtype"] = fencingCode > 0 ? fencingCode : "";
      delete formDataObj[key];
    }
    // bathtype mapping for Bathroom service
    if (key === "Type of remodeling needed") {
      const bathOptions = [
        "BathTub Install",
          "BathTub Linear Install",
          "Cabinets",
          "Counter Tops",
          "Full Remodel",
          "General Remodeling",
          "New Florring",
          "Shower Install",
          "Sink Install",
          "Toilet Install",
          "Walk-In Tub Install",
          "Complete Remodel",
          "Vanity Install",
          "Vanity Repair",
          "Other",
      ];
      const selectedBath = formDataObj[key];
      const bathCode = bathOptions.indexOf(selectedBath) + 1;
      formDataObj["bathtype"] = bathCode > 0 ? bathCode : "";
      delete formDataObj[key];
    }
  });
  // Add TcpaText to API payload (hardcoded value)
  formDataObj.TcpaText = TcpaText;

  // Rename userAgent to browser
  if (formDataObj.userAgent) {
    formDataObj.browser = formDataObj.userAgent;
    delete formDataObj.userAgent;
  }

  // Add final API payload fields
  formDataObj = {
    ...formDataObj,
    category: service.category,
  };

  // ✅ Send API Request as application/json
  fetch("https://getlocalcontractors.com/api/ping-proxy.php", {
    method: "POST",
    headers:
    {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formDataObj), // send JSON data
  })
    .then(async (response) => {
      let responseData;
      try {
        responseData = await response.json();
      } catch {
        responseData = await response.text();
      }
      if (response.ok) {
        setLoading(false);
        navigate("/ThankYou");
        return;
      }
      setLoading(false);
      setApiError(
        responseData?.error ||
          "There was a problem submitting your request. Please press Submit again."
      );
    })
    .catch((error) => {
      setLoading(false);
      setApiError(
        error?.message ||
          "There was a problem submitting your request. Please press Submit again."
      );
    });

  resetForm({
    values: {
      ...Object.keys(initialValues).reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {}),
      agreement: false,
    },
  });
};

  const areaCodesUS = [
  // Alabama
  205, 251, 256, 334, 659,
  // Alaska
  907,
  // Arizona
  480, 520, 602, 623, 928,
  // Arkansas
  479, 501, 870,
  // California
  209, 213, 279, 310, 323, 341, 408, 415, 424, 442, 510, 530, 559,
  562, 619, 626, 650, 657, 661, 669, 707, 714, 747, 760, 805, 818,
  820, 831, 858, 909, 916, 925, 949, 951, 628,
  // Colorado
  303, 719, 720, 970,
  // Connecticut
  203, 475, 860, 959,
  // Delaware
  302,
  // District of Columbia
  202,
  // Florida
  239, 305, 321, 352, 386, 407, 561, 689, 727, 754, 772, 786,
  813, 850, 863, 904, 941, 954,
  // Georgia
  229, 404, 470, 478, 678, 706, 762, 770, 912,
  // Hawaii
  808,
  // Idaho
  208, 986,
  // Illinois
  217, 224, 309, 312, 331, 464, 618, 630, 708, 773, 815, 847, 872,
  // Indiana
  219, 260, 317, 463, 574, 765, 812, 930,
  // Iowa
  319, 515, 563, 641, 712,
  // Kansas
  316, 620, 785, 913,
  // Kentucky
  270, 364, 502, 606, 859,
  // Louisiana
  225, 318, 337, 504, 985,
  // Maine
  207,
  // Maryland
  240, 301, 410, 443, 667,
  // Massachusetts
  339, 351, 413, 508, 617, 774, 781, 857, 978,
  // Michigan
  231, 248, 269, 313, 517, 586, 616, 734, 810, 906, 947, 989,
  // Minnesota
  218, 320, 507, 612, 651, 763, 952,
  // Mississippi
  228, 601, 662, 769,
  // Missouri
  314, 417, 573, 636, 660, 816,
  // Montana
  406,
  // Nebraska
  308, 402, 531,
  // Nevada
  702, 725, 775,
  // New Hampshire
  603,
  // New Jersey
  201, 551, 609, 640, 732, 848, 856, 862, 908, 973,
  // New Mexico
  505, 575,
  // New York
  212, 315, 332, 347, 516, 518, 585, 607, 631, 646, 716,
  718, 838, 845, 914, 917, 929, 934,
  // North Carolina
  252, 336, 704, 743, 828, 910, 919, 980, 984,
  // North Dakota
  701,
  // Ohio
  216, 220, 234, 330, 380, 419, 440, 513, 567, 614, 740, 937,
  // Oklahoma
  405, 539, 580, 918,
  // Oregon
  458, 503, 541, 971,
  // Pennsylvania
  215, 223, 267, 272, 412, 445, 484, 570, 610, 717, 724, 814, 878,
  // Rhode Island
  401,
  // South Carolina
  803, 839, 843, 854, 864,
  // South Dakota
  605,
  // Tennessee
  423, 615, 629, 731, 865, 901, 931,
  // Texas
  210, 214, 254, 281, 325, 346, 361, 409, 430, 432, 469, 512,
  682, 713, 726, 737, 806, 817, 830, 832, 903, 915, 936, 940,
  945, 956, 972, 979,
  // Utah
  385, 435, 801,
  // Vermont
  802,
  // Virginia
  276, 434, 540, 571, 703, 757, 804, 826, 948,
  // Washington
  206, 253, 360, 425, 509, 564,
  // West Virginia
  304, 681,
  // Wisconsin
  262, 414, 534, 608, 715, 920,
  // Wyoming
  307,
  // Puerto Rico
  787, 939,
  // U.S. Virgin Islands
  340
];


// State abbreviation map
const stateAbbreviations = {
  "Alabama": "AL", "Alaska": "AK", "Arizona": "AZ", "Arkansas": "AR", "California": "CA",
  "Colorado": "CO", "Connecticut": "CT", "Delaware": "DE", "Florida": "FL", "Georgia": "GA",
  "Hawaii": "HI", "Idaho": "ID", "Illinois": "IL", "Indiana": "IN", "Iowa": "IA", "Kansas": "KS",
  "Kentucky": "KY", "Louisiana": "LA", "Maine": "ME", "Maryland": "MD", "Massachusetts": "MA",
  "Michigan": "MI", "Minnesota": "MN", "Mississippi": "MS", "Missouri": "MO", "Montana": "MT",
  "Nebraska": "NE", "Nevada": "NV", "New Hampshire": "NH", "New Jersey": "NJ", "New Mexico": "NM",
  "New York": "NY", "North Carolina": "NC", "North Dakota": "ND", "Ohio": "OH", "Oklahoma": "OK",
  "Oregon": "OR", "Pennsylvania": "PA", "Rhode Island": "RI", "South Carolina": "SC",
  "South Dakota": "SD", "Tennessee": "TN", "Texas": "TX", "Utah": "UT", "Vermont": "VT",
  "Virginia": "VA", "Washington": "WA", "West Virginia": "WV", "Wisconsin": "WI", "Wyoming": "WY",
  "Puerto Rico": "PR", "Washington DC": "DC", "Virgin Islands": "VI"
};

  // Add stateAbbreviation and ipCountryCode state
  const [ipCountryCode, setIpCountryCode] = useState("US");
  const [ipCheckError, setIpCheckError] = useState("");
  const [validating, setValidating] = useState(false); // <-- Add this

  // Reset ipCountryCode and ipCheckError on service change
  useEffect(() => {
    setIpCountryCode("US");
    setIpCheckError("");
  }, [title]);

  // --- Formik enhanced validateAndContinue ---
  const validateAndContinue = async (
    values,
    errors,
    validateForm,
    setFieldTouched,
    setErrors,
    setFieldValue
  ) => {
    const currentField = allFields[currentStep];

    setValidating(true); // <-- Start loader
    await setFieldTouched(currentField.name, true, false);
    let validationErrors = await validateForm();

    // State + ZIP validation
    if (
      currentField.name === "zipCode" &&
      !validationErrors.zipCode &&
      values.zipCode &&
      values.state
    ) {
      try {
        const zipRes = await fetch(
          `https://steermarketeer.com/api/a9f3b2c1e7d4?zip=${values.zipCode}`,
          { method: "POST" }
        );
        const zipData = await zipRes.json();

        if (zipData.state_name === "unknown") {
          setErrors({ ...validationErrors, zipCode: "Invalid zip code (not US)." });
          setValidating(false);
          return;
        }
        if (
          zipData.state_name &&
          zipData.state_name.toLowerCase() !== values.state.toLowerCase()
        ) {
          setErrors({ ...validationErrors, zipCode: "Invalid zip code for selected state." });
          setValidating(false);
          return;
        }

        // Auto-fill city using zippopotam.us
        try {
          const cityRes = await fetch(
            `https://api.zippopotam.us/us/${values.zipCode}`
          );
          if (cityRes.ok) {
            const cityData = await cityRes.json();
            if (
              cityData.places &&
              cityData.places.length > 0 &&
              cityData.places[0]["place name"]
            ) {
              setFieldValue("city", cityData.places[0]["place name"], false);
            }
          } else {
            setFieldValue("city", "", false);
          }
        } catch {
          setFieldValue("city", "", false);
        }
      } catch {
        setErrors({ ...validationErrors, zipCode: "Could not validate zip code." });
        setValidating(false);
        return;
      }
    }

    // Email domain validation
    if (
      currentField.name === "email" &&
      !validationErrors.email &&
      values.email
    ) {
      const domain = values.email.split("@")[1];
      if (domain) {
        try {
          const res = await fetch(`https://8.8.8.8/resolve?name=${domain}&type=MX`);
          const data = await res.json();
          if (data.Status === 3) {
            setErrors({ ...validationErrors, email: "Invalid email domain." });
            setValidating(false);
            return;
          }
        } catch {
          setErrors({ ...validationErrors, email: "Could not validate email domain." });
          setValidating(false);
          return;
        }
      }
    }

    // Phone area code validation
    if (
      currentField.name === "phone" &&
      !validationErrors.phone &&
      values.phone.length === 10
    ) {
      const areaCode = parseInt(values.phone.slice(0, 3), 10);
      if (!areaCodesUS.includes(areaCode)) {
        setErrors({ ...validationErrors, phone: "Invalid US area code." });
        setValidating(false);
        return;
      }
    }

    // IP country validation at 2nd last step (do NOT block next, just set error for submit)
    if (currentStep === totalSteps - 2 && values.ipAddress) {
      try {
        const ipRes = await fetch(`https://ipapi.co/${values.ipAddress}/json/`);
        const ipData = await ipRes.json();
        if (ipData.country_code !== "US") {
          setIpCountryCode(ipData.country_code);
          setIpCheckError("This service is only for US citizens.");
        } else {
          setIpCountryCode("US");
          setIpCheckError("");
        }
      } catch {
        setIpCountryCode("US");
        setIpCheckError("");
      }
      // Do NOT return here, let user go to last step
    }

    // Energy provider validation
    if (currentField.name === "Who is your energy provider?" && !validationErrors[currentField.name] && values[currentField.name]) {
      try {
        const res = await fetch(`https://steermarketeer.com/API/providers.php?q=${encodeURIComponent(values[currentField.name])}`);
        if (res.ok) {
          const data = await res.json();
          const found = data.some(p => p.name === values[currentField.name]);
          if (!found) {
            setErrors({ ...validationErrors, [currentField.name]: "Please select a valid energy provider from the suggestions." });
            setValidating(false);
            return;
          }
        } else {
          setErrors({ ...validationErrors, [currentField.name]: "Could not validate provider." });
          setValidating(false);
          return;
        }
      } catch {
        setErrors({ ...validationErrors, [currentField.name]: "Could not validate provider." });
        setValidating(false);
        return;
      }
    }

    setValidating(false); // <-- End loader

    if (
      !validationErrors[currentField.name] &&
      values[currentField.name] !== ""
    ) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    setCurrentStep(Math.max(0, currentStep - 1));
  };

  // Reset form on URL change
  useEffect(() => {
    setCurrentStep(0); // Reset step to beginning
  }, [title]); // Trigger when URL parameter 'title' changes

  // Load external scripts and initial data
  // Comment out LeadiD script loading
  useEffect(() => {
    const cleanupTrustedForm = loadTrustedFormScript();
    // const cleanupLeadiD = loadLeadiDScript(); // <-- Commented out for now
    // Load LeadiD script
  const leadiDScriptSrc = "//create.lidstatic.com/campaign/548c86c2-3c24-2ec2-b201-274ffb0f5005.js?snippet_version=2";
  let leadiDScript;
  if (!document.querySelector(`script[src="${leadiDScriptSrc}"]`)) {
    leadiDScript = document.createElement("script");
    leadiDScript.id = "LeadiDscript_campaign";
    leadiDScript.type = "text/javascript";
    leadiDScript.async = true;
    leadiDScript.src = leadiDScriptSrc;
    document.body.appendChild(leadiDScript);
  }

  return () => {
    if (cleanupTrustedForm) cleanupTrustedForm();
    if (leadiDScript && document.body.contains(leadiDScript)) {
      document.body.removeChild(leadiDScript);
    }
  };
}, []);

    return (
      <div className="container mx-auto px-6 py-12 pt-24">
        <div className="flex items-center justify-center gap-4 pb-6">
          <h1 className="text-3xl">Get A {title} Consultation!</h1>
          {service?.image && (
            <img
              src={service.image}
              alt={`${title} service`}
              className="w-20 h-20 object-contain"
            />
          )}
        </div>

        <div className="max-w-md mx-auto mb-8">
          <div className="bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-[#ffb000] h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
            ></div>
          </div>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            setFieldValue,
            validateForm,
            setFieldTouched,
            setErrors,
          }) => {
            // Load initial data when Formik is ready
            useEffect(() => {
              fetchInitialData(setFieldValue);
              // Set xxTrustedFormCertUrl from the hidden input if available
              const interval = setInterval(() => {
                const tfInput = document.querySelector('input[name="xxTrustedFormCertUrl"]');
                if (tfInput && tfInput.value) {
                  setFieldValue('xxTrustedFormCertUrl', tfInput.value, false);
                  clearInterval(interval);
                }
              }, 200);

              // Set universal_leadid from the hidden input if available
      const leadiDInterval = setInterval(() => {
        const leadidInput = document.getElementById('leadid_token');
        if (leadidInput && leadidInput.value) {
          setFieldValue('universalLeadid', leadidInput.value, false);
          clearInterval(leadiDInterval);
        }
      }, 200);

      return () => {
        clearInterval(interval);
        clearInterval(leadiDInterval);
      };
            }, [setFieldValue]);

            const currentField = allFields[currentStep];
            const isLastStep = currentStep === totalSteps - 1;

            return (
              <Form className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-6 text-center">
                    {currentField.label}
                  </h2>

                  <div className="mb-6">
                    {/* Hidden TrustedForm field for Formik */}
                    <Field type="hidden" name="xxTrustedFormCertUrl" />
                    <input id="leadid_token" name="universalLeadid" type="hidden" value={values.universalLeadid || ""} readOnly />
                    {currentField.name === "When are you planning to move" ? (
                      <Field
                        type="date"
                        name={currentField.name}
                        min={new Date().toISOString().split("T")[0]} // Only allow today or future
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffb000] focus:border-transparent"
                      />
                    ) : currentField.type === "select" ? (
                      <div>
                        <Field
                          as="select"
                          name={currentField.name}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffb000] focus:border-transparent"
                        >
                          <option value="">Select an option</option>
                          {currentField.options?.map((option, idx) => (
                            <option key={idx} value={option}>
                              {option}
                            </option>
                          ))}
                        </Field>
                      </div>
                    ) : currentField.type === "textarea" ? (
                      <Field
                        as="textarea"
                        name={currentField.name}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffb000] focus:border-transparent resize-none"
                        rows="4"
                      />
                    ) : currentField.type === "checkbox" ? (
                      <div className="flex items-start gap-3">
                        <Field
                          type="checkbox"
                          name={currentField.name}
                          className="mt-1"
                        />
                        <span className="text-sm text-[#1f2020] text-justify">
                          By clicking GET YOUR QUOTE, I agree to the{" "}
                          <Link
                            to="/userTerms"
                            className="underline text-blue-400"
                          >
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link
                            to="/PrivacyPolicy"
                            className="underline text-blue-400"
                          >
                            Privacy Policy
                          </Link>
                          , I authorize home improvement companies, their
                          contractors, and{" "}
                          <Link
                            to="/PartnerCompanies"
                            className="underline text-blue-400"
                          >
                            Partner Companies
                          </Link>{" "}
                          to contact me about home improvement offers by phone
                          calls and text messages to the number I provided. I
                          authorize that these marketing communications may be
                          delivered to me using an automatic telephone dialing
                          system or by prerecorded message. I understand that my
                          consent is not a condition of purchase, and I may revoke
                          that consent at any time. Mobile and data charges may
                          apply. California Residents.
                        </span>
                      </div>
                    ) : currentField.name === "phone" ? (
                      <Field
                        type="tel"
                        name={currentField.name}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffb000] focus:border-transparent"
                        onChange={(e) => {
                          const value = e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 10);
                          setFieldValue(currentField.name, value);
                        }}
                        placeholder="Enter your 10-digit phone number"
                      />
                    ) : currentField.name === "Current zip code" ||
                     currentField.name === "Moving zip code" ||
                     currentField.name === "zipCode" ? (
                      <Field
                        type="text"
                        name={currentField.name}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffb000] focus:border-transparent"
                        inputMode="numeric"
                        maxLength={5}
                        pattern="\d*"
                        onChange={e => {
                          const value = e.target.value.replace(/\D/g, "").slice(0, 5);
                          setFieldValue(currentField.name, value);
                        }}
                        placeholder="Enter 5-digit zip code"
                      />
                    ) : currentField.name === "Who is your energy provider?" ? (
                      <div className="relative">
                        <Field
                          type="text"
                          name={currentField.name}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffb000] focus:border-transparent"
                          placeholder="Type to search energy providers"
                          onChange={(e) => {
                            const value = e.target.value;
                            setFieldValue(currentField.name, value);
                            setSelectedProviderId(null); // Reset ID when typing
                            if (debounceRef.current) clearTimeout(debounceRef.current);
                            debounceRef.current = setTimeout(() => {
                              fetchProviders(value);
                            }, 300);
                          }}
                        />
                        {providerLoading && <div className="text-sm text-gray-500 mt-1">Loading...</div>}
                        {providerSuggestions.length > 0 && (
                          <ul
                            className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg"
                            style={{ WebkitOverflowScrolling: 'touch' }}
                            onTouchStart={(e) => e.stopPropagation()}
                            onTouchMove={(e) => e.stopPropagation()}
                          >
                            {providerSuggestions.map((provider) => (
                              <li
                                key={provider.id}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                  setFieldValue(currentField.name, provider.name);
                                  setFieldValue("ElectricalEnergyProviderId", provider.id);
                                  setSelectedProviderId(provider.id);
                                  setProviderSuggestions([]);
                                }}
                              >
                                {provider.name}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ) : (
                      <Field
                        type={currentField.type}
                        name={currentField.name}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffb000] focus:border-transparent"
                        placeholder={`Enter your ${currentField.label.toLowerCase()}`}
                        onKeyDown={(e) => {
                          if (
                            e.key === 'Enter' &&
                            currentField.type === 'text' &&
                            !e.shiftKey
                          ) {
                            e.preventDefault();
                            validateAndContinue(
                              values,
                              errors,
                              validateForm,
                              setFieldTouched,
                              setErrors
                            );
                          }
                        }}
                      />
                    )}

                    <ErrorMessage
                      name={currentField.name}
                      component="p"
                      className="text-red-600 text-sm mt-2"
                    />
                    {currentField.name === "Who is your energy provider?" && (
                      <div className="text-sm text-gray-500 mt-2">If not sure, type "Other"</div>
                    )}
                  </div>

                  <div className="flex gap-4 justify-between mt-6">
                    {currentStep > 0 && (
                      <button
                        type="button"
                        onClick={goToPreviousStep}
                        className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-300"
                      >
                        Back
                      </button>
                    )}

                    {isLastStep ? (
                      <button
                        type="submit"
                        className="px-6 py-2 bg-[#ffb000] text-black rounded-md hover:bg-amber-500 transition duration-300 ml-auto flex items-center justify-center"
                        disabled={loading || ipCountryCode !== "US"} // <-- Use disabled, not blocked
                        style={{
                          opacity: loading || ipCountryCode !== "US" ? 0.5 : 1,
                          cursor: loading || ipCountryCode !== "US" ? "not-allowed" : "blocked"
                        }}
                      >
                        {loading ? (
                          <svg className="animate-spin h-5 w-5 mr-2 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                          </svg>
                        ) : null}
                        {loading ? 'Submitting...' : 'Submit'}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          validateAndContinue(
                            values,
                            errors,
                            validateForm,
                            setFieldTouched,
                            setErrors,
                            setFieldValue // <-- pass this
                          )
                        }
                        className="px-6 py-2 bg-[#ffb000] text-black rounded-md hover:bg-amber-500 transition duration-300 ml-auto"
                      >
                        Next
                      </button>
                    )}
                  </div>
                  {apiError && (
                    <div className="text-red-600 text-center mt-4">{apiError}</div>
                  )}
                  {ipCheckError && (
                    <div className="text-red-600 text-center mt-4">{ipCheckError}</div>
                  )}
                </div>
              </Form>
            );
          }}
        </Formik>
        {validating && (
          <div className="text-center text-[#ffb000] font-semibold mb-2">
            Validating...
          </div>
        )}
        <noscript>
  <img src='//create.leadid.com/noscript.gif?lac=6B96394A-E3F0-75F4-8748-80CB63C352C2&lck=548c86c2-3c24-2ec2-b201-274ffb0f5005&snippet_version=2' alt="" />
</noscript>
      </div>
    );
  };


export default ServiceDetails;
