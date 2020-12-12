let symbol;
let stream;
let symbolSize = 50;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(0);
    stream = new Stream();
    stream.generateSymbols();
    
    textSize(symbolSize);
}

function draw() {
    background(0);
    stream.render();
}

function Symbolized(x, y, speed) {
    this.x = x;
    this.y = y;
    this.value;
    this.speed = speed;
    this.switchInterval =round(random(2, 40));

    this.setToRandomSymbol = () => {
        if (frameCount % this.switchInterval == 0) {
            
            this.value = String.fromCharCode(
                //0x30A0 + round(random(0, 96)) // Katakana
                //0x0600 + round(random(0, 28)) // Arabic
                0xA000 + round(random(0, 1168)) // Yi
            );
                
        }
    }

    this.rain = () => {
        this.y = (this.y >= height) ? 0 : this.y += this.speed;
        this.y += this.speed;
        
    }

}

function Stream()  {
    this.symbols = [];
    this.totalSymbols = round(random(5, 30));
    this.speed = random(2, 8);

    this.generateSymbols = () => {
        let y = 0;
        let x = width / 2;

        for (var i = 0; i <= this.totalSymbols; i++) {
            symbol = new Symbolized(x, y, this.speed);
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            y -= symbolSize
        }
    }

    this.render = () => {
        this.symbols.forEach((symbol) => {
            fill(0, 255, 70);
            text(symbol.value, symbol.x, symbol.y);
            symbol.rain();
            symbol.setToRandomSymbol();
        });
    }
}