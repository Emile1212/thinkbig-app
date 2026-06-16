# Think Big — Site (Next.js + TypeScript + Tailwind)

Site de l'agence Think Big avec une intro **scroll-to-expand** (vidéo de métriques Meta Ads
qui s'agrandit au scroll) suivie de la landing complète.

## Structure

```
app/
  layout.tsx        SEO, métadonnées, JSON-LD, polices
  page.tsx          Intro (ScrollExpandMedia) + <ThinkBigLanding/>
  globals.css       Système de design Think Big (tokens du logo) + Tailwind
components/
  blocks/scroll-expansion-hero.tsx   Composant intégré (next/image + framer-motion)
  site/ThinkBigLanding.tsx           Landing complète (nav → footer)
lib/utils.ts        helper cn() (shadcn)
public/             dépose ici meta-ads-metrics.mp4
```

> Note shadcn : le dossier `components/ui` est la convention pour les composants shadcn.
> Ce composant tiers vit dans `components/blocks` (chemin d'import de sa démo). Quand tu
> ajouteras de vrais composants shadcn (`npx shadcn@latest add ...`), ils iront dans `components/ui`.

## Démarrer

```bash
npm install
npm run dev
```

Puis ouvre http://localhost:3000

## À personnaliser

- **Vidéo intro** : `public/meta-ads-metrics.mp4` (voir `public/README-video.txt`).
- **Lien de réservation** : `BOOKING_URL` en haut de `components/site/ThinkBigLanding.tsx`.
- **Études de cas** : section Résultats dans `ThinkBigLanding.tsx` (chiffres + images picsum à remplacer).
- **Courriel / Instagram / URL** : footer + `app/layout.tsx`.

## Dépendances

- next 14, react 18, framer-motion 11
- tailwindcss 3, typescript 5
