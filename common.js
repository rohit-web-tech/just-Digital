let navbarScroll = () => { 
    const navBar = document.querySelector("#navbar");
    let scroll = window.scrollY ;
    if(scroll < 20 ){
        navBar.classList.remove("white-nav-bar");
    }else{
        navBar.classList.add("white-nav-bar");
    }
}
window.onscroll=()=>{
    navbarScroll();
};
const loader = document.querySelector("#loader");
const mainWeb = document.querySelector("#main-website");
window.onload=()=>{
    loader.style.display="none";
    mainWeb.style.display="block";
}

const menuBtn = document.querySelector(".menu");
const menuBar = document.querySelector("#menu-bar");
const closeMenu = document.querySelector(".close-menu-btn");

menuBtn.onclick=()=>{
    menuBar.style.display="block";
}

closeMenu.onclick=()=>{
    menuBar.style.display="none";  
}
let queryObj = {
    userName : "",
    userNumber : "",
    userEmail : "",
    userQuery : "" 
} ;
const inputBoxes = document.querySelectorAll(".input-box");
const sendQueryBtn = document.querySelector(".request-quote-btn");
inputBoxes.forEach(inputBox=>{
    inputBox.oninput=()=>{
        queryObj = {...queryObj,[inputBox.name]:inputBox.value};
        console.log(queryObj);
    }
})
sendQueryBtn.onclick=(e)=>{
    e.preventDefault();
    btnText = sendQueryBtn.innerText ;
    sendQueryBtn.innerHTML=`<img src="./images/loading-gif.gif" alt="gif">Sending Your Query...` ;
    sendQueryBtn.classList.add("deactive");
    fetch("https://jdserver-eeeo.onrender.com/sendQuery",{method:"POST",body:JSON.stringify(queryObj),headers:{"Content-Type":"application/json"}})
    .then(res=>res.json()).then(res=>{
        sendQueryBtn.innerText=btnText;
        sendQueryBtn.classList.remove("deactive");
        if(res=="success"){
            alertify.success('Your Query sent Successfully');
            queryObj = {
                userName : "",
                userNumber : "",
                userEmail : "",
                userQuery : "" 
            } ;
            inputBoxes.forEach(inputBox=>{
                inputBox.value="";
            })
        }else{
            alertify.error(res);
        }
    }).catch(err=>console.log(err));
}


