class Food {
    constructor() {
        this.image = loadImage('images/milk.png')
        this.foodStock = 0;
        this.lastFed = 0;
    }

    updateFoodStock(foodStock) {
        this.foodStock = foodStock;
    }

    display() {
        var x  = 80;
        var y = 100;
        for(var i = 0; i < this.foodStock; i++) {
            image(this.image, x, y, 50, 50);
            x = x + 30;
            if(x > 720) {
                x = 80;
                y= y + 50;
            }
        }
    }
}