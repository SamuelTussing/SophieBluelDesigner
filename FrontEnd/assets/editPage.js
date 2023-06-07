let token = 0


const modal = document.querySelector(".modal")
const closeBtn = document.querySelector(".close")
const openBtn = document.querySelector(".openModal")

openBtn.onclick = function(){
    modal.style.display = "block"
}
closeBtn.onclick = function(){
    modal.style.display = "none"
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }