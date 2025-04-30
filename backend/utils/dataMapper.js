/**
 * Data Mapping and Transformation Module
 * 
 * This module provides functions to normalize data from various sources
 * (rural, urban, CERSAI, MCA21) into a unified data structure.
 */

const format = require('date-fns/format');
const parse = require('date-fns/parse');

/**
 * Normalize date strings to a standard format (YYYY-MM-DD)
 * Handles various input formats
 * 
 * @param {string} dateString - Date string in any format
 * @returns {string} Normalized date string in YYYY-MM-DD format
 */
const normalizeDate = (dateString) => {
  if (!dateString) return null;
  
  try {
    // Handle common date formats
    let date;
    
    // Try different formats until one works
    const formats = [
      'yyyy-MM-dd', // 2023-01-15
      'dd/MM/yyyy', // 15/01/2023
      'MM/dd/yyyy', // 01/15/2023
      'dd-MM-yyyy', // 15-01-2023
      'MM-dd-yyyy', // 01-15-2023
      'dd MMM yyyy', // 15 Jan 2023
      'MMM dd, yyyy', // Jan 15, 2023
      'MMMM dd, yyyy', // January 15, 2023
      'dd MMMM yyyy', // 15 January 2023
      'yyyy/MM/dd', // 2023/01/15
      'yyyy.MM.dd', // 2023.01.15
    ];
    
    for (const formatString of formats) {
      try {
        date = parse(dateString, formatString, new Date());
        if (!isNaN(date.getTime())) {
          break;
        }
      } catch (e) {
        // Continue trying other formats
      }
    }
    
    // If all formats failed, try native Date parsing
    if (isNaN(date?.getTime())) {
      date = new Date(dateString);
    }
    
    // If still invalid, return null
    if (isNaN(date.getTime())) {
      return null;
    }
    
    // Format to standard ISO date
    return format(date, 'yyyy-MM-dd');
  } catch (error) {
    console.error(`Error normalizing date: ${dateString}`, error);
    return null;
  }
};

/**
 * Normalize address data from various sources
 * 
 * @param {Object} address - Address in any format
 * @returns {Object} Normalized address object
 */
const normalizeAddress = (address) => {
  if (!address) return null;
  
  // Initialize with standard fields
  const normalizedAddress = {
    full: '',
    street: '',
    area: '',
    village: '',
    city: '',
    tehsil: '',
    district: '',
    state: '',
    pincode: '',
    country: 'India'
  };
  
  try {
    if (typeof address === 'string') {
      // If address is a string, store it as full address
      normalizedAddress.full = address;
      
      // Try to extract pincode using regex
      const pincodeMatch = address.match(/\b[1-9][0-9]{5}\b/);
      if (pincodeMatch) {
        normalizedAddress.pincode = pincodeMatch[0];
      }
      
      return normalizedAddress;
    }
    
    // Handle common address field names from different sources
    const fieldMappings = {
      street: ['street', 'streetAddress', 'road', 'lane', 'streetName'],
      area: ['area', 'locality', 'sector', 'neighborhood', 'colony', 'mohalla'],
      village: ['village', 'gram', 'gramPanchayat'],
      city: ['city', 'town', 'municipality', 'urban', 'urbanBody'],
      tehsil: ['tehsil', 'taluk', 'taluka', 'mandal', 'block'],
      district: ['district', 'zilla', 'zila'],
      state: ['state', 'province', 'stateUT', 'stateUnionTerritory'],
      pincode: ['pincode', 'pin', 'postalCode', 'zip', 'zipCode'],
    };
    
    // Map fields from address object to normalized fields
    Object.entries(fieldMappings).forEach(([normalizedField, sourceFields]) => {
      for (const fieldName of sourceFields) {
        if (address[fieldName]) {
          normalizedAddress[normalizedField] = address[fieldName];
          break;
        }
      }
    });
    
    // Build full address if not already provided
    if (!normalizedAddress.full) {
      const addressParts = [];
      if (normalizedAddress.street) addressParts.push(normalizedAddress.street);
      if (normalizedAddress.area) addressParts.push(normalizedAddress.area);
      if (normalizedAddress.village) addressParts.push(normalizedAddress.village);
      if (normalizedAddress.city) addressParts.push(normalizedAddress.city);
      if (normalizedAddress.tehsil) addressParts.push(normalizedAddress.tehsil);
      if (normalizedAddress.district) addressParts.push(normalizedAddress.district);
      if (normalizedAddress.state) addressParts.push(normalizedAddress.state);
      if (normalizedAddress.pincode) addressParts.push(normalizedAddress.pincode);
      
      normalizedAddress.full = addressParts.join(', ');
    }
    
    return normalizedAddress;
  } catch (error) {
    console.error('Error normalizing address:', error);
    return {
      full: typeof address === 'string' ? address : JSON.stringify(address),
      country: 'India'
    };
  }
};

/**
 * Normalize an urban property record
 * 
 * @param {Object} property - Urban property data
 * @returns {Object} Normalized property data
 */
const normalizeUrbanProperty = (property) => {
  if (!property) return null;
  
  try {
    return {
      sourceType: 'urban',
      sourceId: property.id || property.propertyId || '',
      uniqueId: `urban_${property.id || property.propertyId || Math.random().toString(36).substring(2, 10)}`,
      propertyType: property.type || property.propertyType || '',
      address: normalizeAddress(property.address),
      owner: {
        name: property.owner || property.ownerName || '',
        type: property.ownerType || 'individual',
        contact: property.ownerContact || property.contactDetails || null
      },
      registrationDetails: {
        number: property.registrationNumber || '',
        date: normalizeDate(property.registrationDate),
        authority: property.registrationAuthority || 'Municipal Corporation'
      },
      propertyDetails: {
        area: property.propertyDetails?.area || property.area || '',
        areaUnit: extractAreaUnit(property.propertyDetails?.area || property.area || ''),
        marketValue: property.propertyDetails?.price || property.marketValue || '',
        bedrooms: property.propertyDetails?.bedrooms || property.bedrooms || null,
        bathrooms: property.propertyDetails?.bathrooms || property.bathrooms || null,
        floors: property.propertyDetails?.floors || property.floors || null,
        constructionYear: property.propertyDetails?.yearBuilt || property.constructionYear || null,
        amenities: property.propertyDetails?.amenities || property.amenities || []
      },
      encumbrances: {
        hasLoan: property.hasLoan === true || false,
        loanDetails: property.loanDetails || property.encumbranceDetails || null
      },
      documents: property.documents || [],
      taxDetails: {
        propertyTaxDue: property.propertyTaxDue || property.taxDue || null,
        lastPaymentDate: normalizeDate(property.lastTaxPaymentDate),
        assessmentNumber: property.assessmentNumber || ''
      },
      metadata: {
        lastUpdated: normalizeDate(property.lastUpdated) || new Date().toISOString().split('T')[0],
        dataSource: 'Municipal Corporation',
        dataQuality: validateDataQuality(property)
      },
      rawData: property
    };
  } catch (error) {
    console.error('Error normalizing urban property:', error);
    return {
      sourceType: 'urban',
      sourceId: property.id || property.propertyId || '',
      uniqueId: `urban_${property.id || property.propertyId || Math.random().toString(36).substring(2, 10)}`,
      error: 'Failed to normalize data',
      rawData: property
    };
  }
};

/**
 * Normalize a rural property record
 * 
 * @param {Object} property - Rural property data
 * @returns {Object} Normalized property data
 */
const normalizeRuralProperty = (property) => {
  if (!property) return null;
  
  try {
    return {
      sourceType: 'rural',
      sourceId: property.id || property.khasraNumber || '',
      uniqueId: `rural_${property.id || property.khasraNumber || Math.random().toString(36).substring(2, 10)}`,
      propertyType: property.type || 'Agricultural Land',
      address: normalizeAddress(property.address),
      owner: {
        name: property.owner || property.ownerName || '',
        type: property.ownerType || determineOwnerType(property.owner || property.ownerName || ''),
        contact: property.ownerContact || property.contactDetails || null
      },
      landDetails: {
        khasraNumber: property.khasraNumber || '',
        surveyNumber: property.surveyNumber || '',
        area: property.propertyDetails?.area || property.area || '',
        areaUnit: extractAreaUnit(property.propertyDetails?.area || property.area || ''),
        landType: property.propertyDetails?.landType || property.landType || '',
        soilType: property.propertyDetails?.soilType || property.soilType || '',
        irrigationType: property.propertyDetails?.irrigationType || property.irrigationType || '',
        marketValue: property.propertyDetails?.price || property.marketValue || ''
      },
      encumbrances: {
        hasLoan: property.hasLoan === true || false,
        loanDetails: property.loanDetails || property.encumbranceDetails || null
      },
      documents: property.documents || [],
      revenueDetails: {
        landRevenueDue: property.landRevenueDue || null,
        lastPaymentDate: normalizeDate(property.lastRevenuPaymentDate),
        khataNumber: property.khataNumber || '',
        landUseZone: property.landUseZone || ''
      },
      metadata: {
        lastUpdated: normalizeDate(property.lastUpdated) || new Date().toISOString().split('T')[0],
        dataSource: 'Land Records Department',
        dataQuality: validateDataQuality(property)
      },
      rawData: property
    };
  } catch (error) {
    console.error('Error normalizing rural property:', error);
    return {
      sourceType: 'rural',
      sourceId: property.id || property.khasraNumber || '',
      uniqueId: `rural_${property.id || property.khasraNumber || Math.random().toString(36).substring(2, 10)}`,
      error: 'Failed to normalize data',
      rawData: property
    };
  }
};

/**
 * Normalize a CERSAI encumbrance record
 * 
 * @param {Object} encumbrance - CERSAI encumbrance data
 * @returns {Object} Normalized encumbrance data
 */
const normalizeCersaiEncumbrance = (encumbrance) => {
  if (!encumbrance) return null;
  
  try {
    return {
      sourceType: 'cersai',
      sourceId: encumbrance.id || encumbrance.encumbranceId || '',
      uniqueId: `cersai_${encumbrance.id || encumbrance.encumbranceId || Math.random().toString(36).substring(2, 10)}`,
      propertyId: encumbrance.propertyId || '',
      propertyType: encumbrance.propertyType || '',
      address: normalizeAddress(encumbrance.propertyAddress || encumbrance.address),
      borrower: {
        name: encumbrance.borrowerName || '',
        type: encumbrance.borrowerType || 'individual',
        contact: encumbrance.borrowerContact || null
      },
      lender: {
        name: encumbrance.lenderName || '',
        type: encumbrance.lenderType || 'financial_institution',
        branch: encumbrance.lenderBranch || ''
      },
      loanDetails: {
        loanNumber: encumbrance.loanNumber || encumbrance.loanId || '',
        loanAmount: encumbrance.loanAmount || '',
        outstandingAmount: encumbrance.outstandingAmount || '',
        loanDate: normalizeDate(encumbrance.loanDate),
        purpose: encumbrance.loanPurpose || ''
      },
      securityDetails: {
        type: encumbrance.securityType || 'mortgage',
        creationDate: normalizeDate(encumbrance.securityCreationDate),
        expiryDate: normalizeDate(encumbrance.securityExpiryDate),
        registrationNumber: encumbrance.registrationNumber || ''
      },
      status: encumbrance.status || 'active',
      metadata: {
        lastUpdated: normalizeDate(encumbrance.lastUpdated) || new Date().toISOString().split('T')[0],
        dataSource: 'CERSAI',
        dataQuality: validateDataQuality(encumbrance)
      },
      rawData: encumbrance
    };
  } catch (error) {
    console.error('Error normalizing CERSAI encumbrance:', error);
    return {
      sourceType: 'cersai',
      sourceId: encumbrance.id || encumbrance.encumbranceId || '',
      uniqueId: `cersai_${encumbrance.id || encumbrance.encumbranceId || Math.random().toString(36).substring(2, 10)}`,
      error: 'Failed to normalize data',
      rawData: encumbrance
    };
  }
};

/**
 * Normalize an MCA21 company record
 * 
 * @param {Object} company - MCA21 company data
 * @returns {Object} Normalized company data
 */
const normalizeMca21Data = (company) => {
  if (!company) return null;
  
  try {
    return {
      sourceType: 'mca21',
      sourceId: company.cin || company.llpin || company.id || '',
      uniqueId: `mca21_${company.cin || company.llpin || company.id || Math.random().toString(36).substring(2, 10)}`,
      companyName: company.name || company.companyName || '',
      companyType: company.type || company.companyType || '',
      registrationDetails: {
        cin: company.cin || '',
        llpin: company.llpin || '',
        registrationDate: normalizeDate(company.registrationDate || company.dateOfIncorporation),
        status: company.status || company.companyStatus || ''
      },
      address: normalizeAddress(company.address || company.registeredAddress),
      directors: company.directors || company.boardOfDirectors || [],
      financialDetails: {
        authorizedCapital: company.authorizedCapital || '',
        paidUpCapital: company.paidUpCapital || '',
        turnover: company.turnover || '',
        netWorth: company.netWorth || ''
      },
      documents: company.documents || [],
      propertyHoldings: company.propertyHoldings || [],
      metadata: {
        lastUpdated: normalizeDate(company.lastUpdated) || new Date().toISOString().split('T')[0],
        dataSource: 'MCA21',
        dataQuality: validateDataQuality(company)
      },
      rawData: company
    };
  } catch (error) {
    console.error('Error normalizing MCA21 data:', error);
    return {
      sourceType: 'mca21',
      sourceId: company.cin || company.llpin || company.id || '',
      uniqueId: `mca21_${company.cin || company.llpin || company.id || Math.random().toString(36).substring(2, 10)}`,
      error: 'Failed to normalize data',
      rawData: company
    };
  }
};

/**
 * Determine the owner type based on the owner name
 * 
 * @param {string} ownerName - Name of the property owner
 * @returns {string} Type of owner (individual, cooperative, company, etc.)
 */
const determineOwnerType = (ownerName) => {
  if (!ownerName) return 'unknown';
  
  // Check for different organization types in the name
  const lowerName = ownerName.toLowerCase();
  
  if (lowerName.includes('co-op') || lowerName.includes('cooperative')) {
    return 'cooperative';
  } else if (lowerName.includes(' ltd') || lowerName.includes('limited') || 
             lowerName.includes(' pvt') || lowerName.includes('private') ||
             lowerName.includes(' inc') || lowerName.includes('corporation')) {
    return 'company';
  } else if (lowerName.includes('trust') || lowerName.includes('foundation')) {
    return 'trust';
  } else if (lowerName.includes('government') || lowerName.includes('govt') || 
             lowerName.includes('ministry') || lowerName.includes('department')) {
    return 'government';
  } else if (lowerName.includes('society') || lowerName.includes('association')) {
    return 'society';
  } else if (lowerName.includes('temple') || lowerName.includes('church') || 
             lowerName.includes('mosque') || lowerName.includes('gurudwara')) {
    return 'religious';
  } else {
    // Check if multiple names are present (indicating multiple individuals)
    if (ownerName.includes('&') || ownerName.includes(' and ') || 
        (ownerName.match(/,/g) || []).length > 1) {
      return 'multiple_individuals';
    }
    
    return 'individual';
  }
};

/**
 * Extract area unit from area string
 * 
 * @param {string} areaString - Area string (e.g., "1200 sq. ft.", "5 acres")
 * @returns {string} Area unit
 */
const extractAreaUnit = (areaString) => {
  if (!areaString || typeof areaString !== 'string') return '';
  
  // Common area units
  const units = {
    'sq. ft.': 'sq_ft',
    'sq ft': 'sq_ft',
    'square feet': 'sq_ft',
    'ft²': 'sq_ft',
    'sqft': 'sq_ft',
    'sq. m.': 'sq_m',
    'sq m': 'sq_m',
    'square meter': 'sq_m',
    'square metre': 'sq_m',
    'm²': 'sq_m',
    'sqm': 'sq_m',
    'acre': 'acre',
    'acres': 'acre',
    'hectare': 'hectare',
    'hectares': 'hectare',
    'ha': 'hectare',
    'bigha': 'bigha',
    'biswa': 'biswa',
    'gunta': 'gunta',
    'guntha': 'gunta',
    'marla': 'marla',
    'kanal': 'kanal'
  };
  
  for (const [unitPattern, standardUnit] of Object.entries(units)) {
    if (areaString.toLowerCase().includes(unitPattern)) {
      return standardUnit;
    }
  }
  
  return '';
};

/**
 * Validate data quality and completeness
 * 
 * @param {Object} data - Input data object
 * @returns {Object} Data quality assessment
 */
const validateDataQuality = (data) => {
  if (!data) return { score: 0, issues: ['No data provided'] };
  
  const issues = [];
  let score = 100; // Start with perfect score
  
  // Count total fields and missing fields
  const totalFields = Object.keys(data).length;
  let missingFields = 0;
  
  for (const [key, value] of Object.entries(data)) {
    if (value === null || value === undefined || value === '') {
      issues.push(`Missing ${key}`);
      missingFields++;
    } else if (typeof value === 'object' && !Array.isArray(value)) {
      // Check nested objects
      const nestedKeys = Object.keys(value);
      const nestedMissing = nestedKeys.filter(k => !value[k]).length;
      
      if (nestedMissing === nestedKeys.length) {
        issues.push(`Empty object for ${key}`);
        missingFields++;
      }
    }
  }
  
  // Calculate quality score based on completeness
  if (totalFields > 0) {
    const missingRatio = missingFields / totalFields;
    score = Math.round(100 * (1 - missingRatio));
  }
  
  // Check for specific fields based on data type
  if (data.address) {
    // Address should have city or district and state
    if (!data.address.city && !data.address.district) {
      issues.push('Missing city/district in address');
      score -= 5;
    }
    
    if (!data.address.state) {
      issues.push('Missing state in address');
      score -= 5;
    }
  }
  
  // Cap score between 0 and 100
  score = Math.max(0, Math.min(100, score));
  
  return {
    score,
    completeness: `${score}%`,
    issues: issues.length > 0 ? issues : ['No issues detected'],
    missingFieldCount: missingFields,
    totalFieldCount: totalFields
  };
};

/**
 * Combine and de-duplicate property data from multiple sources
 * 
 * @param {Array} properties - Array of normalized property objects
 * @returns {Array} De-duplicated and combined property records
 */
const combineAndDeduplicateProperties = (properties) => {
  if (!Array.isArray(properties) || properties.length === 0) {
    return [];
  }
  
  // Group properties by address similarity
  const addressGroups = {};
  
  properties.forEach(property => {
    if (!property || !property.address) return;
    
    // Create an address key for grouping similar addresses
    const addressKey = generateAddressKey(property.address);
    
    if (!addressGroups[addressKey]) {
      addressGroups[addressKey] = [];
    }
    
    addressGroups[addressKey].push(property);
  });
  
  // Combine properties within each address group
  const combinedProperties = [];
  
  Object.values(addressGroups).forEach(group => {
    if (group.length === 1) {
      // Single property in this group, no need to combine
      combinedProperties.push(group[0]);
    } else {
      // Multiple properties with similar address, combine them
      const combined = combineProperties(group);
      combinedProperties.push(combined);
    }
  });
  
  return combinedProperties;
};

/**
 * Generate a key for grouping similar addresses
 * 
 * @param {Object} address - Normalized address object
 * @returns {string} Address key for grouping
 */
const generateAddressKey = (address) => {
  if (!address) return 'unknown';
  
  // Generate an address key based on pincode, state, district/city
  const parts = [];
  
  if (address.pincode) parts.push(address.pincode);
  if (address.state) parts.push(address.state.toLowerCase().replace(/\s+/g, ''));
  
  if (address.district) {
    parts.push(address.district.toLowerCase().replace(/\s+/g, ''));
  } else if (address.city) {
    parts.push(address.city.toLowerCase().replace(/\s+/g, ''));
  }
  
  // Add street/area info if available to make the key more specific
  if (address.street) {
    parts.push(address.street.toLowerCase().replace(/\s+/g, '').substring(0, 10));
  } else if (address.area) {
    parts.push(address.area.toLowerCase().replace(/\s+/g, '').substring(0, 10));
  }
  
  return parts.join('_') || 'unknown';
};

/**
 * Combine multiple property records into a single unified record
 * 
 * @param {Array} properties - Array of property objects to combine
 * @returns {Object} Combined property record
 */
const combineProperties = (properties) => {
  if (!Array.isArray(properties) || properties.length === 0) {
    return null;
  }
  
  // Start with the most complete record as the base
  const baseProperty = findMostCompleteRecord(properties);
  const result = { ...baseProperty };
  
  // Track sources that contributed to this combined record
  result.dataSources = [baseProperty.sourceType];
  
  // Store the original IDs from different sources
  result.sourceIds = {
    [baseProperty.sourceType]: baseProperty.sourceId
  };
  
  // Combine information from other sources
  properties.forEach(property => {
    if (property.uniqueId === baseProperty.uniqueId) return; // Skip the base property
    
    // Add this source to the list
    if (!result.dataSources.includes(property.sourceType)) {
      result.dataSources.push(property.sourceType);
    }
    
    // Store the source ID
    result.sourceIds[property.sourceType] = property.sourceId;
    
    // Merge missing fields from this property
    mergePropertyData(result, property);
  });
  
  // Generate a new uniqueId for the combined record
  result.uniqueId = `combined_${result.dataSources.join('_')}_${result.sourceId || Math.random().toString(36).substring(2, 10)}`;
  
  // Update metadata
  result.metadata = {
    ...(result.metadata || {}),
    combinedRecord: true,
    dataSources: result.dataSources,
    lastUpdated: new Date().toISOString().split('T')[0],
    dataQuality: validateDataQuality(result)
  };
  
  return result;
};

/**
 * Find the most complete record in a set of properties
 * 
 * @param {Array} properties - Array of property objects
 * @returns {Object} Most complete property record
 */
const findMostCompleteRecord = (properties) => {
  if (!Array.isArray(properties) || properties.length === 0) {
    return null;
  }
  
  if (properties.length === 1) {
    return properties[0];
  }
  
  let mostComplete = properties[0];
  let highestScore = 0;
  
  properties.forEach(property => {
    const quality = validateDataQuality(property);
    if (quality.score > highestScore) {
      highestScore = quality.score;
      mostComplete = property;
    }
  });
  
  return mostComplete;
};

/**
 * Merge data from a source property into a target property
 * 
 * @param {Object} target - Target property to merge into
 * @param {Object} source - Source property to merge from
 */
const mergePropertyData = (target, source) => {
  if (!target || !source) return;
  
  // Helper function to merge objects without overwriting existing values
  const mergeObjects = (targetObj, sourceObj) => {
    if (!targetObj || !sourceObj) return targetObj || sourceObj;
    
    const result = { ...targetObj };
    
    Object.entries(sourceObj).forEach(([key, value]) => {
      // Skip null/undefined values
      if (value === null || value === undefined) return;
      
      // Skip empty strings if we already have a value
      if (value === '' && result[key]) return;
      
      // Handle nested objects
      if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
        result[key] = mergeObjects(result[key], value);
      } 
      // Handle missing or empty values in target
      else if (result[key] === null || result[key] === undefined || result[key] === '') {
        result[key] = value;
      }
      // Handle arrays - concatenate and deduplicate
      else if (Array.isArray(result[key]) && Array.isArray(value)) {
        // Combine arrays and remove duplicates
        const combined = [...result[key], ...value];
        result[key] = [...new Set(combined)]; // Remove duplicates
      }
    });
    
    return result;
  };
  
  // Merge top-level fields
  Object.entries(source).forEach(([key, value]) => {
    // Skip specific fields that shouldn't be merged
    if (['uniqueId', 'sourceId', 'sourceType', 'rawData', 'metadata'].includes(key)) {
      return;
    }
    
    // Handle nested objects
    if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
      target[key] = mergeObjects(target[key], value);
    } 
    // Handle missing values in target
    else if (target[key] === null || target[key] === undefined || target[key] === '') {
      target[key] = value;
    }
    // Handle arrays
    else if (Array.isArray(target[key]) && Array.isArray(value)) {
      // Combine arrays and remove duplicates
      const combined = [...target[key], ...value];
      target[key] = [...new Set(combined)]; // Remove duplicates
    }
  });
};

// Export the mapping functions
module.exports = {
  normalizeDate,
  normalizeAddress,
  normalizeUrbanProperty,
  normalizeRuralProperty,
  normalizeCersaiEncumbrance,
  normalizeMca21Data,
  combineAndDeduplicateProperties,
  validateDataQuality
}; 