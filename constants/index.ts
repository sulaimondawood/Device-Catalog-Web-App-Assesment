import type { DeviceCategoryFilter, DeviceSortOption } from '@/types/device';
import type { RepaymentPeriod } from '@/types/financing';

export const DUMMYJSON_PRODUCTS_URL = 'https://dummyjson.com/products?limit=0';

export const USD_TO_NGN_RATE = 1400;

export const MONTHLY_FINANCING_RATE = 0.035;

export const LOW_STOCK_THRESHOLD = 10;

export const SEARCH_DEBOUNCE_MS = 300;

export const DEVICES_PER_PAGE = 8;

export const CORE_DEVICE_CATEGORIES = [
    'smartphones',
    'laptops',
    'tablets',
    'mobile-accessories',
] as const;

export const DEVICE_CATEGORY_OPTIONS: Array<{
    value: DeviceCategoryFilter;
    label: string;
}> = [
        { value: 'all-devices', label: 'All Devices' },
        { value: 'smartphones', label: 'Smartphones' },
        { value: 'laptops', label: 'Laptops' },
        { value: 'tablets', label: 'Tablets' },
        { value: 'mobile-accessories', label: 'Mobile Accessories' },
        { value: 'all-catalog', label: 'Full Storefront' },
    ];

export const DEVICE_SORT_OPTIONS: Array<{
    value: DeviceSortOption;
    label: string;
}> = [
        { value: 'featured', label: 'Featured' },
        { value: 'price-asc', label: 'Price: Low to High' },
        { value: 'price-desc', label: 'Price: High to Low' },
        { value: 'rating-desc', label: 'Highest Rated' },
    ];

export const REPAYMENT_PERIOD_OPTIONS: Array<{
    value: RepaymentPeriod;
    label: string;
}> = [
        { value: '3', label: '3 months' },
        { value: '6', label: '6 months' },
        { value: '9', label: '9 months' },
        { value: '12', label: '12 months' },
    ];
