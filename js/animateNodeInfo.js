function animateInfo(node){
    const nodeChildren = node.childNodes;

    const title = nodeChildren[1].innerText;

    const description = nodeChildren[3].innerText;

    

    document.getElementById("info-banner-title").innerText = title;
    document.getElementById("info-banner-description").innerText = description;

    document.getElementById("info-banner").classList.add("info-anim");

}

function removeAnimation(){
    document.getElementById("info-banner").classList.remove("info-anim");
}