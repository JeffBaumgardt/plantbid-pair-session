import type { ChangeEvent } from 'react';

/**
 * This is largly a copy from Material-UI's usePagination function. I've kept comments from the orgional source.
 * I've only edited a few lines here where it made sense for me.
 */

type Props = {
  boundaryCount?: number;
  count?: number;
  hideNextButton?: boolean;
  hidePrevButton?: boolean;
  onChange?: (event: ChangeEvent<unknown>, page: number) => void;
  page?: number;
  showFirstButton?: boolean;
  showLastButton?: boolean;
  siblingCount?: number;
};

export const usePagination = (props: Props = {}) => {
  // keep default values in sync with @default tags in Pagination.propTypes
  const {
    boundaryCount = 1,
    count = 1,
    page = 1,
    hideNextButton = false,
    hidePrevButton = false,
    onChange: handleChange,
    showFirstButton = false,
    showLastButton = false,
    siblingCount = 1,
  } = props;

  const handleClick = (event: ChangeEvent<unknown>, value: number) => {
    if (handleChange) {
      handleChange(event, value);
    }
  };

  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  const startPages = range(1, Math.min(boundaryCount, count));
  const endPages = range(
    Math.max(count - boundaryCount + 1, boundaryCount + 1),
    count
  );

  const siblingsStart = Math.max(
    Math.min(
      // Natural start
      page - siblingCount,
      // Lower boundary when page is high
      count - boundaryCount - siblingCount * 2 - 1
    ),
    // Greater than startPages
    boundaryCount + 2
  );

  const siblingsEnd = Math.min(
    Math.max(
      // Natural end
      page + siblingCount,
      // Upper boundary when page is low
      boundaryCount + siblingCount * 2 + 2
    ),
    // Less than endPages
    endPages.length > 0 ? endPages[0] - 2 : count - 1
  );

  // Basic list of items to render
  // e.g. itemList = ['first', 'previous', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 10, 'next', 'last']
  const itemList = [
    ...(showFirstButton ? ["first"] : []),
    ...(hidePrevButton ? [] : ["previous"]),
    ...startPages,

    // Start ellipsis
    ...(siblingsStart > boundaryCount + 2
      ? ["start-ellipsis"]
      : boundaryCount + 1 < count - boundaryCount
      ? [boundaryCount + 1]
      : []),

    // Sibling pages
    ...range(siblingsStart, siblingsEnd),

    // End ellipsis
    ...(siblingsEnd < count - boundaryCount - 1
      ? ["end-ellipsis"]
      : count - boundaryCount > boundaryCount
      ? [count - boundaryCount]
      : []),

    ...endPages,
    ...(hideNextButton ? [] : ["next"]),
    ...(showLastButton ? ["last"] : []),
  ];

  const buttonPage = (type: string) => {
    switch (type) {
      case "first":
        return 1;
      case "previous":
        return page - 1;
      case "next":
        return page + 1;
      case "last":
        return count;
      default:
        return 0;
    }
  };

  const items = itemList.map((item) =>
    typeof item === "number"
      ? {
          onClick: (event: ChangeEvent<unknown>) => {
            handleClick(event, item);
          },
          type: "page",
          page: item,
          selected: item === page,
          disabled: false,
        }
      : {
          onClick: (event: ChangeEvent<unknown>) => {
            handleClick(event, buttonPage(item));
          },
          type: item,
          page: buttonPage(item),
          selected: false,
          disabled:
            (item.indexOf("ellipsis") === -1 &&
              (item === "next" || item === "last" ? page >= count : page <= 1)),
        }
  );

  return items;
};
