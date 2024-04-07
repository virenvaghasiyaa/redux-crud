import PropTypes from "prop-types";

const Pagination = ({ perPageItem, totalItems, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / perPageItem); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;

Pagination.propTypes = {
  perPageItem: PropTypes.number,
  totalItems: PropTypes.number,
  paginate: PropTypes.func,
};
