import type { ChangeEvent } from "react";
import { usePagination } from "@/utils/usePagination";

/**
 * This code is largly inspired from Material-UI's Pagination component. The usePagination import is almost a 1-1 copy.
 * Just edited for my particular use in this project. I really like the pattern of page numbers with the first and last
 * always visible and the ... when the center page is beyond that range.
 *
 * There are back and forward buttons too for those who like them.
 */

type Props = {
  page: number;
  itemsPerPage: number;
  totalItems: number;
  paginate: (arg0: number) => void;
};

const Pagination = ({ page, itemsPerPage, totalItems, paginate }: Props) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const items = usePagination({
    page,
    count: totalPages,
    onChange: (_, page) => paginate(page),
  });

  return (
    <nav className="flex justify-center mt-5 mx-auto">
      <ul className="flex">
        {items.map((item, index) => (
          <li key={index} className={item.disabled ? "opacity-50" : ""}>
            <PaginationItem {...item} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

type Item = {
  onClick: (event: ChangeEvent<unknown>) => void;
  type: string;
  page: number;
  selected: boolean;
  disabled: boolean;
};

const PaginationItem = ({
  page,
  selected = false,
  type,
  disabled,
  onClick,
}: Item) => {
  return type === "start-ellipsis" || type === "end-ellipsis" ? (
    <div>...</div>
  ) : (
    <button
      onClick={(evt) => !disabled && onClick(evt)}
      className={`mx-1 px-3 py-2 border-blue-200 font-medium rounded-lg ${
        selected ? "bg-blue-500 text-white" : "bg-white text-slate-800"
      }`}
      aria-disabled={disabled}
      disabled={disabled}
    >
      {type === "page" ? page : type === "previous" ? "<" : ">"}
    </button>
  );
};

export default Pagination;
