function becomeParent (node, wrapper) {
    let parent = node.parentNode;
    parent.replaceChild (wrapper, node);
    wrapper.appendChild (node);
}

function createOverlay (parent) {
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
	document.body.classList.toggle ("fulltabbed-body");
    });
    // TODO: if an element is fulltabbed, disable the overflow in the
    // body element.
    parent.appendChild (overlay);    
}

// We find all video elements.
let videoElements = new Array;
for (element of document.getElementsByTagName ("video")) {
    videoElements.push (element);
}

for (element of videoElements) {
    let container = document.createElement ("div");
    container.classList.add ("fulltab-container")
    becomeParent (element, container);

    createOverlay (container);
}
