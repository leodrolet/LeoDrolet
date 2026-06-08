/* ============================================================
   Marquee.jsx — Bande défilante (ticker)
   ============================================================ */

const MarqueeRow = ({ items, reverse = false }) => (
  <div className={`marquee ${reverse ? "reverse" : ""}`} style={{ borderRadius: "0px" }}>
    <div className="marquee-track">
      {[0, 1].map((k) => (
        <span key={k}>
          {items.map((it, i) => (
            <React.Fragment key={i}>
              <span>{it}</span>
              <span className="star">&#10022;</span>
            </React.Fragment>
          ))}
        </span>
      ))}
    </div>
  </div>
);

window.MarqueeRow = MarqueeRow;
