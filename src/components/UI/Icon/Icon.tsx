interface IconProps {
  name: string;
  width?: number;
  height?: number;
  className?: string;
}

export const Icon = ({
  name,
  width = 24,
  height = 24,
  className,
}: IconProps) => (
  <svg width={width} height={height} className={className} aria-hidden="true">
    <use xlinkHref={`/icons.svg#${name}`} />
  </svg>
);
