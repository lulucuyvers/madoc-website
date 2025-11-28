import React, { useEffect, useRef } from 'react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '../components/ui/carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const carouselImages = [
  'https://images.unsplash.com/photo-1759485073200-782c95da5c95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzY0MzMyMzcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1617788587804-10346bac2ac3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc2NDMyNTIxNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1721069275326-5fd80e01ce8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwaW50ZXJpb3IlMjB3aWRlfGVufDF8fHx8MTc2NDMzMjM3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1700527828970-f54ca45bc728?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwZGVzaWduJTIwcGFub3JhbWljfGVufDF8fHx8MTc2NDMzMjM3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
];

export function Home() {
  const [api, setApi] = React.useState<CarouselApi>();
  const containerRef = useRef<HTMLElement>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!api || !containerRef.current) return;

    const handleWheel = (e: WheelEvent) => {
      // Check voor horizontale scroll beweging
      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      
      // Alleen reageren op horizontale bewegingen
      if (!isHorizontal) return;
      
      e.preventDefault();
      
      // Negeer scroll events als we al aan het scrollen zijn
      if (isScrollingRef.current) return;
      
      // Negeer zeer kleine scroll bewegingen
      if (Math.abs(e.deltaX) < 5) return;
      
      isScrollingRef.current = true;
      
      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      if (e.deltaX > 0) {
        api.scrollNext();
      } else {
        api.scrollPrev();
      }
      
      // Reset na 1000ms (genoeg tijd voor de transitie)
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    };

    const container = containerRef.current;
    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [api]);

  return (
    <main ref={containerRef} className="col-span-4 relative overflow-hidden">
      <Carousel 
        className="w-full h-[calc(100vh-88px)]"
        setApi={setApi}
        opts={{
          loop: true,
          watchDrag: true,
        }}
      >
        <CarouselContent className="h-full cursor-grab active:cursor-grabbing">
          {carouselImages.map((image, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="h-full w-full select-none">
                <ImageWithFallback
                  src={image}
                  alt={`Madoc project ${index + 1}`}
                  className="w-full h-full object-cover pointer-events-none select-none"
                  draggable={false}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <button
          onClick={() => api?.scrollPrev()}
          className="absolute left-[calc(6px-12px)] top-1/2 -translate-y-1/2 text-white hover:text-white/80 cursor-pointer z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft size={48} strokeWidth={0.75} />
        </button>
        <button
          onClick={() => api?.scrollNext()}
          className="absolute right-[calc(6px-12px)] top-1/2 -translate-y-1/2 text-white hover:text-white/80 cursor-pointer z-10"
          aria-label="Next slide"
        >
          <ChevronRight size={48} strokeWidth={0.75} />
        </button>
      </Carousel>
    </main>
  );
}
