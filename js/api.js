import { getData } from "./dom.js";



let api = "https://6603d32e2393662c31cfca36.mockapi.io/api/nf/to-do-modul"

async function get() {
   try {
    const {data} = await axios.get(api)
    getData(data)
   } catch (error) {
    console.error(error);
   }
}

async function postUser(user){
    try {
        const {data} = await axios.post(api, user)
        get()
    } catch (error) {
        console.error(error);
    }
}

async function putUser(id, user) {
    try {
        const {data} = await axios.put(`${api}/${id}`, user)
        get()
    } catch (error) {
        console.error(error);
    }

}

async function deleteUser(id) {
    try {
        const {data} = await axios.delete(`${api}/${id}`)
        get()
    } catch (error) {
        console.error(error);
    }

}


let search = document.querySelector(".search_input");

search.oninput = async () => {
    let url = api
    let value = search.value.toUpperCase().trim();
    try {
      const {data} = await axios.get(url)

        let newUser = data.filter((el) => {
            return el.name.toUpperCase().trim().includes(value);
        });

        getData(newUser);
    } catch (error) {
        console.error(error);
    }
};

let select = document.querySelector('#select');
select.onchange = async () => {
    let url = api;
    if (select.value !== "all") {
        url += `?status=${select.value === "online" ? true : false}`;
    }
    try {
        let { data } = await axios.get(url);
        getData(data);
    } catch (error) {
        console.error(error);
    }
}
let selectc = document.querySelector('#selectc');
selectc.onchange = async () => {
    let url = api;
    if (selectc.value !== "all") {
        const city =
            selectc.value === "0" ? "Sadbarg" :
            selectc.value === "11" ? "Prafsayuz" :
            selectc.value === "2" ? "Kafedra" :
            selectc.value === "3" ? "Sirk" : "Khujand";
        
        url += `?city=${city}`;
    }
    try {
        const { data } = await axios.get(url);
        getData(data);
    } catch (error) {
        console.error(error);
    }
}


async function editUser(id) {
    try {
        const response = await fetch(`${api}/${id}`);
     
     const user = await response.json();
     
     user.status = !user.status;

        await putUser(id, user);

        get();
    } catch (error) {
        console.error(error);
    }
 }

export {get , deleteUser ,postUser , putUser ,editUser}