import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase, isSupabaseConfigured } from './supabase';

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'talent' | 'booker';
  full_name?: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  supabaseConfigured: boolean;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  setDemoUser: (role: 'admin' | 'talent') => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: true,
      isAuthenticated: false,
      supabaseConfigured: isSupabaseConfigured,

      login: async (email: string, password: string) => {
        if (!isSupabaseConfigured) {
          // Demo mode - allow demo logins
          if (email === 'admin@pushayute.com') {
            set({
              user: { id: 'demo-admin', email, role: 'admin', full_name: 'Demo Admin' },
              isAuthenticated: true,
              isLoading: false,
            });
            return { error: null };
          }
          if (email.includes('@')) {
            set({
              user: { id: 'demo-talent', email, role: 'talent', full_name: 'Demo Talent' },
              isAuthenticated: true,
              isLoading: false,
            });
            return { error: null };
          }
          return { error: 'Invalid credentials' };
        }

        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) return { error: error.message };

        if (data.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

          set({
            user: {
              id: data.user.id,
              email: data.user.email || '',
              role: profile?.role || 'talent',
              full_name: profile?.full_name,
            },
            isAuthenticated: true,
            isLoading: false,
          });
        }
        return { error: null };
      },

      logout: async () => {
        if (isSupabaseConfigured) {
          await supabase.auth.signOut();
        }
        set({ user: null, isAuthenticated: false });
      },

      checkAuth: async () => {
        if (!isSupabaseConfigured) {
          set({ isLoading: false });
          return;
        }

        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          set({
            user: {
              id: session.user.id,
              email: session.user.email || '',
              role: profile?.role || 'talent',
              full_name: profile?.full_name,
            },
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          set({ isLoading: false });
        }
      },

      setDemoUser: (role: 'admin' | 'talent') => {
        set({
          user: {
            id: `demo-${role}`,
            email: role === 'admin' ? 'admin@pushayute.com' : 'talent@demo.com',
            role,
            full_name: role === 'admin' ? 'Demo Admin' : 'Demo Talent',
          },
          isAuthenticated: true,
          isLoading: false,
        });
      },
    }),
    {
      name: 'book-a-yute-auth',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
