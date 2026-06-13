import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';

function NavTitle() {
  return (
    <span className="flex items-center gap-2">
      <svg width="22" height="22" viewBox="0 0 100 100" aria-hidden className="gear-spin">
        <g fill="none" stroke="#c9f24b" strokeWidth="6"><circle cx="50" cy="50" r="28" /><circle cx="50" cy="50" r="11" /></g>
        <g fill="#c9f24b">
          {Array.from({ length: 9 }, (_, i) => (
            <rect key={i} x="45" y="4" width="10" height="14" rx="2" transform={`rotate(${40 * i} 50 50)`} />
          ))}
        </g>
      </svg>
      <span style={{ fontFamily: 'Saira Extra Condensed', fontWeight: 800, letterSpacing: '0.01em' }} className="text-lg uppercase">
        Heli<span style={{ color: '#c9f24b' }}>Quant</span>
      </span>
    </span>
  );
}

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <NavTitle />,
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
