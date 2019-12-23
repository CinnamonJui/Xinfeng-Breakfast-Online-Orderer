export class Meal {
    constructor({ ID, price, picture, info }) {
        this.ID = ID;
        this.price = price;
        this.info = info;
        this.picture = picture;
    }
}
export class Combo extends Meal {
    constructor({ ID, price, picture, info, items }) {
        let rest
        ({ items, ...rest } = arguments[0])
        super(rest)
        this.items = items;
    }
}
export class Item extends Meal {
    constructor({ ID, price, picture, info, type }) {
        let rest
        ({ type, ...rest } = arguments[0])
        super(rest)
        this.type = type;
    }
}
