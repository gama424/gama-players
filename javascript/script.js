//NAVBAR

class MobileNavbar {
    constructor(mobileMenu, navList, navLinks) {
      this.mobileMenu = document.querySelector(mobileMenu);
      this.navList = document.querySelector(navList);
      this.navLinks = document.querySelectorAll(navLinks);
      this.activeClass = "active";
  
      this.handleClick = this.handleClick.bind(this);
    }
  
    animateLinks() {
      this.navLinks.forEach((link, index) => {
        link.style.animation
          ? (link.style.animation = "")
          : (link.style.animation = `navLinkFade 0.5s ease forwards ${
              index / 7 + 0.3
            }s`);
      });
    }
  
    handleClick() {
      this.navList.classList.toggle(this.activeClass);
      this.mobileMenu.classList.toggle(this.activeClass);
      this.animateLinks();
    }
  
    addClickEvent() {
      this.mobileMenu.addEventListener("click", this.handleClick);
    }
  
    init() {
      if (this.mobileMenu) {
        this.addClickEvent();
      }
      return this;
    }
  }
  
  const mobileNavbar = new MobileNavbar(
    ".mobile-menu",
    ".nav-list",
    ".nav-list li",
  );
  mobileNavbar.init();



///SOUNDBOARD
  let audios = [
    {caminho:'/assets/audio/Finish Him!.mp3'},
    {caminho:'/assets/audio/GTA San Andreas.mp3'},
    {caminho:'/assets/audio/Hadouken.mp3'},
    {caminho:'/assets/audio/HeadShot.mp3'},
    {caminho:'/assets/audio/Mario-Jump.mp3'},
    {caminho:'/assets/audio/Metal Slug - Mission Complete!.mp3'},
    {caminho:'/assets/audio/Resident Evil.mp3'},
    {caminho:'/assets/audio/Sonic.mp3'},
    {caminho:'/assets/audio/Megaman.mp3'},
    {caminho:'/assets/audio/gameover.mp3'},
];

//array com os audios



let botoes = document.querySelectorAll('.botao');


//loop percorando os audios
for (let i=0; i < 10; i++){
  botoes[i].setAttribute('data-item', i);
}

let audioTag = document.querySelector('audio');


//selecionando cada botao individualmente
  botoes.forEach(botao => {
    //evento de click
    botao.addEventListener('click', () => {
      let som = audios[botao.getAttribute('data-item')];
      audioTag.setAttribute('src', som.caminho);
      
      audioTag.addEventListener('loadeddata', () => {
          audioTag.play();
      });
  });
});


//INTRO

// Get the modal
var modal = document.getElementById("intro");

// Get the button that opens the modal
var btn = document.getElementById("starting");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

