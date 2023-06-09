

//creation de l'ouverture et de la fermeture du modal
const modal = document.querySelector(".modal")
const closeBtn = document.querySelector(".close")
const openBtn = document.querySelector(".openModal")
const logOut = document.getElementById("logout")

logOut.addEventListener("click",function(){
    sessionStorage.clear
}) 

openBtn.onclick = function(){
    modal.style.display = "block"
}
closeBtn.onclick = function(){
    modal.style.display = "none"
}
// le modal se ferme si l'utilisateur click en dehors
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

      //bouton "ajouter une photo"
      const addButton = document.querySelector('.modal_addBtn');
      //page modal avec portfolio
      const modalGallery1 = document.querySelector('.modalLVL1');
      //bouton flèche sur page modal ajout de projet
      const returnBtn = document.querySelector('.returnmodal');
      //page modal ajout de projet
      const modalAddPhoto = document.querySelector('.modalLVL2');
      //bouton de fermeture page modal ajout de projet
      const close2Btn = document.querySelector('.close2');
  
      //on bascule d'une page modale à l'autre à l'aide des boutons
      addButton.onclick = function(){
          modalGallery1.style.display = "none"
          modalAddPhoto.style.display = "flex"
      }
  
      returnBtn.onclick = function(){
          modalAddPhoto.style.display = "none"
          modalGallery1.style.display = "flex"
      }
  
      close2Btn.onclick = function(){
          modalAddPhoto.style.display = "none"
      }
  
  //Une preview image apparait dans la modale après le chargement de celle-ci
      //on récupère le bouton d'ajout de projet
      const addProjectBtn = document.querySelector('.custom-file-upload');
      const previewImg = document.querySelector('.previewImg');
      const Title = document.getElementById('title');
      const categorySelection = document.getElementById('category-select');
  
   
      let openFile = function(event) {
          let input = event.target;
      
          let reader = new FileReader();
          reader.onload = function(){
              //on récupère le résultat de filereader (image chargée)
            let dataURL = reader.result;
              //on récupère la div pour la preview img
            let output = document.querySelector('.previewImg');
              //on modifie la source de notre balise img pour la preview
            output.src = dataURL;
          };
          reader.readAsDataURL(input.files[0]);
        };
  
  
//fin modal


const gallery = document.querySelector('.gallery')


//fonction pour générer le portfolio
function creationPortfolio (data){

    for (i = 0; i < data.length; i++) {

        //création des éléments image et assignation du contenu dynamique via l'API
        const card = document.createElement("figure")
        card.setAttribute("id", data[i].category.name)
        card.setAttribute("data-id", data[i].id)
        card.classList.add("fig")
        const image = document.createElement("img")
        image.src = data[i].imageUrl
        const imgTitle = document.createElement("figcaption")
        imgTitle.innerHTML = data[i].title
    
        //on lie les contenus créés aux parents pour affichage
        gallery.appendChild(card)
        card.appendChild(image)
        card.appendChild(imgTitle)
    }
}


//fonction pour générer la liste de projet dans le modal (avec bouton poubelle)

const modalGallery = document.querySelector('.modal_content_photos');
function genererlisteModal(data){

    for (i=0; i<data.length; i++){
        const card = document.createElement("div")
        card.classList.add("modal_photos")
        card.setAttribute("id","a"+ data[i].id)
        const image = document.createElement("img")
        image.src = data[i].imageUrl
        //image.setAttribute("id",data[i].id)
        const binDiv = document.createElement("div")
        binDiv.classList.add("modal_suppr_icon")
        //binDiv.setAttribute("id",[i])
        const binIcon = document.createElement("img")
        binIcon.classList.add("btn")
        binIcon.src = '../FrontEnd/assets/icons/trash-can-solid-white.png'
        binIcon.setAttribute("id",data[i].id)
        //console.log(binIcon.id)
        const editText = document.createElement("span")
        editText.innerHTML = "éditer"

        modalGallery.appendChild(card)
        card.appendChild(image)
        card.appendChild(binDiv)
        card.appendChild(editText)
        binDiv.appendChild(binIcon)
        
    }
}



//génération de la liste des projets dans le modal

fetch("http://localhost:5678/api/works")
    .then(reponse => reponse.json())
    .then(data =>{

        genererlisteModal(data)
    })

    //Btn id = index de la photo
    const mm = document.querySelector('.openModal')
    mm.addEventListener("click",function(){
        let Btn = document.querySelectorAll('.btn')
        //console.log(Btn)
    
    

    //au click sur une icone on récupère son id et on supprime le projet avec index ===
    // on vérifie le token pour donner l'autorisation de supprimer
    for(let i=0 ; i<Btn.length ; i++){
        Btn[i].addEventListener("click",function(event){
            let index= Btn[i].id
            fetch('http://localhost:5678/api/works/' + index,{
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              },
        })
            .then(response => response.json())
            .then(data0 => console.log(data0))
            

        //mise a jour portfolio
                //ON SUPPRIME LE CONTENU DU PORTFOLIO ET DU MODAL
                document.querySelector('.gallery').innerHTML="";
                document.querySelector('.modal_content_photos').innerHTML="";
             
                //RECHARGEMENT DU NOUVEAU CONTENU POUR LE MODAL ET LE PORTFOLIO
                 fetch("http://localhost:5678/api/works")
                .then(reponse => reponse.json())
                .then(data2 =>{

                genererlisteModal(data2)
                creationPortfolio(data2)
                })
                

        })
    
    }
    
})

    

 
    


//Envoi du projet vers l'API si les champs sont remplis sinon message erreur
    const SendButton = document.querySelector('.modal_Valider');
    const errorMsg = document.getElementById('error');
    

//verification du contenu des champs
    window.addEventListener("change", function(){
        if(previewImg.src !== "#" && Title.value !== "" && categorySelection.value !== ""){
            SendButton.style.backgroundColor = "#1D6154";
            errorMsg.style.opacity = 0;
            SendButton.classList.remove("errorAnim");
          }else{
            SendButton.style.backgroundColor = "#A7A7A7";
            errorMsg.style.opacity = 0;
            SendButton.classList.remove("errorAnim");
          }
    })


    SendButton.addEventListener("click", function(){
        let newImgUrl = document.getElementById('file-upload').files[0];
        let imgUrl = document.querySelector('.divAjoutImage img').src
        const formData = new FormData()
        formData.append("image", newImgUrl)
        formData.append("title", Title.value)
        formData.append("category", categorySelection.value)


        if(previewImg.src !== "#" && Title.value !== "" && categorySelection.value !== ""){

            fetch('http://localhost:5678/api/works/',{
            method: 'POST',
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              },
            body : formData
        })
        .then(reponse => reponse.json())
        .then(data => {
            console.log(data)
            modalAddPhoto.style.display = "none" 


            previewImg.src="";
            Title.value="";
            categorySelection.value="";
            //ON SUPPRIME LE CONTENU DU PORTFOLIO ET DU MODAL
            document.querySelector('.gallery').innerHTML="";
            document.querySelector('.modal_content_photos').innerHTML="";
             
            //RECHARGEMENT DU NOUVEAU CONTENU POUR LE MODAL ET LE PORTFOLIO
             fetch("http://localhost:5678/api/works")
            .then(reponse => reponse.json())
            .then(data2 =>{
            console.log(data2)

            genererlisteModal(data2)
            creationPortfolio(data2)
            })
             
            

        })
        .catch((err) => {
            alert("Unauthorized");
              })  

          }else{
            SendButton.style.backgroundColor = "#A7A7A7";
            errorMsg.style.opacity = 1;
            SendButton.classList.add("errorAnim");
            //console.log(imgUrl)
          }
    })
      




//fonction pour générer les boutons filtres
function creationFiltres(cat){

    for(let i=0 ; i< cat.length ; i++){
        const button= document.querySelector('.filterSection')

        const buttonDiv= document.createElement("li")
        //buttonDiv.className = "filterSection_filter"
        //buttonDiv.setAttribute("data-filter",data[i].category.name)
        buttonDiv.innerHTML = cat[i].name

        button.appendChild(buttonDiv)

    }
}


//on récupère dynamiquement les données pour le portfolio via l'API
//npm start en backend pour lancer API Swagger
//fetch créé le lien avec l'API
//.then recupere les donnees et les traite en json
//.then donne donnees traduite avec data
//on appelle la fonction
    fetch("http://localhost:5678/api/works")
    .then(reponse => reponse.json())
    
    .then(data =>{
        

    creationPortfolio(data)


//création des boutons filtres catégories

fetch("http://localhost:5678/api/categories")
    .then(reponse => reponse.json())
    //.then(test => console.table(test))
    .then(cat =>{
        
        creationFiltres(cat)
    


//filtre au clique sur les boutons dédié

//on récupère une référence vers les boutons et vers les articles
const liItem = document.querySelectorAll('ul li');
const imgItem = document.querySelectorAll('.product figure');

    //pour chaque clique sur un bouton "filtre"
    liItem.forEach(li => {
        li.addEventListener("click",function(){
            //on ajoute la class active au bouton cliqué et on le retire aux autres
            //on récupère la valeur du filtre avec "value"
            let value = li.textContent
            liItem.forEach(li => {
                li.className = '';
            });
            li.className = 'active';
        
            //on passe chaque réf en revue et on compare son id avec la valeur du bouton filtre
            // si valeurs identiques alors l'article reste visible (block)
            //si valeur différentes alors article invisible (none + scale(0)
            for(i=0;i<data.length;i++){
                
                if(imgItem[i].getAttribute('id') == value || value == "Tous"){
                    imgItem[i].style.transform = 'scale(1)';
                    imgItem[i].style.display = 'block';
                }else{
                    imgItem[i].style.transform = 'scale(0)';
                    imgItem[i].style.display = 'none';
                }
            }

        }
    )})
})
})
.catch((err) => {
    alert("Erreur serveur");


      })
    
    