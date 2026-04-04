import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef, type ReactNode } from "react";

type VirtualScrollProps<T> = {
  items: T[];
  estimateSize: number;
  renderRow: (item: T, index: number) => ReactNode;
  className?: string;
};

export function VirtualScroll<T>({
  items,
  estimateSize,
  renderRow,
  className,
}: VirtualScrollProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line react-hooks/incompatible-library -- TanStack Virtual
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateSize,
    overscan: 8,
  });

  return (
    <div
      ref={parentRef}
      className={className}
      style={{ height: 400, overflow: "auto" }}
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {virtualizer.getVirtualItems().map((v) => (
          <div
            key={v.key}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: `${v.size}px`,
              transform: `translateY(${v.start}px)`,
            }}
          >
            {renderRow(items[v.index] as T, v.index)}
          </div>
        ))}
      </div>
    </div>
  );
}
