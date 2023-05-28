class SwitchAreaButton {
	constructor(buttonText, x, y, w, h, isSelect) {
		this.buttonText = buttonText;
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.c = color(240);
		this.isSelect = isSelect;
	}

	selected() {
		if (
			mouseX > this.x &&
			mouseX < this.x + this.w &&
			mouseY > this.y &&
			mouseY < this.y + this.h
		) {
			this.isSelect = true;
		}
	}

	changeStyle() {
		if (this.isSelect) {
			this.c = color(240);
		} else {
			this.c = color(200);
		}
	}

	show() {
		push();
		this.changeStyle();
		fill(this.c);
		rect(this.x, this.y, this.w, this.h);
		fill(0);
		textSize(20);
		text(this.buttonText, this.x + 20, this.y + 35);
		pop();
	}
}

class DownloadButton {
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.c = 200;
		this.isSelect = false;
	}

	selected() {
		if (
			mouseX > this.x &&
			mouseX < this.x + this.w &&
			mouseY > this.y &&
			mouseY < this.y + this.h
		) {
			this.isSelect = true;
		} else {
			this.isSelect = false;
		}
	}

	download() {
		if (this.isSelect) {
			save('pixel-sketch.jpg');
		}
	}

	show() {
		push();
		ellipseMode(CORNER);
		if (this.isSelect) {
			this.c = 240;
		} else {
			this.c = 200;
		}
		fill(this.c);
		ellipse(this.x, this.y, this.w, this.h);
		line(this.x + this.w / 2, this.y + 10, this.x + this.w / 2, this.y + this.h - 10);
		line(this.x + 10, this.y + 25, this.x + this.w / 2, this.y + this.h - 10)
		line(this.x + this.w - 10, this.y + 25, this.x + this.w / 2, this.y + this.h - 10)
		pop();
	}
}