import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({
  position,
  itemsCount,
  pageSize,
  currentPage,
  onPageChange,
}) => {
  const pos = "pagination justify-content-" + (position || "left");
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount <= 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav aria-label="Page navigation">
      <ul className={pos}>
        <li className={currentPage === 1 ? "page-item disabled" : "page-item"}>
          <a
            className="page-link"
            href="#"
            aria-label="Previous"
            onClick={(e) => onPageChange(e, currentPage - 1)}
          >
            <span className="sr-only">Prev</span>
          </a>
        </li>
        {pages.map((page) => (
          <li
            className={page === currentPage ? "page-item active" : "page-item"}
            key={page}
          >
            <a
              className="page-link"
              href="#"
              onClick={(e) => onPageChange(e, page)}
            >
              {page}
            </a>
          </li>
        ))}
        <li
          className={
            currentPage === pagesCount ? "page-item disabled" : "page-item"
          }
        >
          <a
            className="page-link"
            href="#"
            aria-label="Next"
            onClick={(e) => onPageChange(e, currentPage + 1)}
          >
            <span className="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  position: PropTypes.string.isRequired,
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;