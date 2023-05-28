function setup() {
	createCanvas(windowWidth, windowHeight);
	background(200);

	layout = new Layout();
	layout.set();
	layout.show();
}

function mousePressed() {
	// background(200);
	layout.show();
	if (mouseX > 0 && mouseX < 375 && mouseY > 0 && mouseY < 50) {
		layout.save();
	}
}

function mouseDragged() {
	// background(200);
	layout.show();
}

function keyPressed() {
	layout.save();
}

function mouseReleased() {
	layout.imgDownload();
}