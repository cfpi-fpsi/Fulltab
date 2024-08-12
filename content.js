function becomeParent (node, wrapper) {
    let parent = node.parentNode;
    parent.replaceChild (wrapper, node);
    wrapper.appendChild (node);
}

function addOverlay (parent) {
    let overlay = document.createElement ("div");
    overlay.classList.add ("fulltab-overlay");
    overlay.innerText = "T";
    // This is where the actual "fulltabbing" happens. The fulltab
    // overlay is always a child of either the original container or a
    // fulltab container. So the parent gets a special style. This
    // must be an event listener, you cannot just add an onclick
    // because the browser will cry.
    overlay.addEventListener ("click", function () {
	overlay.parentNode.classList.toggle ("fulltabbed");
	overlay.parentNode.getElementsByTagName ("video")[0].classList.toggle ("fulltabbed");
	document.body.classList.toggle ("fulltabbed-body");
    });
    
    parent.appendChild (overlay);    
}

// We find all video elements.
let videoElements = document.getElementsByTagName ("video");

for (element of videoElements) {
    console.log ("[Fulltab] Found video element with ID: `" + element.id + "'. Creating container and overlay.");
    
    let container = document.createElement ("div");
    container.classList.add ("fulltab-container");
    addOverlay (container);
    becomeParent (element, container);
}
