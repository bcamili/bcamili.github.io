import "./styles.css";
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


const nav = document.getElementById("nav-container");
for (let child of nav.children){
    child.addEventListener("click", (e)=>{
        let old = document.getElementsByClassName("current")[0]
        if(old){
            console.log(old)
            old.classList.remove("current")
        }
        let current = e.target.closest("a");
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