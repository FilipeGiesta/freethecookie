window.addEventListener("load", (event) => {
	setTimeout(() => main(document.body), 100);
});

/*window.addEventListener("load", (event) => {
	main(document.body);
	document.body.addEventListener("DOMNodeInserted", (event) => main(event.target));
});*/
	
function main(node) {
	let walker = document.createTreeWalker(
	node,
	NodeFilter.SHOW_ALL,
	);

	while (walker.nextNode() != null) {
		var current = walker.currentNode;
		if (current.shadowRoot) {
			allchilds(current.shadowRoot);
		}
		
		let content = walker.currentNode.textContent.toLowerCase();
		let wordlist = ["cookie", "analytics"];
		for (var i = 0; i < wordlist.length; i++) {
			if (content.includes(wordlist[i])) {
				current = walker.currentNode;
				allchilds(current);
			}
		}
	}
}

function allchilds(node) {
    if (!node.children) return;
	
	for (var i = 0; i < node.children.length; i++) {
		var child = node.children[i];
		checkbtn(child);
		allchilds(child);
	} 
}

function checkbtn(child) {
	let buttonlist = ["button", "[role=button]"];
	for (var i = 0; i < buttonlist.length; i++) {
		if (child.matches(buttonlist[i])) {
			let content = child.textContent.toLowerCase();
		
			let checklist = ["accept", "allow", "agree", "consent"];
			for (var i = 0; i < checklist.length; i++) {
				if (content.includes(checklist[i])) {
					child.click();
				}
			}
		}
	}
}