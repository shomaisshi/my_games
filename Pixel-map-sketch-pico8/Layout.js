class Layout {
	constructor() {
		this.pxielSize = 8;
		this.mapSize = 16;
		this.drawAreaButton = new SwitchAreaButton('Draw', 0, 0, 100, 50, true);
		this.mapAreaButton = new SwitchAreaButton('Map', 100, 0, 100, 50, false);
		this.downloadButton = new DownloadButton(375 - 50, 0, 50, 50);
		this.drawArea = new DrawArea(0, 50, 375, 375, this.pxielSize);
		this.mapArea = new MapArea(0, 50, 375, 375, this.mapSize, this.mapSize, this.pxielSize);
		this.dataUI = new DataUI(0, 525, 375, 100, 8, 2, this.pxielSize);
	}

	// save
	save() {
		// mapAreaData
		const mapAreaData = [];
		for (let i = 0; i < this.mapArea.tiles.length; i++) {
			mapAreaData[i] = this.mapArea.tiles[i].num;
		}
		storeItem('mapAreaData', JSON.stringify(mapAreaData));

		// dataUIData
		const dataUIData = [];
		for (let i = 0; i < this.dataUI.tiles.length; i++) {
			for (let j = 0; j < this.dataUI.tiles[0].pixels.length; j++) {
				dataUIData.push(this.dataUI.tiles[i].pixels[j].colorNum);
			}
		}
		storeItem('dataUIData', JSON.stringify(dataUIData));
	}

	// saveデータ読み込み
	set() {
		this.drawArea.set();
		this.mapArea.set();
		this.dataUI.set();

		// mapAreaデータの読み込み
		let mapAreaData = [];
		mapAreaData = JSON.parse(getItem('mapAreaData'));
		if (mapAreaData !== null) {
			for (let i = 0; i < this.mapArea.tiles.length; i++) {
				this.mapArea.tiles[i].num = mapAreaData[i];
			}
		}

		// dataUIデータの読み込み
		let dataUIData = [];
		dataUIData = JSON.parse(getItem('dataUIData'));
		if (dataUIData !== null) {
			for (let i = 0; i < this.dataUI.tiles.length; i++) {
				for (let j = 0; j < this.dataUI.tiles[0].pixels.length; j++) {
					this.dataUI.tiles[i].pixels[j].colorNum = (dataUIData[(i * (this.pxielSize ** 2)) + j]);
				}
			}
		}

		// drawAreaデータの読み込み
		for (let i = 0; i < this.drawArea.drawTile.pixels.length; i++) {
			this.drawArea.drawTile.pixels[i].colorNum = this.dataUI.tiles[this.dataUI.selectTile].pixels[i].colorNum;
		}
	}

	isDraw(area) {
		if (
			mouseX > area.x &&
			mouseX < area.x + area.w &&
			mouseY > area.y &&
			mouseY < area.y + area.h
		) {
			return true;
		}
	}

	// mapAreaで描画した時、選択しているDataUIのnumを渡す
	updateMapArea() {
		if (this.isDraw(this.mapArea)) {
			this.mapArea.tiles[this.mapArea.selectTile].num = this.dataUI.selectTile;
			const num = this.mapArea.tiles[this.mapArea.selectTile].num;
			for (let i = 0; i < this.drawArea.drawTile.pixels.length; i++) {
				this.mapArea.tiles[this.mapArea.selectTile].pixels[i].colorNum = this.dataUI.tiles[num].pixels[i].colorNum;
			}
		}
	}
	// 全てのタイルを描画する
	mapAreaShow() {
		for (let i = 0; i < this.mapArea.tiles.length; i++) {
			const num = this.mapArea.tiles[i].num;
			for (let j = 0; j < this.drawArea.drawTile.pixels.length; j++) {
				this.mapArea.tiles[i].pixels[j].colorNum = this.dataUI.tiles[num].pixels[j].colorNum;
			}
		}
	}

	// drawAreaで描画した時、選択しているDataUIにデータを渡す
	updateDrawArea() {
		if (this.isDraw(this.drawArea)) {
			for (let i = 0; i < this.drawArea.drawTile.pixels.length; i++) {
				this.dataUI.tiles[this.dataUI.selectTile].pixels[i].colorNum = this.drawArea.drawTile.pixels[i].colorNum;
			}
		}
	}

	// DataUIを選択した時、drawAreaに選択したタイルのデータを渡す
	updateDataUI() {
		if (this.isDraw(this.dataUI)) {
			for (let i = 0; i < this.drawArea.drawTile.pixels.length; i++) {
				this.drawArea.drawTile.pixels[i].colorNum = this.dataUI.tiles[this.dataUI.selectTile].pixels[i].colorNum;
			}
		}
	}

	// ボタンクリックでDrawとMapを切り替える
	switchArea() {
		this.drawAreaButton.selected();
		if (this.drawAreaButton.isSelect === true) {
			this.mapAreaButton.isSelect = false;
		}

		this.mapAreaButton.selected();
		if (this.mapAreaButton.isSelect === true) {
			// this.mapAreaShow();
			this.drawAreaButton.isSelect = false;
		}
	}

	switchDrawArea() {
		// drawArea
		if (this.drawAreaButton.isSelect === true) {
			this.drawArea.palletShow();
			this.drawArea.show();
			this.updateDrawArea(); // drawAreaで描画した時、選択しているDataUIにデータを渡す
		}
		this.drawAreaButton.show();
	}

	switchMapArea() {
		// mapArea
		if (
			mouseX > this.mapAreaButton.x &&
			mouseX < this.mapAreaButton.x + this.mapAreaButton.w &&
			mouseY > this.mapAreaButton.y &&
			mouseY < this.mapAreaButton.y + this.mapAreaButton.h
		) {
			// パレットの部分を隠す
			push();
			noStroke();
			fill(200);
			rect(0, 50, width, height);
			pop();
			// マップを表示する
			this.mapAreaShow();
			this.mapArea.show();
		}
		if (this.mapAreaButton.isSelect === true) {
			this.mapArea.selected();
			this.updateMapArea();
			this.mapArea.showSelectTile();
		}
		this.mapAreaButton.show();
	}

	show() {
		// タイルを選択して、そのデータをdrawAreaに渡す
		this.dataUI.selected();
		this.updateDataUI();

		// ボタンクリックでDrawとMapを切り替える
		this.switchArea();

		// drawAreaを表示する
		this.switchDrawArea();

		// mapAreaを表示する
		this.switchMapArea();

		// DataUIを表示する
		this.dataUI.show();
		this.dataUI.borderShow();
		this.dataUI.selectedAreaShow();

		// ダウンロードボタン表示
		this.downloadButton.selected();
		this.downloadButton.show();
	}

	imgDownload() {
		this.downloadButton.download();
	}
}