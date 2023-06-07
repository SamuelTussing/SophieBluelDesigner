document.body.onload=function(){

//on récupère le formulaire pour l'envoi sous form de var
const form = {
    email: document.getElementById("email"),
    password: document.getElementById("password"),
    submit: document.getElementById("connexion"),
};

//on  écoute au submit du formulaire pour lancer la fonction getInfo
let button = form.submit.addEventListener("click",getInfo);


//récupération des données saisies dans le formulaire
 function getInfo(event){
    event.preventDefault(); //stoppe envoi du formulaire
    let userName= document.getElementById('email').value;
    let password= document.getElementById('password').value;
    const login = "http://localhost:5678/api/users/login";


    //alert si un des champs n'est pas rempli
    if(userName.value === "" || password ===""){
        alert("Email ou mot de passe incorrect !");
        return;
    }

    //création de l'utilisateur. user sera envoyé a l'API pour validation
    let user = {
        "email" : userName,
        "password" : password
    }

    fetch(login, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email.value,
          password: form.password.value,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // code here //
          if (data.error) {
            alert("Email ou mot de passe incorrect !"); /*displays error message*/
          } else {
            window.open(
              "file:///C:/Users/Adeline/Desktop/Sam/Projet6/FrontEnd/indexAdmin.html"
            ); /*opens the target page while Id & password matches*/
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

}
