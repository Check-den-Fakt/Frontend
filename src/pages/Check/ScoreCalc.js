export default function scoreCalc(responseResults) {

const {trustedPB, fakeSearch, mlPredict, controv} = {...responseResults};

let overallScore = null;

console.log("Trusted PB",trustedPB, "Search", fakeSearch,"Model", mlPredict,"Controv", controv)

//Score metrics 
const detailedScores = {
  publisher : {},
  dbMatch : {},
  mlPrediction : {}
}



  if (fakeSearch && fakeSearch.length) {
      //const scores = fakeSearch.map(val => val['@search.score']);
      //fakeSearch.maxValue = Math.max(...scores);

      detailedScores.dbMatch["maxMatch"] = fakeSearch[0]['@search.score'];

      if (fakeSearch[0]['@search.score'] > 0.25){
        //Prevent wrong count calculations (amountVotes > abs(votes) )
        

        //Score in perspective on the truth. So 1 = the text is true
        //Todo: Include Moderator approve
        detailedScores.dbMatch["text"] = fakeSearch[0].document.Content;
        detailedScores.dbMatch["amountVotes"] = fakeSearch[0].document.AmountOfVotes;
        detailedScores.dbMatch["proVotes"] = fakeSearch[0].document.AmountOfVotes - ( (fakeSearch[0].document.AmountOfVotes - fakeSearch[0].document.Votes) / 2);
        detailedScores.dbMatch["conVotes"] = ( (fakeSearch[0].document.AmountOfVotes - fakeSearch[0].document.Votes) / 2);
        detailedScores.dbMatch["score"] = detailedScores.dbMatch["proVotes"] / detailedScores.dbMatch["amountVotes"];
        detailedScores.dbMatch["weight"] = fakeSearch[0]['@search.score'];
      }
  }
  if (mlPredict && mlPredict.score){
    detailedScores.mlPrediction["score"] = mlPredict.score;
    detailedScores.mlPrediction["weight"] = 0.5;
  }

  if (trustedPB && trustedPB.trustScore){
    detailedScores.publisher["score"] = trustedPB.trustScore;
    detailedScores.publisher["reason"] = trustedPB.reason;
    detailedScores.publisher["weight"] = 1;
  }


//Check the number of retured score metrics

console.log("Calculated detailed Scores",detailedScores);

let nrMetrics = 0;
let weightSum = 0;

for( let elem in detailedScores){
 
  if(detailedScores[elem].score !== undefined && detailedScores[elem].score !== null){
    nrMetrics = nrMetrics + 1;
    weightSum = weightSum + detailedScores[elem].weight;
    overallScore = overallScore +(detailedScores[elem].score * detailedScores[elem].weight);
  }
}
//To less metrics for reliable score
if(nrMetrics >= 2 && weightSum){
  overallScore = overallScore / weightSum;
}
else{
  return(null)
}

console.log("Final Score!!!", overallScore)

if( overallScore > 1 | overallScore < 0){
  return(null)
}

return {
    overallScore: overallScore,
    detailedScores: detailedScores,
};

}