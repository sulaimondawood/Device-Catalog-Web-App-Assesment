import axios from 'axios';
import type { Device, DevicesApiResponse } from '@/types/device';
import { DUMMYJSON_PRODUCTS_URL } from '@/constants';

export async function fetchDevices(): Promise<Device[]> {
  try {
    const { data } = await axios.get<DevicesApiResponse>(DUMMYJSON_PRODUCTS_URL);

    if (!data?.products || !Array.isArray(data.products)) {
      throw new Error('Unexpected response format from device catalog service.');
    }

    return data.products;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      throw new Error(
        status
          ? `Unable to load device catalog (status ${status}).`
          : 'Unable to load device catalog. Please check your connection.'
      );
    }

    throw new Error('Unable to load device catalog.');
  }
}
