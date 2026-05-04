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
}: IconProps) => {
  const iconHref = `${import.meta.env.BASE_URL}icons.svg#${name}`;

  return (
    <svg width={width} height={height} className={className} aria-hidden="true">
      <use href={iconHref} />
    </svg>
  );
};
