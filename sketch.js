let symbol;
let streams = [];
let symbolSize = 18;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(0);
    let x = 0;
    let y;
    for (let i = 0; i <= width / symbolSize; i++) {
        let stream = new Stream();
        y = random(-500, 0);
        stream.generateSymbols(x, y);
        streams.push(stream);
        x += symbolSize;
    }
    
    textSize(symbolSize);
}

function draw() {
    background(0, 150);
    streams.forEach((stream) => {
        stream.render();
    })
}

function Symbolized(x, y, speed, first) {
    this.x = x;
    this.y = y;
    this.value;
    this.speed = speed;
    this.switchInterval =round(random(2, 20));
    this.first = first;

    this.setToRandomSymbol = () => {
        if (frameCount % this.switchInterval == 0) {
            
            let charSet = round(random(0, 3));
            
            switch (charSet) {
                case 0: 
                    this.value = String.fromCharCode(
                        0x30A0 + round(random(0, 96)) // Katakana                        
                    );
                    break;
                case 1:
                    this.value = String.fromCharCode(
                        0x0600 + round(random(0, 28)) // Arabic                        
                    );
                case 2:
                    this.value = String.fromCharCode(
                        0x1800 + round(random(0, 176)) // Ethiopian
                    );
                default:
                    break;
            }
                
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
    this.speed = random(2, 20);
    

    this.generateSymbols = (x, y) => {
        
        let first = round(random(0, 3)) == 1;
        for (var i = 0; i <= this.totalSymbols; i++) {
            symbol = new Symbolized(x, y, this.speed, first);
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            y -= symbolSize;
            first = false;
        }
    }

    this.render = () => {
        this.symbols.forEach((symbol) => {
            if (symbol.first) {
                fill(200, 100, 35)
            } else {
                fill(200, 150, 70);
            }
            
            text(symbol.value, symbol.x, symbol.y);
            symbol.rain();
            symbol.setToRandomSymbol();
        });
    }
}