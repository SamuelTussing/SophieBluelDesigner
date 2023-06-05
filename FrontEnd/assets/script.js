document.body.onload=function(){

//on récupère dynamiquement les données pour le portfolio via l'API
//npm start en backend pour lancer API Swagger
//fetch créé le lien avec l'API
//.then recupere les donnees et les traite en json
//.then donne donnees traduite avec data
    fetch("http://localhost:5678/api/works")
    .then(reponse => reponse.json())
    //.then(test => console.table(test))
    .then(data =>{

const gallery = document.querySelector('.gallery')

for (i=0; i<data.length; i++){

    //création des éléments image et assignation du contenu dynamique via l'API
    const card = document.createElement("figure")
    card.setAttribute("id",data[i].category.name)
    const image = document.createElement("img")
    image.src = data[i].imageUrl
    const imgTitle = document.createElement("figcaption")
    imgTitle.innerHTML = data[i].title

    //on lie les contenus créés aux parents pour affichage
    gallery.appendChild(card)
    card.appendChild(image)
    card.appendChild(imgTitle)
}

let IdMax = 0

//on récupère dynamiquement le nombre de catégories dispos sur l'API
let nbrCategory = 0

for (i=0; i<data.length;i++){
    if (data[i].category.id>nbrCategory){
        nbrCategory=data[i].category.id
    }

}
//nbrcategory=3, on doit créer des variables avec nom category dynamiquement
let category=0
let category1=data[0].category.name
let category2=data[1].category.name
let category3=data[2].category.name

//création des boutons filtres en fonction des category existantes
for (i=0; i<nbrCategory;i++){
    const button= document.querySelector('.filterSection')

    const buttonDiv= document.createElement("li")
    //buttonDiv.className = "filterSection_filter"
    //buttonDiv.setAttribute("data-filter",data[i].category.name)
    buttonDiv.innerHTML = data[i].category.name

    button.appendChild(buttonDiv)

}

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
      }
    