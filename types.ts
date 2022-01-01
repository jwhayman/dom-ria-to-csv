export interface PropertySearchParams {
    category: number;
    operation_type: number;
    realty_type: number;
    state_id: number;
    city_id: number;
    with_newbuilds?: boolean;
    wo_dupl?: boolean;
    market?: number;
    ch?: string;
}

export interface Property {
    realty_id: number;
    beautiful_url: string;
    main_photo: string;
    description: string;
    street_name?: string;
    latitude?: number;
    longitude?: number;
}