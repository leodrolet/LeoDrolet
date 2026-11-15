# Rapport SEO — Novio Studio

Généré le 2026-11-15 par `npm run seo:report`. Les chiffres proviennent des API Google (Search Console, GA4, PageSpeed) et de Lighthouse ; aucune donnée n'est estimée.

## 0. Contexte de la période

- **Rapport initial (15 nov. 2026).** Search Console et GA4 ne sont pas encore connectés : aucune donnée de trafic, de positions ni de conversions n'est disponible. Rien n'est extrapolé.
- **Performance.** La comparaison ci-dessous oppose la production *avant* optimisation (Lighthouse local contre noviostudio.online) au build optimisé servi *en local* (`npx serve`, sans compression ni CDN). Les deux mesures ne sont donc pas faites dans les mêmes conditions : l'amélioration devra être confirmée par `npm run seo:speed` sur la production après déploiement.
- **Modifications non encore déployées** : branche `seo-optimisation` (voir SEO_IMPLEMENTATION_LOG.md). Toute évolution des indicateurs avant le déploiement ne peut pas leur être attribuée.
- **Prochain rapport** : environ 4 semaines après le déploiement et la soumission du sitemap, pour laisser à Google le temps d'explorer et d'indexer les nouvelles pages.

## 1. Google Search Console

_Aucune donnée : Search Console n'est pas encore connectée (voir SEO_SETUP.md), ou `npm run seo:gsc` n'a pas été lancé._

## 2. Google Analytics 4 (28 jours)

_Aucune donnée : GA4 n'est pas encore configuré ou `npm run seo:ga` n'a pas été lancé. Rappel : GA4 ne mesure que les visiteurs qui ont accepté le bandeau de consentement._

## 3. Performance (PageSpeed / Lighthouse)

Dernière mesure : 2026-11-15 · http://localhost:5055 — comparée à 2026-11-15 · https://noviostudio.online (avant).

| Page | Appareil | Perf | Access. | Bonnes prat. | SEO | LCP | CLS | Perf (préc.) | LCP (préc.) |
|---|---|---|---|---|---|---|---|---|---|
| / | mobile | 100 | 100 | 100 | 100 | 1.5 s | 0 | 94 | 2.5 s |
| / | desktop | 100 | 100 | 100 | 100 | 0.4 s | 0 | 99 | 0.8 s |
| /site-web | mobile | 100 | 100 | 100 | 100 | 1.5 s | 0 | 99 | 1.6 s |
| /site-web | desktop | 100 | 100 | 100 | 100 | 0.4 s | 0 | 100 | 0.5 s |
| /tarifs | mobile | 100 | 100 | 100 | 100 | 1.5 s | 0 | 94 | 2.5 s |
| /tarifs | desktop | 100 | 100 | 100 | 100 | 0.4 s | 0 | 99 | 0.8 s |
| /contact | mobile | 100 | 100 | 100 | 100 | 1.5 s | 0 | 94 | 2.5 s |
| /contact | desktop | 100 | 100 | 100 | 100 | 0.4 s | 0 | 100 | 0.5 s |
| /en | mobile | 100 | 100 | 100 | 100 | 1.7 s | 0 | n/d | n/d |
| /en | desktop | 100 | 100 | 100 | 100 | 0.4 s | 0 | n/d | n/d |
| /blogue | mobile | 100 | 100 | 100 | 100 | 1.5 s | 0 | n/d | n/d |
| /blogue | desktop | 100 | 100 | 100 | 100 | 0.4 s | 0 | n/d | n/d |
| /blogue/combien-coute-un-site-web-pme-quebec | mobile | 100 | 100 | 100 | 100 | 1.5 s | 0 | n/d | n/d |
| /blogue/combien-coute-un-site-web-pme-quebec | desktop | 100 | 100 | 100 | 100 | 0.4 s | 0 | n/d | n/d |
| /blogue/etre-trouve-sur-google-entreprise-locale | mobile | 100 | 100 | 100 | 100 | 1.5 s | 0 | n/d | n/d |
| /blogue/etre-trouve-sur-google-entreprise-locale | desktop | 100 | 100 | 100 | 100 | 0.4 s | 0 | n/d | n/d |
| /blogue/site-web-ou-reseaux-sociaux | mobile | 100 | 100 | 100 | 100 | 1.5 s | 0 | n/d | n/d |
| /blogue/site-web-ou-reseaux-sociaux | desktop | 100 | 100 | 100 | 100 | 0.4 s | 0 | n/d | n/d |

Mesures de laboratoire : elles varient d'une exécution à l'autre et selon l'environnement (local ou production). Seules les données terrain (CrUX) reflètent les vrais visiteurs.

## 4. Modifications du site pendant la période

Voir `SEO_IMPLEMENTATION_LOG.md`. Une variation des indicateurs ci-dessus n'est attribuée à une modification que si les données le démontrent (par exemple : une page nouvellement indexée qui reçoit des impressions sur sa requête cible). Le SEO réagit en semaines, et le trafic varie aussi selon la saison et la concurrence.
