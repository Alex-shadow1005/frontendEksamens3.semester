const url1 = 'http://localhost:8080/galleri'
const url = 'http://localhost:8080/get/image/';


const getImageNameList = async (url) => {
    return await fetch(url).then(res => res.json())
}

const getImage = async (url) => {
    return await fetch(url).then(res => res.url)
}

async function createImageMap() {
    console.log("1")
    const imageList = await getImageNameList(url1);
    console.log("2")
    let currentcol = 1;




    console.log("4")

    imageList.forEach((name) => {
        console.log(name);


        getImage(url + name)
            .then(result => {
                console.log(name);
                console.log(currentcol);
                let elem = document.createElement("img");
                elem.setAttribute('src', result);
                document.getElementById(currentcol.toString()).appendChild(elem);
                currentcol = currentcol +1;
                if(currentcol>4){
                    currentcol = 1;
                }
            });

    })
}
document.addEventListener('DOMContentLoaded', () => {

    createImageMap();

});