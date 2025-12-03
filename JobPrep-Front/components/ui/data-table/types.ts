export type Column<T> = {
  id: string
  header: string
  accessorKey?: keyof T
  cell?: (row: T) => React.ReactNode
  enableSorting?: boolean
  enableFiltering?: boolean
}

export type DataTableProps<T> = {
  columns: Column<T>[]
  data: T[]
  pageCount?: number
  pageSize?: number
  searchable?: boolean
  onPaginationChange?: (page: number) => void
  onSearchChange?: (search: string) => void
  onPageSizeChange?: (pageSize: number) => void
  loading?: boolean
  error?: string
}
