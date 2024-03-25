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

revealToSpan();

// Timeline for the loading animation
let loadingScreen = gsap.timeline(); 

// Animate the text content inside spans
loadingScreen
    .from(".childSpan span",{
        x: 100,
        stagger: 0.2,
        duration: 1.4,
        ease: "power4.easeInOut"
    })
    .to(".parentSpan .childSpan", {
        y: "-100%",
        duration: 1,
        ease: "Circ.easeInOut"
    }, ">-1")
    .to(".loader", {
        height: 0,
        duration: 1,
        ease: Expo.easeInOut
    }, ">-1")
    .to(".green_screen", {
            height: "100vh",
            duration: 1,
            ease: "power4.in"
    },"<-2")
    .to(".green_screen", {
            height: "0",
            duration: 1,
            ease: "Expo.easeInOut"
    }, "<2")
