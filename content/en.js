/* ============================================================
   content/en.js — Page anglaise (/en), marché Ottawa / Canada anglais.
   Fragment HTML statique (pré-rendu au build), même design que le site
   français, mêmes offres et mêmes conditions. Aucune donnée inventée.
   Le formulaire de contact (React, lang="en") est ajouté après ce fragment.
   ============================================================ */

const ICON = {
  pencil: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>',
  smartphone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
  barchart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>',
  arrow: '<svg class="btn__arrow" viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M3 8h10M9 4l4 4-4 4"/></svg>',
  check: '<svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M3.5 8.5l3 3 6-7"/></svg>',
};

const FEATURES = [
  ["pencil", "Built for your business", "A website designed around your trade and your brand. With Premium, the design is fully custom."],
  ["smartphone", "Mobile-friendly", "Easy to read and use on phones, tablets and desktops."],
  ["search", "Built for Google", "Search engine optimization included: essential with Growth, advanced with Premium."],
  ["mail", "Working contact form", "Customers can reach you directly from your website."],
  ["barchart", "Traffic statistics", "See how many people visit your site and which pages they read."],
  ["shield", "Hosted and secured", "Hosting, security and backups are handled for you."],
];

const STEPS = [
  ["Discovery call", "15 minutes, free. Tell me about your business, your customers and your goals."],
  ["Design", "I design a mockup that fits your brand. You review it and we adjust it together."],
  ["Launch", "I build the site, optimize it for Google and put it online, usually 2 to 3 weeks after the first call."],
  ["Every month", "Hosting, maintenance, security and your edits: your site stays up to date without any effort on your part."],
];

// Mêmes valeurs que src/components/Pricing.jsx (ROW_GROUPS)
const GROUPS = [
  ["What sets the plans apart", [
    ["Website", "5 to 10 pages", "Fully custom"],
    ["Content or design edits", "1 h per month", "Up to 2 h per month"],
    ["Search engine optimization", "Essential", "Advanced"],
    ["Support", "Technical", "Priority"],
    ["Integrations with external services", false, true],
    ["Custom automations", false, true],
  ]],
  ["Included in both plans", [
    ["Web hosting", true, true],
    ["Domain name management", true, true],
    ["Security and backups", true, true],
    ["Maintenance and updates", true, true],
    ["Working contact form", true, true],
    ["Traffic statistics", true, true],
  ]],
];

// Même contenu que FAQ_ABO / FAQ_WEB (conditions prudentes, à confirmer par Novio Studio)
const FAQ = [
  { q: "What does the monthly plan include?",
    a: "Building your website, hosting it, managing your domain name, security and backups, maintenance and updates, search engine optimization, a working contact form, traffic statistics and technical support. Monthly editing hours are also included: 1 hour with Growth, up to 2 hours with Premium. A one-time $200 setup fee is added to the first month." },
  { q: "Can I ask for changes to my website?",
    a: "Yes. Every month, your plan includes hours for content or design edits: 1 hour with Growth, up to 2 hours with Premium. Send me what you'd like to change (text, photos, sections) and I take care of it." },
  { q: "What happens if I go over my monthly editing hours?",
    a: "I let you know before going over the hours included in your plan. Any extra work is then offered to you with a clear estimate, and nothing is done without your approval." },
  { q: "Do I own my domain name?",
    a: "Yes. Your domain name stays in your name: it belongs to you. I simply handle its technical management as part of your plan." },
  { q: "Can I cancel my plan?",
    a: "Yes. Cancellation terms are spelled out clearly in your service agreement, before the project starts. You know exactly what to expect from day one." },
  { q: "How long does it take to build my website?",
    a: "Usually 2 to 3 weeks between the first call and launch. The exact timeline depends on the number of pages and how quickly your content (text, photos, logo) comes together. I give you a precise timeline on our first call." },
  { q: "Do you work remotely or in person?",
    a: "Both. The first call can be a video call or an in-person meeting in Gatineau or Ottawa. The work is then done remotely, with previews to approve at every step." },
];

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const cell = (v) => v === true
  ? `<span class="pt-yes">${ICON.check}<span class="sr-only">Included</span></span>`
  : v === false
    ? '<span class="pt-no"><span aria-hidden="true">—</span><span class="sr-only">Not included</span></span>'
    : `<span class="pt-val">${esc(v)}</span>`;

const html = `
<header class="hero hero--en">
  <div class="container">
    <div class="hero__copy">
      <h1 class="hero__title">Small business websites in Ottawa and Gatineau, <span class="hero__title-accent">on a monthly plan.</span></h1>
      <p class="hero__lead">Novio Studio designs, hosts and maintains your business website for a fixed monthly price, from $129 per month. Edits are included every month, and you always deal with the person who builds your site.</p>
      <div class="hero__actions">
        <a class="btn btn--primary btn--lg" href="#contact">Get a quote ${ICON.arrow}</a>
        <a class="btn btn--secondary btn--lg" href="#pricing">See pricing</a>
      </div>
    </div>
  </div>
</header>

<section class="section" id="features" aria-labelledby="features-title">
  <div class="container">
    <div class="shead">
      <h2 class="shead__title" id="features-title">What every website includes.</h2>
      <p class="shead__lead">A professional website without a large upfront investment. Built for your business, hosted, maintained and optimized through one simple, transparent monthly plan. Made for contractors and local service businesses: roofers, plumbers, HVAC technicians, landscapers, renovators and general contractors.</p>
    </div>
    <ul class="features">
      ${FEATURES.map(([i, t, d]) => `<li class="feature"><span class="feature__ico" aria-hidden="true">${ICON[i]}</span><h3 class="feature__t">${esc(t)}</h3><p class="feature__d">${esc(d)}</p></li>`).join("\n      ")}
    </ul>
  </div>
</section>

<section class="section" id="pricing" aria-labelledby="pricing-title">
  <div class="container">
    <div class="shead">
      <h2 class="shead__title" id="pricing-title">Two plans, everything included.</h2>
      <p class="shead__lead">A one-time $200 setup fee, then a fixed monthly price. Prices in Canadian dollars.</p>
    </div>
    <div class="pt-wrap">
      <table class="pt">
        <caption class="sr-only">Comparison of the Growth and Premium plans</caption>
        <thead>
          <tr>
            <th scope="col" class="pt-corner"><span class="pt-corner__t">Fixed monthly price</span><span class="pt-corner__d">Plus a one-time $200 setup fee, for both plans.</span></th>
            <th scope="col" class="pt-plan is-rec">
              <span class="pt-plan__rec">Recommended</span>
              <span class="pt-plan__name">Growth</span>
              <span class="pt-plan__price"><span class="pt-plan__amount">$129</span><span class="pt-plan__per">/month</span></span>
              <a class="btn btn--block pt-plan__cta btn--primary" href="/en?forfait=croissance#contact">Choose Growth</a>
              <span class="pt-plan__pitch">For growing businesses that want a professional, effective web presence.</span>
            </th>
            <th scope="col" class="pt-plan">
              <span class="pt-plan__rec is-empty" aria-hidden="true">&nbsp;</span>
              <span class="pt-plan__name">Premium</span>
              <span class="pt-plan__price"><span class="pt-plan__amount">$199</span><span class="pt-plan__per">/month</span></span>
              <a class="btn btn--block pt-plan__cta btn--secondary" href="/en?forfait=premium#contact">Choose Premium</a>
              <span class="pt-plan__pitch">For businesses that want a fully custom web presence and advanced features.</span>
            </th>
          </tr>
        </thead>
        ${GROUPS.map(([title, rows]) => `<tbody>
          <tr class="pt-group"><th scope="rowgroup">${esc(title)}</th><td class="is-rec"></td><td></td></tr>
          ${rows.map(([l, a, b]) => `<tr><th scope="row" class="pt-label">${esc(l)}</th><td class="is-rec">${cell(a)}</td><td>${cell(b)}</td></tr>`).join("\n          ")}
        </tbody>`).join("\n        ")}
      </table>
    </div>
    <div class="pt-mobile">
      <p class="pt-mobile__note">Plus a one-time $200 setup fee, for both plans.</p>
      <a class="btn btn--lg btn--block btn--primary" href="/en?forfait=croissance#contact">Choose Growth, $129/month</a>
      <a class="btn btn--lg btn--block btn--secondary" href="/en?forfait=premium#contact">Choose Premium, $199/month</a>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="steps-title">
  <div class="container">
    <div class="shead"><h2 class="shead__title" id="steps-title">Your website online in four steps.</h2></div>
    <ol class="steps">
      ${STEPS.map(([t, d], i) => `<li class="step"><span class="step__n" aria-hidden="true">0${i + 1}</span><h3 class="step__t">${esc(t)}</h3><p class="step__d">${esc(d)}</p></li>`).join("\n      ")}
    </ol>
  </div>
</section>

<section class="section" id="studio" aria-labelledby="studio-title">
  <div class="container about">
    <picture class="about__portrait">
      <source srcset="/assets/leo.webp" type="image/webp" />
      <img src="/assets/leo.jpg" alt="Léo Drolet, founder of Novio Studio" loading="lazy" decoding="async" width="600" height="750" />
    </picture>
    <div class="about__body">
      <div class="shead"><h2 class="shead__title" id="studio-title">A person, not an agency.</h2></div>
      <p>My name is Léo Drolet. I founded Novio Studio in Gatineau to give small businesses in Ottawa, Gatineau and the Outaouais websites that live up to their work, without agency costs.</p>
      <p>I design, build and maintain every website myself. You talk directly to the person doing the work, from the first call to each month's edits.</p>
    </div>
  </div>
</section>

<section class="section" id="faq" aria-labelledby="faq-title">
  <div class="container faq-layout">
    <div class="shead">
      <h2 class="shead__title" id="faq-title">Frequently asked questions.</h2>
      <p class="shead__lead">Another question? <a class="link" href="#contact">Write to me</a>, I reply within 24 hours.</p>
    </div>
    <div class="faq">
      ${FAQ.map((f) => `<details class="faq__item"><summary class="faq__q"><span>${esc(f.q)}</span><span class="faq__icon" aria-hidden="true"></span></summary><div class="faq__a"><p>${esc(f.a)}</p></div></details>`).join("\n      ")}
    </div>
  </div>
</section>

<section class="section en-contact-head" aria-labelledby="contact-title">
  <div class="container">
    <div class="shead">
      <h2 class="shead__title" id="contact-title">Let's talk about your project.</h2>
      <p class="shead__lead">Tell me about your business and what you expect from your website. I reply within 24 hours. The first 15-minute call is free and comes with no commitment.</p>
    </div>
  </div>
</section>
`;

module.exports = { html, faq: FAQ };
