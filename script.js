
let keyWord ='Chris';
let givenRating = 9.4;


fetch('movies.json')
.then((response) => {
    return response.json();
})
.then((result) => {

    //searchMovies(result);
   // biggerThanAverage(result);
  // topFiveBudget(result);
  //topFiveIMDB(result);
  //datePeriod(result,1990,1991);

})
.catch((error) => {
    console.log(new Error('Error Occurred.' + error));
});


function searchMovies(movieObjects){
    let re = new RegExp(keyWord.toLowerCase());
    movieObjects.map(movie =>{
        if(re.test(movie.Title.toString().toLowerCase())){
            console.log(movie);
        }
    });
}


function datePeriod(movieObjects,dateX,dateY){

    movieObjects.forEach(movie=>{ 
        if(movie['Release Date'].slice(-4)>=dateX && movie['Release Date'].slice(-4)<=dateY){
            console.log(movie);
        }
    });
}



function topFiveIMDB(movieObjects){

   let sortedMovieObjects = movieObjects.sort((a,b)=>(b['IMDB Rating']*b['IMDB Votes']) - (a['IMDB Rating']*a['IMDB Votes']));

   let slicedMovieObjects = sortedMovieObjects.slice(0,5);
   
   slicedMovieObjects.forEach(movie=>{
        console.log(movie);
    });


}

function topFiveBudget(movieObjects) {

   let sortedMovieObjects = movieObjects.sort((a,b)=>(b['Worldwide Gross']-b['Production Budget']) - (a['Worldwide Gross']-a['Production Budget']));

   let slicedMovieObjects = sortedMovieObjects.slice(0,5);

   slicedMovieObjects.forEach(movie=>{
        console.log(movie);
    });

}


function biggerThanAverage(movieObjects){

    movieObjects.forEach(movie => {
        if(averageRating(movie['IMDB Rating'],rottenRatingNormalization(movie['Rotten Tomatoes Rating'])) > givenRating){
            console.log(movie);
        }
    });
}

function rottenRatingNormalization(rating){
    rating = rating/10;
    return parseFloat(rating);
}


function averageRating(rating1,rating2){

    if(rating1 === null){
        return rating2;
    }
    else if(rating2 === null){
        return rating1;
    }
    else{
        let average = (rating1+rating2)/2;
       return average.toFixed(1);  
    }

}