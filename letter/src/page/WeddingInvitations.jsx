import { useState, useEffect, useRef } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,600&family=Jost:wght@200;300;400;500&family=Great+Vibes&display=swap');

  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}

  :root{
    --emerald:#0d4f3c;
    --emerald-mid:#1a7a5e;
    --emerald-light:#2aab84;
    --rose:#e8a0a0;
    --rose-gold:#d4846a;
    --rose-bright:#f2c4b8;
    --ivory:#faf6f0;
    --ivory-dark:#f0e8de;
    --champagne:#f5dcc8;
    --text-dark:#1c1008;
    --text-mid:#4a3728;
    --text-muted:#8a7060;
    --white:#ffffff;
  }

  body{
    background:var(--ivory);
    font-family:'Jost',sans-serif;
    color:var(--text-dark);
    min-height:100vh;
    overflow-x:hidden;
  }

  body::before{
    content:'';
    position:fixed;inset:0;
    background-image:
      radial-gradient(circle at 20% 20%, rgba(13,79,60,0.06) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(212,132,106,0.08) 0%, transparent 50%);
    pointer-events:none;z-index:0;
  }

  .wi-page{
    max-width:480px;
    margin:0 auto;
    position:relative;z-index:1;
    box-shadow:0 30px 100px rgba(13,79,60,0.18);
  }

  /* HERO */
  .wi-hero{position:relative;background:var(--emerald);overflow:hidden;padding:0;}
  .wi-hero-geo{position:absolute;inset:0;pointer-events:none;opacity:0.18;}
  .wi-hero-inner{position:relative;z-index:2;text-align:center;padding:3.5rem 2rem 3rem;}

  .wi-hero-names{
    font-family:'Playfair Display',serif;font-size:54px;font-weight:400;
    color:var(--white);line-height:1.05;margin:0.4rem 0 0.6rem;
    animation:namesGlow 5s ease-in-out 3.8s infinite;
  }
  @keyframes namesGlow{
    0%,100%{text-shadow:0 0 0px rgba(245,220,200,0)}
    50%{text-shadow:0 0 40px rgba(245,220,200,0.12),0 2px 20px rgba(232,160,160,0.08)}
  }
  .wi-hero-script{font-family:'Great Vibes',cursive;font-size:22px;color:var(--rose);letter-spacing:1px;margin-bottom:0.2rem;display:block;}
  .wi-name-a{color:var(--white);}
  .wi-amp{font-family:'Great Vibes',cursive;font-size:46px;color:var(--rose);display:block;line-height:1;}
  .wi-name-b{color:var(--champagne);}
  .wi-hero-line{width:100px;height:1px;margin:1.4rem auto;background:linear-gradient(90deg,transparent,var(--rose-gold),transparent);}

  .wi-corner{position:absolute;width:70px;height:70px;pointer-events:none;z-index:3;}
  .wi-corner svg{width:100%;height:100%;}
  .wi-c-tl{top:0;left:0;}
  .wi-c-tr{top:0;right:0;transform:scaleX(-1);}
  .wi-c-bl{bottom:0;left:0;transform:scaleY(-1);}
  .wi-c-br{bottom:0;right:0;transform:scale(-1);}

  /* Reveal animations */
  .wi-badge,.wi-hero-script,.wi-hero-names,.wi-hero-line,.wi-hero-date{
    opacity:0;animation:heroCrossfade 1.4s cubic-bezier(0.22,1,0.36,1) forwards;
  }
  .wi-badge{animation-delay:0.3s}
  .wi-hero-script{animation-delay:0.6s}
  .wi-hero-names{animation-delay:0.85s}
  .wi-hero-line{animation-delay:1.1s}
  .wi-hero-date{animation-delay:1.3s}
  @keyframes heroCrossfade{
    from{opacity:0;transform:translateY(10px)}
    to{opacity:1;transform:translateY(0)}
  }
  .wi-hero-particles{position:absolute;inset:0;pointer-events:none;z-index:1;opacity:0;animation:heroCrossfade 2s ease 1.6s forwards;}

  /* SILK */
  .wi-silk{background:var(--emerald);padding:0 0 2px;}
  .wi-silk-wave{display:block;width:100%;height:36px;background:var(--ivory);clip-path:ellipse(55% 100% at 50% 100%);}

  /* SECTIONS */
  .wi-section{padding:1.8rem 1.6rem 0;opacity:0;animation:fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards;}
  .wi-section:nth-of-type(1){animation-delay:0.3s}
  .wi-section:nth-of-type(2){animation-delay:0.45s}
  .wi-section:nth-of-type(3){animation-delay:0.6s}
  @keyframes fadeUp{
    from{opacity:0;transform:translateY(22px)}
    to{opacity:1;transform:translateY(0)}
  }

  .wi-sec-header{display:flex;align-items:center;gap:12px;margin-bottom:1rem;}
  .wi-sec-dot{width:8px;height:8px;border-radius:50%;background:var(--emerald-light);flex-shrink:0;}
  .wi-sec-label{font-size:9px;letter-spacing:4px;text-transform:uppercase;color:var(--emerald-mid);font-weight:500;}
  .wi-sec-rule{flex:1;height:0.5px;background:linear-gradient(90deg,var(--emerald-light),transparent);opacity:0.35;}

  /* FAMILY */
  .wi-family-panel{background:var(--white);border-radius:16px;overflow:hidden;margin-bottom:1.2rem;border:0.5px solid var(--ivory-dark);box-shadow:0 4px 24px rgba(13,79,60,0.07);}
  .wi-family-top{background:linear-gradient(135deg,var(--emerald) 0%,var(--emerald-mid) 100%);padding:1.2rem 1.5rem;text-align:center;}
  .wi-family-top p{font-size:10px;letter-spacing:3px;text-transform:uppercase;color:var(--rose-bright);font-weight:300;margin-bottom:0.4rem;}
  .wi-family-top h3{font-family:'Playfair Display',serif;font-size:20px;font-weight:400;font-style:italic;color:var(--white);}
  .wi-family-cols{display:grid;grid-template-columns:1fr auto 1fr;padding:1.4rem 1rem;gap:0;}
  .wi-f-side{text-align:center;padding:0 0.5rem;}
  .wi-f-side h4{font-family:'Playfair Display',serif;font-size:17px;font-weight:700;color:var(--emerald);margin-bottom:6px;}
  .wi-f-side p{font-size:11.5px;color:var(--text-muted);line-height:1.7;}
  .wi-f-side p strong{color:var(--text-mid);font-weight:500;display:block;}
  .wi-f-sep{width:1px;background:linear-gradient(180deg,transparent,var(--ivory-dark),transparent);margin:0 0.5rem;}
  .wi-family-foot{text-align:center;font-size:11px;color:var(--text-muted);font-style:italic;padding:0.8rem 1.5rem 1.2rem;border-top:0.5px solid var(--ivory-dark);}

  /* COUNTDOWN */
  .wi-cd-wrap{background:var(--white);border-radius:16px;overflow:hidden;margin-bottom:1.2rem;border:0.5px solid var(--ivory-dark);box-shadow:0 4px 24px rgba(13,79,60,0.07);}
  .wi-cd-top{background:linear-gradient(135deg,var(--rose-gold) 0%,#c06040 100%);padding:0.9rem 1.5rem;display:flex;align-items:center;justify-content:space-between;}
  .wi-cd-top-left p:first-child{font-size:9px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.7);font-weight:300;margin-bottom:2px;}
  .wi-cd-top-left p:last-child{font-family:'Playfair Display',serif;font-size:17px;font-weight:400;color:#fff;font-style:italic;}
  .wi-cd-icon-wrap{width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,0.18);display:flex;align-items:center;justify-content:center;font-size:18px;}
  .wi-cd-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0;padding:1.2rem 1rem;}
  .wi-cd-unit{text-align:center;padding:0.8rem 0.3rem;border-right:0.5px solid var(--ivory-dark);}
  .wi-cd-unit:last-child{border-right:none;}
  .wi-cd-num{font-family:'Playfair Display',serif;font-size:36px;font-weight:700;color:var(--emerald);line-height:1;display:block;transition:all 0.3s;}
  .wi-cd-lbl{font-size:8px;letter-spacing:2px;text-transform:uppercase;color:var(--text-muted);margin-top:4px;display:block;}
  @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}
  .wi-cd-pulse{animation:pulse 1s ease;}

  /* DETAILS */
  .wi-details-wrap{background:var(--white);border-radius:16px;margin-bottom:1.2rem;overflow:hidden;border:0.5px solid var(--ivory-dark);box-shadow:0 4px 24px rgba(13,79,60,0.07);}
  .wi-detail-item{display:flex;align-items:center;gap:14px;padding:1rem 1.4rem;border-bottom:0.5px solid var(--ivory-dark);transition:background 0.2s;}
  .wi-detail-item:last-child{border-bottom:none;}
  .wi-detail-item:hover{background:rgba(13,79,60,0.025);}
  .wi-d-icon{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0;}
  .wi-d-green{background:rgba(13,79,60,0.1);color:var(--emerald);}
  .wi-d-rose{background:rgba(212,132,106,0.15);color:var(--rose-gold);}
  .wi-d-teal{background:rgba(42,171,132,0.1);color:var(--emerald-mid);}
  .wi-d-warm{background:rgba(245,220,200,0.6);color:#b06040;}
  .wi-detail-text h4{font-size:13.5px;font-weight:500;color:var(--text-dark);margin-bottom:2px;}
  .wi-detail-text p{font-size:11.5px;color:var(--text-muted);line-height:1.4;}

  /* ORNAMENT */
  .wi-ornament-strip{text-align:center;padding:1.4rem 0 0.6rem;position:relative;}
  .wi-ornament-strip::before,.wi-ornament-strip::after{content:'';position:absolute;top:50%;left:1.5rem;right:1.5rem;height:0.5px;background:linear-gradient(90deg,transparent,var(--emerald-light),transparent);opacity:0.3;}
  .wi-ornament-strip span{position:relative;z-index:1;background:var(--ivory);padding:0 1rem;font-family:'Great Vibes',cursive;font-size:28px;color:var(--rose-gold);}

  /* RSVP */
  .wi-rsvp-section{padding:0 1.6rem 2rem;opacity:0;animation:fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.75s forwards;}
  .wi-rsvp-card{background:var(--white);border-radius:20px;overflow:hidden;border:0.5px solid var(--ivory-dark);box-shadow:0 8px 40px rgba(13,79,60,0.1);}
  .wi-rsvp-header{background:linear-gradient(135deg,var(--emerald) 0%,var(--emerald-mid) 50%,#1e9e76 100%);padding:2rem 1.8rem 1.8rem;text-align:center;position:relative;overflow:hidden;}
  .wi-rsvp-header::before{content:'';position:absolute;width:200px;height:200px;border-radius:50%;background:rgba(255,255,255,0.04);top:-80px;right:-60px;}
  .wi-rsvp-header::after{content:'';position:absolute;width:120px;height:120px;border-radius:50%;background:rgba(255,255,255,0.04);bottom:-40px;left:-30px;}
  .wi-rsvp-header h2{font-family:'Playfair Display',serif;font-size:28px;font-weight:400;font-style:italic;color:#fff;position:relative;z-index:1;margin-bottom:4px;}
  .wi-rsvp-header p{font-size:10px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.6);font-weight:300;position:relative;z-index:1;}
  .wi-rsvp-body{padding:1.6rem 1.5rem 1.5rem;}

  .wi-inp-group{margin-bottom:1.1rem;}
  .wi-inp-label{display:block;font-size:9px;letter-spacing:3px;text-transform:uppercase;color:var(--text-muted);font-weight:500;margin-bottom:6px;}
  .wi-inp-field{width:100%;padding:12px 14px;border:1px solid var(--ivory-dark);border-radius:10px;font-family:'Jost',sans-serif;font-size:14px;color:var(--text-dark);background:var(--ivory);outline:none;transition:all 0.2s;-webkit-appearance:none;}
  .wi-inp-field:focus{border-color:var(--emerald-light);background:#fff;box-shadow:0 0 0 3px rgba(42,171,132,0.1);}
  .wi-inp-field.err{border-color:var(--rose-gold);box-shadow:0 0 0 3px rgba(212,132,106,0.15);}

  .wi-rsvp-choices{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:1.4rem;}
  .wi-choice-btn{padding:16px 10px;border-radius:12px;border:1.5px solid;cursor:pointer;font-family:'Jost',sans-serif;font-size:13px;font-weight:500;letter-spacing:0.3px;text-align:center;transition:all 0.22s;display:flex;flex-direction:column;align-items:center;gap:6px;background:none;}
  .wi-choice-btn .cb-icon{font-size:22px;}
  .wi-choice-accept{background:linear-gradient(135deg,var(--emerald) 0%,var(--emerald-mid) 100%);color:#fff;border-color:var(--emerald);}
  .wi-choice-accept:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(13,79,60,0.3);}
  .wi-choice-decline{background:#fff;color:var(--text-muted);border-color:var(--ivory-dark);}
  .wi-choice-decline:hover{background:var(--ivory);transform:translateY(-2px);}
  .wi-sel-yes{background:linear-gradient(135deg,#0a3d2e,var(--emerald)) !important;border-color:var(--emerald-light) !important;box-shadow:0 6px 20px rgba(13,79,60,0.35);transform:translateY(-1px);}
  .wi-sel-no{background:#fff5f3 !important;color:var(--rose-gold) !important;border-color:var(--rose-gold) !important;}

  /* FOOTER */
  .wi-footer{background:linear-gradient(160deg,var(--emerald) 0%,#0a2e22 100%);padding:2.5rem 1.8rem;text-align:center;position:relative;overflow:hidden;opacity:0;animation:fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.9s forwards;}
  .wi-footer::before{content:'';position:absolute;width:300px;height:300px;border-radius:50%;border:0.5px solid rgba(232,160,160,0.12);top:-100px;left:-80px;pointer-events:none;}
  .wi-footer::after{content:'';position:absolute;width:200px;height:200px;border-radius:50%;border:0.5px solid rgba(232,160,160,0.08);bottom:-80px;right:-60px;pointer-events:none;}
  .wi-footer-script{font-family:'Great Vibes',cursive;font-size:32px;color:var(--rose);opacity:0.75;display:block;margin-bottom:0.3rem;position:relative;z-index:1;}
  .wi-footer-names{font-family:'Playfair Display',serif;font-size:16px;font-weight:400;color:var(--white);position:relative;z-index:1;margin-bottom:0.8rem;}
  .wi-footer-line{width:50px;height:1px;background:linear-gradient(90deg,transparent,var(--rose),transparent);margin:1rem auto;position:relative;z-index:1;}
  .wi-footer-blessings{font-size:11.5px;color:rgba(255,255,255,0.55);line-height:2;position:relative;z-index:1;margin-bottom:1rem;}
  .wi-footer-phones{display:flex;justify-content:center;gap:1.5rem;flex-wrap:wrap;position:relative;z-index:1;}
  .wi-footer-phones a{color:var(--rose-bright);font-size:12.5px;text-decoration:none;opacity:0.8;display:flex;align-items:center;gap:5px;transition:opacity 0.2s;}
  .wi-footer-phones a:hover{opacity:1;}
  .wi-footer-tiny{font-size:9px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.2);margin-top:2rem;position:relative;z-index:1;}

  /* MODAL */
  .wi-modal-backdrop{position:fixed;inset:0;background:rgba(8,24,18,0.72);backdrop-filter:blur(14px) saturate(1.4);-webkit-backdrop-filter:blur(14px) saturate(1.4);z-index:9999;display:flex;align-items:center;justify-content:center;padding:1.2rem;opacity:0;pointer-events:none;transition:opacity 0.35s cubic-bezier(0.22,1,0.36,1);}
  .wi-modal-backdrop.open{opacity:1;pointer-events:all;}
  .wi-modal-card{position:relative;background:var(--white);border-radius:28px;overflow:hidden;width:100%;max-width:400px;box-shadow:0 0 0 1px rgba(255,255,255,0.12),0 32px 80px rgba(0,0,0,0.45),0 0 120px rgba(13,79,60,0.25);transform:scale(0.82) translateY(40px);transition:transform 0.45s cubic-bezier(0.34,1.56,0.64,1),opacity 0.35s ease;opacity:0;}
  .wi-modal-backdrop.open .wi-modal-card{transform:scale(1) translateY(0);opacity:1;}
  .wi-modal-accent{height:5px;background:linear-gradient(90deg,var(--emerald),var(--emerald-light),var(--rose-gold),var(--rose),var(--emerald-light),var(--emerald));background-size:300% 100%;animation:shimmerBar 3s linear infinite;}
  @keyframes shimmerBar{0%{background-position:0% 0%}100%{background-position:300% 0%}}
  .wi-modal-orb{position:absolute;width:260px;height:260px;border-radius:50%;background:radial-gradient(circle,rgba(42,171,132,0.12) 0%,transparent 70%);top:-60px;right:-60px;pointer-events:none;animation:orbFloat 6s ease-in-out infinite;}
  .wi-modal-orb.decline-orb{background:radial-gradient(circle,rgba(212,132,106,0.12) 0%,transparent 70%);}
  @keyframes orbFloat{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-10px,10px) scale(1.08)}}
  .wi-petal-canvas{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;}
  .wi-modal-close{position:absolute;top:16px;right:18px;background:rgba(0,0,0,0.06);border:none;border-radius:50%;width:32px;height:32px;font-size:12px;color:var(--text-muted);cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:10;transition:background 0.2s,color 0.2s;}
  .wi-modal-close:hover{background:rgba(0,0,0,0.12);color:var(--text-dark);}
  .wi-modal-body{position:relative;z-index:2;padding:2rem 1.8rem 1.8rem;text-align:center;}
  .wi-modal-big-icon{font-size:56px;display:block;margin-bottom:0.7rem;animation:iconPop 0.55s cubic-bezier(0.34,1.56,0.64,1) 0.15s both;filter:drop-shadow(0 6px 18px rgba(13,79,60,0.22));}
  @keyframes iconPop{from{transform:scale(0.3) rotate(-15deg);opacity:0}to{transform:scale(1) rotate(0deg);opacity:1}}
  .wi-modal-title{font-family:'Playfair Display',serif;font-size:26px;font-weight:400;font-style:italic;color:var(--emerald);margin-bottom:0.4rem;animation:fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) 0.25s both;}
  .wi-modal-title.decline-title{color:var(--rose-gold);}
  .wi-modal-sub{font-size:12.5px;color:var(--text-muted);line-height:1.7;max-width:280px;margin:0 auto;animation:fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) 0.32s both;}
  .wi-modal-divider{width:60px;height:1px;background:linear-gradient(90deg,transparent,var(--emerald-light),transparent);margin:1.4rem auto;animation:fadeUp 0.5s ease 0.38s both;}
  .wi-modal-table{background:var(--ivory);border-radius:14px;overflow:hidden;border:0.5px solid var(--ivory-dark);text-align:left;animation:fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) 0.42s both;box-shadow:0 2px 16px rgba(13,79,60,0.06);}
  .wi-mt-row{display:flex;justify-content:space-between;align-items:center;padding:10px 16px;border-bottom:0.5px solid var(--ivory-dark);font-size:12.5px;}
  .wi-mt-row:last-child{border-bottom:none;}
  .wi-mt-key{color:var(--text-muted);font-weight:300;}
  .wi-mt-val{font-weight:500;color:var(--text-dark);text-align:right;}
  .wi-yes-badge{color:#1a7a5e;font-weight:600;background:rgba(42,171,132,0.12);padding:2px 10px;border-radius:20px;font-size:11.5px;}
  .wi-no-badge{color:var(--rose-gold);font-weight:600;background:rgba(212,132,106,0.1);padding:2px 10px;border-radius:20px;font-size:11.5px;}
  .wi-modal-done{margin-top:1.4rem;display:inline-block;padding:13px 36px;background:linear-gradient(135deg,var(--emerald) 0%,var(--emerald-mid) 100%);color:#fff;border:none;border-radius:50px;font-family:'Jost',sans-serif;font-size:13px;font-weight:500;letter-spacing:1px;cursor:pointer;box-shadow:0 8px 28px rgba(13,79,60,0.3);transition:all 0.22s;animation:fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) 0.5s both;}
  .wi-modal-done:hover{transform:translateY(-2px);box-shadow:0 12px 36px rgba(13,79,60,0.4);}
  .wi-modal-done.decline-done{background:linear-gradient(135deg,#b06040 0%,var(--rose-gold) 100%);box-shadow:0 8px 28px rgba(212,132,106,0.3);}
  .wi-modal-done.decline-done:hover{box-shadow:0 12px 36px rgba(212,132,106,0.4);}
`;

// ── Helpers ──
function detectGuests(name) {
  let m;
  m = name.match(/\bparty\s+of\s+(\d+)/i);   if (m) return Math.min(15, parseInt(m[1]));
  m = name.match(/\bfamily\s+of\s+(\d+)/i);  if (m) return Math.min(15, parseInt(m[1]));
  m = name.match(/\bgroup\s+of\s+(\d+)/i);   if (m) return Math.min(15, parseInt(m[1]));
  m = name.match(/\+\s*(\d+)/);              if (m) return Math.min(15, 1 + parseInt(m[1]));
  m = name.match(/\bx\s*(\d+)\b/i);          if (m) return Math.min(15, parseInt(m[1]));
  m = name.match(/\b&\s*(\d+)\s*more\b/i);   if (m) return Math.min(15, 1 + parseInt(m[1]));
  m = name.match(/\band\s*(\d+)\s*more\b/i); if (m) return Math.min(15, 1 + parseInt(m[1]));
  const ands = (name.match(/\s(&|and)\s/gi) || []).length;
  if (ands > 0) return Math.min(15, ands + 1);
  return 1;
}

// ── Corner SVG ──
const CornerSVG = () => (
  <svg viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 5 L40 5 L40 8 L8 8 L8 40 L5 40 Z" fill="#e8a0a0" opacity="0.5"/>
    <path d="M5 5 L20 5" stroke="#d4846a" strokeWidth="1" opacity="0.8"/>
    <path d="M5 5 L5 20" stroke="#d4846a" strokeWidth="1" opacity="0.8"/>
    <circle cx="5" cy="5" r="2" fill="#d4846a" opacity="0.8"/>
    <path d="M12 12 L30 12 L30 14 L14 14 L14 30 L12 30 Z" fill="#e8a0a0" opacity="0.3"/>
  </svg>
);

// ── Hero Particles ──
function useHeroParticles(canvasRef, heroRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = heroRef.current;
    if (!canvas || !hero) return;
    const resize = () => { canvas.width = hero.offsetWidth; canvas.height = hero.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);
    const ctx = canvas.getContext('2d');

    const dust = Array.from({length: 60}, () => ({
      x: Math.random(), y: Math.random(),
      r: 0.4 + Math.random() * 0.9,
      vy: 0.00005 + Math.random() * 0.00010,
      vx: (Math.random()-0.5) * 0.00004,
      phase: Math.random() * Math.PI * 2,
      freq: 0.4 + Math.random() * 1.2,
      warm: Math.random() < 0.6
    }));
    const glints = Array.from({length: 20}, () => ({
      x: Math.random(), y: Math.random(),
      r: 1.0 + Math.random() * 1.6,
      vy: 0.00006 + Math.random() * 0.00009,
      vx: (Math.random()-0.5) * 0.00003,
      phase: Math.random() * Math.PI * 2,
      freq: 0.8 + Math.random() * 2.2,
      peak: 0.5 + Math.random() * 0.4
    }));
    const orbs = Array.from({length: 7}, () => ({
      x: Math.random(), y: Math.random(),
      r: 14 + Math.random() * 22,
      vy: 0.00002 + Math.random() * 0.00005,
      vx: (Math.random()-0.5) * 0.00002,
      phase: Math.random() * Math.PI * 2,
      freq: 0.12 + Math.random() * 0.28
    }));

    let t = 0, raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const W = canvas.width, H = canvas.height;
      orbs.forEach(p => {
        const alpha = 0.025 + 0.03 * Math.abs(Math.sin(t * p.freq + p.phase));
        const grd = ctx.createRadialGradient(p.x*W, p.y*H, 0, p.x*W, p.y*H, p.r);
        grd.addColorStop(0, `rgba(245,220,200,${alpha})`);
        grd.addColorStop(1, 'rgba(245,220,200,0)');
        ctx.beginPath(); ctx.arc(p.x*W, p.y*H, p.r, 0, Math.PI*2);
        ctx.fillStyle = grd; ctx.fill();
        p.y -= p.vy; p.x += p.vx;
        if(p.y < -0.08) p.y = 1.08;
        if(p.x < -0.08) p.x = 1.08;
        if(p.x > 1.08)  p.x = -0.08;
      });
      glints.forEach(p => {
        const raw = Math.abs(Math.sin(t * p.freq + p.phase));
        const alpha = p.peak * Math.pow(raw, 2.2);
        ctx.beginPath(); ctx.arc(p.x*W, p.y*H, p.r, 0, Math.PI*2);
        ctx.fillStyle = `rgba(255,248,235,${alpha})`; ctx.fill();
        if(alpha > p.peak * 0.65){
          const arm = p.r * (2.2 + raw * 1.8);
          const ca = Math.min((alpha / p.peak - 0.65) * 2.5, 0.9);
          ctx.save(); ctx.globalAlpha = ca;
          ctx.strokeStyle = 'rgba(255,252,242,0.95)'; ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(p.x*W - arm, p.y*H); ctx.lineTo(p.x*W + arm, p.y*H);
          ctx.moveTo(p.x*W, p.y*H - arm); ctx.lineTo(p.x*W, p.y*H + arm);
          const darm = arm * 0.5;
          ctx.moveTo(p.x*W - darm, p.y*H - darm); ctx.lineTo(p.x*W + darm, p.y*H + darm);
          ctx.moveTo(p.x*W + darm, p.y*H - darm); ctx.lineTo(p.x*W - darm, p.y*H + darm);
          ctx.stroke(); ctx.restore();
        }
        p.y -= p.vy; p.x += p.vx;
        if(p.y < -0.02) p.y = 1.02;
        if(p.x < -0.02) p.x = 1.02;
        if(p.x > 1.02)  p.x = -0.02;
      });
      dust.forEach(p => {
        const alpha = 0.08 + 0.16 * Math.abs(Math.sin(t * p.freq + p.phase));
        const col = p.warm ? 'rgba(245,220,200,' : 'rgba(232,168,168,';
        ctx.beginPath(); ctx.arc(p.x*W, p.y*H, p.r, 0, Math.PI*2);
        ctx.fillStyle = col + alpha + ')'; ctx.fill();
        p.y -= p.vy; p.x += p.vx;
        if(p.y < -0.02) p.y = 1.02;
        if(p.x < -0.02) p.x = 1.02;
        if(p.x > 1.02)  p.x = -0.02;
      });
      t += 0.018;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
}

// ── Petal Animation ──
function usePetals(canvasRef, active, isYes) {
  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const colors = isYes
      ? ['#e8a0a0','#f2c4b8','#d4846a','#2aab84','#faf6f0']
      : ['#d4846a','#e8a0a0','#f0e8de','#c5a090','#faf6f0'];
    const petals = Array.from({length: 28}, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 60,
      r: 4 + Math.random() * 7,
      speed: 1.2 + Math.random() * 2.2,
      drift: (Math.random() - 0.5) * 1.4,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.08,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 0.55 + Math.random() * 0.45
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach(p => {
        ctx.save(); ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        ctx.beginPath(); ctx.ellipse(0, 0, p.r, p.r * 0.55, 0, 0, Math.PI * 2);
        ctx.fillStyle = p.color; ctx.fill(); ctx.restore();
        p.y += p.speed; p.x += p.drift; p.rot += p.rotSpeed;
        if (p.y > canvas.height + 20) { p.y = -20; p.x = Math.random() * canvas.width; }
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); ctx.clearRect(0, 0, canvas.width, canvas.height); };
  }, [active, isYes]);
}

// ── Countdown ──
function useCountdown() {
  const [time, setTime] = useState({d:'--',h:'--',m:'--',s:'--',done:false});
  useEffect(() => {
    const tick = () => {
      const target = new Date('2026-07-26T15:00:00');
      const diff = target - new Date();
      if (diff <= 0) { setTime(t => ({...t, done:true})); return; }
      setTime({
        d: Math.floor(diff / 86400000),
        h: String(Math.floor((diff % 86400000) / 3600000)).padStart(2,'0'),
        m: String(Math.floor((diff % 3600000) / 60000)).padStart(2,'0'),
        s: String(Math.floor((diff % 60000) / 1000)).padStart(2,'0'),
        done: false
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

// ── Modal ──
function RSVPModal({ open, isYes, name, guests, onClose }) {
  const petalRef = useRef(null);
  usePetals(petalRef, open, isYes);
  return (
    <div className={`wi-modal-backdrop${open ? ' open' : ''}`} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="wi-modal-card" role="dialog" aria-modal="true">
        <canvas className="wi-petal-canvas" ref={petalRef} />
        <button className="wi-modal-close" onClick={onClose}>✕</button>
        <div className="wi-modal-accent" />
        <div className={`wi-modal-orb${isYes ? '' : ' decline-orb'}`} />
        <div className="wi-modal-body">
          <span className="wi-modal-big-icon">{isYes ? '🌸' : '🤍'}</span>
          <h2 className={`wi-modal-title${isYes ? '' : ' decline-title'}`}>
            {isYes ? "We're delighted!" : "We understand."}
          </h2>
          <p className="wi-modal-sub">
            {isYes
              ? "Your presence will make our day even more beautiful. See you on July 26th!"
              : "Thank you for letting us know. You'll be in our prayers on that beautiful day."}
          </p>
          <div className="wi-modal-divider" />
          <div className="wi-modal-table">
            <div className="wi-mt-row"><span className="wi-mt-key">Guest Name</span><span className="wi-mt-val">{name || '—'}</span></div>
            <div className="wi-mt-row">
              <span className="wi-mt-key">Attending</span>
              <span className="wi-mt-val">
                {name ? (isYes ? <span className="wi-yes-badge">✓ Attending</span> : <span className="wi-no-badge">✗ Not attending</span>) : '—'}
              </span>
            </div>
            <div className="wi-mt-row"><span className="wi-mt-key">Guests</span><span className="wi-mt-val">{isYes && guests ? `${guests} guest${guests > 1 ? 's' : ''}` : '—'}</span></div>
            <div className="wi-mt-row"><span className="wi-mt-key">Date</span><span className="wi-mt-val">July 26, 2026</span></div>
            <div className="wi-mt-row"><span className="wi-mt-key">Time</span><span className="wi-mt-val">3:00 PM – 9:00 PM</span></div>
            <div className="wi-mt-row"><span className="wi-mt-key">Venue</span><span className="wi-mt-val">V.V. Hall, Perambra</span></div>
          </div>
          <button className={`wi-modal-done${isYes ? '' : ' decline-done'}`} onClick={onClose}>Done &nbsp;✦</button>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ──
export default function WeddingInvitations() {
  const heroRef = useRef(null);
  const particlesRef = useRef(null);
  useHeroParticles(particlesRef, heroRef);

  const countdown = useCountdown();
  const [prevSec, setPrevSec] = useState(null);
  const [secPulse, setSecPulse] = useState(false);
  useEffect(() => {
    if (countdown.s !== prevSec) {
      setSecPulse(false);
      requestAnimationFrame(() => setSecPulse(true));
      setPrevSec(countdown.s);
    }
  }, [countdown.s]);

  const [name, setName] = useState('');
  const [nameErr, setNameErr] = useState(false);
  const [modal, setModal] = useState({ open: false, isYes: true, name: '', guests: 0 });
  const [selected, setSelected] = useState(null); // 'yes' | 'no' | null

  const submitRSVP = (resp) => {
    const trimmed = name.trim();
    if (!trimmed) { setNameErr(true); return; }
    setNameErr(false);
    const isYes = resp === 'yes';
    setSelected(resp);
    setModal({ open: true, isYes, name: trimmed, guests: isYes ? detectGuests(trimmed) : 0 });
  };

  useEffect(() => {
    document.body.style.overflow = modal.open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [modal.open]);

  return (
    <>
      <style>{css}</style>
      <div className="wi-page">

        {/* HERO */}
        <header className="wi-hero" ref={heroRef}>
          <canvas className="wi-hero-particles" ref={particlesRef} />
          <svg className="wi-hero-geo" viewBox="0 0 480 520" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <circle cx="240" cy="260" r="200" fill="none" stroke="#e8a0a0" strokeWidth="0.5"/>
            <circle cx="240" cy="260" r="160" fill="none" stroke="#e8a0a0" strokeWidth="0.3"/>
            <circle cx="240" cy="260" r="120" fill="none" stroke="#e8a0a0" strokeWidth="0.3"/>
            <line x1="40" y1="40" x2="440" y2="480" stroke="#e8a0a0" strokeWidth="0.3"/>
            <line x1="440" y1="40" x2="40" y2="480" stroke="#e8a0a0" strokeWidth="0.3"/>
            <polygon points="240,60 420,180 420,340 240,460 60,340 60,180" fill="none" stroke="#e8a0a0" strokeWidth="0.5"/>
            <polygon points="240,100 390,200 390,320 240,420 90,320 90,200" fill="none" stroke="#e8a0a0" strokeWidth="0.25"/>
            <rect x="120" y="100" width="240" height="320" fill="none" stroke="#d4846a" strokeWidth="0.3" rx="2"/>
          </svg>
          <div className="wi-corner wi-c-tl"><CornerSVG /></div>
          <div className="wi-corner wi-c-tr"><CornerSVG /></div>
          <div className="wi-corner wi-c-bl"><CornerSVG /></div>
          <div className="wi-corner wi-c-br"><CornerSVG /></div>
          <div className="wi-hero-inner">
            <span className="wi-badge">✦ بسم الله الرحمن الرحيم ✦</span>
            <p className="wi-hero-script">Wedding Invitation</p>
            <div className="wi-hero-names">
              <span className="wi-name-a">Shabeer</span>
              <span className="wi-amp">&amp;</span>
              <span className="wi-name-b">Nasriya</span>
            </div>
            <div className="wi-hero-line" />
            <p className="wi-hero-date">26 · July · 2026 &nbsp;|&nbsp; Sunday</p>
          </div>
        </header>

        {/* Wave */}
        <div className="wi-silk"><span className="wi-silk-wave" /></div>

        {/* FAMILIES */}
        <section className="wi-section">
          <div className="wi-sec-header">
            <span className="wi-sec-dot" />
            <span className="wi-sec-label">The Families &amp; Friends</span>
            <span className="wi-sec-rule" />
          </div>
          <div className="wi-family-panel">
            <div className="wi-family-top">
              <p>United in Nikah</p>
              <h3>Shabeer Ahmad weds Nasriya E.P.</h3>
            </div>
            <div className="wi-family-cols">
              <div className="wi-f-side">
                <h4>Shabeer</h4>
                <p>Son of<br /><strong>Basheer Kaithakal</strong>&amp; Shameena Basheer</p>
              </div>
              <div className="wi-f-sep" />
              <div className="wi-f-side">
                <h4>Nasriya</h4>
                <p>Daughter of<br /><strong>Muhammed E.P.</strong>&amp; Jameela</p>
              </div>
            </div>
            <p className="wi-family-foot">Illath Pidiyakil, Arakkur, Kakkattil</p>
          </div>
        </section>

        {/* COUNTDOWN */}
        <section className="wi-section">
          <div className="wi-sec-header">
            <span className="wi-sec-dot" style={{background:'var(--rose-gold)'}} />
            <span className="wi-sec-label" style={{color:'var(--rose-gold)'}}>Counting Down</span>
            <span className="wi-sec-rule" style={{background:'linear-gradient(90deg,var(--rose-gold),transparent)'}} />
          </div>
          <div className="wi-cd-wrap">
            <div className="wi-cd-top">
              <div className="wi-cd-top-left">
                <p>The Big Day Arrives In</p>
                <p>July 26, 2026 · 3:00 PM</p>
              </div>
              <div className="wi-cd-icon-wrap">⏳</div>
            </div>
            {countdown.done ? (
              <div style={{gridColumn:'1/-1',textAlign:'center',padding:'1.2rem',fontFamily:"'Playfair Display',serif",fontStyle:'italic',color:'var(--emerald)',fontSize:'18px'}}>
                The celebration has begun! 🎉
              </div>
            ) : (
              <div className="wi-cd-grid">
                {[{id:'d',val:countdown.d,lbl:'Days'},{id:'h',val:countdown.h,lbl:'Hours'},{id:'m',val:countdown.m,lbl:'Mins'},{id:'s',val:countdown.s,lbl:'Secs'}].map(u => (
                  <div className="wi-cd-unit" key={u.id}>
                    <span className={`wi-cd-num${u.id==='s' && secPulse ? ' wi-cd-pulse' : ''}`}>{u.val}</span>
                    <span className="wi-cd-lbl">{u.lbl}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* DETAILS */}
        <section className="wi-section">
          <div className="wi-sec-header">
            <span className="wi-sec-dot" />
            <span className="wi-sec-label">Event Details</span>
            <span className="wi-sec-rule" />
          </div>
          <div className="wi-details-wrap">
            {[
              {cls:'wi-d-green',icon:'📅',h:'Sunday, July 26, 2026',p:'1447 Safar 11 · Njayarazhcha'},
              {cls:'wi-d-rose', icon:'🕒',h:'3:00 PM — 9:00 PM',p:'Evening celebration & dinner'},
              {cls:'wi-d-teal', icon:'📍',h:'V.V. Dakshinamurthy Hall',p:'Perambra, Kozhikode, Kerala'},
              {cls:'wi-d-warm', icon:'🕌',h:'Nikah Ceremony',p:'Followed by walima & reception'},
            ].map((item,i) => (
              <div className="wi-detail-item" key={i}>
                <div className={`wi-d-icon ${item.cls}`}>{item.icon}</div>
                <div className="wi-detail-text">
                  <h4>{item.h}</h4>
                  <p>{item.p}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ORNAMENT */}
        <div className="wi-ornament-strip"><span>With love &amp; prayers</span></div>

        {/* RSVP */}
        <div className="wi-rsvp-section">
          <div className="wi-rsvp-card">
            <div className="wi-rsvp-header">
              <h2>Will you join us?</h2>
              <p>kindly respond by July 20, 2026</p>
            </div>
            <div className="wi-rsvp-body">
              <div className="wi-inp-group">
                <label className="wi-inp-label" htmlFor="rsvp-name">Your Full Name</label>
                <input
                  className={`wi-inp-field${nameErr ? ' err' : ''}`}
                  id="rsvp-name"
                  type="text"
                  placeholder={nameErr ? 'Please enter your name first…' : 'Enter your name…'}
                  autoComplete="name"
                  value={name}
                  onChange={e => { setName(e.target.value); if (nameErr) setNameErr(false); }}
                />
              </div>
              <div className="wi-rsvp-choices">
                <button
                  className={`wi-choice-btn wi-choice-accept${selected === 'yes' ? ' wi-sel-yes' : ''}`}
                  onClick={() => submitRSVP('yes')}
                >
                  <span className="cb-icon">🌸</span>
                  Joyfully Accept
                </button>
                <button
                  className={`wi-choice-btn wi-choice-decline${selected === 'no' ? ' wi-sel-no' : ''}`}
                  onClick={() => submitRSVP('no')}
                >
                  <span className="cb-icon">🤍</span>
                  Regretfully Decline
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="wi-footer">
          <span className="wi-footer-script">With Love</span>
          <p className="wi-footer-names">Basheer Kaithakal &amp; Shameena Basheer Kaithakal</p>
          <div className="wi-footer-line" />
          <p className="wi-footer-blessings">
            With blessings of Kunjamma · Safiya · Shihab · Shuhaib<br />
            Kaithakal Family &amp; Naduththeruratthy Family
          </p>
          <div className="wi-footer-phones">
            <a href="tel:9846729249">📞 9846729249</a>
            <a href="tel:8129276616">📞 8129276616</a>
          </div>
          <p className="wi-footer-tiny">Shabeer &amp; Nasriya · 26 July 2026</p>
        </footer>

      </div>

      {/* MODAL */}
      <RSVPModal
        open={modal.open}
        isYes={modal.isYes}
        name={modal.name}
        guests={modal.guests}
        onClose={() => setModal(m => ({...m, open: false}))}
      />
    </>
  );
}


