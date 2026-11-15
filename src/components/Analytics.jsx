/* ============================================================
   Analytics.jsx, Mesure d'audience et des conversions (GA4).
   Conforme à la Loi 25 : RIEN n'est chargé tant que
     1. un identifiant GA4 est configuré au build (<meta name="ga-id">,
        variable d'environnement GA_MEASUREMENT_ID), ET
     2. le visiteur a accepté dans le bandeau.
   Aucun renseignement personnel n'est envoyé : seulement des noms
   d'événements et des libellés (zone de la page, forfait choisi).
   Exporte : window.track, window.ConsentBanner, window.installTracking,
             window.gaConfigured, window.openConsent
   ============================================================ */

const CONSENT_KEY = "novio-consent-analytics"; // "granted" | "denied"

const gaId = () => {
  if (typeof document === "undefined") return "";
  const m = document.querySelector('meta[name="ga-id"]');
  return m && m.content ? m.content : "";
};
const gaConfigured = () => !!gaId();

const readConsent = () => { try { return localStorage.getItem(CONSENT_KEY) || ""; } catch (_) { return ""; } };
const writeConsent = (v) => { try { localStorage.setItem(CONSENT_KEY, v); } catch (_) { /* stockage bloqué */ } };

let gaLoaded = false;
const loadGA = (id) => {
  if (!id) return;
  window["ga-disable-" + id] = false;
  if (gaLoaded) return;
  gaLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag("consent", "default", { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "granted" });
  window.gtag("js", new Date());
  window.gtag("config", id, { allow_google_signals: false, allow_ad_personalization_signals: false });
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
  document.head.appendChild(s);
};

// Retrait du consentement : coupe GA et efface ses témoins (_ga, _ga_*).
const stopGA = (id) => {
  if (id) window["ga-disable-" + id] = true;
  const host = window.location.hostname.replace(/^www\./, "");
  document.cookie.split(";").map((c) => c.split("=")[0].trim())
    .filter((n) => n === "_ga" || n.indexOf("_ga_") === 0)
    .forEach((n) => {
      [host, "." + host, ""].forEach((d) => {
        document.cookie = n + "=; Max-Age=0; path=/" + (d ? "; domain=" + d : "");
      });
    });
};

// Envoi d'un événement (sans effet si GA n'est pas chargé / pas consenti).
const track = (name, params) => {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  if (window["ga-disable-" + gaId()]) return;
  window.gtag("event", name, params || {});
};

// Zone de la page où se trouve un lien (en-tête, pied, id de section).
const zoneOf = (el) => {
  if (el.closest(".site-header, .mobile-menu")) return "header";
  if (el.closest(".site-footer")) return "footer";
  const s = el.closest("section[id], section[aria-labelledby], header.page-head");
  if (!s) return "page";
  return s.id || s.getAttribute("aria-labelledby") || "page-head";
};

// Délégation : appels, courriels et clics vers la soumission.
let trackingInstalled = false;
const installTracking = () => {
  if (trackingInstalled || typeof document === "undefined") return;
  trackingInstalled = true;
  document.addEventListener("click", (e) => {
    const a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
    if (!a) return;
    const href = a.getAttribute("href") || "";
    const zone = zoneOf(a);
    if (href.indexOf("tel:") === 0) return track("click_phone", { zone });
    if (href.indexOf("mailto:") === 0) return track("click_email", { zone });
    const m = href.match(/^\/(?:en)?(?:contact)?\?forfait=([a-z]+)/) || href.match(/forfait=([a-z]+)/);
    if (/^\/contact|^\/en.*#contact|^#contact|^#formulaire/.test(href)) {
      return track("cta_quote_click", { zone, plan: m ? m[1] : "none" });
    }
  });
};

const CONSENT_TXT = {
  fr: {
    label: "Mesure d'audience",
    text: "Avec votre accord, ce site utilise Google Analytics pour mesurer sa fréquentation (pages consultées, demandes envoyées). Aucune publicité ni profilage. Vous pouvez changer d'avis en tout temps depuis le pied de page.",
    no: "Refuser", yes: "Accepter",
  },
  en: {
    label: "Analytics",
    text: "With your consent, this site uses Google Analytics to measure traffic (pages viewed, requests sent). No advertising or profiling. You can change your mind at any time from the footer.",
    no: "Decline", yes: "Accept",
  },
};

const ConsentBanner = ({ lang = "fr" }) => {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const id = gaId();
    if (!id) return undefined;
    const c = readConsent();
    if (c === "granted") loadGA(id);
    else if (!c) setShow(true);
    const reopen = () => setShow(true);
    window.addEventListener("novio:consent", reopen);
    return () => window.removeEventListener("novio:consent", reopen);
  }, []);
  if (!show) return null;
  const t = CONSENT_TXT[lang] || CONSENT_TXT.fr;
  const choose = (v) => {
    const id = gaId();
    writeConsent(v);
    setShow(false);
    if (v === "granted") loadGA(id); else stopGA(id);
  };
  return (
    <div className="consent-bar" role="region" aria-label={t.label}>
      <p className="consent-bar__text">{t.text}</p>
      <div className="consent-bar__actions">
        <button type="button" className="btn btn--secondary btn--sm" onClick={() => choose("denied")}>{t.no}</button>
        <button type="button" className="btn btn--primary btn--sm" onClick={() => choose("granted")}>{t.yes}</button>
      </div>
    </div>
  );
};

const openConsent = () => window.dispatchEvent(new Event("novio:consent"));

Object.assign(window, { track, ConsentBanner, installTracking, gaConfigured, openConsent });
