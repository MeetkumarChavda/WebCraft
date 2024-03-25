// Function to convert text inside elements with class "reveal_up" into spans
function revealToSpan(){
    document.querySelectorAll(".reveal_up").forEach(function(element){

        let parentSpan = document.createElement("span");
        let childSpan = document.createElement("span");
       
        parentSpan.classList.add("parentSpan");
        childSpan.classList.add("childSpan");
        
        childSpan.innerHTML=element.innerHTML;
        parentSpan.appendChild(childSpan);

        element.innerHTML = "";
        element.appendChild(parentSpan);
    });
}

function loaderAnimation(){
    // Timeline for the loading animation
    let loadingScreen = gsap.timeline(); 

    // Animate the text content inside spans
    loadingScreen
        .from(".loader .childSpan span",{
            x: 150,
            stagger: 0.2,
            duration: 1.5,
            ease: "power4.easeInOut"
        })
        .to(".loader .parentSpan .childSpan", {
            y: "-100%",
            duration: 1,
            ease: "Circ.easeInOut"
        }, ">1")
        .to(".loader", {
            height: 0,
            // delay:-1,
            duration: 1,
            ease: "Expo.easeInOut"
        }, "<1")
        .to(".green_screen", {
                height: "100vh",
                duration: .5,
                ease: "Expo.easeInOut"
        },">-1")
        .to(".green_screen", {
                height: "0",
                duration: 0.5,
                ease:  "Expo.easeInOut"
        }, "<")
        .to(".loader_wrapper",{
            height:0,
            delay:-1,
            duration: .5,
            ease:  "Expo.easeInOut",
            onComplete: function(){
                animateHomePage();
                animateSVG();
            }
        },">1");
}

function animateSVG(){
    document.querySelectorAll("#Visual>g").forEach(function(e){
        let characterPath = e.childNodes[0].childNodes[0];
        characterPath.style.strokeDasharray = characterPath.getTotalLength() + 'px';
        characterPath.style.strokeDashoffset = characterPath.getTotalLength() + 'px';
    });

    gsap.to("#Visual>g>g>path ,#Visual>g>g>polyline", {
        strokeDashoffset:0,
        duration: 2,
        ease: Expo.easeInOut,
        delay:5.5,
    });
}

function animateHomePage(){
    gsap.set(".header_navItems h1",{y : "-100vh"});
    gsap.set(".list_items",{y : "-100vh"});
    gsap.set(".header__brand",{y:"-100vh"});
    gsap.set(".intro_container .row span .childSpan",{y:"100%"});
    gsap.set(".arrow svg",{opacity:0})
    
    let homeAnimationTL = gsap.timeline();

   
    homeAnimationTL.to(".header__brand",{
        y : "0",
        duration:4.5,
        ease : "bounce.out"
    })
    .to(".header_navItems h1",{
        y : "0",
        ease :Expo.easeInOut
    },">-1")
    .to(".list_items",{
        y : "0",
        stagger:0.3,
        ease :"Expo.easeInOut"
    },">-.5")
    .to(".intro_container .row span .childSpan",{
        y:"-6%",
        duration: 1,
        ease: "Circ.easeInOut"
    })
    .to(".arrow svg",{
        opacity:1,
        ease :"Expo.easeInOut"
    })


}
revealToSpan();
loaderAnimation();

