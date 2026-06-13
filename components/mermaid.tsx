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
  steel: '#b9b9ad',
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
          fontSize: 18,
          // render every diagram at its NATURAL size (no shrink-to-fit) so text stays legible;
          // the wrapper scrolls horizontally for wide ones.
          flowchart: { useMaxWidth: false, htmlLabels: true, curve: 'basis', nodeSpacing: 55, rankSpacing: 72, padding: 16 },
          sequence: { useMaxWidth: false, actorFontSize: 17, noteFontSize: 15, messageFontSize: 15, boxMargin: 12, width: 175, height: 48 },
          state: { useMaxWidth: false, padding: 14 },
          class: { useMaxWidth: false },
          journey: { useMaxWidth: false },
          quadrantChart: { useMaxWidth: false, chartWidth: 580, chartHeight: 560, pointLabelFontSize: 15, quadrantLabelFontSize: 17, titleFontSize: 22, pointTextPadding: 8 },
          mindmap: { useMaxWidth: false, padding: 16, maxNodeWidth: 240 },
          pie: { useMaxWidth: false },
          themeVariables: {
            darkMode: true,
            background: HQ.pitch,
            primaryColor: '#22221f',
            primaryTextColor: HQ.bone,
            primaryBorderColor: HQ.livery,
            secondaryColor: HQ.inset,
            secondaryTextColor: HQ.bone,
            secondaryBorderColor: HQ.steel,
            tertiaryColor: HQ.inset,
            tertiaryTextColor: HQ.bone,
            tertiaryBorderColor: HQ.steel,
            lineColor: '#d2d2c8',
            textColor: HQ.bone,
            mainBkg: '#22221f',
            nodeBorder: HQ.livery,
            clusterBkg: 'rgba(201,242,75,0.05)',
            clusterBorder: 'rgba(242,239,230,0.18)',
            titleColor: HQ.livery,
            edgeLabelBackground: HQ.pitch,
            // sequence
            actorBkg: '#22221f',
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
            stateBkg: '#22221f',
            // mindmap node palette — consistent + readable (no muddy grey root)
            cScale0: '#2e3f12', cScaleLabel0: HQ.bone,
            cScale1: '#22221f', cScaleLabel1: HQ.bone,
            cScale2: '#22221f', cScaleLabel2: HQ.bone,
            cScale3: '#22221f', cScaleLabel3: HQ.bone,
            cScale4: '#22221f', cScaleLabel4: HQ.bone,
            cScale5: '#22221f', cScaleLabel5: HQ.bone,
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
      <div className="hq-mermaid overflow-x-auto rounded-none border border-[rgba(242,239,230,0.16)] bg-[#0b0b0b] p-5">
        <div
          className="[&>svg]:mx-auto [&>svg]:h-auto [&>svg]:!max-w-none [&>svg]:min-w-fit"
          // svg is produced by Mermaid from trusted, author-written chart strings
          dangerouslySetInnerHTML={{ __html: svg || '' }}
        />
      </div>
      {caption ? (
        <figcaption className="mt-2.5 text-center font-mono text-xs uppercase tracking-wider text-[#9a9a8e]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
