const ENDPOINT="https://687de135c07d1a878c304fa7.mockapi.io/users";

//fetch users
const getUsers=async()=>{
    const response =await fetch(ENDPOINT)
    const data =await response.json()
    return data;
}


document.getElementById('frm').addEventListener('submit',async function(e){
    e.preventDefault();
    


    const userName=document.getElementById('name').value.trim();
    const phoneNumber=document.getElementById('phonenumber').value.trim();
    const departMent=document.getElementById('department').value.trim();
    const city=document.getElementById('city').value.trim();
    const country=document.getElementById('country').value.trim();
    const imageUrl=document.getElementById('image').value.trim();
    const cutOff=document.getElementById('cutoff').value.trim();
    const selectedGender = document.querySelector('input[name="gender"]:checked');


    let nameError=document.getElementById('name-error');
    let genderError=document.getElementById('gender-error');
    let departmentError=document.getElementById('department-error');
    let phonenumberError=document.getElementById('phonenumber-error');
    let cutoffError=document.getElementById('cutoff-error');
    let cityError=document.getElementById('city-error');
    let countryError=document.getElementById('country-error');
    let imageError=document.getElementById('image-error');


    nameError.innerText="";
    genderError.innerText="";
    departmentError.innerText="";
    cutoffError.innerText="";
    phonenumberError.innerText="";
    cityError.innerText="";
    countryError.innerText="";
    imageError.innerText="";

    let isValid=true;


    if(userName===""||/\d/.test(userName)){
        nameError.innerText="Name is required!";
        isValid=false;
    }
    if(phoneNumber===""||!(/^(\+91[\-\s]?|0?91|0)?[6-9]\d{9}$/).test(phoneNumber)){
        phonenumberError.innerText="Enter valid 10 digit phonenumber"
        isValid=false;
    }
    if(departMent===""||/\d/.test(departMent)){
        departmentError.innerText="please choose any one department"
        isValid=false;
    }
    if(city===""||/\d/.test(city)){
        cityError.innerText="please enter your city"
        isValid=false;
    }
    if(country===""||/\d/.test(country)){
        countryError.innerText="please enter your country"
        isValid=false;
    }
    if(imageUrl===""||!/^https?:\/\/.*\.(jpg|jpeg|png|svg)$/i.test(imageUrl)){
        imageError.innerText="please enter a valid  image url"
        isValid=false;
    }
    if(cutOff===""||isNaN(cutOff)||cutOff<0||cutOff>200){
        cutoffError.innerText="please enter your cut off mark"
        isValid=false;
    }
    if (!selectedGender) {
        genderError.innerText = "Please select your gender";
        isValid = false;
    }
    //if valid submit to API
    if (isValid) {
    const data = {
        name: userName,
        phonenumber: phoneNumber,
        department: departMent,
        gender: selectedGender.value,
        city: city,
        country: country,
        image: imageUrl,
        cutoff: cutOff
    };

    fetch(ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
        alert("User created successfully!");
        document.getElementById('frm').reset();
    })
    .catch(err => console.error("Error:", err));
}


})

//gender select function
const genderBoxes=document.querySelectorAll('input[type="checkbox"][name="gender"]');
genderBoxes.forEach(box=>{
    box.addEventListener('click',()=>{
        genderBoxes.forEach(box=>box.checked=false);
        box.checked=true;
    })
})