

export interface ContactInfo {
    address: string;
    phone: string;
    email: string;
    workingHours: string;
    socials: {
        facebook: string;
        instagram: string;
        youtube: string;
    };
}


//
export interface PolicyItem {
    title: string;
    subtitle: string;
    iconType: 'policy' | 'quality' | 'payment' | 'shipping';
}

export interface FooterStaticData {
    policies: PolicyItem[];
    brand: {
        name: string;
        description: string;
    };
    contact: {
        address: string;
        hotline: string;
        email: string;
    };
    paymentMethods: string[];// Danh sách các phương thức hỗ trợ (chỉ hiện icon)
}