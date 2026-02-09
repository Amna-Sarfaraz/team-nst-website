import Hero from '@/components/home/Hero';
import Stats from '@/components/home/Stats';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import LatestUpdates from '@/components/home/LatestUpdates';

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Stats />
      <FeaturedProjects />
      <LatestUpdates />
    </div>
  );
}
