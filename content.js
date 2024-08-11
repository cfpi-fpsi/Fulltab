function becomeParent (node, wrapper) {
    let parent = node.parentNode;
    parent.replaceChild (wrapper, node);
    wrapper.appendChild (node);
}

// This variable holds all "containers" for videos, which usually
// have extra elements like controls, subtitles, etc.
let containerElements = new Array;
// First of all, we find all container elements, which are usually
// <div> elements with a "player" ID.
const commonIds = [ "player", "movie_player" ];
for (id of commonIds) {
    let element = document.getElementById (id);
    if (element !== null) {
	containerElements.push (element);
    }
}
// After that is done, we find all <video> elements, checking also
// if they are inside of the aforementioned container elements.
let videoElements = new Array;
for (element of document.getElementsByTagName ("video")) {
    let skip = false;
    for (container of containerElements) {
	if (container.contains (element)) {
	    skip = true;
	}
    }

    if (!skip) {
	videoElements.push (element);
    }
}

function createOverlay (parent) {
    let overlay = document.createElement ("div");
    overlay.classList.add ("fulltab-overlay");
    // This is where the actual "fulltabbing" happens. The fulltab
    // overlay is always a child of either the original container or a
    // fulltab container. So the parent gets a special style.
    overlay.onclick = function () { overlay.parentNode.classList.toggle ("fulltabbed"); };
    parent.appendChild (overlay);    
}

// In the case of containers, making an overlay is trivial.
for (element of containerElements) {
    createOverlay (element);
}

// In the case of sole video elements however, we have to create a
// parent container AND the overlay.
for (element of videoElements) {
    let container = document.createElement ("div");
    container.classList.add ("fulltab-container")
    becomeParent (element, container);

    createOverlay (container);
}
