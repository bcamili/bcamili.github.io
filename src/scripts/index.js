import "../resources/styles/styles.css";

import "./backgroundCanvas.js"

const impressumDialog = document.getElementById("impressum-dialog")
const datenschutzDialog = document.getElementById("datenschutz-dialog")
const impressumButton = document.getElementById("impressum-button")
const datenschutzButton = document.getElementById("datenschutz-button")

impressumButton.addEventListener("click",(()=>{
    impressumDialog.showModal();
}));

impressumDialog.getElementsByTagName("button")[0].addEventListener("click",(()=>{
    impressumDialog.close()
}))

datenschutzButton.addEventListener("click",(()=>{
    datenschutzDialog.showModal();
}));

datenschutzDialog.getElementsByTagName("button")[0].addEventListener("click",(()=>{
    datenschutzDialog.close()
}))


const nav = document.getElementsByClassName("nav-button");
for (let child of nav){
    child.addEventListener("click", (e)=>{
        let old = document.getElementsByClassName("current")[0]
        if(old){
            old.classList.remove("current")
        }
        let current = e.target.closest("div");
        current.classList.add("current")
    })
}

const logo = document.getElementById("logo")

logo.addEventListener("click", ()=>{
    let old = document.getElementsByClassName("current")[0]
        if(old){
            console.log(old)
            old.classList.remove("current")
        }
})


const form = document.getElementsByTagName('form')[0];
const notification = document.getElementById('form-notification-bg');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                notification.style.visibility = "visible"
                notification.style.opacity = 1
            } else {
                console.log(response);
                alert(json.message);
            }
        })
        .catch(error => {
            console.log(error);
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                notification.style.opacity = 0
            }, 3000);
        });
});