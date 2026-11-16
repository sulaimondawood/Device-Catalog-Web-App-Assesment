'use client';

import { RotateCcw, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import {
  DEVICE_CATEGORY_OPTIONS,
  DEVICE_SORT_OPTIONS,
} from '@/constants';
import type { DeviceCategoryFilter, DeviceSortOption } from '@/types/device';

export interface DeviceFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  category: DeviceCategoryFilter;
  onCategoryChange: (value: DeviceCategoryFilter) => void;
  sortBy: DeviceSortOption;
  onSortChange: (value: DeviceSortOption) => void;
  resultCount: number;
  hasActiveFilters: boolean;
  onResetFilters: () => void;
  isLoading: boolean;
}

export function DeviceFilters({
  searchQuery,
  onSearchChange,
  category,
  onCategoryChange,
  sortBy,
  onSortChange,
  resultCount,
  hasActiveFilters,
  onResetFilters,
  isLoading,
}: DeviceFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
        <div className="relative md:col-span-6">
          <label htmlFor="device-search" className="sr-only">
            Search devices by name or brand
          </label>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          />
          <Input
            id="device-search"
            type="search"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by device name or brand..."
            className="pl-10 pr-10"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              aria-label="Clear search query"
              className="absolute right-2.5 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 cursor-pointer"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          )}
        </div>

        <div className="md:col-span-3">
          <label htmlFor="device-category" className="sr-only">
            Filter by category
          </label>
          <Select
            id="device-category"
            value={category}
            onChange={(event) =>
              onCategoryChange(event.target.value as DeviceCategoryFilter)
            }
          >
            {DEVICE_CATEGORY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>

        <div className="md:col-span-3">
          <label htmlFor="device-sort" className="sr-only">
            Sort devices
          </label>
          <Select
            id="device-sort"
            value={sortBy}
            onChange={(event) =>
              onSortChange(event.target.value as DeviceSortOption)
            }
          >
            {DEVICE_SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
        <p className="tabular-nums">
          {isLoading
            ? 'Loading device inventory...'
            : `Showing ${resultCount} ${resultCount === 1 ? 'device' : 'devices'}`}
        </p>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onResetFilters}
            className="h-8 px-2.5 text-xs text-slate-600"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Reset filters</span>
          </Button>
        )}
      </div>
    </div>
  );
}
