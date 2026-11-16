'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchDevices } from '@/lib/api';
import type { Device } from '@/types/device';

export function useDevices() {
  return useQuery<Device[], Error>({
    queryKey: ["devices"],
    queryFn: fetchDevices,
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
    retry: 3,
  });
}
