'use client';

import { useEffect, useId, useState } from 'react';

/**
 * Night-Garage themed Mermaid renderer (client-only — Mermaid needs the DOM).
 * Use in MDX:  <Mermaid caption="One cycle" chart={`sequenceDiagram ...`} />
 * Palette mirrors app/global.css: pitch #0b0b0b · carbon #161614 · bone #f2efe6 ·
 * steel #8b8b80 · chartreuse livery #c9f24b.
 */
const HQ = {
  pitch: '#0b0b0b',
  carbon: '#161614',
  inset: '#1e1e1b',
  bone: '#f2efe6',
  steel: '#8b8b80',
  livery: '#c9f24b',
} as const;

let _seq = 0;

export function Mermaid({ chart, caption }: { chart: string; caption?: string }) {
  const reactId = useId().replace(/[^a-zA-Z0-9]/g, '');
  const [svg, setSvg] = useState('');
  const [err, setErr] = useState('');

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const mermaid = (await import('mermaid')).default;
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'loose',
          theme: 'base',
          fontFamily: '"IBM Plex Mono", ui-monospace, monospace',
          themeVariables: {
            darkMode: true,
            background: HQ.pitch,
            primaryColor: HQ.carbon,
            primaryTextColor: HQ.bone,
            primaryBorderColor: HQ.livery,
            secondaryColor: HQ.inset,
            secondaryTextColor: HQ.bone,
            secondaryBorderColor: HQ.steel,
            tertiaryColor: HQ.inset,
            tertiaryTextColor: HQ.bone,
            tertiaryBorderColor: HQ.steel,
            lineColor: HQ.steel,
            textColor: HQ.bone,
            mainBkg: HQ.carbon,
            nodeBorder: HQ.livery,
            clusterBkg: 'rgba(201,242,75,0.05)',
            clusterBorder: 'rgba(242,239,230,0.18)',
            titleColor: HQ.livery,
            edgeLabelBackground: HQ.pitch,
            // sequence
            actorBkg: HQ.carbon,
            actorBorder: HQ.livery,
            actorTextColor: HQ.bone,
            signalColor: HQ.bone,
            signalTextColor: HQ.bone,
            labelBoxBkgColor: HQ.inset,
            labelBoxBorderColor: HQ.livery,
            labelTextColor: HQ.bone,
            loopTextColor: HQ.steel,
            noteBkgColor: 'rgba(201,242,75,0.10)',
            noteBorderColor: HQ.livery,
            noteTextColor: HQ.bone,
            activationBkgColor: HQ.inset,
            // state / class
            stateBkg: HQ.carbon,
            // pie
            pie1: HQ.livery,
            pie2: HQ.steel,
            pie3: '#5a6b2e',
            pie4: HQ.inset,
            pieTitleTextColor: HQ.bone,
            pieSectionTextColor: HQ.pitch,
            pieStrokeColor: HQ.pitch,
            pieOuterStrokeColor: HQ.steel,
            // quadrant
            quadrant1Fill: 'rgba(201,242,75,0.08)',
            quadrant2Fill: 'rgba(201,242,75,0.04)',
            quadrant3Fill: 'rgba(30,30,27,0.6)',
            quadrant4Fill: 'rgba(30,30,27,0.3)',
            quadrantPointFill: HQ.livery,
            quadrantPointTextColor: HQ.bone,
            quadrantTitleFill: HQ.bone,
            quadrantXAxisTextFill: HQ.steel,
            quadrantYAxisTextFill: HQ.steel,
            quadrantInternalBorderStrokeFill: 'rgba(242,239,230,0.14)',
            quadrantExternalBorderStrokeFill: HQ.steel,
          },
        });
        const id = `hqmmd-${reactId}-${_seq++}`;
        const { svg } = await mermaid.render(id, chart.trim());
        if (alive) setSvg(svg);
      } catch (e) {
        if (alive) setErr(String((e as Error)?.message ?? e));
      }
    })();
    return () => {
      alive = false;
    };
  }, [chart, reactId]);

  if (err) {
    return (
      <pre className="my-6 overflow-x-auto rounded-none border border-[rgba(242,239,230,0.14)] bg-[#161614] p-4 text-xs text-[#8b8b80]">
        diagram error: {err}
      </pre>
    );
  }

  return (
    <figure className="my-7">
      <div
        className="hq-mermaid flex justify-center overflow-x-auto rounded-none border border-[rgba(242,239,230,0.14)] bg-[#0e0e0c] p-4 [&_svg]:h-auto [&_svg]:max-w-full"
        // svg is produced by Mermaid from trusted, author-written chart strings
        dangerouslySetInnerHTML={{ __html: svg || '' }}
      />
      {caption ? (
        <figcaption className="mt-2 text-center font-mono text-xs uppercase tracking-wider text-[#8b8b80]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
