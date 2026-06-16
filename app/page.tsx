import ScrollExpandMedia from '@/components/blocks/scroll-expansion-hero';
import ThinkBigLanding from '@/components/site/ThinkBigLanding';

export default function Page() {
  return (
    <main>
      {/* INTRO : vidéo de métriques Meta Ads qui s'agrandit au scroll.
          Dépose ta vidéo dans /public/meta-ads-metrics.mp4 (sinon l'affiche s'affiche). */}
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc="/meta-ads-metrics.mp4"
        posterSrc="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1280&auto=format&fit=crop"
        bgImageSrc="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1920&auto=format&fit=crop"
        title="Think Big"
        date="Meta Ads"
        scrollToExpand="Défile pour agrandir"
        textBlend
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
            Tes campagnes, en chiffres clairs.
          </h2>
          <p className="text-white/70">
            Continue de défiler pour voir comment on transforme ton budget pub en clients qui paient.
          </p>
        </div>
      </ScrollExpandMedia>

      <ThinkBigLanding />
    </main>
  );
}
