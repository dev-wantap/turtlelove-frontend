import { Outlet } from 'react-router-dom';
import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <Header />

      <main className="flex-1">
        <div className="page-enter mx-auto max-w-3xl px-4 py-6">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}
