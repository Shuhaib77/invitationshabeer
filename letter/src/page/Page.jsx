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
 

function Page() {
  return (
    <div>Page</div>
  )
}

export default Page