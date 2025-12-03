# Pagination Implementation

## Overview
This document describes the implementation of pagination for lists in the JobPrep application, starting with the options list.

## Backend
The backend already had pagination implemented in the `PricingService`:
- `findAllOptions` and `findAllPacks` methods accept pagination parameters (page, perPage, search)
- They return a structured response with `data` and `meta` properties
- The `meta` object contains pagination information: page, perPage, total, totalPages

## Frontend Changes

### 1. API Types
Updated the `PaginatedResponse` interface in `/lib/api/types.ts`:
- Changed `pagination` to `meta` to match backend response
- Changed `limit` to `perPage` to match backend naming

```typescript
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}
```

### 2. Pricing Store
Enhanced the `PricingStore` in `/lib/stores/pricingStore.ts`:
- Added pagination metadata properties to the state
- Updated fetch methods to handle paginated responses

```typescript
interface PricingState {
  // Options
  options: Option[];
  optionsLoading: boolean;
  optionsError: string | null;
  optionsPagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  } | null;
  
  // Packs
  // ...similar changes
}
```

```typescript
fetchOptions: async (params?: PaginationParams) => {
  set({optionsLoading: true, optionsError: null});

  try {
    const response = await api.get<PaginatedResponse<Option>>(API_ENDPOINTS.PRICING.OPTIONS.LIST, {params});
    set({
      options: response.data.data,
      optionsPagination: response.data.meta,
      optionsLoading: false,
      optionsError: null,
    });
  } catch (error) {
    // Error handling
  }
}
```

### 3. OptionsList Component
Updated the `OptionsList` component in `/components/admin/pricing/OptionsList.tsx`:
- Added state for pagination (currentPage, pageSize)
- Modified useEffect to pass pagination parameters to API
- Removed client-side filtering (now handled server-side)
- Updated DataTable usage to use pagination data from store

## Usage
The pagination system now:
- Fetches paginated data from the backend
- Displays the correct number of pages based on total count
- Allows users to navigate between pages
- Maintains pagination state when performing CRUD operations
- Supports server-side filtering

## Next Steps
- Apply similar pagination to other list views in the application
- Consider adding sorting capabilities to the paginated lists