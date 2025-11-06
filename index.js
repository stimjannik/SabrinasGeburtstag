function setVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', setVH);
window.addEventListener('orientationchange', setVH);
setVH();

function select(game) {
    const select = document.getElementById("tabSelector");
    select.value = game;
    select.dispatchEvent(new Event("change"));
}