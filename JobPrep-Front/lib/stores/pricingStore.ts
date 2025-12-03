import { create } from 'zustand';
import { api, API_ENDPOINTS } from '../api';
import type { 
  Option, 
  Pack, 
  CreateOptionDto, 
  UpdateOptionDto, 
  CreatePackDto, 
  UpdatePackDto,
  AddOptionToPackDto,
  PaginationParams,
  PaginatedResponse,
  ApiError 
} from '../api';

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
  packs: Pack[];
  packsLoading: boolean;
  packsError: string | null;
  packsPagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  } | null;
  
  // Option sélectionnée pour édition
  selectedOption: Option | null;
  optionLoading: boolean;
  optionError: string | null;
  
  // Pack sélectionné pour édition
  selectedPack: Pack | null;
  packLoading: boolean;
  packError: string | null;
  
  // Actions pour les options
  fetchOptions: (params?: PaginationParams) => Promise<void>;
  fetchOption: (id: string) => Promise<void>;
  createOption: (optionData: CreateOptionDto) => Promise<void>;
  updateOption: (id: string, optionData: UpdateOptionDto) => Promise<void>;
  deleteOption: (id: string) => Promise<void>;
  toggleOptionStatus: (id: string) => Promise<void>;
  
  // Actions pour les packs
  fetchPacks: (params?: PaginationParams) => Promise<void>;
  fetchPack: (id: string) => Promise<void>;
  createPack: (packData: CreatePackDto) => Promise<void>;
  updatePack: (id: string, packData: UpdatePackDto) => Promise<void>;
  deletePack: (id: string) => Promise<void>;
  togglePackStatus: (id: string) => Promise<void>;
  
  // Actions pour la gestion des options dans les packs
  addOptionToPack: (packId: string, optionId: string, data: AddOptionToPackDto) => Promise<void>;
  removeOptionFromPack: (packId: string, optionId: string) => Promise<void>;
  
  // Actions utilitaires
  clearErrors: () => void;
  clearSelected: () => void;
  setSelectedOption: (option: Option | null) => void;
  setSelectedPack: (pack: Pack | null) => void;
}

export const usePricingStore = create<PricingState>((set, get) => {
    return ({
        // État initial
        options: [],
        optionsLoading: false,
        optionsError: null,
        optionsPagination: null,

        packs: [],
        packsLoading: false,
        packsError: null,
        packsPagination: null,

        selectedOption: null,
        optionLoading: false,
        optionError: null,

        selectedPack: null,
        packLoading: false,
        packError: null,

        // Fetch options
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
                const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
                set({
                    optionsLoading: false,
                    optionsError: errorMessage,
                });
                throw error;
            }
        },

        // Fetch single option
        fetchOption: async (id: string) => {
            set({optionLoading: true, optionError: null});

            try {
                const response = await api.get<Option>(API_ENDPOINTS.PRICING.OPTIONS.GET(id));
                set({
                    selectedOption: response.data,
                    optionLoading: false,
                    optionError: null,
                });
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
                set({
                    optionLoading: false,
                    optionError: errorMessage,
                });
                throw error;
            }
        },

        // Create option
        createOption: async (optionData: CreateOptionDto) => {
            set({optionLoading: true, optionError: null});

            try {
                const response = await api.post<Option>(API_ENDPOINTS.PRICING.OPTIONS.CREATE, optionData);
                const newOption = response.data;

                set((state) => ({
                    options: [...state.options, newOption],
                    optionLoading: false,
                    optionError: null,
                }));

                return newOption;
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
                set({
                    optionLoading: false,
                    optionError: errorMessage,
                });
                throw error;
            }
        },

        // Update option
        updateOption: async (id: string, optionData: UpdateOptionDto) => {
            set({optionLoading: true, optionError: null});

            try {
                const response = await api.patch<Option>(API_ENDPOINTS.PRICING.OPTIONS.UPDATE(id), optionData);
                const updatedOption = response.data; // Suppression de .data car la réponse est directe

                set((state) => ({
                    options: state.options.map(option =>
                        option.id === id ? updatedOption : option
                    ),
                    selectedOption: state.selectedOption?.id === id ? updatedOption : state.selectedOption,
                    optionLoading: false,
                    optionError: null,
                }));

                return updatedOption;
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
                set({
                    optionLoading: false,
                    optionError: errorMessage,
                });
                throw error;
            }
        },

        // Delete option
        deleteOption: async (id: string) => {
            set({optionLoading: true, optionError: null});

            try {
                await api.delete(API_ENDPOINTS.PRICING.OPTIONS.DELETE(id));

                set((state) => ({
                    options: state.options.filter(option => option.id !== id),
                    selectedOption: state.selectedOption?.id === id ? null : state.selectedOption,
                    optionLoading: false,
                    optionError: null,
                }));
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
                set({
                    optionLoading: false,
                    optionError: errorMessage,
                });
                throw error;
            }
        },

        // Toggle option status
        toggleOptionStatus: async (id: string) => {
            const option = get().options.find(opt => opt.id === id);
            if (!option) return;

            try {
                await get().updateOption(id, {isActive: !option.isActive});
            } catch (error) {
                throw error;
            }
        },

        // Fetch packs
        fetchPacks: async (params?: PaginationParams) => {
            set({packsLoading: true, packsError: null});

            try {
                const response = await api.get<PaginatedResponse<Pack>>(API_ENDPOINTS.PRICING.PACKS.LIST, {params});
                set({
                    packs: response.data.data,
                    packsPagination: response.data.meta,
                    packsLoading: false,
                    packsError: null,
                });
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
                set({
                    packsLoading: false,
                    packsError: errorMessage,
                });
                throw error;
            }
        },

        // Fetch single pack
        fetchPack: async (id: string) => {
            set({packLoading: true, packError: null});

            try {
                const response = await api.get<Pack>(API_ENDPOINTS.PRICING.PACKS.GET(id));
                set({
                    selectedPack: response.data.data,
                    packLoading: false,
                    packError: null,
                });
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
                set({
                    packLoading: false,
                    packError: errorMessage,
                });
                throw error;
            }
        },

        // Create pack
        createPack: async (packData: CreatePackDto) => {
            set({packLoading: true, packError: null});

            try {
                const response = await api.post<Pack>(API_ENDPOINTS.PRICING.PACKS.CREATE, packData);
                const newPack = response.data;

                set((state) => ({
                    packs: [...state.packs, newPack],
                    packLoading: false,
                    packError: null,
                }));

                return newPack;
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
                set({
                    packLoading: false,
                    packError: errorMessage,
                });
                throw error;
            }
        },

        // Update pack
        updatePack: async (id: string, packData: UpdatePackDto) => {
            set({packLoading: true, packError: null});

            try {
                const response = await api.patch<Pack>(API_ENDPOINTS.PRICING.PACKS.UPDATE(id), packData);
                const updatedPack = response.data;

                set((state) => ({
                    packs: state.packs.map(pack =>
                        pack.id === id ? updatedPack : pack
                    ),
                    selectedPack: state.selectedPack?.id === id ? updatedPack : state.selectedPack,
                    packLoading: false,
                    packError: null,
                }));

                return updatedPack;
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
                set({
                    packLoading: false,
                    packError: errorMessage,
                });
                throw error;
            }
        },

        // Delete pack
        deletePack: async (id: string) => {
            set({packLoading: true, packError: null});

            try {
                await api.delete(API_ENDPOINTS.PRICING.PACKS.DELETE(id));

                set((state) => ({
                    packs: state.packs.filter(pack => pack.id !== id),
                    selectedPack: state.selectedPack?.id === id ? null : state.selectedPack,
                    packLoading: false,
                    packError: null,
                }));
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
                set({
                    packLoading: false,
                    packError: errorMessage,
                });
                throw error;
            }
        },

        // Toggle pack status
        togglePackStatus: async (id: string) => {
            const pack = get().packs.find(p => p.id === id);
            if (!pack) return;

            try {
                await get().updatePack(id, {isActive: !pack.isActive});
            } catch (error) {
                throw error;
            }
        },

        // Add option to pack
        addOptionToPack: async (packId: string, optionId: string, data: AddOptionToPackDto) => {
            try {
                await api.post(API_ENDPOINTS.PRICING.PACKS.ADD_OPTION(packId, optionId), data);
                // Refetch the pack to get updated data
                await get().fetchPack(packId);
                // Also refetch packs list
                await get().fetchPacks();
            } catch (error) {
                throw error;
            }
        },

        // Remove option from pack
        removeOptionFromPack: async (packId: string, optionId: string) => {
            try {
                await api.delete(API_ENDPOINTS.PRICING.PACKS.REMOVE_OPTION(packId, optionId));
                // Refetch the pack to get updated data
                await get().fetchPack(packId);
                // Also refetch packs list
                await get().fetchPacks();
            } catch (error) {
                throw error;
            }
        },

        // Clear errors
        clearErrors: () => {
            set({
                optionsError: null,
                packsError: null,
                optionError: null,
                packError: null,
            });
        },

        // Clear selected items
        clearSelected: () => {
            set({
                selectedOption: null,
                selectedPack: null,
            });
        },

        // Set selected option
        setSelectedOption: (option: Option | null) => {
            set({selectedOption: option});
        },

        // Set selected pack
        setSelectedPack: (pack: Pack | null) => {
            set({selectedPack: pack});
        },
    });
});
