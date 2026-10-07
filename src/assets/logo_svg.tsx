import { useId } from 'react';
import type { SVGProps } from 'react';

// Paths from branding/logo/fleet/logo-white.svg. The eyes are cut out through a
// mask (rather than baked into the panel paths) so they can blink.
const LEFT_PANEL = 'M109.455 0C112.217 0 114.455 2.23858 114.455 5V156C114.455 158.761 112.217 161 109.455 161H30C13.4315 161 0 147.569 0 131V30C0 13.4315 13.4315 0 30 0H109.455Z';
const RIGHT_PANEL = 'M149.844 0C166.412 0 179.844 13.4315 179.844 30V131C179.844 147.568 166.412 161 149.844 161H123.038C120.277 161 118.038 158.761 118.038 156V5C118.038 2.23858 120.277 0 123.038 0H149.844Z';
const EYE = { y: 54.1758, width: 25.9668, height: 52.6484, rx: 12.9834 };

type LogoSvgProps = SVGProps<SVGSVGElement> & {
  title?: string;
};

const LogoSvg = ({ title, ...props }: LogoSvgProps) => {
  const maskId = useId();

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 180 161'
      fill='currentColor'
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      {...props}
    >
      {title && <title>{title}</title>}
      <mask id={maskId} maskUnits='userSpaceOnUse' x='0' y='0' width='180' height='161'>
        <rect width='180' height='161' fill='white' />
        <rect className='agent-eye' x='67.9102' {...EYE} fill='black' />
        <rect className='agent-eye' x='134.038' {...EYE} fill='black' />
      </mask>
      <g mask={`url(#${maskId})`}>
        <path d={LEFT_PANEL} />
        <path d={RIGHT_PANEL} />
      </g>
    </svg>
  );
};

export default LogoSvg;
