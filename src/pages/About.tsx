import { VisionSection } from '../components/VisionSection';
import { TeamSection } from '../components/TeamSection';

export function About() {
  return (
    <main className="col-span-3 grid grid-cols-3">
      <VisionSection />
      <TeamSection />
    </main>
  );
}
