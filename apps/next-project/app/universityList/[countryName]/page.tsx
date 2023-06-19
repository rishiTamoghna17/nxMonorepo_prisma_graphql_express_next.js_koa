'use client';
import React, { useEffect, useState } from 'react';
import "./pageStyle.css";

async function getPageData(countryName: string, page: number) {
  const res = await fetch(
    `http://universities.hipolabs.com/search?country=${countryName}&page=${page}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  return data;
}

const PAGE_SIZE = 10; // Number of universities to display per page

export default function Page({ params: { countryName } }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await getPageData(countryName, currentPage);
        setData(responseData);
        setTotalPages(Math.ceil(responseData.length / PAGE_SIZE));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [countryName, currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  

  const universityList = data.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="university-list">
      <ul className="university-list">
        {universityList.map((item, index) => (
          <div className="card" key={index}>
            <h2>{item.name}</h2>
            <p>Country: {item.country}</p>
            <p>Alpha Two Code: {item.alpha_two_code}</p>
            <p>State/Province: {item['state-province']}</p>
            <p>Domains: {item.domains.join(', ')}</p>
            <p>Web Pages: {item.web_pages.join(', ')}</p>
          </div>
        ))}
      </ul>
      <div className="pagination">
        <button className="pagination-button-prev" onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev
        </button>
        <span>{currentPage}</span>
        <button className="pagination-button-next" onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
