import { deleteUser , postUser , putUser ,editUser} from "./api.js";




let tbody = document.querySelector(".tbody");





///ADD
// Selecting elements


let btnAdd = document.querySelector(".button")


const dialog = document.querySelector('.giaad');
const closeButton = document.querySelector('.closeAd');
btnAdd.addEventListener("click", () => {
    dialog.showModal();
})

closeButton.addEventListener('click', () => {
    formAd.reset()
    dialog.close();
});

let closeAdd = document.querySelector(".closeAdd")



const formAd = document.querySelector('.formAd');

formAd.onsubmit = async (event) => {
    event.preventDefault();
    let NewUser = {
        name : formAd['group'].value,
        payment : formAd['deck'].value,
        city : formAd['stat'].value == "1" ? "Prafsayuz" : formAd['stat'].value == "2" ? "Kafedra" : formAd['stat'].value == "3" ? "Sirk" : formAd['stat'].value == "4" ? "Khujand" : "Sadbarg",

        status : formAd['select'].value == "0" ? true : false,
        payment : formAd['student'].value,

    }
    postUser(NewUser)
    formAd.reset()
    dialog.close();

}


const dialoginfo = document.querySelector('.dialoginfo');


const nameIn = document.querySelector('.nameIn');
const groupIn = document.querySelector('.groupIn');
const deckIn = document.querySelector('.deckIn');
const studentIn = document.querySelector('.studentIn');
const statusIn = document.querySelector('.statusIn');
const placeIn = document.querySelector('.placeIn');






let closeInfo = document.querySelector('.closeInfo');

closeInfo.addEventListener('click', () => {
    dialoginfo.close();
});

 function getData(data) {
    tbody.innerHTML = ""
    data.forEach(elem => {
        let tr = document.createElement("tr")

        let td1 = document.createElement("td")
        td1.innerHTML = elem.id
       
        let td2 = document.createElement("td")
        td2.innerHTML = elem.name

        let td3 = document.createElement("td")
        td3.innerHTML = elem.payment

        let td4 = document.createElement("td")
        td4.innerHTML = elem.tatal

        let td5 = document.createElement("td")
        td5.innerHTML = elem.city

        let td6 = document.createElement("td")
        td6.innerHTML = elem.status ? "Finished" : "Started"
        td6.style.color = elem.status ? "#9FCAC4" : "red"
        

        let td7 = document.createElement("td")
       
       // Button 1
let btn1 = document.createElement("button");
btn1.style.border = "none";
btn1.style.background = "none";

let imginfo = document.createElement("img");
imginfo.src = "/icons/icons8-info.svg";
imginfo.style.width = "30px"; 

btn1.appendChild(imginfo);

btn1.onclick = () => {
    dialoginfo.showModal()
    nameIn.innerHTML = elem.name
    groupIn.innerHTML = elem.group
    deckIn.innerHTML = elem.deck
    studentIn.innerHTML = elem.tatal
    statusIn.innerHTML= elem.status ? "Finished" : "Started"
    placeIn.innerHTML= elem.city
  

}

// Button 2
let btn2 = document.createElement("button");
btn2.style.border = "none";
btn2.style.background = "none";

let imgdelete = document.createElement("img");
imgdelete.src = "/icons/icons8-delete-50.png";
imgdelete.style.width = "30px"; // Set the width of the image

btn2.appendChild(imgdelete);

btn2.onclick = () => {
    deleteUser(elem.id);
};

// Button 3
let btn3 = document.createElement("button");
btn3.style.border = "none";
btn3.style.background = "none";

let imgedit = document.createElement("img");
imgedit.src = "/icons/icons8-edit-50.png";
imgedit.style.width = "30px"; // Set the width of the image

btn3.appendChild(imgedit);

btn3.onclick = () => {
openModal(elem);
}

// Checkbox
let check = document.createElement("input");
check.type = "checkbox";
check.checked = elem.status;

// Now, you can append these elements to your document where necessary

        if(elem.status){
            td2.style.textDecoration = "line-through";
         }
         
         check.onclick = () => {
            elem.status = !elem.status;
            editUser(elem.id, elem);
        };
        
        td7.append(btn1,btn2,btn3,check)

        tr.append(td1,td2,td3,td4,td5,td6,td7)
        tbody.append(tr)

        
    });
 }
//// EDit
// Selecting elements
const dialogEdit = document.querySelector('.diaEdit');
const closeButtonEdit = document.querySelector('.closeEdit');
const formEdit = document.querySelector('.formEdit');

const cancelButton = document.querySelector('.closeEd');


closeButtonEdit.addEventListener('click', () => {
    dialogEdit.close();
});



cancelButton.addEventListener('click', () => {
    dialogEdit.close();
});

function openModal(elem) {
dialogEdit.showModal()

formEdit['group'].value = elem.name;
formEdit['deck'].value = elem.payment;
formEdit['stat'].value = elem.city == "Sadbarg" ? "0" : elem.city == "Prafsayuz" ? "1" : elem.city == "Kafedra" ? "2" : elem.city == "Sirk" ? "3" : "4";
formEdit['select'].value = elem.status ? "0" : "1";

formEdit['student'].value = elem.tatal;
formEdit.onsubmit = () => {
    event.preventDefault(); 
   
    let User = {
        ...elem,
        name : formEdit['group'].value,
        payment : formEdit['deck'].value,
        city : formEdit['stat'].value == "1" ? "Prafsayuz" : formEdit['stat'].value == "2" ? "Kafedra" : formEdit['stat'].value == "3" ? "Sirk" : formEdit['stat'].value == "4" ? "Khujand" : "Sadbarg",
        status : formEdit['select'].value =="0"? true : false,
        tatal : formEdit['student'].value,

    }
    putUser(elem.id, User);
    dialogEdit.close();


};
}


export {getData}