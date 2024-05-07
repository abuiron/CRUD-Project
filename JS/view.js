//this the API and we need to use it for my purpose 
//it's not change so we use const
//first step
const API_URL = "https://66371223288fedf6937f5636.mockapi.io/USERS"

//url params for location search
const urlParams = new URLSearchParams(window.location.search)

const id = urlParams.get("id")

//your form should have the name="createForm" inorder to work this approach

let myForm = document.forms["createForm"];

myForm.addEventListener('submit',async(e)=>{

    //for not auto reload the page 
    e.preventDefault()

    try{
        let data = {

            name:myForm.name.value,
            email:myForm.email.value,
            mobile:myForm.mobile.value,
            address:{
                state:myForm.state.value,
                city:myForm.city.value,
                pincode:myForm.pincode.value,
            }
        }
        let res = await fetch(`${API_URL}/${id}`,{
            headers:{
                "Content-Type":"application/json"
            },
            method:"PUT",
            body:JSON.stringify(data)
        })
        if(res.status===200)
        {
            window.location.href='./../index.html'
        }
        else{
            alert(`${res.status} - ${res.statusText}`)
        }

    }
    catch(error)
    {
        console.error(error);
    }
})

async function getData()
{
    try
    {
        let res = await fetch(`${API_URL}/${id}`)

        if(res.status===200)
        {
            let data = await res.json()

            document.getElementById("name").value = data.name
            document.getElementById("email").value = data.email
            document.getElementById("mobile").value = data.mobile
            document.getElementById("state").value = data.address.state
            document.getElementById("city").value = data.address.city
            document.getElementById("pincode").value = data.address.pincode
            console.log(data)
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
getData()