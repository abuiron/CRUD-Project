//write function for table

//this the API and we need to use it for my purpose 
//it's not change so we use const
//first step
const API_URL = "https://66371223288fedf6937f5636.mockapi.io/USERS"


//after fetch the api we need the place to store the data
//then this functio is for create a table body for data
//third step
function constructTable(data)
{

    //select the body table for append the data
    let tbody = document.getElementById("table-body")
    tbody.innerHTML = "" // it'll make the body empty before put the data

    //get all the data in the api using loop , we use for each bcoz it's an object
    data.forEach((e) => {
        
        //creating a tr for he table data with every row
        let tr = document.createElement("tr")
        tr.innerHTML = `
        <td>${e.id}</td>
        <td>${e.name}</td>
        <td>${e.email}</td>
        <td>${e.mobile}</td>
        <td>
        <label class="switch">
        <input type="checkbox" ${e.status?"checked":""} onclick="toggleuser(${e.id},${e.status})">
        <span class="slider round"></span>
        </label>
        </td>
        <td>
           <button class="btn btn-primary" onclick="navigate(${e.id})">Edit</button>
           <button class="btn btn-danger" onclick="deleteData(${e.id})">Delete</button>
        </td>
        `

        //append the r with data into the tbody for every data
        tbody.appendChild(tr)
        
    });
}

//this is edit button onclick function
function navigate(id)
{
    window.location.href=`./../HTML/view.html?id=${id}`
    

}

//this is delete button onclick function
//we use async because we manipulate or delete the data
async function deleteData(id)
{
    try{
        let res = await fetch(`${API_URL}/${id}`,{

            //we use delete for it 
        method:"DELETE"
    })
    if(res.status===200)
    {
        fetchData()
    }
    else
    {
        alert(`${res.status} - ${res.statusText}`)
    }

    }
    catch(error)
    {
        console.error(error);

    }

}

//it's for the status data because status is boolean so we didn't declareanything
//it'll return false 
async function toggleuser(id,status)
{
    try{

        let res = await fetch(`${API_URL}/${id}`,{
            headers:{
                "Content-Type":"application/json"
            },
            method:"PUT",
            body:JSON.stringify({
                status:status?false:true
            })
        })
        if(res.status===200)
        {
            fetchData()
        }
        else{
            alert(`${res.status} - ${res.statusText}`)
        }
    }
    catch(error)
    {
        console.error(error);
    }

}

//first we need to fetch the api using this function
//second step
async function fetchData(){

    try{
        let res = await fetch(API_URL,{
        
            //it's he header type for proper way
        headers:{
            "Content-Type":"application/json"
        },
        method:"GET"
    })

    let data = await res.json() // convert the res into json

    //if the res status connection is 200(successful) then this code executed
    if(res.status===200)
    {
        //it'll call the table body function
        constructTable(data)
        //console.log(data) check the data will work then it's not need

    }
    //else the alert message shoe the response error like 404(not found)
    else{
        alert(`${res.status} - ${res.statusText}`)
    }


    }
    //if try function failed then this will catch the error and show that
    catch(error)
    {
        console.error(error)
    }

}
//call the fetch data is important because it's have a data 
//if we didn't call the function ten data of the api will not work outside the function
fetchData()