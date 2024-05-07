//api url
const API_URL = "https://66371223288fedf6937f5636.mockapi.io/USERS"

//selecting form  for create 

let myForm = document.getElementById("createForm");

//give event for submit button to get all the value

myForm.addEventListener('submit',async(e)=>{
    
    //this is for no auto reload for sumbmit buton
    e.preventDefault()

    try{

        let data = {

            name:document.getElementById("name").value,
            email:document.getElementById("email").value,
            mobile:document.getElementById("mobile").value,
            address:{
                state:document.getElementById("state").value,
                city:document.getElementById("city").value,
                pincode:document.getElementById("pincode").value
            },
            status:true
        }
        let res = await fetch(API_URL,{
            headers:{
                "Content-Type":"application/json"
            },
            method:"POST",
            body:JSON.stringify(data)
        })
        if(res.status===201)
        {
            window.location.href="./../index.html"
        }
        else{
            alert(`${res.status} - ${res.statusText}`);
        }


    }
    catch(error)
    {
        console.error(error);
    }
})