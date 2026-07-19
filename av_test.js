document.querySelector(".cards-container").addEventListener("click",e=>{
    const card=e.target.closest(".clickable");
    if(card){
        window.location.href=card.dataset.url;
    }
});