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
    gsap.set(".right_container" ,{opacity:0});
    gsap.set(".feat_work span .childSpan",{y:"100%"})

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
    homeAnimationTL.to(".header__brand",{y : "0",opacity:1,duration:3.5,ease : "bounce.out"})
    .to(".header_navItems h1",{y : "0",opacity:1,ease :Expo.easeInOut},">-.5")
    .to(".list_items",{y : "0",opacity:1,stagger:0.3,ease :"Expo.easeInOut"},">-.5")
    .to(".intro_container .row span .childSpan",{y:"-6%",opacity:1,duration: 1,ease: "Circ.easeInOut"})
    .to(".arrow svg",{opacity:1,ease :"Expo.easeInOut",
        onComplete : function(){
            animateSVG();
        }
    })
    .to(".right_container" ,{opacity:1 ,ease :"Expo.easeInOut"})
    .to(".feat_work span .childSpan",{y : "0",opacity:1,ease :Expo.easeInOut},">-.5")
}

function animateSquiggle() {

    const svg = document.querySelector("svg.squiggle");
    const path = svg.querySelector("path");
    const serviceInfo = document.querySelector(".service_info");
    const workHeader = document.querySelector(".work_header");
    const pathLength = path.getTotalLength();

    path.style.strokeDasharray = pathLength;
    // Ensure the path is initially hidden
    path.style.strokeDashoffset = pathLength;

    // Helper function to calculate animation progress
    const calculateProgress = () => {
        // Get positions
        const serviceInfoBottom = serviceInfo.getBoundingClientRect().bottom + window.scrollY;
        const workHeaderTop = workHeader.getBoundingClientRect().top + window.scrollY;

        // Adjust the start and end points
        const start = serviceInfoBottom - window.innerHeight; // Start when serviceInfo hits bottom of viewport
        const end = workHeaderTop - (window.innerHeight * 0.1); // End a bit before workHeader is at the top

        // Calculate current progress
        const scrollPosition = window.scrollY;
        let progress = (scrollPosition - start) / (end - start);

        // Clamp the progress to the range [0, 1]
        progress = Math.max(0, Math.min(1, progress));
        return progress;
    };

    // Update the animation based on the calculated progress
    const updateAnimation = () => {
        const progress = calculateProgress();
       
        path.style.strokeDashoffset = pathLength * (1 - progress);  // Update the stroke offset based on progress
        // Optionally, log the progress for debugging
        // console.log(progress);
    };

    document.addEventListener("scroll", updateAnimation);// Initial update and setup scroll event listener
    updateAnimation();
}

function cardHoverShow() {

    let containerRef = document.querySelectorAll(".img_common_cnt");
    containerRef.forEach(function(container){
        let showingImage;
        let arr_currValues;
        let img_index;
        container.addEventListener("mousemove",function(details){
           showingImage = details.target;
           img_index = details.target.dataset.index ;
           backgroundColor_set = details.target.dataset.bgc; 
           arr_currValues = document.querySelector(".cursor").children;
           showingImage.style.filter = "grayscale(1)";
           document.querySelector(".work").style.backgroundColor = backgroundColor_set;
           arr_currValues[img_index-1].style.opacity = 1 ;
           arr_currValues[img_index-1].style.transform = `translate(${details.clientX}px ,${details.clientY}px)` ;
           
        })
        container.addEventListener("mouseleave",function(details){
           showingImage.style.filter = "grayscale(0)";
           arr_currValues[img_index-1].style.opacity = 0 ;
           document.querySelector(".work").style.backgroundColor = "#F2F2F2";
           
         })
    });
}
/**
 * Initiates the animation sequence for the web page. The execution order is crucial to ensure
 * the visual elements are revealed and animated properly.
 * 
 * The sequence begins by revealing the spans using the "revealSpan" function, which likely sets up initial
 * visibility and positions. Following that, the "valueSetters" function is called to configure initial states
 * for various elements, ensuring they are ready for animation. Finally, the `loaderAnimation` function is triggered
 * to initiate the actual loading animation, smoothly transitioning the elements into view. Additionally, the
 * `cardHoverShow` function is called to enable card hover effects, and the `animateSquiggle` function is invoked
 * to animate the squiggle SVG path based on scrolling.
 */
function initiateAnimationSequence() {
    revealSpan();     
    valueSetters();   
    loaderAnimation();
    cardHoverShow();
    animateSquiggle();
}

initiateAnimationSequence();