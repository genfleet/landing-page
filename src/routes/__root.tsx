import { createRootRoute, HeadContent, Outlet } from '@tanstack/react-router';
import { DevSourceInspector } from '@/components/dev-source-inspector';
import { Footer } from '@/components/footer/Footer';
import { Navbar } from '@/components/navbar/Navbar';

export const Route = createRootRoute({
  component: () => (
    <>
      <HeadContent />
      <div className='min-h-screen overflow-x-clip bg-background text-foreground'>
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
      {import.meta.env.DEV && <DevSourceInspector />}
    </>
  ),
});
