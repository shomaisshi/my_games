class TileMap {
	constructor(x, y, w, h, row, column, size) {
		this.tiles = [];
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.row = row;
		this.column = column;
		this.size = size;
		this.tileNum = row * column;
		this.tileWidth = this.w / row;
		this.tileHeight = this.h / column;
		this.selectTile = 0;
	}

	set() {
		for (let i = 0; i < this.column; i++) {
			for (let j = 0; j < this.row; j++) {
				this.tiles.push(new Tile(this.x + (j * this.tileWidth), this.y + (i * this.tileHeight), this.tileWidth, this.tileHeight, this.size, this.size));
			}
		}
		for (let i = 0; i < this.tileNum; i++) {
			this.tiles[i].set();
		}
	}

	selected() {
		for (let i = 0; i < this.tileNum; i++) {
			if (
				mouseX > this.tiles[i].x &&
				mouseX < this.tiles[i].x + this.tiles[i].w &&
				mouseY > this.tiles[i].y &&
				mouseY < this.tiles[i].y + this.tiles[i].h
			) {
				this.selectTile = i;
				// print(this.selectTile);
				// print(this.tiles[i].pixels);
			}
		}
	}

	selectedAreaShow() {
		push();
		stroke(0, 0, 255);
		strokeWeight(4);
		noFill();
		rect(this.tiles[this.selectTile].x, this.tiles[this.selectTile].y, this.tiles[this.selectTile].w, this.tiles[this.selectTile].h);
		pop();
	}

	borderShow() {
		for (let i = 0; i < this.column; i++) {
			for (let j = 0; j < this.row; j++) {
				push();
				stroke(0);
				strokeWeight(1);
				noFill();
				rect(this.x + (j * this.tileWidth), this.y + (i * this.tileHeight), this.tileWidth, this.tileHeight);
				pop();
			}
		}
	}

	// 選択してるタイルだけ描画する
	showSelectTile() {
		this.tiles[this.selectTile].show();
	}

	show() {
		for (let i = 0; i < this.tileNum; i++) {
			push();
			this.tiles[i].show();
			pop();
		}
	}
}

class MapArea extends TileMap {

}

class DataUI extends TileMap {

}