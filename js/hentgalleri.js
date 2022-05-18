const url1 = 'http://localhost:8080/galleri'
const url = 'http://localhost:8080/get/image/';
const divContainer = document.getElementById("con");

const getImageNameList = async (url) => {
    return await fetch(url).then(res => res.json())
}

const getImage = async (url) => {
    return await fetch(url).then(res => res.url)
}

async function loadImages(){
    const imageList = await getImageNameList(url1);
    const imageListlength = imageList.length;

    for (let i = 0; i < imageListlength; i++){
        const imageName1 = imageList[i];
        if((i+3)%3==0){
            const row = document.createElement("div");
            row.setAttribute("class","row");
            divContainer.appendChild(row);
            const col = document.createElement("div");
            col.setAttribute("class", "col-6");
            row.appendChild(col);
            getImage(url + imageName1).then(result => {
                createImg(col,result);
            })
        } else {
            const row = document.getElementsByClassName("row").item(document.getElementsByClassName("row").length-1)
            const col = document.createElement("div");
            col.setAttribute("class", "col-6");
            row.appendChild(col);
            getImage(url + imageName1).then(result => {
                createImg(col,result);
            })
        }


    }
}

function createImg(col, val) {
    const img = document.createElement("img");
    img.setAttribute("class", "galleriImage");
    img.setAttribute("src", val);
    img.setAttribute("alt", "image");

    col.appendChild(img);
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

    loadImages();

});