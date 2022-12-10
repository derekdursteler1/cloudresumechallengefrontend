/* Show Menu */
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)
    
    // Validate that variables exist
    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            // We add the show-menu class to the div tag with the nav__menu class
            nav.classList.toggle('show-menu')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/* Remove Mobile Menu */
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/* Scroll Section Active Link */
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)


/* Show Scroll Top */

function scrollTop(){
    const scrollTop = document.getElementById('scroll-top');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 300) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollTop)

/* Dark light mode */
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/* Reduce Size and Print on A4 Sheet */
function scaleCv() {
    document.body.classList.add('scale-cv')
}
/* remove size when downloaded */
function removeScale(){
    document.body.classList.remove('scale-cv')
}

/* Generate PDF */
let areaCv = document.getElementById('area-cv')
let resumeButton = document.getElementById('resume-button')

let opt = {
    margin:         0,
    filename:       'myResume.pdf',
    image:          { type: 'jpeg', quality: 0.98 },
    html2canvas:    { scale: 4 },
    jsPDF:          { format: 'a4', orientation: 'portrait' }
}

function generateResume (){
    html2pdf(areaCv, opt)
}
resumeButton.addEventListener('click', () => {
    scaleCv()

    generateResume()

    setTimeout(removeScale, 5000)
})

/* Visitor count */

// let websiteCounter = document.getElementById('website-counter');
fetch('https://5he6i1iju5.execute-api.us-east-1.amazonaws.com/Prod/hello')
.then((response => response.json()))  
.then((data) => {document.getElementById("website-counter").innerHTML = data});

// if (visitCount) {
//     visitCount = Number(visitCount) + 1;
//     localStorage.setItem('page_view', visitCount);
// } else {
//     visitCount = 1;
//     localStorage.setItem('page_view', 1);
// }
// websiteCounter.innerHTML = visitCount;
