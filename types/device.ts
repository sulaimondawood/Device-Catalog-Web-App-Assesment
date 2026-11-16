export type StockStatus = 'In Stock' | 'Low Stock' | 'Out of Stock';

export interface Device {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage?: number;
  rating: number;
  stock: number;
  brand?: string;
  sku?: string;
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  images: string[];
  thumbnail: string;
}

export interface DevicesApiResponse {
  products: Device[];
  total: number;
  skip: number;
  limit: number;
}

export type DeviceCategoryFilter =
  | 'all-devices'
  | 'smartphones'
  | 'laptops'
  | 'tablets'
  | 'mobile-accessories'
  | 'all-catalog';

export type DeviceSortOption =
  | 'featured'
  | 'price-asc'
  | 'price-desc'
  | 'rating-desc';
