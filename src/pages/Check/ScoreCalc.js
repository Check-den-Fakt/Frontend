export default function scoreCalc(responseResults, DEBUG) {

  const { trustedPB, fakeSearch, mlPredict, controv } = { ...responseResults };

  let overallScore = null;

  DEBUG && console.log("Trusted PB", trustedPB, "Search", fakeSearch, "Model", mlPredict, "Controv", controv)

  //Score metrics 
  const detailedScores = {
    publisher: {},
    dbMatch: {},
    mlPrediction: {}
  }



  if (fakeSearch && fakeSearch.length) {
    //const scores = fakeSearch.map(val => val['@search.score']);
    //fakeSearch.maxValue = Math.max(...scores);

    detailedScores.dbMatch["maxMatch"] = fakeSearch[0]['@search.score'];

    if (fakeSearch[0]['@search.score'] > 0.25) {
      //Prevent wrong count calculations (amountVotes > abs(votes) )


      //Score in perspective on the truth. So 1 = the text is true
      //Todo: Include Moderator approve
      detailedScores.dbMatch["text"] = fakeSearch[0].document.Content;
      detailedScores.dbMatch["amountVotes"] = fakeSearch[0].document.AmountOfVotes;
      detailedScores.dbMatch["proVotes"] = fakeSearch[0].document.AmountOfVotes - ((fakeSearch[0].document.AmountOfVotes - fakeSearch[0].document.Votes) / 2);
      detailedScores.dbMatch["conVotes"] = ((fakeSearch[0].document.AmountOfVotes - fakeSearch[0].document.Votes) / 2);
      detailedScores.dbMatch["score"] = detailedScores.dbMatch["proVotes"] / detailedScores.dbMatch["amountVotes"];
      detailedScores.dbMatch["weight"] = fakeSearch[0]['@search.score'];
    }
  }
  if (mlPredict && mlPredict.score) {
    //Current implementation says that 1 is fake
    detailedScores.mlPrediction["score"] = 1.0 - mlPredict.score;
    detailedScores.mlPrediction["weight"] = 0.5;
  }

  if (trustedPB && trustedPB.trustScore) {
    detailedScores.publisher["score"] = trustedPB.trustScore;
    detailedScores.publisher["url"] = trustedPB.url;
    detailedScores.publisher["reason"] = trustedPB.reason;
    detailedScores.publisher["weight"] = 1;
  }


  //Check the number of retured score metrics

  DEBUG && console.log("Calculated detailed Scores", detailedScores);

  let nrMetrics = 0;
  let weightSum = 0;

  for (let elem in detailedScores) {
    if (detailedScores[elem].score !== undefined && detailedScores[elem].score !== null) {
      nrMetrics = nrMetrics + 1;
      weightSum = weightSum + detailedScores[elem].weight;
      overallScore = overallScore + (detailedScores[elem].score * detailedScores[elem].weight);
    }
  }


  //To less metrics for reliable score
  if (nrMetrics >= 2 && weightSum) {
    DEBUG && console.log("Pre calculatet overallScore: ", overallScore, "weigthSum: ", weightSum);
    overallScore = overallScore / weightSum;
    overallScore = Math.round((overallScore + Number.EPSILON) * 100) / 100;
  }
  else {
    return {
      overallScore: null,
      detailedScores: detailedScores,
    };
  }

  DEBUG && console.log("Final Score!", overallScore)

  if (overallScore > 1 | overallScore < 0) {
    return {
      overallScore: null,
      detailedScores: null,
    };
  }

  return {
    overallScore: overallScore,
    detailedScores: detailedScores,
  };

}