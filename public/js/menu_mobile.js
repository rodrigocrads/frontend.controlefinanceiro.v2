window.onload = function () {
    const linkMenuMobile = document.getElementById('link_menu_mobile');
    
    linkMenuMobile.addEventListener('click', function() {
        const fundoTotal = document.getElementById('fundo_total');
        const mainMenu = document.getElementById('main_menu');

        togglElement(fundoTotal);
        togglElement(mainMenu);
    });
}

function togglElement(element) {
    if (element.style.display === 'block') {
        element.style.display = '';
    } else {
        element.style.display = 'block';
    }
}