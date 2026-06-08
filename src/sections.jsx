/* ============================================================
   sections.jsx — Point d'entrée des composants de section
   Chaque composant est défini dans src/components/ et s'auto-
   enregistre sur window. Ce fichier n'est plus nécessaire au
   runtime — il reste ici comme documentation de l'ordre de
   chargement attendu :

     1. effects.jsx       → window.useReveal, useMagnetic, useClock, ...
     2. components/icons.jsx   → window.BENEFIT_ICONS
     3. components/Nav.jsx     → window.Nav
     4. components/Hero.jsx    → window.Hero
     5. components/Marquee.jsx → window.MarqueeRow
     6. components/Services.jsx → window.Services, window.SectionHead
     7. components/Portfolio.jsx → window.Portfolio
     8. components/About.jsx   → window.About
     9. components/FAQ.jsx     → window.FAQ
    10. components/Footer.jsx  → window.FinalCTA, window.Footer
   ============================================================ */
