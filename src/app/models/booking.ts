import {Account} from './Account';
import {Slot} from './Slot';
import {ProductPackage} from './ProductPackage';
import {Image} from './Image';

export interface Booking {
    start: any;
    end: any;
    assist: boolean;
    buySelf: boolean;
    timeNotFound: boolean;
    approved: boolean;
    images: Image[];
    finalPhotos: Image[];
    product_packages: ProductPackage[];
    packages: any[];
    _id: string;
    propertyType: string;
    propertySize: string;
    building: string;
    postcode: string;
    total: number;
    city: string;
    experience: string;
    companySize: string;
    notes: string;
    companyNotes: string;
    fname: string;
    lname: string;
    email: string;
    phone: string;
    contactPhone?: string;
    contactEmail?: string;
    services: any[];
    date: Date;
    renovation?: Date;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    serviceMan: Account;
    slot: Slot;
    user: Account;
    status: string;
    id: string;
}

