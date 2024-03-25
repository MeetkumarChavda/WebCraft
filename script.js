// Function to convert text inside elements with class "reveal_up" into spans
function revealSpan(){
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

function valueSetters(){
    // Animate elements off-screen
    gsap.set(".header_navItems h1, .list_items, .header__brand", {y: "-100vh" , opacity:0});
    gsap.set(".intro_container .row span .childSpan",{y:"100%"});
    gsap.set(".arrow svg",{opacity:0});

    // Prepare SVG paths for animation
    document.querySelectorAll("#Visual>g").forEach(function(e){
        let characterPath = e.childNodes[0].childNodes[0];
        characterPath.style.strokeDasharray = characterPath.getTotalLength() + 'px';
        characterPath.style.strokeDashoffset = characterPath.getTotalLength() + 'px';
    });
}

function loaderAnimation(){
    // Timeline for the loading animation
    let loadingScreen = gsap.timeline(); 

    // Animate the text content inside spans
    loadingScreen
        .from(".loader .childSpan span",{x: 150,stagger: 0.2,duration: 1.5,ease: "power4.easeInOut"})
        .to(".loader .parentSpan .childSpan", {y: "-100%",duration: 1,ease: "Circ.easeInOut"}, ">1")
        .to(".loader", {height: 0,duration: 1,ease: "Expo.easeInOut"}, "<1")
        .to(".green_screen", {height: "100vh",duration: .5,ease: "Expo.easeInOut"},">-1")
        .to(".green_screen", {height: "0",duration: 0.5,ease:  "Expo.easeInOut"}, "<")
        .to(".loader_wrapper",{height:0,delay:-1,duration: .5,ease:  "Expo.easeInOut",
            onComplete: function(){
                animateHomePage();
            }
        },">1");
}

function animateSVG(){
    gsap.to("#Visual>g>g>path ,#Visual>g>g>polyline", {
        strokeDashoffset:0,
        duration: 2,
        ease: Expo.easeInOut,
    });
}

function animateHomePage(){

    let homeAnimationTL = gsap.timeline();
    homeAnimationTL.to(".header__brand",{y : "0",opacity:1,duration:4.5,ease : "bounce.out"})
    .to(".header_navItems h1",{y : "0",opacity:1,ease :Expo.easeInOut},">-1")
    .to(".list_items",{y : "0",opacity:1,stagger:0.3,ease :"Expo.easeInOut"},">-.5")
    .to(".intro_container .row span .childSpan",{y:"-6%",opacity:1,duration: 1,ease: "Circ.easeInOut"})
    .to(".arrow svg",{opacity:1,ease :"Expo.easeInOut",
        onComplete : function(){
            animateSVG();
        }
    });
}


/**
 * Initiates the animation sequence for the web page. The execution order is critical to ensure
 * the visual elements are revealed and animated properly.
 * 
 * The sequence starts with revealing the spans using "revealSpan", which likely sets up initial
 * visibility and positions. Following that, "valueSetters" is called to configure initial states
 * for various elements, ensuring they are ready for animation. Finally, `loaderAnimation` triggers
 * the actual loading animation, smoothly transitioning the elements into view.
 */
function initiateAnimationSequence() {
    revealSpan();     
    valueSetters();   
    loaderAnimation(); 
}

initiateAnimationSequence();