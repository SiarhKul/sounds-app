
const aud = document.querySelector('#sound')
console.log(aud);

let slidWidth = 0;
let count = 0;
const sliderContainer = document.querySelector('.slider');
const slider = sliderContainer.querySelector('.slider-wrapper');
const sliderItem = slider.querySelectorAll('.slider-slide');
const sliderArrows = sliderContainer.querySelectorAll('.slider-btn');
const btnFulScreen = document.querySelector('.fullscreen');
const maxWidth = sliderItem[0].clientWidth * (sliderItem.length - 1)

btnFulScreen.addEventListener('click', setFullScreen)
sliderArrows[0].addEventListener('click', flipLeft);
sliderArrows[1].addEventListener('click', addSound);
// sliderArrows[1].addEventListener('click', flipRight);
window.addEventListener('resize', resize);

function addSound() {
	// const song = new Audio('./assets/sounds/sea.mp3')
	const song = new Audio('./assets/sounds/comptine-dun.mp3')
	song.play()
	document.body.append(song)
	// sliderItem.forEach((elem, i) => {
	// 	if (i === count) {
	// 		// song.src = './assets/sounds/sea.mp3'
	// 		console.dir(elem)
	// 	}

	// })
}

function setFullScreen() {
	if (!document.fullscreenElement) {
		sliderItem.forEach((elem, i) => {
			i === count ? elem.requestFullscreen() : elem
		})
		// document.documentElement.requestFullscreen();
	} else {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		}
	}
}

function flipLeft() {
	if (count !== 0) {
		count--;
		slidWidth -= sliderItem[count].clientWidth;
		slider.style.transform = `translateX(-${slidWidth}px)`;
	} else {
		count = sliderItem.length - 1;
		slidWidth = maxWidth;
		slider.style.transform = `translateX(-${slidWidth}px)`;
	}

}

function flipRight() {
	if (count < sliderItem.length - 1) {
		count++;
		slidWidth += sliderItem[count].clientWidth;
		slider.style.transform = `translateX(-${slidWidth}px)`;
	} else {
		count = 0;
		slidWidth = 0;
		slider.style.transform = `translateX(-${slidWidth}px)`;
	}
}

function resize() {
	slider.style.transform = `translateX(-${sliderItem[0].clientWidth * count}px)`;

}

function slideInit(elem) {
	const surface = elem;
	const threshold = 150;
	const restraint = 100;
	const allowedTime = 300;
	let startX = 0;
	let startY = 0;
	let distX = 0;
	let distY = 0;
	let startTime = 0;
	let elapsedTime = 0;

	surface.addEventListener('mousedown', function (e) {
		e.target.style.cursor = 'pointer'
		startX = e.pageX;
		startY = e.pageY;
		startTime = new Date().getTime();
		e.preventDefault();
	}, false);

	surface.addEventListener('mouseup', function (e) {
		distX = e.pageX - startX;
		distY = e.pageY - startY;
		elapsedTime = new Date().getTime() - startTime;
		if (elapsedTime <= allowedTime) {
			if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
				if ((distX > 0)) {
					flipRight();
				} else {
					flipLeft();;
				}
			}
		}
		e.preventDefault();
	}, false);

	surface.addEventListener('touchstart', function (e) {
		console.log(e.target)
		if (e.target.classList.contains('slider-btns') || e.target.classList.contains('slider-btn')) {
			e.target.classList.contains('slider-btn--prev') ? flipRight() : flipLeft();

		}
		let touchobj = e.changedTouches[0];
		startX = touchobj.pageX;
		startY = touchobj.pageY;
		startTime = new Date().getTime();
		e.preventDefault();
	}, false);

	surface.addEventListener('touchmove', function (e) {
		e.preventDefault();
	}, false);

	surface.addEventListener('touchend', function (e) {
		var touchobj = e.changedTouches[0];
		distX = touchobj.pageX - startX;
		distY = touchobj.pageY - startY;
		elapsedTime = new Date().getTime() - startTime;
		if (elapsedTime <= allowedTime) {
			if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
				distX > 0 ? flipRight() : flipLeft();
			}
		}
		e.preventDefault();
	}, false);
}

slideInit(sliderContainer);




