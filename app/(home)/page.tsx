import Link from 'next/link';
import RadialEngine from '@/components/RadialEngine';

/* a cog SVG — chartreuse/steel, optional spin (background ambiance) */
function Gear({ size = 120, color = '#c9f24b', teeth = 10, spin = '', className = '', style = {} }: { size?: number; color?: string; teeth?: number; spin?: string; className?: string; style?: React.CSSProperties }) {
  const rects = Array.from({ length: teeth }, (_, i) => (
    <rect key={i} x="46" y="3" width="8" height="15" rx="2" transform={`rotate(${(360 / teeth) * i} 50 50)`} />
  ));
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={`${spin} ${className}`} style={style} aria-hidden>
      <g fill="none" stroke={color} strokeWidth="5"><circle cx="50" cy="50" r="30" /><circle cx="50" cy="50" r="12" /></g>
      <g fill={color}>{rects}</g>
    </svg>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="border-2 border-[#f2efe6]/15 bg-[#161614] px-5 py-4">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8b8b80]">{k}</div>
      <div className="mt-1 text-3xl font-extrabold leading-none text-[#f2efe6]" style={{ fontFamily: 'Saira Extra Condensed' }}>{v}</div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-[#0b0b0b] px-6 py-20 text-[#f2efe6]">
      {/* carbon dot texture */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(242,239,230,0.05) 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
      {/* background engine gears */}
      <Gear size={420} color="rgba(201,242,75,0.07)" teeth={12} spin="gear-spin" style={{ position: 'absolute', right: -120, top: -60 }} />
      <Gear size={300} color="rgba(242,239,230,0.05)" teeth={9} spin="gear-spin-rev" style={{ position: 'absolute', left: -90, bottom: -40 }} />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        {/* THE RADIAL ENGINE — the firm as a 9-cylinder radial (copied from the HeliQuant garage UI) */}
        <div className="mb-8">
          <RadialEngine />
        </div>

        <p className="font-mono text-[12px] uppercase tracking-[0.3em] text-[#8b8b80]">
          Autonomous multi-desk AI trading firm · Mantle
        </p>
        <h1 className="mt-4 text-7xl font-extrabold leading-[0.92] sm:text-8xl" style={{ fontFamily: 'Saira Extra Condensed', letterSpacing: '-0.01em' }}>
          HELI<span className="text-[#c9f24b]">QUANT</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-[#f2efe6]/70">
          Built like an engine: nine desks ingest, the PM sparks <span className="text-[#c9f24b]">ENTER</span> only on a
          validated edge — otherwise it holds gear (<span className="text-[#8b8b80]">ABSTAIN</span>). Every decision sealed
          on-chain. <span className="text-[#f2efe6]">We publish what doesn&apos;t work too.</span>
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link href="/docs" className="border-2 border-[#0b0b0b] bg-[#c9f24b] px-7 py-3 font-bold uppercase tracking-wide text-[#0b0b0b]" style={{ fontFamily: 'Saira Extra Condensed', boxShadow: '4px 4px 0 rgba(242,239,230,0.9)' }}>
            Read the docs →
          </Link>
          <a href="https://heliquant.vercel.app" className="border-2 border-[#f2efe6]/40 px-7 py-3 font-bold uppercase tracking-wide text-[#f2efe6]" style={{ fontFamily: 'Saira Extra Condensed' }}>
            Live dApp ↗
          </a>
          <a href="https://github.com/HeliQuant" className="border-2 border-[#f2efe6]/40 px-7 py-3 font-bold uppercase tracking-wide text-[#f2efe6]" style={{ fontFamily: 'Saira Extra Condensed' }}>
            GitHub ↗
          </a>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-px bg-[#f2efe6]/10 sm:grid-cols-4">
          <Stat k="desks" v="9" />
          <Stat k="on-chain agents" v="10" />
          <Stat k="standard" v="ERC-8004" />
          <Stat k="edges faked" v="0" />
        </div>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-[#c9f24b]">
          We publish what doesn&apos;t work
        </p>
      </div>

      {/* hazard seam */}
      <div aria-hidden className="absolute bottom-0 left-0 right-0 h-3" style={{ backgroundImage: 'repeating-linear-gradient(-45deg, #c9f24b 0 12px, #0b0b0b 12px 24px)' }} />
    </main>
  );
}
