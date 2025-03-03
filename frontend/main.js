let modal = document.getElementById("loginModal");
let btn = document.getElementById("loginBtn");
let span = document.getElementsByClassName("close-btn")[0];

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
function login()
{
    const USERNAME = document.getElementById("username").value;
    const PASSWORD = document.getElementById("password").value;
  
    fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: USERNAME, password: PASSWORD }),
    })
      .then((response) => response.json())
      .then(data => {console.log('Response:', data);
  
        if(data.access){
          localStorage.setItem('access', data.access);
          localStorage.setItem('refresh', data.refresh);
          
          window.location.href= 'dashboard.html';
          
          
        }else{
          console.log('Kein Access Token vorhanden')
        }
      });
  
    return false;
  }


document.getElementById("username").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        login();
    }
});

document.getElementById("password").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        login();
    }
});