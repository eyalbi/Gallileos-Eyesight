export const ANALYZE_PHOTO = 'ANALYZE_PHOTO';
export const SET_RESULTS = 'SET_RESULTS';

import Result from '../../models/result';
import constellations from '../../data/constellations/constellations';

export const fetchResults = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(`https://galileo-eyesight-default-rtdb.firebaseio.com/result/${userId}.json`);
      
      if (!response.ok) {
          throw new Error('Something is wrong!');
      };

      const resData = await response.json();
      const loadedResults =[];

      for (const key in resData) {
          loadedResults.push(
              new Result(
                  key, 
                  resData[key].imageUri, 
                  resData[key].ResConsts, 
                  new Date(resData[key].date), 
              )
          );
      };

      dispatch({type: SET_RESULTS, results: loadedResults});
    }catch (err) {
      throw err;
    }
  }
};
//------------------------------------------------------------------------
export const analyzePhoto = (img, imageUri) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date =new Date()
    const response = await fetch('http://172.20.7.229:8000', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Img: img
        })
      } 
    );
    if(!response.ok) {
      throw new Error('Something went wrong!');
    };

    const resData = await response.json();

    const ResConsts = [];
    for(const key in resData){
      ResConsts.push(constellations[key]);
    };

    const response2 = await fetch(`https://galileo-eyesight-default-rtdb.firebaseio.com/result/${userId}.json?auth=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        imageUri,
        ResConsts,
        date: date.toISOString()
      })
    });

    if(!response2.ok) {
      throw new Error('Something went wrong!');
    };
    
    const resData2 = await response2.json();
    
    dispatch( { 
      type: ANALYZE_PHOTO, 
      resultData: {
        id: resData2.name, 
        img: imageUri,
        labels: ResConsts,
        date: date
      }
    });
  }
};