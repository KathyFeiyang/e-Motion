$(document).ready(function(){
function checkRegisterInfo(){

    var oUname = document.getElementById("username");
    var oUpass = document.getElementById("password");
    var oUconfirmpass = document.getElementById("password_confirm");
    var redirect = false;
    if (oUname.value === "") {
        alert("Please enter username");
        return;
     }
    else if((oUname.value.charCodeAt(0)>=48) && (oUname.value.charCodeAt(0)<=57)){
        alert("First character must be a letter");
        return;
    }
    else if(oUpass.value === ""){
        alert("Please enter password");
        return;
     }
     else if(oUpass.value != oUconfirmpass.value){
        alert("Confirm password does not match");
    
        return;
      }
     else{
        alert("Registration successful!");
        }
    }

function openRegiWindow(){
    window.location = "./Register.html";
    return false;
}
});    