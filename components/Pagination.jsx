"use client"
import getPagedUsers from '@/utils/getPagedUsers'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { editPagination } from '@/redux/PaginationReducer';
function Pagination({ data }) {
  const st = useSelector((state) => state.paginate)
  const dispatch = useDispatch()
  let { totalPages, currentPage } = getPagedUsers(data, st.page, st.limit);

  useEffect(() => {
    console.log(totalPages, currentPage);
    if (currentPage < 1) { currentPage = 1; }
    if (currentPage > totalPages) { currentPage = totalPages; }
    dispatch(editPagination({
      page: currentPage, limit: st.limit
    }));
  }, [totalPages, currentPage])


  const handleClickForPage = (e, page) => {
    e.preventDefault();
    if (page >= 1 && page <= totalPages) {
      dispatch(editPagination({
        page: page, limit: st.limit
      }));
    }
  }
  return (

    <ol className="flex justify-end gap-1 text-xs font-medium">
      <li>
        <button onClick={(e) => { handleClickForPage(e, currentPage - 1); }}
          className={`inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 ${currentPage <= 1 ? 'cursor-not-allowed' : ''}`}
          disabled={currentPage <= 1}
        >
          <span className="sr-only">Prev Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </li>

      {
        totalPages && (Array.from({ length: totalPages }, (_, index) => index + 1)).map((page) => (
          <li key={page} onClick={(e) => { handleClickForPage(e, page); }}>
            <button

              className={`block size-8  rounded border text-center leading-8 hover:bg-red-500 ${currentPage === page
                ? 'border-blue-600 bg-blue-600 text-white'
                : 'border-gray-100 bg-white text-gray-900'
                }`}
            >
              {page}
            </button>
          </li>
        ))
      }

      <li>
        <button
          onClick={(e) => { handleClickForPage(e, currentPage + 1); }}
          href="#"
          className={`inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 
      ${currentPage >= totalPages ? 'cursor-not-allowed' : ''}`}
          disabled={currentPage >= totalPages}
        >
          <span className="sr-only">Next Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </li>

    </ol >
  )
}

export default Pagination