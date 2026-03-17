/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: aircraftguide
 * Interface for AircraftGuide
 */
export interface AircraftGuide {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  aircraftName?: string;
  /** @wixFieldType text */
  aircraftType?: string;
  /** @wixFieldType text */
  manufacturer?: string;
  /** @wixFieldType number */
  passengerCapacity?: number;
  /** @wixFieldType number */
  rangeNm?: number;
  /** @wixFieldType text */
  specifications?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  aircraftImage?: string;
}


/**
 * Collection ID: blogarticles
 * Interface for BlogArticles
 */
export interface BlogArticles {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  content?: string;
  /** @wixFieldType text */
  author?: string;
  /** @wixFieldType datetime */
  publishDate?: Date | string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  mainImage?: string;
}


/**
 * Collection ID: charterservices
 * Interface for CharterServices
 */
export interface CharterServices {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  serviceName?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  benefits?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  serviceImage?: string;
  /** @wixFieldType url */
  callToActionUrl?: string;
}


/**
 * Collection ID: contactinquiries
 * Interface for ContactInquiries
 */
export interface ContactInquiries {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  fullName?: string;
  /** @wixFieldType text */
  email?: string;
  /** @wixFieldType text */
  phoneNumber?: string;
  /** @wixFieldType text */
  inquiryType?: string;
  /** @wixFieldType text */
  message?: string;
  /** @wixFieldType datetime */
  submissionDate?: Date | string;
}


/**
 * Collection ID: destinationguides
 * Interface for DestinationGuides
 */
export interface DestinationGuides {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  destinationName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  popularRoutes?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  destinationImage?: string;
  /** @wixFieldType text */
  country?: string;
  /** @wixFieldType text */
  iataCode?: string;
}


/**
 * Collection ID: officelocations
 * Interface for OfficeLocations
 */
export interface OfficeLocations {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  officeName?: string;
  /** @wixFieldType text */
  city?: string;
  /** @wixFieldType text */
  country?: string;
  /** @wixFieldType text */
  address?: string;
  /** @wixFieldType text */
  phoneNumber?: string;
  /** @wixFieldType text */
  email?: string;
  /** @wixFieldType url */
  mapUrl?: string;
}


/**
 * Collection ID: teammembers
 * Interface for TeamMembers
 */
export interface TeamMembers {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  name?: string;
  /** @wixFieldType text */
  role?: string;
  /** @wixFieldType text */
  bio?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  photo?: string;
  /** @wixFieldType url */
  linkedinProfile?: string;
}
