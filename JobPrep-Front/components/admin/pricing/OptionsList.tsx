'use client';

import React, {useState, useEffect} from 'react';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {
    Plus,
    Search,
    Euro
} from 'lucide-react';
import {usePricingStore} from '@/lib/stores/pricingStore';
import type {Option} from '@/lib/api';
import OptionForm from './OptionForm';
import {DataTable} from "@/components/ui/data-table/DataTable";
import {createColumns} from "@/components/ui/data-table/columns";

export default function OptionsList() {
    const {
        options,
        optionsLoading,
        optionsError,
        optionsPagination,
        fetchOptions,
        deleteOption,
        toggleOptionStatus
    } = usePricingStore();

    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingOption, setEditingOption] = useState<Option | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        fetchOptions({
            page: currentPage,
            limit: pageSize,
            ...(searchTerm && { search: searchTerm })
        });
    }, [fetchOptions, currentPage, pageSize, searchTerm]);

    // Server-side filtering is now handled by the API

    const handleEdit = (option: Option) => {
        setEditingOption(option);
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cette option ?')) return;

        setDeletingId(id);
        try {
            await deleteOption(id);
        } catch (error) {
            alert('Erreur lors de la suppression de l\'option');
        } finally {
            setDeletingId(null);
        }
    };

    const handleToggleStatus = async (id: string) => {
        try {
            await toggleOptionStatus(id);
        } catch (error) {
            alert('Erreur lors du changement de statut de l\'option');
        }
    };

    const handleFormSuccess = () => {
        setShowForm(false);
        setEditingOption(null);
        fetchOptions({
            page: currentPage,
            limit: pageSize,
            ...(searchTerm && { search: searchTerm })
        });
    };

    const handleFormCancel = () => {
        setShowForm(false);
        setEditingOption(null);
    };

    const columns = createColumns<Option>([
        {
            id: 'name',
            header: 'Nom',
            accessorKey: 'name',
        },
        {
            id: 'code',
            header: 'Code',
            accessorKey: 'code',
        },
        {
            id: 'description',
            header: 'Description',
            accessorKey: 'description',
        },
        {
            id: 'amount',
            header: 'Prix (€)',
            accessorKey: 'amount',
            cell: (row) => (
                <div className="flex items-center gap-1">
                    <Euro size={14}/>
                    {row.amount.toFixed(2)}
                </div>
            ),
        },
        {
            id: 'stripeProductId',
            header: 'Stripe Product ID',
            accessorKey: 'stripeProductId',
            cell: (row) => (
                <div className="text-xs font-mono text-gray-700 max-w-[160px] truncate" title={row.stripeProductId || ''}>
                    {row.stripeProductId || '-'}
                </div>
            ),
        },
        {
            id: 'stripePriceId',
            header: 'Stripe Price ID',
            accessorKey: 'stripePriceId',
            cell: (row) => (
                <div className="text-xs font-mono text-gray-700 max-w-[160px] truncate" title={row.stripePriceId || ''}>
                    {row.stripePriceId || '-'}
                </div>
            ),
        },
        {
            id: 'isActive',
            header: 'Statut',
            accessorKey: 'isActive',
            cell: (row) => (
                <Badge variant={row.isActive ? 'default' : 'secondary'}>
                    {row.isActive ? 'Actif' : 'Inactif'}
                </Badge>
            ),
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: (row) => (
                <Button variant="ghost" onClick={() => handleEdit(row)}>
                    Éditer
                </Button>
            ),
        },
    ])

    if (showForm) {
        return (
            <OptionForm
                option={editingOption}
                onSuccess={handleFormSuccess}
                onCancel={handleFormCancel}
            />
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Gestion des Options</h1>
                <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
                    <Plus size={20}/>
                    Nouvelle Option
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Liste des Options</CardTitle>

                    </div>
                </CardHeader>
                <CardContent>
                    
                   
                        <div className="overflow-x-auto">
                            <DataTable
                                columns={columns}
                                data={options}
                                pageCount={optionsPagination?.totalPages || 1}
                                pageSize={pageSize}
                                searchable={true}
                                loading={optionsLoading}
                                onPaginationChange={(page) => setCurrentPage(page)}
                                onPageSizeChange={(size) => setPageSize(size)}
                                onSearchChange={(query) => setSearchTerm(query)}
                            />
                        </div>
                   
                </CardContent>
            </Card>
        </div>
    );
}
