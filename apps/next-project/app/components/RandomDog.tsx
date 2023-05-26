"use client"
import React, { useEffect, useState } from 'react';
import randomDog from '../lib/randomDog';
import Image from 'next/image';
import "./RandomDog.css"

function Dog() {
    const [dog, setDog] = useState();
    const [refreshDog, setRefreshDog] = useState(false);
    useEffect(() => {
        randomDog().then((res)=>res.json())
        .then((result) => {setDog(result);console.log(result)})
        .catch((err) =>console.log(err));
      }, [refreshDog]);

      return (
        <div className="card">
          <div className="title">RandomDog</div>
          <ul className="dog-live">
            <li>
              <Image src={dog && dog[0].url} width={200} height={200} alt="Picture of the dog" />
            </li>
          </ul>
          <button className="refresh-button" onClick={() => setRefreshDog(refreshDog => !refreshDog)}>Refresh</button>
        </div>
      );
    };

export default Dog;
