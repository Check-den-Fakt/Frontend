import React, { useState } from 'react';
import { AddNews } from '../../components/AddNews';
import Result from '../Result/Result';
import fetchAPI from '../../utils/fetchAPI';

export default function Check() {
  const [checkResult, setCheckResult] = useState(null);
  const [detailedResult, setDetailedResult] = useState(null);
  const [requestData, setRequestData] = useState(null);
  const [verifiable, setVerifiable] = useState(null);

  const handleSendData = async (data) => {
    let detailedScores = {};
    setRequestData(data);

    let overallScore = 0.0;
    if (data.text){
      const searchResponse = await fetchAPI.postData("https://we-checkdenfakt-apimgm.azure-api.net/we-factsearch-fa/Search", {text: data.text});
      const modelJSONResponse = await fetchAPI.postData("https://we-checkdenfakt-apimgm.azure-api.net/we-mlmodel-web/prediction", {text: data.text});
      //Should be adjusted in Backend so that it is same as other responses
      const modelResponse = JSON.parse(modelJSONResponse);

      if (searchResponse && searchResponse.value && searchResponse.value.length) {
        const scores = searchResponse.value.map(val => val['@search.score']);
        searchResponse.fakeCount = scores.length;
        searchResponse.maxValue = Math.max(...scores);
        const matches = searchResponse.value;
        overallScore = overallScore + 1 - searchResponse.maxValue;
        detailedScores["Database match"] = searchResponse.maxValue;
        if (searchResponse.maxValue > 0.5){
          setVerifiable(true);
        }
        else{
          setVerifiable(false);
        }
        for (let x of matches) {
          if (x['@search.score'] > 0.25){
            //Here Sting matching or distance between text
            if (x.document.Content.includes(data.text)){
              //console.log("Wir haben einen Eintrag gefunden, der Bereits von x Benutzern als Falsch gekennzeichnet wurde, der ihrer Eingabe sehr ähnelt.",x.document.Content)
            }
          }
        }
      }
      if (modelResponse && modelResponse.score){
        if(overallScore){
          overallScore = (overallScore + modelResponse.score) / 2.0;
        }
        else{
          overallScore = modelResponse.score;
          setVerifiable(false);
        }
        detailedScores["KI score"] = searchResponse.maxValue;
      }
      
    }
    else if (data.url){ 
      const trustedPubResponse = await fetchAPI.postData("https://we-checkdenfakt-apimgm.azure-api.net/we-trustedpublisher-web", {uri: data.url});
      if (trustedPubResponse){
        overallScore = trustedPubResponse.trustScore;
        detailedScores["Trusted publisher score"] = trustedPubResponse.trustScore;
        setVerifiable(true);
      }
      else {
        overallScore = 0.0;
        setVerifiable(false);
      }
    }
    //const overallScore = modelResponse + searchResponse + trustedPubResponse
    setCheckResult(overallScore);
    setDetailedResult(detailedScores);
  } 

  // Declare a new state variable, which we'll call "count"
  return (
    <>
      {detailedResult ? <Result verifable={verifiable} requestData={requestData} overallScore={checkResult} detailedResult={detailedResult} /> : <div>
        <div className="text-center">
        <h1>Check deine Corona-News</h1>
        <p className="lead">Du bist Dir nicht sicher, ob eine Nachricht wahr ist? Wir helfen Dir!</p>
        </div>
        <div className="d-flex justify-content-center my-n4">
        <div className="polygon background-color-2">
          <AddNews onSubmit={handleSendData}/>
        </div>
        </div>
      </div>}
    </>
  );
}