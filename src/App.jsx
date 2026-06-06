import { useState, useEffect, useRef } from "react";

const ADMIN_PASSWORD = "hana2026";

const THEME = {
  light:{
    bg:"#FFFDF7",bg2:"#FDF8F5",surface:"#FFFFFF",surface2:"#FCF5F2",
    border:"#F0E6E0",border2:"#E8D5CE",
    text:"#1C1412",text2:"#5D4037",text3:"#9E8070",
    rose:"#C2185B",roseBg:"#FCE4EC",gold:"#B8860B",
    heroGrad:"linear-gradient(135deg,rgba(123,13,62,0.82) 0%,rgba(194,24,91,0.75) 45%,rgba(136,14,79,0.85) 100%),url('/image/background.png') center center / cover no-repeat",
  },
  dark:{
    bg:"#0D0812",bg2:"#130D1C",surface:"#1A1228",surface2:"#221830",
    border:"#2E2045",border2:"#3D2D58",
    text:"#F0EBF8",text2:"#C4B0D8",text3:"#8A7A9E",
    rose:"#F06292",roseBg:"#3D1A2E",gold:"#D4A843",
    heroGrad:"linear-gradient(135deg,#1A0520 0%,#3D0D35 45%,#220A2E 100%)",
  }
};

const injectFonts = () => {
  if (document.getElementById("hana-fonts")) return;
  const l = document.createElement("link");
  l.id = "hana-fonts"; l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap";
  document.head.appendChild(l);
  const s = document.createElement("style");
  s.id = "hana-anim";
  s.textContent = `
    @keyframes hanaShake{0%,100%{transform:translateX(0)}15%,45%,75%{transform:translateX(-7px)}30%,60%,90%{transform:translateX(7px)}}
    @keyframes hanaFadeIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
    @keyframes hanaOrb{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}
    .hana-shake{animation:hanaShake 0.45s ease-in-out;}
    .hana-fadein{animation:hanaFadeIn 0.4s ease-out both;}
    .hana-orb{animation:hanaOrb 5s ease-in-out infinite;}
    @keyframes rainfall{from{transform:translateY(-150px)}to{transform:translateY(110vh)}}
    @keyframes steamrise{0%{transform:translateY(0);opacity:0.4}100%{transform:translateY(-40px);opacity:0}}
    @keyframes leaffall{0%{transform:translateY(-30px) translateX(0) rotate(0deg);opacity:0}10%{opacity:0.75}85%{opacity:0.5}100%{transform:translateY(110vh) translateX(60px) rotate(420deg);opacity:0}}
    @keyframes leafsway{0%,100%{margin-left:0}25%{margin-left:18px}75%{margin-left:-18px}}
  `;
  document.head.appendChild(s);
};

// ── SEED DATA ─────────────────────────────────────────────────────────────────
const SEED_ENTRIES = [
  {
    id:"e1", title:"Finding yourself in the middle of Kuala Lumpur",
    category:"journey", mood:"🌙 Reflective",
    excerpt:"Sometimes the loudest city teaches you the quietest lessons about who you really are…",
    body:`I used to think finding yourself meant escaping somewhere quiet — a beach in Langkawi, a rice paddy in Kedah. But KL taught me otherwise.\n\nIt was a Tuesday, the kind that starts grey and smells like rain on warm concrete. I was rushing through Bukit Bintang, umbrella half-broken, late for a meeting that I didn't even want to attend.\n\nAnd then I stopped.\n\nRight in the middle of the crowd. People streamed around me like water around a stone. A makcik was selling pisang goreng from a small cart, the oil sizzling softly beneath the noise of traffic. A boy in a school uniform was reading a comic book under the awning of a 7-Eleven. Two old men were arguing about football so passionately they were nearly dancing.\n\nI thought: this. This is what life looks like when it's actually being lived.\n\nI cancelled the meeting. I bought pisang goreng. I sat on a wet plastic stool and watched KL breathe.\n\nSometimes you don't find yourself in the silence. You find yourself in the beautiful, chaotic, fragrant middle of everything.`,
    date:"2026-06-03", readTime:5, likes:34, comments:12, pinned:true,
    image:null, tags:["malaysia","selfgrowth","kualalumpur"]
  },
  {
    id:"e2", title:"7 ways to make nasi lemak taste like your mak's",
    category:"tips", mood:"😊 Happy",
    excerpt:"The secret isn't just the coconut milk — it's the love in the method, the patience in the sambal…",
    body:`Every Malaysian knows: no restaurant nasi lemak will ever beat your mother's. But here are the seven things that get you closest.\n\n**1. Pandan is not optional.** Three knots of pandan in the rice, always. It's the soul of the dish.\n\n**2. Full-fat coconut milk only.** The carton ones work in a pinch but the fresh squeezed ones from the wet market change everything.\n\n**3. The sambal needs 45 minutes.** Not 20. Not 30. Forty-five minutes on low heat, stirring slowly. This is where patience becomes flavour.\n\n**4. Toast your ikan bilis until they crunch.** Not just warm — crunchy. You should be able to hear them.\n\n**5. Room temperature rice.** Steam the rice, then let it breathe for 10 minutes before serving. It separates beautifully.\n\n**6. A squeeze of lime over everything.** This is my mak's secret. Just a small squeeze. It lifts the whole plate.\n\n**7. Serve it wrapped in banana leaf.** Even at home. The smell, the ritual — it makes it taste better. I promise.`,
    date:"2026-06-01", readTime:3, likes:57, comments:23, pinned:false,
    image:null, tags:["food","nasilemak","recipe","malaysia"]
  },
  {
    id:"e3", title:"How to be kind to yourself on hard days",
    category:"advice", mood:"🌿 Peaceful",
    excerpt:"We're always so generous with forgiveness toward others. Why is it so hard to extend that same grace to ourselves?",
    body:`Today was hard. I don't need to explain why — you've had those days too. The ones where nothing goes catastrophically wrong, but everything feels slightly off, like a song played in the wrong key.\n\nOn those days I used to push harder. Work more. Do more. Be more.\n\nNow I do something different. I make tea. Proper tea — the kind you wait for, not the microwave kind. And while the water boils I say out loud, to myself, in an empty kitchen: "You're doing okay."\n\nIt sounds small. It is small. But small is where kindness begins.\n\nHere are the things I've learnt about hard days:\n\n— They pass. Every single one of them has passed so far. That's a 100% track record.\n\n— Your body needs softness when your mind is hard on you. Eat something warm. Wear comfortable clothes. Lie on the floor if you need to.\n\n— Text the friend you've been meaning to text. Not because you want to talk about what's wrong, but because love is a two-way current and sending it out brings it back.\n\n— Forgive yourself for not being your best self today. Your best self will be back. She's just resting.`,
    date:"2026-05-28", readTime:4, likes:89, comments:41, pinned:false,
    image:null, tags:["mentalhealth","selfcare","advice","wellbeing"]
  },
  {
    id:"e4", title:"Can we talk about girlhood in Malaysia?",
    category:"topics", mood:"✨ Inspired",
    excerpt:"Growing up as a girl here is its own kind of poetry — full of contradictions, warmth, and lessons no school ever teaches you…",
    body:`Nobody told me girlhood would feel like this: simultaneously too much and never enough.\n\nIn Malaysia, girlhood comes wrapped in particular textures. The smell of Johnson's baby powder at Raya. Learning to salam properly. Being told to speak softer, sit neater, smile more.\n\nBut also: the absolute freedom of a thunderstorm. Playing congkak on the verandah until it's too dark to see the seeds. Sharing a plate of cendol with your cousins and feeling like nothing in the world could be better.\n\nWe carry both things. The weight of expectations and the lightness of joy. Sometimes at the same moment.\n\nI think about the girls growing up in Malaysia right now. The ones figuring out who they are across TikTok and family dinners and surau and shopping malls. The ones negotiating between the world their grandmothers knew and the world opening up in front of them.\n\nI want to say to them: the contradiction is not a flaw. The complexity is not a problem to solve. You are allowed to be all of it — traditional and modern, loud and soft, certain and still searching.\n\nMalaysian girlhood, in all its beautiful mess, is a whole universe. We're still writing its story.`,
    date:"2026-05-26", readTime:6, likes:103, comments:67, pinned:false,
    image:null, tags:["girlhood","malaysia","womenempowerment","culture"]
  }
];

const SEED_COMMENTS = {
  e1:[
    {id:"c1",author:"Aisha R.",avatar:"AR",text:"This made me cry in the best way. I had my own KL moment last month.",date:"2026-06-04",likes:8},
    {id:"c2",author:"Farah L.",avatar:"FL",text:"The pisang goreng detail 💖 so perfectly Malaysian.",date:"2026-06-04",likes:5},
  ],
  e2:[{id:"c3",author:"Mak Cik Rosy",avatar:"MR",text:"The lime trick!! I've been doing this for 40 years and nobody believes me 😂",date:"2026-06-02",likes:14}],
  e3:[
    {id:"c4",author:"Nurin H.",avatar:"NH",text:"\"Your best self is just resting\" — I needed this today more than you know.",date:"2026-05-29",likes:22},
    {id:"c5",author:"Siti A.",avatar:"SA",text:"Screenshotted the whole thing. Thank you for writing this.",date:"2026-05-29",likes:11},
  ],
  e4:[{id:"c6",author:"Yaya M.",avatar:"YM",text:"\"The contradiction is not a flaw\" — tattooing this on my heart.",date:"2026-05-27",likes:31}],
};

const SEED_SUBSCRIBERS = [
  {id:"sub1",email:"aisha.rahman@gmail.com",name:"Aisha Rahman",date:"2026-05-15",active:true},
  {id:"sub2",email:"nurulfaiqah@yahoo.com",name:"Nurul Faiqah",date:"2026-05-22",active:true},
  {id:"sub3",email:"syahirah.my@gmail.com",name:"Syahirah",date:"2026-06-01",active:true},
];

const CATEGORIES = [
  {id:"all",label:"All",emoji:"✦"},
  {id:"journey",label:"My Journey",emoji:"🌟"},
  {id:"tips",label:"Tips & Tricks",emoji:"💡"},
  {id:"topics",label:"Let's Talk",emoji:"💬"},
  {id:"advice",label:"Advice",emoji:"🌸"},
];

const CAT_META = {
  journey:{color:"#B8860B",bg:"#FFF9E6",border:"#FFE082",accent:"linear-gradient(90deg,#B8860B,#E6A817)"},
  tips:   {color:"#2E7D32",bg:"#E8F5E9",border:"#A5D6A7",accent:"linear-gradient(90deg,#2E7D32,#43A047)"},
  topics: {color:"#1565C0",bg:"#E3F2FD",border:"#90CAF9",accent:"linear-gradient(90deg,#1565C0,#42A5F5)"},
  advice: {color:"#C2185B",bg:"#FCE4EC",border:"#F48FB1",accent:"linear-gradient(90deg,#C2185B,#E91E63)"},
};

const CAT_EMOJI = {journey:"🌿",tips:"🍜",topics:"💬",advice:"🌸"};
const MOODS = ["😊 Happy","🙏 Grateful","🌿 Peaceful","✨ Inspired","🌙 Reflective","💪 Motivated","😢 Emotional"];

// ── IMAGE HELPER ──────────────────────────────────────────────────────────────
function readFileAsDataURL(file) {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}

// ── PHOTO UPLOADER COMPONENT ──────────────────────────────────────────────────
function PhotoUploader({ value, onChange, compact = false }) {
  const inputRef = useRef();
  const [dragging, setDragging] = useState(false);

  const handleFile = async (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    // Resize to max 1200px wide to keep localStorage happy
    const img = new Image();
    img.onload = () => {
      const MAX = 1200;
      const scale = img.width > MAX ? MAX / img.width : 1;
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
      onChange(canvas.toDataURL("image/jpeg", 0.82));
    };
    img.src = await readFileAsDataURL(file);
  };

  const onDrop = (e) => {
    e.preventDefault(); setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  if (compact) {
    return (
      <div style={{display:"flex",alignItems:"center",gap:12}}>
        {value
          ? <div style={{position:"relative",width:80,height:80,borderRadius:12,overflow:"hidden",flexShrink:0}}>
              <img src={value} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              <button onClick={()=>onChange(null)} style={{position:"absolute",top:4,right:4,width:20,height:20,borderRadius:"50%",background:"rgba(0,0,0,0.55)",border:"none",color:"#fff",cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
            </div>
          : <button onClick={()=>inputRef.current.click()} style={{width:80,height:80,borderRadius:12,border:"1.5px dashed #E8D5CE",background:"#FDF8F5",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:4,color:"#C2185B",fontSize:11}}>
              <span style={{fontSize:22}}>📷</span>Add
            </button>
        }
        <div style={{fontSize:13,color:"#9E8070",lineHeight:1.5}}>
          {value ? "Cover photo added ✓" : "Add a cover photo to make this entry stand out"}
        </div>
        <input ref={inputRef} type="file" accept="image/*" style={{display:"none"}} onChange={e=>handleFile(e.target.files[0])}/>
      </div>
    );
  }

  return (
    <div
      onDragOver={e=>{e.preventDefault();setDragging(true);}}
      onDragLeave={()=>setDragging(false)}
      onDrop={onDrop}
      style={{
        border:`2px dashed ${dragging?"#E91E63":value?"#A5D6A7":"#E8D5CE"}`,
        borderRadius:16, background:dragging?"#FCE4EC":value?"#F1F8F1":"#FDF8F5",
        transition:"all 0.2s", overflow:"hidden",
      }}
    >
      {value ? (
        <div style={{position:"relative"}}>
          <img src={value} alt="Cover" style={{width:"100%",height:260,objectFit:"cover",display:"block"}}/>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,0.4) 0%,transparent 60%)",display:"flex",alignItems:"flex-end",justifyContent:"space-between",padding:"16px 20px"}}>
            <span style={{color:"#fff",fontSize:13,fontWeight:500}}>✓ Cover photo ready</span>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>inputRef.current.click()} style={{padding:"6px 14px",borderRadius:20,border:"1px solid rgba(255,255,255,0.5)",background:"rgba(255,255,255,0.15)",color:"#fff",cursor:"pointer",fontSize:12,fontFamily:"'DM Sans',sans-serif"}}>Change</button>
              <button onClick={()=>onChange(null)} style={{padding:"6px 14px",borderRadius:20,border:"1px solid rgba(255,100,100,0.5)",background:"rgba(220,50,50,0.2)",color:"#fff",cursor:"pointer",fontSize:12,fontFamily:"'DM Sans',sans-serif"}}>Remove</button>
            </div>
          </div>
        </div>
      ) : (
        <div style={{padding:"40px 24px",textAlign:"center",cursor:"pointer"}} onClick={()=>inputRef.current.click()}>
          <div style={{fontSize:40,marginBottom:12}}>📷</div>
          <p style={{fontSize:15,fontWeight:500,color:"#1C1412",marginBottom:6}}>Add a cover photo</p>
          <p style={{fontSize:13,color:"#9E8070",marginBottom:16}}>Drag & drop, or click to choose from your device</p>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"9px 22px",borderRadius:50,background:"linear-gradient(135deg,#C2185B,#E91E63)",color:"#fff",fontSize:13,fontWeight:500}}>📁 Choose photo</div>
          <p style={{fontSize:11,color:"#C0A090",marginTop:12}}>JPG, PNG, WEBP — recommended 1200×600px</p>
        </div>
      )}
      <input ref={inputRef} type="file" accept="image/*" style={{display:"none"}} onChange={e=>handleFile(e.target.files[0])}/>
    </div>
  );
}

// ── STYLES ────────────────────────────────────────────────────────────────────
const S = {
  app:{fontFamily:"'DM Sans',sans-serif",background:"#FFFDF7",minHeight:"100vh",color:"#1C1412"},
  header:{background:"#fff",borderBottom:"1px solid #F0E6E0",position:"sticky",top:0,zIndex:200},
  headerInner:{maxWidth:1100,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 24px",height:64},
  logo:{fontFamily:"'Playfair Display',serif",fontSize:26,color:"#C2185B",cursor:"pointer",letterSpacing:"-0.5px"},
  logoSpan:{color:"#B8860B",fontStyle:"italic"},
  navLinks:{display:"flex",gap:8,alignItems:"center"},
  navBtn:(a)=>({padding:"8px 16px",borderRadius:24,border:a?"1.5px solid #C2185B":"1.5px solid transparent",background:a?"#FCE4EC":"transparent",color:a?"#C2185B":"#8D6E63",cursor:"pointer",fontSize:14,fontWeight:500,fontFamily:"'DM Sans',sans-serif",transition:"all 0.2s"}),
  writeBtn:{padding:"9px 20px",borderRadius:24,background:"linear-gradient(135deg,#C2185B,#E91E63)",border:"none",color:"#fff",cursor:"pointer",fontSize:14,fontWeight:500,fontFamily:"'DM Sans',sans-serif",display:"flex",alignItems:"center",gap:8,transition:"all 0.2s"},
  hero:{background:"linear-gradient(135deg,rgba(123,13,62,0.82) 0%,rgba(194,24,91,0.75) 45%,rgba(136,14,79,0.85) 100%),url('/image/background.png') center center / cover no-repeat",padding:"64px 24px 72px",position:"relative",overflow:"hidden"},
  heroInner:{maxWidth:1100,margin:"0 auto",position:"relative",zIndex:1},
  heroLabel:{fontSize:12,color:"rgba(255,255,255,0.65)",letterSpacing:1,textTransform:"uppercase",marginBottom:12},
  heroTitle:{fontFamily:"'Playfair Display',serif",fontSize:"clamp(32px,5vw,56px)",color:"#fff",lineHeight:1.15,marginBottom:16,maxWidth:640},
  heroTitleEm:{fontStyle:"italic",color:"#FFB3CC"},
  heroSub:{fontSize:16,color:"rgba(255,255,255,0.75)",lineHeight:1.7,maxWidth:500,marginBottom:28},
  heroCta:{display:"inline-flex",alignItems:"center",gap:10,background:"#fff",color:"#C2185B",padding:"14px 28px",borderRadius:50,fontWeight:600,fontSize:15,cursor:"pointer",border:"none",fontFamily:"'DM Sans',sans-serif",boxShadow:"0 8px 24px rgba(0,0,0,0.15)"},
  main:{maxWidth:1100,margin:"0 auto",padding:"40px 24px"},
  grid:{display:"grid",gridTemplateColumns:"1fr 340px",gap:40,alignItems:"start"},
  catRow:{display:"flex",gap:8,flexWrap:"wrap",marginBottom:28},
  catPill:(a,m)=>({padding:"8px 18px",borderRadius:24,border:`1.5px solid ${a&&m?m.border:"#E8D5CE"}`,background:a&&m?m.bg:"#fff",color:a&&m?m.color:"#8D6E63",cursor:"pointer",fontSize:13,fontWeight:500,fontFamily:"'DM Sans',sans-serif",transition:"all 0.2s",display:"flex",alignItems:"center",gap:6}),
  entryCard:{background:"#fff",borderRadius:20,border:"1px solid #F0E6E0",marginBottom:20,overflow:"hidden",cursor:"pointer",transition:"all 0.25s"},
  entryBody:{padding:"18px 22px 16px"},
  entryMeta:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10},
  entryDate:{fontSize:12,color:"#9E8070"},
  entryTag:(cat)=>({fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:12,textTransform:"uppercase",letterSpacing:0.5,background:CAT_META[cat]?.bg||"#F5F5F5",color:CAT_META[cat]?.color||"#555"}),
  entryTitle:{fontFamily:"'Playfair Display',serif",fontSize:20,color:"#1C1412",lineHeight:1.4,marginBottom:8},
  entryExcerpt:{fontSize:14,color:"#5D4037",lineHeight:1.65,marginBottom:14},
  entryFooter:{display:"flex",alignItems:"center",justifyContent:"space-between"},
  entryStat:{display:"flex",alignItems:"center",gap:18},
  statItem:{display:"flex",alignItems:"center",gap:5,fontSize:13,color:"#9E8070"},
  moodBadge:{fontSize:12,color:"#8D6E63",background:"#FDF8F5",border:"1px solid #F0E6E0",borderRadius:12,padding:"3px 10px"},
  featCard:{background:"linear-gradient(135deg,#7B0D3E,#C2185B,#E91E63)",borderRadius:24,marginBottom:28,cursor:"pointer",position:"relative",overflow:"hidden",transition:"transform 0.2s"},
  sidebar:{display:"flex",flexDirection:"column",gap:24},
  sideCard:{background:"#fff",borderRadius:20,border:"1px solid #F0E6E0",padding:"20px 22px"},
  sideTitle:{fontFamily:"'Playfair Display',serif",fontSize:16,color:"#1C1412",marginBottom:16},
  readingWrap:{maxWidth:740,margin:"0 auto",padding:"0 24px 60px"},
  readingBody:{fontSize:17,color:"#3E2723",lineHeight:1.9,fontFamily:"'DM Sans',sans-serif"},
  editorWrap:{maxWidth:820,margin:"0 auto",padding:"40px 24px"},
  input:{width:"100%",padding:"14px 16px",borderRadius:14,border:"1.5px solid #E8D5CE",background:"#FFFDF7",fontFamily:"'DM Sans',sans-serif",fontSize:15,color:"#1C1412",outline:"none",boxSizing:"border-box",transition:"border-color 0.2s"},
  textarea:{width:"100%",padding:"16px 18px",borderRadius:14,border:"1.5px solid #E8D5CE",background:"#FFFDF7",fontFamily:"'Playfair Display',serif",fontSize:18,color:"#1C1412",lineHeight:1.8,outline:"none",resize:"vertical",boxSizing:"border-box",minHeight:320,transition:"border-color 0.2s"},
  label:{fontSize:12,color:"#9E8070",letterSpacing:0.5,textTransform:"uppercase",marginBottom:8,display:"block"},
  fieldGroup:{marginBottom:24},
  primaryBtn:{padding:"14px 32px",borderRadius:50,background:"linear-gradient(135deg,#C2185B,#E91E63)",border:"none",color:"#fff",fontWeight:500,fontSize:15,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all 0.2s"},
  ghostBtn:{padding:"13px 28px",borderRadius:50,background:"transparent",border:"1.5px solid #E8D5CE",color:"#8D6E63",fontWeight:500,fontSize:15,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all 0.2s"},
  profileHero:{background:"linear-gradient(135deg,#7B0D3E,#C2185B)",padding:"48px 24px 80px",textAlign:"center",position:"relative",overflow:"hidden"},
  avatar:{width:100,height:100,borderRadius:"50%",background:"rgba(255,255,255,0.15)",border:"3px solid rgba(255,255,255,0.4)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",fontFamily:"'Playfair Display',serif",fontSize:36,color:"#fff"},
  commentBox:{background:"#FDF8F5",borderRadius:14,padding:"14px 16px",marginBottom:12,border:"1px solid #F0E6E0"},
  commentInput:{width:"100%",padding:"12px 16px",borderRadius:14,border:"1.5px solid #E8D5CE",background:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:14,color:"#1C1412",outline:"none",boxSizing:"border-box",resize:"none",minHeight:80},
  dashGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:16,marginBottom:32},
  statCard:{background:"#fff",borderRadius:16,border:"1px solid #F0E6E0",padding:"18px 20px"},
  statNum:{fontSize:32,fontWeight:600,color:"#C2185B",lineHeight:1},
  statLabel:{fontSize:12,color:"#9E8070",marginTop:4,letterSpacing:0.3},
};

// ── SEARCH HELPERS ───────────────────────────────────────────────────────────
function searchEntries(entries, query) {
  if (!query.trim()) return entries;
  const q = query.trim().toLowerCase();
  return entries
    .map(e => {
      let score = 0;
      if (e.title.toLowerCase().includes(q))   score += 100;
      if (e.excerpt.toLowerCase().includes(q)) score += 50;
      if ((e.tags||[]).join(" ").toLowerCase().includes(q)) score += 30;
      if (e.body.toLowerCase().includes(q))    score += 20;
      if ((e.category+" "+e.mood).toLowerCase().includes(q)) score += 10;
      return { entry: e, score };
    })
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(x => x.entry);
}

function highlight(text, query) {
  if (!query.trim()) return text;
  const q = query.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text.replace(
    new RegExp(`(${q})`, "gi"),
    `<mark style="background:#FCE4EC;color:#C2185B;font-style:inherit;">$1</mark>`
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function HanaDiary() {
  injectFonts();
  const [isAdmin, setIsAdmin] = useState(()=>sessionStorage.getItem("hana_admin")==="true");
  const [view, setView] = useState("home");
  const [entries, setEntries] = useState(()=>{
    try{const s=localStorage.getItem("hana_entries");return s?JSON.parse(s):SEED_ENTRIES;}catch{return SEED_ENTRIES;}
  });
  const [comments, setComments] = useState(()=>{
    try{const s=localStorage.getItem("hana_comments");return s?JSON.parse(s):SEED_COMMENTS;}catch{return SEED_COMMENTS;}
  });
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [activeCat, setActiveCat] = useState("all");
  const [likedEntries, setLikedEntries] = useState({});
  const [lightboxImg, setLightboxImg] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [ambientMode, setAmbientMode] = useState(null);
  const [darkMode, setDarkMode] = useState(()=>localStorage.getItem("hana_dark")==="true");
  const toggleDark = ()=>setDarkMode(p=>{const n=!p;localStorage.setItem("hana_dark",String(n));return n;});
  useEffect(()=>{document.body.style.background=darkMode?"#0D0812":"#FFFDF7";},[darkMode]);
  const rainAudioRef = useRef(null);
  const coffeeAudioRef = useRef(null);
  const natureAudioRef = useRef(null);

  useEffect(()=>{
    rainAudioRef.current = new Audio("/audio/rain.mp3");
    rainAudioRef.current.loop = true;
    coffeeAudioRef.current = new Audio("/audio/coffee.mp3");
    coffeeAudioRef.current.loop = true;
    natureAudioRef.current = new Audio("/audio/nature.mp3");
    natureAudioRef.current.loop = true;
    return ()=>{ rainAudioRef.current?.pause(); coffeeAudioRef.current?.pause(); natureAudioRef.current?.pause(); };
  },[]);

  const toggleAmbient = (mode) => {
    setAmbientMode(prev => {
      const next = prev === mode ? null : mode;
      if(prev==="rain"){ rainAudioRef.current?.pause(); if(rainAudioRef.current) rainAudioRef.current.currentTime=0; }
      if(prev==="coffee"){ coffeeAudioRef.current?.pause(); if(coffeeAudioRef.current) coffeeAudioRef.current.currentTime=0; }
      if(prev==="nature"){ natureAudioRef.current?.pause(); if(natureAudioRef.current) natureAudioRef.current.currentTime=0; }
      if(next==="rain") rainAudioRef.current?.play().catch(()=>{});
      if(next==="coffee") coffeeAudioRef.current?.play().catch(()=>{});
      if(next==="nature") natureAudioRef.current?.play().catch(()=>{});
      return next;
    });
  };

  const [subscribers, setSubscribers] = useState(()=>{
    try{return JSON.parse(localStorage.getItem("hana_subscribers")||"null")||SEED_SUBSCRIBERS;}catch{return SEED_SUBSCRIBERS;}
  });

  useEffect(()=>{try{localStorage.setItem("hana_entries",JSON.stringify(entries));}catch{}},[entries]);
  useEffect(()=>{try{localStorage.setItem("hana_comments",JSON.stringify(comments));}catch{}},[comments]);
  useEffect(()=>{localStorage.setItem("hana_subscribers",JSON.stringify(subscribers));},[subscribers]);

  const addSubscriber=(email,name)=>{
    if(subscribers.find(s=>s.email===email))return "already";
    const newSub={id:"s"+Date.now(),email,name:name||"",date:new Date().toISOString().slice(0,10),active:true};
    setSubscribers(prev=>[newSub,...prev]);
    return "success";
  };

  // Hash-based admin route — triggered by navigating to #admin
  useEffect(()=>{
    const check=()=>{
      if(window.location.hash==="#admin"){
        history.replaceState(null,"",window.location.pathname+window.location.search);
        if(sessionStorage.getItem("hana_admin")!=="true") setView("adminLogin");
      }
    };
    check();
    window.addEventListener("hashchange",check);
    return()=>window.removeEventListener("hashchange",check);
  },[]);

  const handleAdminLogin=(pwd)=>{
    if(pwd===ADMIN_PASSWORD){
      sessionStorage.setItem("hana_admin","true");
      setIsAdmin(true);
      setView("home");
      return true;
    }
    return false;
  };

  const handleLogout=()=>{
    sessionStorage.removeItem("hana_admin");
    setIsAdmin(false);
    setView("home");
    setSelectedEntry(null);
  };

  const openEntry = (e)=>{setSelectedEntry(e);setView("read");window.scrollTo(0,0);};
  const goHome = ()=>{setView("home");setSelectedEntry(null);};
  const filteredEntries = activeCat==="all" ? entries : entries.filter(e=>e.category===activeCat);
  const pinned = entries.find(e=>e.pinned);

  const toggleLike = (id)=>{
    setLikedEntries(p=>({...p,[id]:!p[id]}));
    setEntries(p=>p.map(e=>e.id===id?{...e,likes:e.likes+(likedEntries[id]?-1:1)}:e));
  };
  const addEntry = (ne)=>{setEntries(p=>[ne,...p]);setView("home");window.scrollTo(0,0);};
  const addComment = (eid,text,author)=>{
    const nc={id:"c"+Date.now(),author,avatar:author.slice(0,2).toUpperCase(),text,date:new Date().toISOString().slice(0,10),likes:0};
    setComments(p=>({...p,[eid]:[...(p[eid]||[]),nc]}));
    setEntries(p=>p.map(e=>e.id===eid?{...e,comments:(e.comments||0)+1}:e));
  };
  const deleteEntry = (id)=>{setEntries(p=>p.filter(e=>e.id!==id));if(view==="read")goHome();};

  if(view==="adminLogin") return <AdminLoginScreen onLogin={handleAdminLogin}/>;

  const t = THEME[darkMode?"dark":"light"];
  return (
    <div style={{...S.app,background:t.bg,color:t.text,transition:"background 0.4s ease,color 0.4s ease"}}>
      {ambientMode==="rain"&&<RainOverlay/>}
      {ambientMode==="coffee"&&<CoffeeOverlay/>}
      {ambientMode==="nature"&&<NatureOverlay/>}
      <div style={{filter:ambientMode==="rain"?"brightness(0.94) saturate(0.88) hue-rotate(8deg)":ambientMode==="coffee"?"brightness(1.02) saturate(1.1) sepia(0.08)":ambientMode==="nature"?"brightness(1.03) saturate(1.2) hue-rotate(-15deg)":"none",transition:"filter 0.8s ease"}}>
        <Header view={view} setView={setView} goHome={goHome} isAdmin={isAdmin} searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchOpen={searchOpen} setSearchOpen={setSearchOpen} entries={entries} openEntry={openEntry} ambientMode={ambientMode} toggleAmbient={toggleAmbient} darkMode={darkMode} toggleDark={toggleDark}/>
        {view==="home"&&<HomeScreen entries={filteredEntries} allEntries={entries} pinned={pinned} activeCat={activeCat} setActiveCat={setActiveCat} openEntry={openEntry} toggleLike={toggleLike} likedEntries={likedEntries} setView={setView} setLightboxImg={setLightboxImg} searchQuery={searchQuery} setSearchOpen={setSearchOpen} darkMode={darkMode} addSubscriber={addSubscriber} subscribers={subscribers}/>}
        {view==="read"&&selectedEntry&&<ReadingScreen entry={selectedEntry} comments={comments[selectedEntry.id]||[]} goHome={goHome} toggleLike={toggleLike} likedEntries={likedEntries} addComment={addComment} openEntry={openEntry} entries={entries} deleteEntry={deleteEntry} setLightboxImg={setLightboxImg} darkMode={darkMode}/>}
        {view==="write"&&isAdmin&&<WriteScreen goHome={goHome} addEntry={addEntry} darkMode={darkMode}/>}
        {view==="profile"&&<ProfileScreen entries={entries} openEntry={openEntry} setView={setView} setLightboxImg={setLightboxImg} darkMode={darkMode}/>}
        {view==="dashboard"&&isAdmin&&<DashboardScreen entries={entries} comments={comments} openEntry={openEntry} setView={setView} deleteEntry={deleteEntry} onLogout={handleLogout} darkMode={darkMode} subscribers={subscribers} setSubscribers={setSubscribers}/>}
        {lightboxImg&&<Lightbox src={lightboxImg} onClose={()=>setLightboxImg(null)}/>}
      </div>
    </div>
  );
}

// ── LIGHTBOX ──────────────────────────────────────────────────────────────────
function Lightbox({src,onClose}){
  useEffect(()=>{const h=(e)=>{if(e.key==="Escape")onClose();};window.addEventListener("keydown",h);return()=>window.removeEventListener("keydown",h);},[]);
  return(
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.92)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",cursor:"zoom-out"}}>
      <img src={src} alt="" style={{maxWidth:"92vw",maxHeight:"92vh",borderRadius:12,objectFit:"contain",boxShadow:"0 32px 80px rgba(0,0,0,0.6)"}} onClick={e=>e.stopPropagation()}/>
      <button onClick={onClose} style={{position:"absolute",top:20,right:24,background:"rgba(255,255,255,0.12)",border:"none",color:"#fff",fontSize:22,width:44,height:44,borderRadius:"50%",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
    </div>
  );
}

// ── ADMIN LOGIN ───────────────────────────────────────────────────────────────
function AdminLoginScreen({onLogin}){
  const [pwd,setPwd]=useState("");
  const [error,setError]=useState("");
  const [shaking,setShaking]=useState(false);
  const inputRef=useRef();
  useEffect(()=>{inputRef.current?.focus();},[]);

  const attempt=()=>{
    const ok=onLogin(pwd);
    if(!ok){
      setError("Incorrect password");
      setShaking(true);
      setPwd("");
      setTimeout(()=>setShaking(false),500);
      setTimeout(()=>inputRef.current?.focus(),50);
    }
  };

  return(
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#5C0928 0%,#880E4F 30%,#C2185B 65%,#AD1457 100%)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Sans',sans-serif",position:"relative",overflow:"hidden"}}>
      {/* bg orbs */}
      <div style={{position:"absolute",top:"-8%",right:"-4%",width:400,height:400,borderRadius:"50%",background:"rgba(255,255,255,0.04)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",bottom:"-12%",left:"-6%",width:480,height:480,borderRadius:"50%",background:"rgba(0,0,0,0.12)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",top:"22%",left:"7%",width:160,height:160,borderRadius:"50%",background:"rgba(255,179,204,0.07)",pointerEvents:"none"}}/>

      {/* card */}
      <div className={`hana-fadein${shaking?" hana-shake":""}`} style={{background:"rgba(255,255,255,0.98)",borderRadius:32,padding:"52px 44px 44px",width:"100%",maxWidth:400,margin:"0 20px",boxShadow:"0 32px 80px rgba(0,0,0,0.3)",position:"relative",zIndex:1}}>
        {/* flower orb */}
        <div style={{display:"flex",justifyContent:"center",marginBottom:26}}>
          <div className="hana-orb" style={{position:"relative",width:84,height:84}}>
            <div style={{position:"absolute",inset:-8,borderRadius:"50%",background:"radial-gradient(circle,rgba(194,24,91,0.22) 0%,transparent 70%)"}}/>
            <div style={{position:"absolute",inset:5,borderRadius:"50%",background:"rgba(252,228,236,0.55)",border:"1px solid rgba(244,143,177,0.35)"}}/>
            <div style={{position:"relative",width:"100%",height:"100%",borderRadius:"50%",background:"linear-gradient(145deg,#E91E63 0%,#C2185B 45%,#880E4F 100%)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 8px 28px rgba(194,24,91,0.4),inset 0 1px 0 rgba(255,255,255,0.2)",fontSize:36}}>🌸</div>
          </div>
        </div>

        {/* logo */}
        <p style={{fontFamily:"'Playfair Display',serif",fontSize:27,color:"#C2185B",textAlign:"center",letterSpacing:"-0.5px",marginBottom:4}}>
          Fatin<span style={{color:"#B8860B",fontStyle:"italic"}}>·diary</span>
        </p>
        <p style={{fontFamily:"'Playfair Display',serif",fontSize:13,color:"#9E8070",textAlign:"center",fontStyle:"italic",marginBottom:34}}>Your private space.</p>

        {/* error */}
        {error&&<div style={{background:"#FFF0F3",border:"1px solid #FFCDD2",borderRadius:12,padding:"10px 14px",fontSize:13,color:"#C2185B",textAlign:"center",marginBottom:14}}>{error}</div>}

        {/* input */}
        <div style={{marginBottom:18}}>
          <label style={{fontSize:11,color:"#9E8070",letterSpacing:0.5,textTransform:"uppercase",marginBottom:8,display:"block"}}>Secret password</label>
          <div style={{position:"relative"}}>
            <span style={{position:"absolute",left:15,top:"50%",transform:"translateY(-50%)",fontSize:15,opacity:0.35,pointerEvents:"none"}}>🔒</span>
            <input ref={inputRef} type="password" value={pwd}
              onChange={e=>{setPwd(e.target.value);setError("");}}
              onKeyDown={e=>e.key==="Enter"&&attempt()}
              placeholder="Enter your password…"
              style={{...S.input,paddingLeft:42,fontSize:15,letterSpacing:pwd?"0.15em":"normal",borderColor:error?"#F48FB1":"#E8D5CE"}}/>
          </div>
        </div>

        {/* submit */}
        <button onClick={attempt} style={{...S.primaryBtn,width:"100%",fontSize:15,padding:"14px 24px",boxShadow:"0 8px 24px rgba(194,24,91,0.3)"}}>
          Enter my diary 🌺
        </button>

        <p style={{fontSize:12,color:"#C8B0AA",textAlign:"center",marginTop:18}}>Private access only</p>
      </div>
    </div>
  );
}

// ── HEADER ────────────────────────────────────────────────────────────────────
function Header({view,setView,goHome,isAdmin,searchQuery,setSearchQuery,searchOpen,setSearchOpen,entries,openEntry,ambientMode,toggleAmbient,darkMode,toggleDark}){
  const t=THEME[darkMode?"dark":"light"];
  const searchRef=useRef();
  const publicNav=[{id:"home",label:"Home"},{id:"profile",label:"Profile"}];
  const adminNav=[{id:"home",label:"Home"},{id:"profile",label:"Profile"},{id:"dashboard",label:"Dashboard"}];

  useEffect(()=>{if(searchOpen)searchRef.current?.focus();},[searchOpen]);

  const closeSearch=()=>{setSearchOpen(false);setSearchQuery("");};
  const results=searchQuery.trim()?searchEntries(entries,searchQuery).slice(0,8):[];
  const circleBtn=(active,activeColor,activeBg)=>({width:40,height:40,borderRadius:"50%",border:active?`1.5px solid ${activeColor}`:`1.5px solid ${t.border2}`,background:active?activeBg:t.surface,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",padding:0,transition:"all 0.3s",boxShadow:active?`0 0 0 3px ${activeColor}`:"none",flexShrink:0});

  return(
    <header style={{...S.header,background:t.surface,borderBottom:`1px solid ${t.border}`,position:"relative",transition:"background 0.3s,border-color 0.3s"}}>
      <div style={S.headerInner}>
        <div style={{...S.logo,color:t.rose}} onClick={()=>{goHome();closeSearch();}}>Fatin<span style={{...S.logoSpan,color:t.gold}}>·diary</span></div>

        {searchOpen?(
          <div style={{flex:1,display:"flex",alignItems:"center",gap:8,margin:"0 12px"}}>
            <div style={{flex:1,position:"relative"}}>
              <span style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",fontSize:13,opacity:0.35,pointerEvents:"none"}}>🔍</span>
              <input ref={searchRef} value={searchQuery}
                onChange={e=>setSearchQuery(e.target.value)}
                onKeyDown={e=>e.key==="Escape"&&closeSearch()}
                placeholder="Search entries…"
                style={{width:"100%",padding:"9px 14px 9px 38px",borderRadius:50,border:`1.5px solid ${t.border2}`,background:t.bg,color:t.text,fontFamily:"'DM Sans',sans-serif",fontSize:14,outline:"none",boxSizing:"border-box",transition:"border-color 0.2s"}}
                onFocus={e=>e.target.style.borderColor=t.rose}
                onBlur={e=>e.target.style.borderColor=t.border2}
              />
            </div>
            <button onClick={closeSearch} style={{background:"none",border:"none",color:t.text3,cursor:"pointer",fontSize:18,lineHeight:1,padding:"4px 6px",flexShrink:0}}>✕</button>
          </div>
        ):(
          <nav style={S.navLinks}>
            {(isAdmin?adminNav:publicNav).map(n=>{const a=view===n.id;return(
              <button key={n.id} style={{padding:"8px 16px",borderRadius:24,border:a?`1.5px solid ${t.rose}`:"1.5px solid transparent",background:a?t.roseBg:"transparent",color:a?t.rose:t.text3,cursor:"pointer",fontSize:14,fontWeight:500,fontFamily:"'DM Sans',sans-serif",transition:"all 0.2s"}} onClick={()=>n.id==="home"?goHome():setView(n.id)}>{n.label}</button>
            );})}
            <button onClick={()=>setSearchOpen(true)} title="Search" style={{padding:"8px 11px",borderRadius:24,border:"1.5px solid transparent",background:"transparent",color:t.text3,cursor:"pointer",fontSize:15,lineHeight:1,transition:"all 0.2s"}}>🔍</button>
            <button onClick={()=>toggleAmbient("rain")} title="Rain ambience" style={circleBtn(ambientMode==="rain","#4FC3F7","#EFF8FF")}>
              <span style={{fontSize:20,lineHeight:1}}>🌧️</span>
            </button>
            <button onClick={()=>toggleAmbient("coffee")} title="Coffee ambience" style={circleBtn(ambientMode==="coffee","#D4A843","#FFF8E6")}>
              <span style={{fontSize:20,lineHeight:1}}>☕</span>
            </button>
            <button onClick={()=>toggleAmbient("nature")} title="Nature ambience" style={circleBtn(ambientMode==="nature","#4CAF50","#F1F8E9")}>
              <span style={{fontSize:20,lineHeight:1}}>🌿</span>
            </button>
            <button onClick={toggleDark} title={darkMode?"Switch to light mode":"Switch to dark mode"} style={circleBtn(false,"","")}>
              <span style={{fontSize:18,lineHeight:1}}>{darkMode?"☀️":"🌙"}</span>
            </button>
            {isAdmin&&<button style={S.writeBtn} onClick={()=>setView("write")}>✍ Write entry</button>}
          </nav>
        )}
      </div>

      {searchQuery.trim()&&(
        <SearchResultsPanel results={results} query={searchQuery} openEntry={e=>{openEntry(e);closeSearch();}} darkMode={darkMode}/>
      )}
    </header>
  );
}

// ── AMBIENT MODE DATA ─────────────────────────────────────────────────────────
const NATURE_LEAVES = Array.from({length:18},(_,i)=>({
  left:((i*5.7+i*1.3)%100).toFixed(1)+"%",
  width:7+((i*3)%10),
  height:5+((i*2)%8),
  duration:(6+((i*1.3)%8)).toFixed(1)+"s",
  delay:((i*0.41)%5).toFixed(2)+"s",
  color:["#66BB6A","#81C784","#A5D6A7","#4CAF50","#AED581","#C5E1A5","#DCE775"][i%7],
  swayDuration:(3+((i*0.6)%3)).toFixed(1)+"s",
  swayDelay:((i*0.27)%2).toFixed(2)+"s",
}));

const RAIN_DROPS = Array.from({length:20},(_,i)=>({
  left:((i*5.3+i*0.7)%100).toFixed(1)+"%",
  height:60+((i*7)%61),
  duration:(0.6+(i*0.031)%0.61).toFixed(3)+"s",
  delay:((i*0.193)%2).toFixed(3)+"s",
}));
const STEAM_PARTICLES = Array.from({length:5},(_,i)=>({
  left:(12+i*18)+"%",
  bottom:(8+i*6)+"%",
  duration:(2.4+i*0.7).toFixed(1)+"s",
  delay:(i*0.55).toFixed(2)+"s",
  size:6+i,
}));

function RainOverlay(){
  return(
    <div style={{position:"fixed",inset:0,zIndex:50,pointerEvents:"none",overflow:"hidden",background:"linear-gradient(to bottom,rgba(20,40,80,0.15),rgba(20,40,80,0.08))"}}>
      {RAIN_DROPS.map((d,i)=>(
        <div key={i} style={{position:"absolute",left:d.left,top:0,width:2,height:d.height,background:"#90CAF9",opacity:0.3,borderRadius:1,animation:`rainfall ${d.duration} ${d.delay} linear infinite`}}/>
      ))}
      <div style={{position:"fixed",bottom:24,right:24,background:"rgba(20,40,80,0.72)",color:"#E3F2FD",fontSize:12,padding:"8px 16px",borderRadius:20,backdropFilter:"blur(8px)",border:"1px solid rgba(144,202,249,0.3)",fontFamily:"'DM Sans',sans-serif",letterSpacing:0.2}}>
        🌧 Rain mode · click icon to stop
      </div>
    </div>
  );
}

function CoffeeOverlay(){
  return(
    <div style={{position:"fixed",inset:0,zIndex:50,pointerEvents:"none",overflow:"hidden",background:"rgba(180,100,20,0.06)"}}>
      {STEAM_PARTICLES.map((p,i)=>(
        <div key={i} style={{position:"absolute",left:p.left,bottom:p.bottom,width:p.size,height:p.size,borderRadius:"50%",background:"#D4A843",opacity:0.4,filter:"blur(3px)",animation:`steamrise ${p.duration} ${p.delay} ease-in infinite`}}/>
      ))}
      <div style={{position:"fixed",bottom:24,right:24,background:"rgba(100,55,10,0.72)",color:"#FFF8E6",fontSize:12,padding:"8px 16px",borderRadius:20,backdropFilter:"blur(8px)",border:"1px solid rgba(212,168,67,0.35)",fontFamily:"'DM Sans',sans-serif",letterSpacing:0.2}}>
        ☕ Coffee mode · click icon to stop
      </div>
    </div>
  );
}

function NatureOverlay(){
  return(
    <div style={{position:"fixed",inset:0,zIndex:50,pointerEvents:"none",overflow:"hidden",background:"linear-gradient(to bottom,rgba(20,60,10,0.10),rgba(30,80,20,0.05))"}}>
      {NATURE_LEAVES.map((l,i)=>(
        <div key={i} style={{position:"absolute",left:l.left,top:0,animation:`leaffall ${l.duration} ${l.delay} ease-in infinite, leafsway ${l.swayDuration} ${l.swayDelay} ease-in-out infinite`}}>
          <div style={{width:l.width,height:l.height,borderRadius:"50% 20% 50% 20%",background:l.color,opacity:0.65,transform:`rotate(${i*23}deg)`}}/>
        </div>
      ))}
      <div style={{position:"fixed",bottom:24,right:24,background:"rgba(20,60,10,0.72)",color:"#E8F5E9",fontSize:12,padding:"8px 16px",borderRadius:20,backdropFilter:"blur(8px)",border:"1px solid rgba(165,214,167,0.4)",fontFamily:"'DM Sans',sans-serif",letterSpacing:0.2}}>
        🌿 Nature mode · click icon to stop
      </div>
    </div>
  );
}

// ── SEARCH RESULTS PANEL ──────────────────────────────────────────────────────
function SearchResultsPanel({results,query,openEntry,darkMode}){
  const t=THEME[darkMode?"dark":"light"];
  return(
    <div style={{position:"absolute",top:"100%",left:0,right:0,background:t.surface,borderBottom:`2px solid ${t.border}`,boxShadow:"0 8px 32px rgba(0,0,0,0.15)",zIndex:300,maxHeight:480,overflowY:"auto",transition:"background 0.3s"}}>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"12px 24px 16px"}}>
        <p style={{fontSize:12,color:t.text3,marginBottom:results.length?10:0}}>
          {results.length>0?`${results.length} result${results.length!==1?"s":""} for '${query}'`:""}
        </p>
        {results.length===0?(
          <div style={{textAlign:"center",padding:"20px 0 8px",color:t.text3}}>
            <div style={{fontSize:28,marginBottom:8}}>🌺</div>
            <p style={{fontSize:14}}>No entries found for '{query}'</p>
          </div>
        ):results.map(entry=>(
          <div key={entry.id} onClick={()=>openEntry(entry)}
            style={{display:"flex",alignItems:"center",gap:14,padding:"10px 8px",borderBottom:`1px solid ${t.border}`,cursor:"pointer",borderRadius:8,transition:"background 0.15s"}}
            onMouseEnter={e=>e.currentTarget.style.background=t.surface2}
            onMouseLeave={e=>e.currentTarget.style.background="transparent"}
          >
            {entry.image
              ?<img src={entry.image} alt="" style={{width:48,height:48,borderRadius:10,objectFit:"cover",flexShrink:0}}/>
              :<div style={{width:48,height:48,borderRadius:10,background:CAT_META[entry.category]?.bg||t.bg2,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{CAT_EMOJI[entry.category]||"📖"}</div>
            }
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3,flexWrap:"wrap"}}>
                <p style={{fontFamily:"'Playfair Display',serif",fontSize:15,color:t.text,lineHeight:1.3,margin:0}}
                  dangerouslySetInnerHTML={{__html:highlight(entry.title,query)}}/>
                <span style={S.entryTag(entry.category)}>{CATEGORIES.find(c=>c.id===entry.category)?.label}</span>
              </div>
              <p style={{fontSize:13,color:t.text2,margin:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}
                dangerouslySetInnerHTML={{__html:highlight(entry.excerpt,query)}}/>
            </div>
            <span style={{fontSize:12,color:t.text3,flexShrink:0,whiteSpace:"nowrap"}}>{entry.readTime} min</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── NEWSLETTER SIDEBAR CARD ───────────────────────────────────────────────────
function NewsletterSidebarCard({addSubscriber,darkMode,subscribers}){
  const t=THEME[darkMode?"dark":"light"];
  const [nameVal,setNameVal]=useState("");
  const [emailVal,setEmailVal]=useState("");
  const [status,setStatus]=useState("idle");
  const [emailFocused,setEmailFocused]=useState(false);

  useEffect(()=>{
    if(status==="success"){
      const timer=setTimeout(()=>setStatus("idle"),4000);
      return()=>clearTimeout(timer);
    }
  },[status]);

  const handleSubmit=()=>{
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal.trim())){setStatus("error");return;}
    const result=addSubscriber(emailVal.trim(),nameVal.trim());
    if(result==="already"){setStatus("already");}
    else{setStatus("success");setEmailVal("");setNameVal("");}
  };

  const inputStyle={width:"100%",boxSizing:"border-box",background:t.surface,border:`1px solid ${t.border2}`,borderRadius:12,padding:"11px 14px",fontSize:14,color:t.text,fontFamily:"'DM Sans',sans-serif",outline:"none"};

  const count=subscribers.length;

  return(
    <div style={{background:t.surface,border:`1px solid ${t.border}`,borderRadius:20,padding:22,marginBottom:24}}>
      <div style={{background:"linear-gradient(135deg,#C2185B,#E91E63)",height:80,borderRadius:12,marginBottom:16,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:4}}>
        <span style={{fontSize:32,lineHeight:1}}>💌</span>
        <span style={{fontSize:11,color:"rgba(255,255,255,0.9)",letterSpacing:1,textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",fontWeight:500}}>Fatin·diary newsletter</span>
      </div>
      <p style={{fontFamily:"'Playfair Display',serif",fontSize:17,color:t.text,margin:"0 0 6px"}}>Get her latest stories</p>
      <p style={{fontSize:13,color:t.text3,lineHeight:1.6,margin:"0 0 16px"}}>New entries delivered straight to you. No spam, ever.</p>
      <input
        type="text"
        placeholder="Your name (optional)"
        value={nameVal}
        onChange={e=>setNameVal(e.target.value)}
        style={{...inputStyle,marginBottom:10}}
      />
      <input
        type="email"
        placeholder="your@email.com"
        value={emailVal}
        onChange={e=>setEmailVal(e.target.value)}
        onFocus={()=>setEmailFocused(true)}
        onBlur={()=>setEmailFocused(false)}
        onKeyDown={e=>e.key==="Enter"&&handleSubmit()}
        style={{...inputStyle,marginBottom:12,borderColor:emailFocused?"#E91E63":t.border2}}
      />
      <button
        onClick={handleSubmit}
        style={{width:"100%",background:"linear-gradient(135deg,#C2185B,#E91E63)",color:"#fff",border:"none",borderRadius:50,padding:12,fontSize:14,fontWeight:500,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}
      >
        Subscribe 💌
      </button>
      {status==="success"&&(
        <div style={{background:"#E8F5E9",border:"1px solid #A5D6A7",borderRadius:10,padding:"10px 14px",fontSize:13,color:"#2E7D32",marginTop:10}}>
          ✓ You're subscribed! Thank you {nameVal||"lovely"} 🌺
        </div>
      )}
      {status==="already"&&(
        <div style={{background:"#FFF8E1",border:"1px solid #FFE082",borderRadius:10,padding:"10px 14px",fontSize:13,color:"#F57F17",marginTop:10}}>
          💛 You're already subscribed!
        </div>
      )}
      {status==="error"&&(
        <div style={{background:t.roseBg,border:"1px solid #F48FB1",borderRadius:10,padding:"10px 14px",fontSize:13,color:t.rose,marginTop:10}}>
          Please enter a valid email address
        </div>
      )}
      <p style={{fontSize:12,color:t.text3,textAlign:"center",marginTop:12,marginBottom:0}}>
        {count===0?"Be the first to subscribe 🌸":`Join ${count} reader${count===1?"":"s"} who love her stories`}
      </p>
    </div>
  );
}

// ── HOME ──────────────────────────────────────────────────────────────────────
function HomeScreen({entries,allEntries,pinned,activeCat,setActiveCat,openEntry,toggleLike,likedEntries,setView,setLightboxImg,searchQuery,setSearchOpen,darkMode,addSubscriber,subscribers}){
  const t=THEME[darkMode?"dark":"light"];
  return(
    <div>
      <div style={{...S.hero,background:t.heroGrad}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle at 80% 20%,rgba(255,255,255,0.06) 0%,transparent 50%),radial-gradient(circle at 20% 80%,rgba(0,0,0,0.15) 0%,transparent 50%)"}}/>
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:50,background:"repeating-linear-gradient(90deg,transparent 0,transparent 22px,rgba(255,255,255,0.06) 22px,rgba(255,255,255,0.06) 24px)"}}/>
        <div style={S.heroInner}>
          <p style={S.heroLabel}>✦ Selamat datang — Welcome to</p>
          <h1 style={S.heroTitle}>Her stories, her <em style={S.heroTitleEm}>wisdom,</em><br/>her beautiful life.</h1>
          <p style={S.heroSub}>A Malaysian woman's space to journal her journey, share tips and tricks, spark conversations, and leave a little light for others.</p>

        </div>
      </div>

      <div style={S.main}>
        <div style={S.grid}>
          <div>
            {/* Pinned */}
            {pinned&&(
              <div style={S.featCard} onClick={()=>openEntry(pinned)}
                onMouseEnter={e=>e.currentTarget.style.transform="translateY(-3px)"}
                onMouseLeave={e=>e.currentTarget.style.transform="none"}>
                {pinned.image
                  ? <div style={{position:"relative"}}>
                      <img src={pinned.image} alt="" style={{width:"100%",height:220,objectFit:"cover",display:"block"}}/>
                      <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,rgba(123,13,62,0.3) 0%,rgba(123,13,62,0.85) 100%)"}}/>
                      <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"24px 28px"}}>
                        <p style={{fontSize:11,letterSpacing:1,textTransform:"uppercase",color:"rgba(255,255,255,0.65)",marginBottom:8}}>✦ Pinned story</p>
                        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:22,color:"#fff",lineHeight:1.3,marginBottom:8}}>{pinned.title}</h2>
                        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                          <span style={{fontSize:13,color:"rgba(255,255,255,0.75)"}}>Nurul · {pinned.readTime} min read</span>
                          <div style={{background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.3)",borderRadius:20,padding:"5px 16px",fontSize:13,color:"#fff"}}>Read →</div>
                        </div>
                      </div>
                    </div>
                  : <div style={{padding:28}}>
                      <div style={{position:"absolute",top:-40,right:-40,width:160,height:160,borderRadius:"50%",background:"rgba(255,255,255,0.06)"}}/>
                      <p style={{fontSize:11,letterSpacing:1,textTransform:"uppercase",color:"rgba(255,255,255,0.6)",marginBottom:10}}>✦ Pinned story</p>
                      <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:24,color:"#fff",lineHeight:1.3,marginBottom:10}}>{pinned.title}</h2>
                      <p style={{fontSize:14,color:"rgba(255,255,255,0.75)",lineHeight:1.65,marginBottom:18}}>{pinned.excerpt}</p>
                      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                        <span style={{fontSize:13,color:"rgba(255,255,255,0.7)"}}>Nurul · {pinned.readTime} min read</span>
                        <div style={{background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.3)",borderRadius:20,padding:"6px 18px",fontSize:13,color:"#fff"}}>Read →</div>
                      </div>
                    </div>
                }
              </div>
            )}

            {searchQuery.trim()?(()=>{
              const sr=searchEntries(allEntries,searchQuery);
              return(
                <div>
                  <p style={{fontSize:13,color:t.text3,marginBottom:20}}>
                    Showing <strong style={{color:t.rose}}>{sr.length}</strong> result{sr.length!==1?"s":""} for '<strong style={{color:t.rose}}>{searchQuery}</strong>'
                  </p>
                  {sr.length===0?(
                    <div style={{textAlign:"center",padding:"60px 0",color:t.text3}}>
                      <div style={{fontSize:48,marginBottom:16}}>🌺</div>
                      <p style={{fontSize:16}}>No entries found for '{searchQuery}'</p>
                    </div>
                  ):sr.map(entry=>(
                    <EntryCard key={entry.id} entry={entry} toggleLike={toggleLike} liked={likedEntries[entry.id]} onClick={()=>openEntry(entry)} onImgClick={entry.image?(e)=>{e.stopPropagation();setLightboxImg(entry.image);}:null} darkMode={darkMode}/>
                  ))}
                </div>
              );
            })():(
              <div>
                <div style={S.catRow}>
                  {CATEGORIES.map(c=>(
                    <button key={c.id} style={{padding:"8px 18px",borderRadius:24,border:activeCat===c.id&&CAT_META[c.id]?`1.5px solid ${CAT_META[c.id].border}`:`1.5px solid ${t.border2}`,background:activeCat===c.id&&CAT_META[c.id]?CAT_META[c.id].bg:t.surface,color:activeCat===c.id&&CAT_META[c.id]?CAT_META[c.id].color:t.text3,cursor:"pointer",fontSize:13,fontWeight:500,fontFamily:"'DM Sans',sans-serif",transition:"all 0.2s",display:"flex",alignItems:"center",gap:6}} onClick={()=>setActiveCat(c.id)}>{c.emoji} {c.label}</button>
                  ))}
                </div>
                {entries.map(entry=>(
                  <EntryCard key={entry.id} entry={entry} toggleLike={toggleLike} liked={likedEntries[entry.id]} onClick={()=>openEntry(entry)} onImgClick={entry.image?(e)=>{e.stopPropagation();setLightboxImg(entry.image);}:null} darkMode={darkMode}/>
                ))}
                {entries.length===0&&(
                  <div style={{textAlign:"center",padding:"60px 0",color:t.text3}}>
                    <div style={{fontSize:48,marginBottom:16}}>🌺</div>
                    <p style={{fontSize:16}}>No entries in this category yet.</p>
                    <button style={{...S.primaryBtn,marginTop:16}} onClick={()=>setView("write")}>Write the first one →</button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside style={S.sidebar}>
            <SidebarProfile allEntries={allEntries} darkMode={darkMode}/>
            <NewsletterSidebarCard addSubscriber={addSubscriber} darkMode={darkMode} subscribers={subscribers}/>
            <PhotoGallerySidebar allEntries={allEntries} setLightboxImg={setLightboxImg} darkMode={darkMode}/>
            <SidebarTags allEntries={allEntries} darkMode={darkMode}/>
            <SidebarRecent allEntries={allEntries} openEntry={openEntry} darkMode={darkMode}/>
          </aside>
        </div>
      </div>
    </div>
  );
}

// ── ENTRY CARD ────────────────────────────────────────────────────────────────
function EntryCard({entry,toggleLike,liked,onClick,onImgClick,darkMode}){
  const t=THEME[darkMode?"dark":"light"];
  const meta = CAT_META[entry.category]||{};
  return(
    <div style={{...S.entryCard,background:t.surface,border:`1px solid ${t.border}`,transition:"all 0.25s"}} onClick={onClick}
      onMouseEnter={e=>{e.currentTarget.style.boxShadow=`0 8px 28px rgba(194,24,91,${darkMode?0.2:0.1})`;e.currentTarget.style.transform="translateY(-2px)";}}
      onMouseLeave={e=>{e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="none";}}>
      {entry.image&&(
        <div style={{position:"relative",height:200,overflow:"hidden"}} onClick={onImgClick||undefined}>
          <img src={entry.image} alt="" style={{width:"100%",height:"100%",objectFit:"cover",display:"block",transition:"transform 0.4s"}}
            onMouseEnter={e=>e.target.style.transform="scale(1.04)"}
            onMouseLeave={e=>e.target.style.transform="scale(1)"}/>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,transparent 50%,rgba(0,0,0,0.18) 100%)"}}/>
          {onImgClick&&<div style={{position:"absolute",top:10,right:10,background:"rgba(0,0,0,0.4)",borderRadius:20,padding:"4px 10px",fontSize:11,color:"#fff"}}>🔍 View</div>}
        </div>
      )}
      {!entry.image&&<div style={{height:4,background:meta.accent||t.border2}}/>}
      <div style={S.entryBody}>
        <div style={S.entryMeta}>
          <span style={{fontSize:12,color:t.text3}}>{new Date(entry.date).toLocaleDateString("en-MY",{day:"numeric",month:"long",year:"numeric"})}</span>
          <span style={S.entryTag(entry.category)}>{CATEGORIES.find(c=>c.id===entry.category)?.label}</span>
        </div>
        <h3 style={{...S.entryTitle,color:t.text}}>{entry.title}</h3>
        <p style={{...S.entryExcerpt,color:t.text2}}>{entry.excerpt}</p>
        <div style={S.entryFooter}>
          <div style={S.entryStat}>
            <span style={{display:"flex",alignItems:"center",gap:5,fontSize:13,color:liked?"#E91E63":t.text3,cursor:"pointer"}} onClick={e=>{e.stopPropagation();toggleLike(entry.id);}}>
              {liked?"♥":"♡"} {entry.likes}
            </span>
            <span style={{display:"flex",alignItems:"center",gap:5,fontSize:13,color:t.text3}}>💬 {entry.comments}</span>
            <span style={{display:"flex",alignItems:"center",gap:5,fontSize:13,color:t.text3}}>⏱ {entry.readTime} min</span>
          </div>
          <span style={{fontSize:12,color:t.text3,background:t.surface2,border:`1px solid ${t.border}`,borderRadius:12,padding:"3px 10px"}}>{entry.mood}</span>
        </div>
      </div>
    </div>
  );
}

// ── PHOTO GALLERY SIDEBAR ─────────────────────────────────────────────────────
function PhotoGallerySidebar({allEntries,setLightboxImg,darkMode}){
  const t=THEME[darkMode?"dark":"light"];
  const photos = allEntries.filter(e=>e.image);
  if(photos.length===0) return null;
  return(
    <div style={{background:t.surface,borderRadius:20,border:`1px solid ${t.border}`,padding:"20px 22px",transition:"background 0.3s,border-color 0.3s"}}>
      <p style={{fontFamily:"'Playfair Display',serif",fontSize:16,color:t.text,marginBottom:16}}>📷 Photo gallery</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6}}>
        {photos.map(e=>(
          <div key={e.id} style={{borderRadius:10,overflow:"hidden",aspectRatio:"1",cursor:"zoom-in",position:"relative"}} onClick={()=>setLightboxImg(e.image)}>
            <img src={e.image} alt={e.title} style={{width:"100%",height:"100%",objectFit:"cover",display:"block",transition:"transform 0.3s"}}
              onMouseEnter={ev=>ev.target.style.transform="scale(1.08)"}
              onMouseLeave={ev=>ev.target.style.transform="scale(1)"}/>
          </div>
        ))}
      </div>
      <p style={{fontSize:12,color:t.text3,marginTop:10}}>{photos.length} photo{photos.length!==1?"s":""} across {photos.length} {photos.length!==1?"entries":"entry"}</p>
    </div>
  );
}

// ── SIDEBAR ───────────────────────────────────────────────────────────────────
function SidebarProfile({allEntries,darkMode}){
  const t=THEME[darkMode?"dark":"light"];
  const totalLikes=allEntries.reduce((s,e)=>s+(e.likes||0),0);
  return(
    <div style={{background:t.surface,borderRadius:20,border:`1px solid ${t.border}`,padding:"20px 22px",textAlign:"center",transition:"background 0.3s,border-color 0.3s"}}>
      <div style={{width:72,height:72,borderRadius:"50%",background:"linear-gradient(135deg,#C2185B,#E91E63)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",fontSize:28,fontFamily:"'Playfair Display',serif",color:"#fff"}}>N</div>
      <p style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:t.text,marginBottom:4}}>Nurul</p>
      <p style={{fontSize:13,color:t.text3,marginBottom:16}}>Malaysian · Writer · Dreamer</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
        {[{n:allEntries.length,l:"entries"},{n:totalLikes,l:"likes"},{n:allEntries.reduce((s,e)=>s+(e.comments||0),0),l:"comments"}].map((s,i)=>(
          <div key={i} style={{background:t.surface2,borderRadius:12,padding:"10px 6px",border:`1px solid ${t.border}`}}>
            <div style={{fontSize:20,fontWeight:600,color:t.rose}}>{s.n}</div>
            <div style={{fontSize:11,color:t.text3}}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
function SidebarTags({allEntries,darkMode}){
  const t=THEME[darkMode?"dark":"light"];
  const tc={};allEntries.forEach(e=>(e.tags||[]).forEach(tg=>{tc[tg]=(tc[tg]||0)+1;}));
  const tags=Object.entries(tc).sort((a,b)=>b[1]-a[1]).slice(0,12);
  return(
    <div style={{background:t.surface,borderRadius:20,border:`1px solid ${t.border}`,padding:"20px 22px",transition:"background 0.3s,border-color 0.3s"}}>
      <p style={{fontFamily:"'Playfair Display',serif",fontSize:16,color:t.text,marginBottom:16}}>Popular tags</p>
      <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
        {tags.map(([tg,n])=>(
          <span key={tg} style={{background:t.surface2,border:`1px solid ${t.border}`,borderRadius:20,padding:"5px 12px",fontSize:12,color:t.text3}}>#{tg} <span style={{color:t.rose,fontWeight:600}}>{n}</span></span>
        ))}
      </div>
    </div>
  );
}
function SidebarRecent({allEntries,openEntry,darkMode}){
  const t=THEME[darkMode?"dark":"light"];
  return(
    <div style={{background:t.surface,borderRadius:20,border:`1px solid ${t.border}`,padding:"20px 22px",transition:"background 0.3s,border-color 0.3s"}}>
      <p style={{fontFamily:"'Playfair Display',serif",fontSize:16,color:t.text,marginBottom:16}}>Recent entries</p>
      {allEntries.slice(0,4).map(e=>(
        <div key={e.id} style={{display:"flex",gap:12,marginBottom:14,cursor:"pointer"}} onClick={()=>openEntry(e)}>
          {e.image
            ? <img src={e.image} alt="" style={{width:44,height:44,borderRadius:10,objectFit:"cover",flexShrink:0}}/>
            : <div style={{width:44,height:44,borderRadius:10,background:CAT_META[e.category]?.bg||t.bg2,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{CAT_EMOJI[e.category]||"📖"}</div>
          }
          <div>
            <p style={{fontSize:13,fontWeight:500,color:t.text,lineHeight:1.4}}>{e.title}</p>
            <p style={{fontSize:11,color:t.text3,marginTop:2}}>{new Date(e.date).toLocaleDateString("en-MY",{day:"numeric",month:"short"})}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── SHARE BAR ─────────────────────────────────────────────────────────────────
function ShareBar({entry,darkMode}){
  const t=THEME[darkMode?"dark":"light"];
  const [copied,setCopied]=useState(false);

  const shareUrl=()=>window.location.href;

  const shareWA=()=>{
    const text=encodeURIComponent("✨ "+entry.title+"\n\n"+entry.excerpt+"\n\nRead more: "+shareUrl());
    window.open("https://wa.me/?text="+text,"_blank");
  };

  const shareX=()=>{
    const text=encodeURIComponent('"'+entry.title+'" by Nurul on Fatin·diary');
    const url=encodeURIComponent(shareUrl());
    window.open("https://twitter.com/intent/tweet?text="+text+"&url="+url,"_blank");
  };

  const copyLink=()=>{
    navigator.clipboard.writeText(shareUrl()).then(()=>{
      setCopied(true);
      setTimeout(()=>setCopied(false),2000);
    }).catch(()=>{});
  };

  const btnBase={display:"inline-flex",alignItems:"center",gap:8,padding:"8px 18px",borderRadius:50,fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",border:"1px solid",transition:"all 0.2s"};

  return(
    <div style={{background:t.surface2,border:`1px solid ${t.border}`,borderRadius:16,padding:"16px 20px",marginBottom:16}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
        <span style={{fontSize:13,color:t.text3,fontWeight:500,whiteSpace:"nowrap"}}>Share this entry:</span>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          <button onClick={shareWA} style={{...btnBase,background:darkMode?"#0A2415":"#E8F9EF",borderColor:"#A5D6A7",color:"#1B5E20"}}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-1px)";e.currentTarget.style.boxShadow="0 4px 12px rgba(0,0,0,0.1)";}}
            onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366" style={{flexShrink:0}}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </button>
          <button onClick={shareX} style={{...btnBase,background:darkMode?"#1A1A1A":"#F5F5F5",borderColor:darkMode?"#333":"#E0E0E0",color:darkMode?"#fff":"#000"}}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-1px)";e.currentTarget.style.boxShadow="0 4px 12px rgba(0,0,0,0.1)";}}
            onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
            <span style={{fontSize:15,fontWeight:900,lineHeight:1}}>𝕏</span>
            Share on X
          </button>
          <button onClick={copyLink} style={{...btnBase,background:copied?"#E8F5E9":t.roseBg,borderColor:copied?"#A5D6A7":"#F48FB1",color:copied?"#2E7D32":t.rose}}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-1px)";e.currentTarget.style.boxShadow="0 4px 12px rgba(0,0,0,0.1)";}}
            onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
            {copied?<span style={{fontSize:14}}>✓</span>:<span style={{fontSize:14}}>🔗</span>}
            {copied?"Copied!":"Copy link"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── READING SCREEN ────────────────────────────────────────────────────────────
function ReadingScreen({entry,comments,goHome,toggleLike,likedEntries,addComment,openEntry,entries,deleteEntry,setLightboxImg,darkMode}){
  const t=THEME[darkMode?"dark":"light"];
  const [newComment,setNewComment]=useState("");
  const [commenterName,setCommenterName]=useState(()=>localStorage.getItem("hana_commenter_name")||"");
  const [commenterEmail,setCommenterEmail]=useState(()=>localStorage.getItem("hana_commenter_email")||"");
  const meta=CAT_META[entry.category]||{};
  const liked=likedEntries[entry.id];
  const related=entries.filter(e=>e.id!==entry.id&&e.category===entry.category).slice(0,2);

  const handleNameChange=(v)=>{setCommenterName(v);try{localStorage.setItem("hana_commenter_name",v);}catch{}};
  const handleEmailChange=(v)=>{setCommenterEmail(v);try{localStorage.setItem("hana_commenter_email",v);}catch{}};

  const handleComment=()=>{
    if(!newComment.trim()||!commenterName.trim())return;
    addComment(entry.id,newComment.trim(),commenterName.trim());
    setNewComment("");
  };

  return(
    <div>
      {/* Cover hero or coloured band */}
      {entry.image ? (
        <div style={{position:"relative",height:"clamp(280px,45vw,460px)",overflow:"hidden",cursor:"zoom-in"}} onClick={()=>setLightboxImg(entry.image)}>
          <img src={entry.image} alt={entry.title} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,rgba(0,0,0,0.15) 0%,rgba(20,5,15,0.7) 100%)"}}/>
          <div style={{position:"absolute",bottom:0,left:0,right:0,maxWidth:740,margin:"0 auto",padding:"32px 24px"}}>
            <button onClick={e=>{e.stopPropagation();goHome();}} style={{background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.3)",color:"#fff",cursor:"pointer",fontSize:13,padding:"6px 16px",borderRadius:20,marginBottom:16,fontFamily:"'DM Sans',sans-serif"}}>← Back</button>
            <span style={{...S.entryTag(entry.category),display:"inline-block",marginBottom:12,background:"rgba(255,255,255,0.15)",color:"#fff",border:"1px solid rgba(255,255,255,0.3)"}}>{CATEGORIES.find(c=>c.id===entry.category)?.emoji} {CATEGORIES.find(c=>c.id===entry.category)?.label}</span>
            <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(24px,4vw,40px)",color:"#fff",lineHeight:1.2,marginBottom:12,textShadow:"0 2px 8px rgba(0,0,0,0.3)"}}>{entry.title}</h1>
            <div style={{display:"flex",alignItems:"center",gap:16}}>
              <div style={{width:34,height:34,borderRadius:"50%",background:"rgba(255,255,255,0.2)",border:"2px solid rgba(255,255,255,0.4)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:14,fontFamily:"'Playfair Display',serif"}}>N</div>
              <span style={{fontSize:13,color:"rgba(255,255,255,0.85)"}}>Nurul · {new Date(entry.date).toLocaleDateString("en-MY",{day:"numeric",month:"long",year:"numeric"})} · {entry.readTime} min read</span>
              <span style={{...S.moodBadge,background:"rgba(255,255,255,0.12)",color:"rgba(255,255,255,0.9)",border:"1px solid rgba(255,255,255,0.2)"}}>{entry.mood}</span>
            </div>
            <div style={{position:"absolute",bottom:16,right:24,fontSize:12,color:"rgba(255,255,255,0.5)"}}>🔍 Click to enlarge</div>
          </div>
        </div>
      ) : (
        <div style={{background:darkMode?t.surface2:(meta.bg||t.bg2),padding:"40px 24px 0",borderBottom:`3px solid ${meta.border||t.border2}`}}>
          <div style={{maxWidth:740,margin:"0 auto"}}>
            <button onClick={goHome} style={{background:"none",border:"none",color:meta.color||t.text3,cursor:"pointer",fontSize:14,marginBottom:20,fontFamily:"'DM Sans',sans-serif"}}>← Back to home</button>
            <span style={{...S.entryTag(entry.category),display:"inline-block",marginBottom:16}}>{CATEGORIES.find(c=>c.id===entry.category)?.emoji} {CATEGORIES.find(c=>c.id===entry.category)?.label}</span>
            <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(26px,4vw,40px)",color:t.text,lineHeight:1.25,marginBottom:16}}>{entry.title}</h1>
            <p style={{fontSize:17,color:t.text2,lineHeight:1.7,marginBottom:24}}><em style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic"}}>{entry.excerpt}</em></p>
            <div style={{display:"flex",alignItems:"center",gap:16,paddingBottom:24}}>
              <div style={{width:40,height:40,borderRadius:"50%",background:"linear-gradient(135deg,#C2185B,#E91E63)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:16,fontFamily:"'Playfair Display',serif"}}>N</div>
              <div>
                <p style={{fontSize:14,fontWeight:500,color:t.text}}>Nurul</p>
                <p style={{fontSize:12,color:t.text3}}>{new Date(entry.date).toLocaleDateString("en-MY",{day:"numeric",month:"long",year:"numeric"})} · {entry.readTime} min read</p>
              </div>
              <span style={{fontSize:12,color:t.text3,background:t.surface2,border:`1px solid ${t.border}`,borderRadius:12,padding:"3px 10px"}}>{entry.mood}</span>
            </div>
          </div>
        </div>
      )}

      {/* If there's an image, back button in body */}
      <div style={S.readingWrap}>
        {entry.image&&(
          <button onClick={goHome} style={{background:"none",border:"none",color:"#9E8070",cursor:"pointer",fontSize:14,margin:"28px 0 4px",fontFamily:"'DM Sans',sans-serif",display:"block"}}>← Back to home</button>
        )}

        {/* Excerpt pull-quote when image exists */}
        {entry.image&&(
          <p style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:20,color:t.rose,lineHeight:1.6,margin:"24px 0 32px",paddingLeft:20,borderLeft:`3px solid ${t.rose}`}}>
            {entry.excerpt}
          </p>
        )}

        <ShareBar entry={entry} darkMode={darkMode}/>

        <div style={{fontSize:17,color:t.text2,lineHeight:1.9,fontFamily:"'DM Sans',sans-serif"}}>
          {entry.body.split("\n\n").map((para,i)=>(
            <p key={i} style={{marginBottom:26}} dangerouslySetInnerHTML={{__html:para.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>")}}/>
          ))}
        </div>

        {entry.tags?.length>0&&(
          <div style={{display:"flex",flexWrap:"wrap",gap:8,margin:"32px 0"}}>
            {entry.tags.map(tg=><span key={tg} style={{background:t.surface2,border:`1px solid ${t.border}`,borderRadius:20,padding:"5px 14px",fontSize:13,color:t.text3}}>#{tg}</span>)}
          </div>
        )}

        <div style={{borderTop:`1px solid ${t.border}`,borderBottom:`1px solid ${t.border}`,padding:"20px 0",margin:"24px 0",display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"}}>
          <button onClick={()=>toggleLike(entry.id)} style={{display:"flex",alignItems:"center",gap:8,padding:"10px 22px",borderRadius:50,border:`1.5px solid ${liked?"#E91E63":t.border2}`,background:liked?t.roseBg:t.surface,color:liked?t.rose:t.text3,cursor:"pointer",fontSize:14,fontWeight:500,fontFamily:"'DM Sans',sans-serif"}}>
            {liked?"♥":"♡"} {entry.likes} likes
          </button>
          <span style={{fontSize:14,color:t.text3}}>💬 {comments.length} comments</span>
          {entry.image&&<button onClick={()=>setLightboxImg(entry.image)} style={{background:"none",border:`1px solid ${t.border2}`,color:t.text3,borderRadius:50,padding:"8px 18px",cursor:"pointer",fontSize:13,fontFamily:"'DM Sans',sans-serif"}}>🔍 View photo</button>}
          <button onClick={()=>deleteEntry(entry.id)} style={{marginLeft:"auto",background:"none",border:"1px solid #FFCDD2",color:"#E57373",borderRadius:50,padding:"8px 18px",cursor:"pointer",fontSize:13,fontFamily:"'DM Sans',sans-serif"}}>Delete entry</button>
        </div>

        <ShareBar entry={entry} darkMode={darkMode}/>

        <div style={{marginBottom:40}}>
          <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:22,color:t.text,marginBottom:20}}>{comments.length} {comments.length===1?"comment":"comments"}</h3>
          {comments.map(c=>(
            <div key={c.id} style={{background:t.surface2,borderRadius:14,padding:"14px 16px",marginBottom:12,border:`1px solid ${t.border}`}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                <div style={{width:34,height:34,borderRadius:"50%",background:t.roseBg,border:`1.5px solid ${t.rose}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:600,color:t.rose,flexShrink:0}}>{c.avatar}</div>
                <div><p style={{fontSize:13,fontWeight:500,color:t.text}}>{c.author}</p><p style={{fontSize:11,color:t.text3}}>{c.date}</p></div>
                <span style={{marginLeft:"auto",fontSize:13,color:t.rose}}>♥ {c.likes}</span>
              </div>
              <p style={{fontSize:14,color:t.text2,lineHeight:1.65}}>{c.text}</p>
            </div>
          ))}
          <div style={{background:t.surface,border:`1px solid ${t.border}`,borderRadius:16,padding:20}}>
            <p style={{fontFamily:"'Playfair Display',serif",fontSize:16,color:t.text,marginBottom:14}}>Leave a comment</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
              <div>
                <input value={commenterName} onChange={e=>handleNameChange(e.target.value)} placeholder="Your name *" style={{width:"100%",padding:"14px 16px",borderRadius:14,border:`1.5px solid ${t.border2}`,background:t.bg,color:t.text,fontFamily:"'DM Sans',sans-serif",fontSize:15,outline:"none",boxSizing:"border-box"}}/>
              </div>
              <div style={{position:"relative"}}>
                <input value={commenterEmail} onChange={e=>handleEmailChange(e.target.value)} placeholder="Email (optional)" type="email" style={{width:"100%",padding:"14px 16px",borderRadius:14,border:`1.5px solid ${t.border2}`,background:t.bg,color:t.text,fontFamily:"'DM Sans',sans-serif",fontSize:15,outline:"none",boxSizing:"border-box"}}/>
                {commenterEmail&&<span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",fontSize:10,color:t.text3,pointerEvents:"none",whiteSpace:"nowrap"}}>not published</span>}
              </div>
            </div>
            <textarea value={newComment} onChange={e=>setNewComment(e.target.value)} placeholder="Share your thoughts…" style={{width:"100%",padding:"12px 16px",borderRadius:14,border:`1.5px solid ${t.border2}`,background:t.bg,color:t.text,fontFamily:"'DM Sans',sans-serif",fontSize:14,outline:"none",boxSizing:"border-box",resize:"none",minHeight:80,marginBottom:12}}/>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <button onClick={handleComment} disabled={!newComment.trim()||!commenterName.trim()} style={{...S.primaryBtn,opacity:(!newComment.trim()||!commenterName.trim())?0.5:1,cursor:(!newComment.trim()||!commenterName.trim())?"not-allowed":"pointer"}}>Post comment</button>
              {!commenterName.trim()&&<span style={{fontSize:12,color:t.text3}}>Name required to post</span>}
            </div>
          </div>
        </div>

        {related.length>0&&(
          <div>
            <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:20,color:t.text,marginBottom:16}}>More from Nurul</h3>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
              {related.map(e=>(
                <div key={e.id} style={{background:t.surface,border:`1px solid ${t.border}`,borderRadius:16,overflow:"hidden",cursor:"pointer"}} onClick={()=>openEntry(e)}>
                  {e.image&&<img src={e.image} alt="" style={{width:"100%",height:100,objectFit:"cover",display:"block"}}/>}
                  <div style={{padding:"14px 16px"}}>
                    <span style={S.entryTag(e.category)}>{CATEGORIES.find(c=>c.id===e.category)?.label}</span>
                    <p style={{fontFamily:"'Playfair Display',serif",fontSize:15,color:t.text,margin:"8px 0 4px",lineHeight:1.4}}>{e.title}</p>
                    <p style={{fontSize:12,color:t.text3}}>{e.readTime} min read</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── WRITE SCREEN ──────────────────────────────────────────────────────────────
function WriteScreen({goHome,addEntry,darkMode}){
  const t=THEME[darkMode?"dark":"light"];
  const [form,setForm]=useState({title:"",excerpt:"",body:"",category:"journey",mood:"😊 Happy",tags:"",image:null});
  const [errors,setErrors]=useState({});
  const wordCount=form.body.trim().split(/\s+/).filter(Boolean).length;
  const readTime=Math.max(1,Math.round(wordCount/200));
  const set=(k,v)=>setForm(p=>({...p,[k]:v}));

  const validate=()=>{
    const e={};
    if(!form.title.trim())e.title="Title is required";
    if(!form.excerpt.trim())e.excerpt="A short teaser is required";
    if(!form.body.trim())e.body="Entry body is required";
    setErrors(e);return Object.keys(e).length===0;
  };

  const handleSubmit=()=>{
    if(!validate())return;
    addEntry({
      id:"e"+Date.now(),...form,
      tags:form.tags.split(",").map(t=>t.trim().toLowerCase().replace(/\s+/g,"")).filter(Boolean),
      date:new Date().toISOString().slice(0,10),
      likes:0,comments:0,pinned:false,readTime,
    });
  };

  return(
    <div style={{...S.editorWrap,background:t.bg,minHeight:"100vh"}}>
      <button onClick={goHome} style={{background:"none",border:"none",color:t.text3,cursor:"pointer",fontSize:14,marginBottom:28,fontFamily:"'DM Sans',sans-serif"}}>← Back</button>
      <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:28,color:t.text,marginBottom:8}}>Write a new entry</h1>
      <p style={{fontSize:14,color:t.text3,marginBottom:36}}>Share your story with the world.</p>

      <div style={S.fieldGroup}>
        <label style={{fontSize:12,color:t.text3,letterSpacing:0.5,textTransform:"uppercase",marginBottom:8,display:"block"}}>Cover photo</label>
        <PhotoUploader value={form.image} onChange={v=>set("image",v)}/>
      </div>

      <div style={S.fieldGroup}>
        <label style={{fontSize:12,color:t.text3,letterSpacing:0.5,textTransform:"uppercase",marginBottom:8,display:"block"}}>Category</label>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {CATEGORIES.slice(1).map(c=>{const a=form.category===c.id;const m=CAT_META[c.id];return(
            <button key={c.id} style={{padding:"8px 18px",borderRadius:24,border:a&&m?`1.5px solid ${m.border}`:`1.5px solid ${t.border2}`,background:a&&m?m.bg:t.surface,color:a&&m?m.color:t.text3,cursor:"pointer",fontSize:13,fontWeight:500,fontFamily:"'DM Sans',sans-serif",transition:"all 0.2s",display:"flex",alignItems:"center",gap:6}} onClick={()=>set("category",c.id)}>{c.emoji} {c.label}</button>
          );})}
        </div>
      </div>

      <div style={S.fieldGroup}>
        <label style={{fontSize:12,color:t.text3,letterSpacing:0.5,textTransform:"uppercase",marginBottom:8,display:"block"}}>Mood</label>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {MOODS.map(m=>(
            <button key={m} style={{padding:"7px 14px",borderRadius:20,border:`1.5px solid ${form.mood===m?"#E91E63":t.border2}`,background:form.mood===m?t.roseBg:t.surface,color:form.mood===m?t.rose:t.text3,cursor:"pointer",fontSize:13,fontFamily:"'DM Sans',sans-serif"}} onClick={()=>set("mood",m)}>{m}</button>
          ))}
        </div>
      </div>

      <div style={S.fieldGroup}>
        <label style={{fontSize:12,color:t.text3,letterSpacing:0.5,textTransform:"uppercase",marginBottom:8,display:"block"}}>Entry title *</label>
        <input value={form.title} onChange={e=>set("title",e.target.value)} placeholder="Give your story a beautiful title…" style={{width:"100%",padding:"14px 16px",borderRadius:14,border:`1.5px solid ${errors.title?"#E91E63":t.border2}`,background:t.surface,color:t.text,fontFamily:"'Playfair Display',serif",fontSize:20,outline:"none",boxSizing:"border-box"}}/>
        {errors.title&&<p style={{color:"#E91E63",fontSize:12,marginTop:4}}>{errors.title}</p>}
      </div>

      <div style={S.fieldGroup}>
        <label style={{fontSize:12,color:t.text3,letterSpacing:0.5,textTransform:"uppercase",marginBottom:8,display:"block"}}>Short teaser *</label>
        <input value={form.excerpt} onChange={e=>set("excerpt",e.target.value)} placeholder="One or two sentences that draw readers in…" style={{width:"100%",padding:"14px 16px",borderRadius:14,border:`1.5px solid ${errors.excerpt?"#E91E63":t.border2}`,background:t.surface,color:t.text,fontFamily:"'DM Sans',sans-serif",fontSize:15,outline:"none",boxSizing:"border-box"}}/>
        {errors.excerpt&&<p style={{color:"#E91E63",fontSize:12,marginTop:4}}>{errors.excerpt}</p>}
      </div>

      <div style={S.fieldGroup}>
        <label style={{fontSize:12,color:t.text3,letterSpacing:0.5,textTransform:"uppercase",marginBottom:8,display:"block"}}>Your story *</label>
        <textarea value={form.body} onChange={e=>set("body",e.target.value)} placeholder="Write freely… Use **bold** for emphasis. Separate paragraphs with a blank line." style={{width:"100%",padding:"16px 18px",borderRadius:14,border:`1.5px solid ${errors.body?"#E91E63":t.border2}`,background:t.surface,color:t.text,fontFamily:"'Playfair Display',serif",fontSize:18,lineHeight:1.8,outline:"none",resize:"vertical",boxSizing:"border-box",minHeight:320}}/>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:6}}>
          {errors.body?<p style={{color:"#E91E63",fontSize:12}}>{errors.body}</p>:<span/>}
          <span style={{fontSize:12,color:t.text3}}>{wordCount} words · ~{readTime} min read</span>
        </div>
      </div>

      <div style={S.fieldGroup}>
        <label style={{fontSize:12,color:t.text3,letterSpacing:0.5,textTransform:"uppercase",marginBottom:8,display:"block"}}>Tags (comma separated)</label>
        <input value={form.tags} onChange={e=>set("tags",e.target.value)} placeholder="malaysia, lifestyle, food, tips…" style={{width:"100%",padding:"14px 16px",borderRadius:14,border:`1.5px solid ${t.border2}`,background:t.surface,color:t.text,fontFamily:"'DM Sans',sans-serif",fontSize:15,outline:"none",boxSizing:"border-box"}}/>
      </div>

      {form.image&&(
        <div style={{background:"#F1F8F1",border:"1px solid #A5D6A7",borderRadius:14,padding:"12px 16px",marginBottom:24,display:"flex",alignItems:"center",gap:12}}>
          <img src={form.image} alt="" style={{width:56,height:56,borderRadius:10,objectFit:"cover",flexShrink:0}}/>
          <div>
            <p style={{fontSize:13,fontWeight:500,color:"#2E7D32"}}>✓ Cover photo will appear at the top of your entry</p>
            <p style={{fontSize:12,color:"#66BB6A"}}>Readers will see it on the home page card and in the reading view</p>
          </div>
        </div>
      )}

      <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
        <button style={S.primaryBtn} onClick={handleSubmit}>Publish entry 🌺</button>
        <button style={{padding:"13px 28px",borderRadius:50,background:"transparent",border:`1.5px solid ${t.border2}`,color:t.text3,fontWeight:500,fontSize:15,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}} onClick={goHome}>Discard</button>
      </div>
    </div>
  );
}

// ── PROFILE SCREEN ────────────────────────────────────────────────────────────
function ProfileScreen({entries,openEntry,setView,setLightboxImg,darkMode}){
  const t=THEME[darkMode?"dark":"light"];
  const totalLikes=entries.reduce((s,e)=>s+(e.likes||0),0);
  const totalComments=entries.reduce((s,e)=>s+(e.comments||0),0);
  const byCategory=CATEGORIES.slice(1).map(c=>({...c,count:entries.filter(e=>e.category===c.id).length}));
  const photos=entries.filter(e=>e.image);

  return(
    <div>
      <div style={S.profileHero}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle at 60% 40%,rgba(255,255,255,0.06) 0%,transparent 60%)"}}/>
        <div style={{position:"relative",zIndex:1}}>
          <div style={S.avatar}>N</div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:32,color:"#fff",marginBottom:6}}>Nurul</h1>
          <p style={{fontSize:15,color:"rgba(255,255,255,0.75)",marginBottom:20}}>Malaysian · Writer · Dreamer · Life documenter</p>
          <p style={{fontSize:14,color:"rgba(255,255,255,0.65)",maxWidth:480,margin:"0 auto 24px",lineHeight:1.7}}>Sharing my Malaysian journey — the food, the stories, the hard days, and the beautiful ordinary moments.</p>
          <div style={{display:"inline-flex",gap:24,background:"rgba(255,255,255,0.12)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:16,padding:"14px 28px"}}>
            {[{n:entries.length,l:"entries"},{n:totalLikes,l:"total likes"},{n:totalComments,l:"comments"},{n:photos.length,l:"photos"}].map((s,i)=>(
              <div key={i} style={{textAlign:"center"}}>
                <div style={{fontSize:24,fontWeight:700,color:"#fff"}}>{s.n}</div>
                <div style={{fontSize:12,color:"rgba(255,255,255,0.65)"}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{maxWidth:960,margin:"0 auto",padding:"40px 24px",background:t.bg,minHeight:"60vh"}}>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:22,color:t.text,marginBottom:20}}>Content breakdown</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:14,marginBottom:40}}>
          {byCategory.map(c=>{const m=CAT_META[c.id]||{};return(
            <div key={c.id} style={{background:m.bg||"#FDF8F5",border:`1px solid ${m.border||"#E8D5CE"}`,borderRadius:16,padding:"18px 20px"}}>
              <div style={{fontSize:28,marginBottom:8}}>{c.emoji}</div>
              <div style={{fontSize:24,fontWeight:700,color:m.color||"#8D6E63"}}>{c.count}</div>
              <div style={{fontSize:13,color:m.color||"#8D6E63",marginTop:2}}>{c.label}</div>
            </div>
          );})}
        </div>

        {/* Photo wall */}
        {photos.length>0&&(
          <>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:22,color:t.text,marginBottom:20}}>📷 Photo wall</h2>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:12,marginBottom:40}}>
              {photos.map(e=>(
                <div key={e.id} style={{borderRadius:16,overflow:"hidden",position:"relative",cursor:"zoom-in",aspectRatio:"4/3"}} onClick={()=>setLightboxImg(e.image)}>
                  <img src={e.image} alt={e.title} style={{width:"100%",height:"100%",objectFit:"cover",display:"block",transition:"transform 0.4s"}}
                    onMouseEnter={ev=>ev.target.style.transform="scale(1.06)"}
                    onMouseLeave={ev=>ev.target.style.transform="scale(1)"}/>
                  <div style={{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(to top,rgba(0,0,0,0.55),transparent)",padding:"12px 12px 10px"}}>
                    <p style={{fontSize:12,color:"#fff",fontWeight:500,lineHeight:1.3}}>{e.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:22,color:t.text,marginBottom:20}}>All entries</h2>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          {entries.map(e=>(
            <div key={e.id} style={{background:t.surface,border:`1px solid ${t.border}`,borderRadius:16,overflow:"hidden",cursor:"pointer",transition:"all 0.2s"}}
              onClick={()=>openEntry(e)}
              onMouseEnter={el=>el.currentTarget.style.transform="translateY(-2px)"}
              onMouseLeave={el=>el.currentTarget.style.transform="none"}>
              {e.image&&<img src={e.image} alt="" style={{width:"100%",height:100,objectFit:"cover",display:"block"}}/>}
              <div style={{padding:"14px 16px"}}>
                {!e.image&&<div style={{height:3,background:CAT_META[e.category]?.accent||t.border2,borderRadius:2,marginBottom:10}}/>}
                <span style={S.entryTag(e.category)}>{CATEGORIES.find(c=>c.id===e.category)?.emoji} {CATEGORIES.find(c=>c.id===e.category)?.label}</span>
                <p style={{fontFamily:"'Playfair Display',serif",fontSize:15,color:t.text,margin:"8px 0 4px",lineHeight:1.4}}>{e.title}</p>
                <p style={{fontSize:12,color:t.text3}}>{new Date(e.date).toLocaleDateString("en-MY",{day:"numeric",month:"short",year:"numeric"})} · {e.readTime} min</p>
                <div style={{display:"flex",gap:12,marginTop:8}}>
                  <span style={{fontSize:12,color:t.text3}}>♥ {e.likes}</span>
                  <span style={{fontSize:12,color:t.text3}}>💬 {e.comments}</span>
                  {e.image&&<span style={{fontSize:12,color:t.text3}}>📷</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── DASHBOARD SCREEN ──────────────────────────────────────────────────────────
function DashboardScreen({entries,comments,openEntry,setView,deleteEntry,onLogout,darkMode,subscribers,setSubscribers}){
  const t=THEME[darkMode?"dark":"light"];
  const totalLikes=entries.reduce((s,e)=>s+(e.likes||0),0);
  const totalComments=entries.reduce((s,e)=>s+(e.comments||0),0);
  const totalWords=entries.reduce((s,e)=>s+(e.body?.split(/\s+/).filter(Boolean).length||0),0);
  const totalPhotos=entries.filter(e=>e.image).length;

  const exportCSV=()=>{
    const csv="Name,Email,Date\n"+subscribers.map(s=>[s.name||"",s.email,s.date].join(",")).join("\n");
    const blob=new Blob([csv],{type:"text/csv"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url;a.download="hana-subscribers.csv";a.click();
    URL.revokeObjectURL(url);
  };

  const allComments=Object.entries(comments).flatMap(([eid,cs])=>
    cs.map(c=>({...c,entryId:eid,entryTitle:entries.find(e=>e.id===eid)?.title||""}))
  ).sort((a,b)=>b.date.localeCompare(a.date)).slice(0,6);

  return(
    <div style={{maxWidth:1100,margin:"0 auto",padding:"40px 24px",background:t.bg,minHeight:"100vh"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:32}}>
        <div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:32,color:t.text,marginBottom:4}}>Your Dashboard</h1>
          <p style={{fontSize:14,color:t.text3}}>Manage your entries, track your photos, see what's resonating.</p>
        </div>
        <button style={S.writeBtn} onClick={()=>setView("write")}>✍ Write new entry</button>
      </div>

      <div style={S.dashGrid}>
        {[
          {n:entries.length,l:"Total entries",accent:"#C2185B"},
          {n:totalPhotos,l:"Photos uploaded",accent:"#E91E63"},
          {n:totalLikes,l:"Total likes",accent:"#B8860B"},
          {n:totalComments,l:"Total comments",accent:"#2E7D32"},
          {n:totalWords.toLocaleString(),l:"Words written",accent:"#1565C0"},
          {n:subscribers.length,l:"Newsletter subscribers",accent:"#E91E63"},
        ].map((s,i)=>(
          <div key={i} style={{background:t.surface,borderRadius:16,border:`1px solid ${t.border}`,padding:"18px 20px",borderTop:`3px solid ${s.accent}`}}>
            <div style={{fontSize:32,fontWeight:600,color:s.accent,lineHeight:1}}>{s.n}</div>
            <div style={{fontSize:12,color:t.text3,marginTop:4,letterSpacing:0.3}}>{s.l}</div>
          </div>
        ))}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 360px",gap:32,alignItems:"start"}}>
        <div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:20,color:t.text,marginBottom:16}}>All entries</h2>
          {entries.map(e=>{
            const m=CAT_META[e.category]||{};
            return(
              <div key={e.id} style={{background:t.surface,border:`1px solid ${t.border}`,borderRadius:16,marginBottom:12,overflow:"hidden",display:"flex",alignItems:"stretch"}}>
                {e.image
                  ? <img src={e.image} alt="" style={{width:80,objectFit:"cover",flexShrink:0}}/>
                  : <div style={{width:4,background:m.accent||t.border2,flexShrink:0}}/>
                }
                <div style={{flex:1,minWidth:0,padding:"14px 16px"}}>
                  <p style={{fontFamily:"'Playfair Display',serif",fontSize:15,color:t.text,marginBottom:6,lineHeight:1.3}}>{e.title}</p>
                  <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                    <span style={S.entryTag(e.category)}>{CATEGORIES.find(c=>c.id===e.category)?.label}</span>
                    <span style={{fontSize:11,color:t.text3}}>{new Date(e.date).toLocaleDateString("en-MY",{day:"numeric",month:"short"})}</span>
                    <span style={{fontSize:11,color:t.text3}}>♥ {e.likes}</span>
                    <span style={{fontSize:11,color:t.text3}}>💬 {e.comments}</span>
                    {e.image&&<span style={{fontSize:11,color:t.text3}}>📷 photo</span>}
                  </div>
                </div>
                <div style={{display:"flex",gap:8,alignItems:"center",padding:"0 14px",flexShrink:0}}>
                  <button onClick={()=>openEntry(e)} style={{padding:"6px 14px",borderRadius:20,border:`1px solid ${t.border2}`,background:t.surface,color:t.text3,fontSize:12,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>Read</button>
                  <button onClick={()=>{if(window.confirm("Delete this entry?"))deleteEntry(e.id);}} style={{padding:"6px 14px",borderRadius:20,border:"1px solid #FFCDD2",background:"transparent",color:"#E57373",fontSize:12,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>Delete</button>
                </div>
              </div>
            );
          })}
          {entries.length===0&&(
            <div style={{textAlign:"center",padding:"48px 0",color:t.text3}}>
              <p>No entries yet.</p>
              <button style={{...S.primaryBtn,marginTop:12}} onClick={()=>setView("write")}>Write your first entry</button>
            </div>
          )}
        </div>

        <div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:20,color:t.text,marginBottom:16}}>Recent comments</h2>
          {allComments.length===0&&<p style={{color:t.text3,fontSize:14}}>No comments yet.</p>}
          {allComments.map(c=>(
            <div key={c.id} style={{background:t.surface,border:`1px solid ${t.border}`,borderRadius:14,padding:"14px 16px",marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                <div style={{width:30,height:30,borderRadius:"50%",background:t.roseBg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:600,color:t.rose}}>{c.avatar}</div>
                <div>
                  <p style={{fontSize:12,fontWeight:500,color:t.text}}>{c.author}</p>
                  <p style={{fontSize:10,color:t.text3}}>on "{c.entryTitle.slice(0,28)}…"</p>
                </div>
              </div>
              <p style={{fontSize:13,color:t.text2,lineHeight:1.55}}>{c.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Subscribers section */}
      <div style={{marginTop:48}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:20,color:t.text,margin:0}}>💌 Newsletter subscribers</h2>
          <span style={{background:t.roseBg,color:t.rose,borderRadius:20,padding:"4px 14px",fontSize:13}}>{subscribers.length} subscriber{subscribers.length===1?"":"s"}</span>
        </div>

        {subscribers.length===0?(
          <div style={{textAlign:"center",padding:"48px 0",color:t.text3}}>
            <div style={{fontSize:40,marginBottom:12}}>💌</div>
            <p style={{fontSize:16,fontWeight:500,marginBottom:6}}>No subscribers yet</p>
            <p style={{fontSize:13}}>Share your diary and grow your readers!</p>
          </div>
        ):(
          <>
            {subscribers.map(sub=>(
              <div key={sub.id} style={{background:t.surface,border:`1px solid ${t.border}`,borderRadius:14,padding:"14px 18px",marginBottom:10,display:"flex",alignItems:"center",gap:16}}>
                <div style={{width:36,height:36,borderRadius:"50%",background:"linear-gradient(135deg,#C2185B,#E91E63)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:14,fontWeight:600,flexShrink:0}}>
                  {(sub.name||sub.email).charAt(0).toUpperCase()}
                </div>
                <div style={{flex:1,minWidth:0}}>
                  {sub.name&&<p style={{fontSize:14,fontWeight:500,color:t.text,margin:"0 0 2px"}}>{sub.name}</p>}
                  <p style={{fontSize:13,color:t.text3,margin:"0 0 2px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{sub.email}</p>
                  <p style={{fontSize:11,color:t.text3,margin:0}}>Subscribed {sub.date}</p>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
                  <span style={{background:"#E8F5E9",border:"1px solid #A5D6A7",borderRadius:20,padding:"3px 10px",fontSize:11,color:"#2E7D32",display:"flex",alignItems:"center",gap:4}}>
                    <span style={{width:6,height:6,borderRadius:"50%",background:"#4CAF50",display:"inline-block"}}/>Active
                  </span>
                  <button
                    onClick={()=>{if(window.confirm("Remove "+sub.email+" from subscribers?"))setSubscribers(prev=>prev.filter(s=>s.id!==sub.id));}}
                    style={{width:24,height:24,borderRadius:"50%",background:t.surface2,border:`1px solid ${t.border}`,color:t.text3,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1,padding:0}}
                  >×</button>
                </div>
              </div>
            ))}
            <div style={{marginTop:16,display:"flex",justifyContent:"flex-end"}}>
              <button onClick={exportCSV} style={{background:"none",border:`1px solid ${t.border2}`,color:t.text3,borderRadius:50,padding:"10px 24px",fontSize:13,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
                Export emails as CSV
              </button>
            </div>
          </>
        )}
      </div>

      <div style={{marginTop:56,paddingTop:22,borderTop:`1px solid ${t.border}`,display:"flex",justifyContent:"center"}}>
        <button onClick={onLogout} style={{background:"none",border:"none",color:t.text3,fontSize:13,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",letterSpacing:"0.02em",padding:"4px 8px"}}>
          Logout
        </button>
      </div>
    </div>
  );
}
