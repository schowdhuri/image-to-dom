export default class ImageToDOM {
    constructor(component, options={}) {
        this._container = component;
        this._cells = [];
        this._cellWidth = options.xres || 10;
        this._cellHeight = options.yres || 10;
    }
    _getAvgColor(arr) {
        let r = 0, g = 0, b = 0, i;
        const num = arr.length;
        for(i=0; i<num; i+=4) {
            r += arr[i  ] / 255;
            g += arr[i+1] / 255;
            b += arr[i+2] / 255;
        }
        const count = Math.ceil(i/4);
        r = Math.ceil(r * 255/count);
        g = Math.ceil(g * 255/count);
        b = Math.ceil(b * 256/count);
        return `rgb(${r}, ${g}, ${b})`;
    }
    _loadImage() {
        const img = new Image();
        const url = this._container.getAttribute("data-src");
        this._imageLoaded = new Promise((fulfill, reject) => {
            img.addEventListener("load", () => {
                this._width = img.naturalWidth;
                this._height = img.naturalHeight;
                this._image = img;
                fulfill();
            }, false);
            img.src = url;
        });
        return this;
    }
    _setup() {
        this._setupDone = new Promise((fulfill, reject) => {
            this._imageLoaded.then(() => {
                const table = document.createElement("table")
                table.style.border = "none";
                table.style.borderCollapse = "collapse";
                const tbody = document.createElement("tbody");
                table.appendChild(tbody);
                table.style.width = this._width + "px";
                table.style.height = this._height + "px";

                for(let y=0, j=0; y<this._height; y+=this._cellHeight, j++) {
                    const row = document.createElement("tr");
                    for(let x=0, i=0; x<this._width; x+=this._cellWidth, i++) {
                        const cell = document.createElement("td");
                        if(!this._cells[i])
                            this._cells[i] = [];
                        this._cells[i][j] = cell;
                        row.appendChild(cell);
                    }
                    tbody.appendChild(row);
                }
                this._container.appendChild(table);
                this._canvas = document.createElement("canvas");
                this._canvas.width = this._width;
                this._canvas.height = this._height;
                this._canvas.style.display = "none";
                this._container.appendChild(this._canvas);
                this._context = this._canvas.getContext("2d");
                fulfill();
            });
        });
        return this;
    }
    _paint(image) {
        this._setupDone.then(() => {
            this._context.drawImage(this._image, 0, 0);
            let x, y;
            for(let x=0, i=0; x<this._width; x+=this._cellWidth, i++) {
                for(let y=0, j=0; y<this._height; y+=this._cellHeight, j++) {
                    const imageData = this._context.getImageData(x, y, this._cellWidth, this._cellHeight);
                    const pixels = imageData.data;
                    const cell = this._cells[i][j];
                    cell.style.backgroundColor = this._getAvgColor(pixels);
                }
            }
            delete this._cells;
            delete this._image;
        });
        return this;
    }
    render() {
        this._loadImage()._setup()._paint();
    }
}
