let API_KEY;
//in vanilla JS, getting env variables are impossible unless two packages installed: requirejs and dotenv
requirejs(["dotenv"], function() {
    API_KEY = process.env.API_KEY
    return API_KEY
});
let request = "https://api.giphy.com/v1/gifs/trending?api_key=" + API_KEY + "&limit=10&offset=0&rating=g&bundle=messaging_non_clips"
let fetchGifs = async () => {
    try {
        const response = await fetch(request,
            {
                mode: "cors",
                headers: {
                    'Accept': 'application/json'
                }
            })

        if (response.ok) {
            const jsonData = await response.json();
            return jsonData.data
        }
    }
    catch (error) {
        console.error(error)
    }
}

fetchGifs().then((gifArray) => {
    if (gifArray) {
        let imgDomObjects = document.querySelectorAll(".image");

        imgDomObjects.forEach((imgDom, index) => {
            if (gifArray[index]) {
                imgDom.src = gifArray[index].images.original.url;
            }
        });
    }
});