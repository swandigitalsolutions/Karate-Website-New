import { Fragment, type ElementType } from "react";

export function words(text: string) {
  // The space sits outside the inline-block word, otherwise it collapses.
  return text.split(" ").map((word, i) => (
    <Fragment key={i}>
      <span className="w">
        <span>{word}</span>
      </span>{" "}
    </Fragment>
  ));
}

type SplitProps = {
  text: string;
  /** Trailing words rendered in the muted accent style. */
  accent?: string;
  as?: ElementType;
  className?: string;
  id?: string;
};

/** Heading split into words so it can rise in line by line (see useReveals). */
export function Split({ text, accent, as: Tag = "h2", className = "h2", id }: SplitProps) {
  return (
    <Tag className={className} id={id} data-split aria-label={accent ? `${text} ${accent}` : text}>
      <span aria-hidden="true">
        {words(text)}
        {accent && <span className="accent">{words(accent)}</span>}
      </span>
    </Tag>
  );
}
