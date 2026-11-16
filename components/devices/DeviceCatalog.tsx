'use client';

import { DeviceCard } from '@/components/devices/DeviceCard';
import { DeviceDetailModal } from '@/components/devices/DeviceDetailModal';
import { DeviceEmptyState } from '@/components/devices/DeviceEmptyState';
import { DeviceErrorState } from '@/components/devices/DeviceErrorState';
import { DeviceFilters } from '@/components/devices/DeviceFilters';
import { DeviceGridSkeleton } from '@/components/devices/DeviceGridSkeleton';
import { Pagination } from '@/components/ui/Pagination';
import {
  CORE_DEVICE_CATEGORIES,
  DEVICES_PER_PAGE,
} from '@/constants';
import { useDebounce } from '@/hooks/use-debounce';
import { useDevices } from '@/hooks/use-devices';
import type {
  Device,
  DeviceCategoryFilter,
  DeviceSortOption,
} from '@/types/device';
import { useMemo, useRef, useState } from 'react';

const CORE_DEVICE_CATEGORY_SET = new Set<string>(CORE_DEVICE_CATEGORIES);

export function DeviceCatalog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState<DeviceCategoryFilter>('all-devices');
  const [sortBy, setSortBy] = useState<DeviceSortOption>('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  const { data: devices = [], isLoading, isError, error, refetch, isFetching } =
    useDevices();

  const catalogSectionRef = useRef<HTMLElement>(null);

  const debouncedSearch = useDebounce(searchQuery.trim().toLowerCase(), 500);

  const filteredDevices = useMemo(() => {
    const byCategory = devices.filter((device) => {
      if (category === 'all-catalog') return true;
      if (category === 'all-devices') {
        return CORE_DEVICE_CATEGORY_SET.has(device.category);
      }
      return device.category === category;
    });

    const bySearch = debouncedSearch
      ? byCategory.filter((device) => {
        const titleMatch = device.title
          .toLowerCase()
          .includes(debouncedSearch);
        const brandMatch = (device.brand ?? '')
          .toLowerCase()
          .includes(debouncedSearch);
        return titleMatch || brandMatch;
      })
      : byCategory;

    const sorted = [...bySearch];
    if (sortBy === 'price-asc') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating-desc') {
      sorted.sort((a, b) => b.rating - a.rating);
    }

    return sorted;
  }, [devices, category, debouncedSearch, sortBy]);

  const totalItems = filteredDevices.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / DEVICES_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedDevices = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * DEVICES_PER_PAGE;
    return filteredDevices.slice(startIndex, startIndex + DEVICES_PER_PAGE);
  }, [filteredDevices, safeCurrentPage]);

  const hasActiveCatalogOptions =
    searchQuery.trim().length > 0 ||
    category !== 'all-devices' ||
    sortBy !== 'featured';

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value: DeviceCategoryFilter) => {
    setCategory(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: DeviceSortOption) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setCategory('all-devices');
    setSortBy('featured');
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    const clampedPage = Math.min(Math.max(1, page), totalPages);
    setCurrentPage(clampedPage);
    catalogSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <section
      ref={catalogSectionRef}
      id="catalog"
      className="scroll-mt-4 py-12 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Device Catalog
            </h2>
            <p className="mt-1.5 text-sm text-slate-600">
              Explore available devices, compare specifications, and express your interest in financing.
            </p>
          </div>
        </div>

        <div className="mt-7">
          <DeviceFilters
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            category={category}
            onCategoryChange={handleCategoryChange}
            sortBy={sortBy}
            onSortChange={handleSortChange}
            resultCount={totalItems}
            hasActiveFilters={hasActiveCatalogOptions}
            onResetFilters={handleResetFilters}
            isLoading={isLoading}
          />
        </div>

        <div className="mt-6">
          {isLoading ? (
            <DeviceGridSkeleton count={DEVICES_PER_PAGE} />
          ) : isError ? (
            <DeviceErrorState
              message={error?.message}
              onRetry={() => refetch()}
              isRetrying={isFetching}
            />
          ) : totalItems === 0 ? (
            <DeviceEmptyState
              searchQuery={searchQuery.trim()}
              onReset={handleResetFilters}
            />
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {paginatedDevices.map((device) => (
                  <DeviceCard
                    key={device.id}
                    device={device}
                    onSelect={setSelectedDevice}
                  />
                ))}
              </div>

              <Pagination
                currentPage={safeCurrentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={DEVICES_PER_PAGE}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>

      <DeviceDetailModal
        device={selectedDevice}
        onClose={() => setSelectedDevice(null)}
      />
    </section>
  );
}
