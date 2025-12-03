'use client'

import { useState } from 'react'
import { DataTable } from './DataTable'
import { createColumns } from './columns'
import { Button } from '../button'

type User = {
  id: number
  name: string
  email: string
  role: string
}

export function DataTableExample() {
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [search, setSearch] = useState('')

  const columns = createColumns<User>([
    {
      id: 'name',
      header: 'Nom',
      accessorKey: 'name',
    },
    {
      id: 'email',
      header: 'Email',
      accessorKey: 'email',
    },
    {
      id: 'role',
      header: 'Rôle',
      accessorKey: 'role',
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: (row) => (
        <Button variant="ghost" onClick={() => alert(`Édition de l'utilisateur ${row.getValue('name')}`)}>
          Éditer
        </Button>
      ),
    },
  ])

  // Exemple de données (dans un cas réel, elles viendraient d'une API)
  const data: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  ]

  const handlePaginationChange = (newPage: number) => {
    setPage(newPage)
    // Ici, vous feriez un appel API avec la nouvelle page
  }

  const handleSearchChange = (query: string) => {
    setSearch(query)
    setPage(1)
    // Ici, vous feriez un appel API avec la nouvelle recherche
  }

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize)
    setPage(1)
    // Ici, vous feriez un appel API avec le nouveau pageSize
  }

  return (
    <DataTable
      columns={columns}
      data={data}
      pageCount={5} // Nombre total de pages (viendrait de l'API)
      pageSize={pageSize}
      searchable={true}
      loading={loading}
      onPaginationChange={handlePaginationChange}
      onSearchChange={handleSearchChange}
      onPageSizeChange={handlePageSizeChange}
    />
  )
}
