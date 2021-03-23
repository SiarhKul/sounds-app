
let slidWidth = 0;
let count = 0;
const data = [
	{
		path: ['../sounds-app/assets/sounds/comptine-dun.mp3', '../sounds-app/assets/sounds/sea.mp3'],
		nameSong: ['comptine-dum', 'sea']
	},
	{
		path: ['../sounds-app/assets/sounds/piano-wind.mp3', '../sounds-app/assets/sounds/bird.mp3'],
		nameSong: ['piano-wind', 'bird']
	}
]
const sliderContainer = document.querySelector('.slider');
const slider = sliderContainer.querySelector('.slider-wrapper');
const sliderItem = slider.querySelectorAll('.slider-slide');
const sliderArrows = sliderContainer.querySelectorAll('.slider-btn');
const btnFulScreen = document.querySelector('.fullscreen');
const maxWidth = sliderItem[0].clientWidth * (sliderItem.length - 1)
const player = document.querySelector('.playlist-item')
const playList = document.querySelector('.playlist')

btnFulScreen.addEventListener('click', setFullScreen)
// sliderArrows[0].addEventListener('click', flipLeft);
// sliderArrows[1].addEventListener('click', flipRight);
window.addEventListener('resize', resize);


// ===========================================================

sliderArrows[0].addEventListener('click', removeAudio);
sliderArrows[1].addEventListener('click', addSound);

function removeAudio() {
	const audioAll = document.querySelectorAll('audio')
	audioAll.forEach((audio) => { audio.remove() })
}

function addSound() {
	const ul = document.createElement('ul');
	playList.append(ul);
	ul.classList.add('playlist-item')
	ul.classList.add('audio')

	let html = '';

	data[count].nameSong.forEach((song, i) => {
		const li =
			`<li class="playlist-item audio" data-sound=${song}>
								<button class="audio-toggle" title="Turn on/off sound"></button>
								<label class="audio-inner" title="Volume">${song}
								<input class="audio-volume" name="volume" data-sizing="%" type="range" min="0" max="100" value="0">
								</label>
							</li>`;
		html += li
		ul.innerHTML = html

		window['let' + i] = (new Audio(`./assets/sounds/${song}.mp3`))
		window['let' + i].setAttribute('data-sound', `${song}`)
		window['let' + i].setAttribute('loop', '')
		document.body.append(window['let' + i])
	})
}

playList.addEventListener('click', (e) => {
	const target = e.target.closest('li[data-sound]')
	const idData = target.dataset.sound
	console.dir(idData);
	const elem = document.querySelector(`audio[data-sound=${idData}]`)
	console.log(elem);
})


// ===========================================================

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




