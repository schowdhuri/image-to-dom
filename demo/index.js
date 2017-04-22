function start () {
	document.querySelectorAll(".image-to-dom").forEach(c => {
		const i2d = new ImageToDOM(c, {
			xres: 2,
			yres: 2
		});
		i2d.render();
	});
}

window.addEventListener("load", start, false);
