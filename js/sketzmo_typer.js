
const letter_container = document.querySelector("#guessLetters");

const handleKey = (e) => {
	if (e.key.length === 1) {
		const letter = e.key.toUpperCase();

		const lis = Array.from(letter_container.getElementsByTagName("li"))
		.filter(li => !li.classList.contains("used"));
		
		lis.every(li => {
			if (li.getElementsByTagName("span")[0].innerHTML === letter) {
				li.firstChild.click();
				return false;
			}
			return true;
		})
	}
	else if (e.key === "Backspace" || e.key === "Delete") {
		const letters = document.querySelector("#guessInput");
		if (letters) {
			const letter_boxes = Array.from(letters.getElementsByTagName("span"));
			for (let i = letter_boxes.length - 1; i >= 0; i--) {
				if (letter_boxes[i].innerHTML !== '') {
					letter_boxes[i].click();
					break;
				}
			}
		}
	}
}

if (letter_container) {
	window.addEventListener("keydown", handleKey, true);
}