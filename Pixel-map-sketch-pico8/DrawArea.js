class DrawArea {
	constructor(x, y, w, h, size) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.size = size;
		this.palletTile = new PalletTile(this.x, this.y + 375, this.w, 100, 8, 2);
		this.drawTile = new DrawTile(this.x, this.y, this.w, this.h, this.size, this.size);
		this.selectColor = 0;
	}
	
	set() {
		this.palletTile.set();
		this.drawTile.set();
	}
	
	selected() {
		this.palletTile.selected();
		this.selectColor = this.palletTile.selectTile;
	}
	
	palletShow() {
		this.selected();
		this.palletTile.show();
		this.palletTile.borderShow();
		this.palletTile.selectedAreaShow();
		this.drawTile.changePixel(this.selectColor);
	}
	
	show() {
		this.drawTile.show();
		this.drawTile.borderShow();
	}
}