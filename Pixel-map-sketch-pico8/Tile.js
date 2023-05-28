class Pixel {
	constructor(colorNum, x, y, w, h) {
		this.colorNum = colorNum;
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.colors = [
			color('#000000'),
			color('#1D2B53'),
			color('#7E2553'),
			color('#008751'),
			color('#AB5236'),
			color('#5F574F'),
			color('#C2C3C7'),
			color('#FFF1E8'),
			color('#FF004D'),
			color('#FFA300'),
			color('#FFEC27'),
			color('#00E436'),
			color('#29ADFF'),
			color('#83769C'),
			color('#FF77A8'),
			color('#FFCCAA'),
		];
	}

	show() {
		push();
		stroke(this.colors[this.colorNum]);
		fill(this.colors[this.colorNum]);
		rect(this.x, this.y, this.w, this.h);
		pop();
	}
}

class Tile {
	constructor(x, y, w, h, row, column) {
		this.pixels = [];
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.row = row;
		this.column = column;
		this.pixelNum = row * column;
		this.pixelWidth = this.w / this.row;
		this.pixelHeight = this.h / this.column;

		this.num = 9;
		this.selectTile = 3;
	}

	set() {
		for (let i = 0; i < this.column; i++) {
			for (let j = 0; j < this.row; j++) {
				this.pixels.push(new Pixel(7, this.x + (i * this.pixelWidth), this.y + (j * this.pixelHeight), this.pixelWidth, this.pixelHeight));
			}
		}
	}

	borderShow() {
		for (let i = 0; i < this.column; i++) {
			for (let j = 0; j < this.row; j++) {
				push();
				stroke(0);
				strokeWeight(1);
				noFill();
				rect(this.x + (j * this.pixelWidth), this.y + (i * this.pixelHeight), this.pixelWidth, this.pixelHeight);
				pop();
			}
		}
	}

	show() {
		for (let i = 0; i < this.pixelNum; i++) {
			this.pixels[i].show();
		}
	}
}

class PalletTile extends Tile {
	set() {
		for (let i = 0; i < this.column; i++) {
			for (let j = 0; j < this.row; j++) {
				this.pixels.push(new Pixel(i * 8 + j, this.x + (j * this.pixelWidth), this.y + (i * this.pixelHeight), this.pixelWidth, this.pixelHeight));
			}
		}
	}

	selected() {
		for (let i = 0; i < this.pixelNum; i++) {
			if (
				mouseX > this.pixels[i].x &&
				mouseX < this.pixels[i].x + this.pixels[i].w &&
				mouseY > this.pixels[i].y &&
				mouseY < this.pixels[i].y + this.pixels[i].h
			) {
				this.selectTile = this.pixels[i].colorNum;
			}
		}
	}

	selectedAreaShow() {
		push();
		stroke(0, 0, 255);
		strokeWeight(4);
		noFill();
		rect(this.pixels[this.selectTile].x, this.pixels[this.selectTile].y, this.pixels[this.selectTile].w, this.pixels[this.selectTile].h);
		pop();
	}
}

class DrawTile extends Tile {
	changePixel(colorNum) {
		for (let i = 0; i < this.pixelNum; i++) {
			if (
				mouseX > this.pixels[i].x &&
				mouseX < this.pixels[i].x + this.pixels[i].w &&
				mouseY > this.pixels[i].y &&
				mouseY < this.pixels[i].y + this.pixels[i].h
			) {
				this.pixels[i].colorNum = colorNum;
			}
		}
	}
}