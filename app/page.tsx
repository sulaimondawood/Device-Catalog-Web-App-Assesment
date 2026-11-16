import { DeviceCatalog } from '@/components/devices/DeviceCatalog';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/layout/HeroSection';
import { HowItWorksSection } from '@/components/layout/HowItWorksSection';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <DeviceCatalog />
        <HowItWorksSection />
      </main>
      <Footer />
    </div>
  );
}
