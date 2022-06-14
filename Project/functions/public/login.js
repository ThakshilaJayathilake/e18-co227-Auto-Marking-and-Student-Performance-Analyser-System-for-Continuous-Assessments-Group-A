async function getUserNames(){
    fetch('http://localhost:9000/group07-co227/us-central1/app/api/getName')
.then(data => {
    console.log(data);
return data.json();


})
}
getUserNames();