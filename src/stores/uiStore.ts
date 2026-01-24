import { create } from 'zustand';

export interface Toast {
  id: string;
  message: string;
  variant: 'success' | 'error' | 'info' | 'warning';
}

interface UIState {
  // Toast
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;

  // Modal
  activeModal: string | null;
  modalProps: Record<string, unknown>;
  openModal: (name: string, props?: Record<string, unknown>) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  toasts: [],
  activeModal: null,
  modalProps: {},

  addToast: (toast) =>
    set((state) => ({
      toasts: [
        ...state.toasts,
        { id: Math.random().toString(36).slice(2), ...toast },
      ],
    })),

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),

  openModal: (name, props) =>
    set({
      activeModal: name,
      modalProps: props ?? {},
    }),

  closeModal: () =>
    set({
      activeModal: null,
      modalProps: {},
    }),
}));
