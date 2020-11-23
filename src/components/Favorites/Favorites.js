// import React, { useEffect, useState } from 'react'
// import { db } from '../../firebase/fbconfig';

// export const Favorites = () => {
//   const [favList, setFavList] = useState(null)
//   const [flag, setFlag] = useState(true)

//   const fetchData = async () => {
//     let data = await db.collection("favoriteMovies").get()
//     setFavList(data.docs)
//   }

//   useEffect(() => {
//     fetchData()
//   }, [flag])

//   const deleteFav = async(mov) => {
//     await db.collection("favoriteMovies").doc(mov.id).delete()
//     setFlag(!flag)
//   }


//   return (

//     <div style={{ color: "white" }}>
//       {
//         favList?.map(mov => (
//           <div style={{ margin: 10, backgroundColor: "yellow" }}>
//             <p>{mov.data().title}</p>
//             <button onClick={() => deleteFav(mov)}>delete</button>
//           </div>
//         ))
//       }
//     </div>
//   )
// }

import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { db } from "../../firebase/fbconfig";
import {
  StyledCardWrapper,
  StyledFooterWrapper,
  StyledImgWrapper,
  StyledButton,
} from "../../components/Favorites/Favorites.style";
import { MovieInput } from "../MovieDetail/MovieInput.style";

export const Favorites = () => {

  const [favList, setFavList] = useState(null);
  const [flag, setFlag] = useState(true);
  const history = useHistory();

  const fetchData = async () => {
    let data = await db.collection("favoriteMovies").get();
    setFavList(data.docs);
  };

  useEffect(() => {
    fetchData();
  }, [flag]);

  const deleteFav = async (mov) => {
    await db.collection("favoriteMovies").doc(mov.id).delete();
    setFlag(!flag);
  };

  const imgUrl = "https://image.tmdb.org/t/p/w1280/";

  return (
    <div style={{ color: "white", display: "flex", flexWrap: "wrap", justifyContent: 'center' }}>
      {favList?.map((mov) => (
        <StyledCardWrapper style={{ margin: 20 }}>
          <p>{mov.data().title}</p>
          <StyledImgWrapper src={imgUrl + mov.data().path} />

          <StyledFooterWrapper>

            <StyledButton onClick={() => deleteFav(mov)}>Delete</StyledButton>

            <Link
              to={{
                pathname: `/movie/${mov.data().title}`,
                state: { ...mov.data(), poster_path: mov.data().path },
              }}
            >
              <StyledButton type="">Go To Detail {">>>"}</StyledButton>
            </Link>

          </StyledFooterWrapper>

        </StyledCardWrapper>
      ))}
    </div>
  );
};
