import React from 'react';
import "./pageStyle.css"
async function page({params:{countryName}}: {
  params: { countryName: string };}) {
  const data = await getData(countryName);
  return (
    <div className = "university-list">
    <ol className="university-list"> 
    {data.slice(0, 48).map((item:any, index:any) => (
    <div className="card" key={index}>
      <h2>{item.name}</h2>
      <p>Country: {item.country}</p>
      <p>Alpha Two Code: {item.alpha_two_code}</p>
      <p>State/Province: {item['state-province']}</p>
      <p>Domains: {item.domains.join(', ')}</p>
      <p>Web Pages: {item.web_pages.join(', ')}</p>
    </div>
  ))}
    </ol>
    </div>
    // <div>tamoghna</div>
  );
}
//serverside rendering
async function getData(countryName:any) {
  const res = await fetch(
    `http://universities.hipolabs.com/search?country=${countryName}`
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  return data;
}
export default page;
