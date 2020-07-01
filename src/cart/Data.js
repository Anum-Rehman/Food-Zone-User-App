
export const food = [
    {
        id:0,
        ChefName: 'Anum Rehman',
        name: 'Chicken Kabab',
        cost: 200,
        img: require("../../public/img/boti.jpg")
    },
    {
        id:1,
        ChefName: 'Kamran Nawaz',
        name: 'Pizza',
        cost: 500,
        img: require("../../public/img/pizza.jpg")
    },
    {
        id:2,
        ChefName: 'Malik Mudassir',
        name: 'Roll',
        cost: 50,
        img: require("../../public/img/roll.jpg")
    },
]

export const sweetDish = [
    {
        id:4,
        ChefName: 'Anum Rehman',
        name: 'Soft Drink',
        cost: 100
    },
    {
        id:5,
        ChefName: 'Kamran Nawaz',
        name: 'Cake',
        cost: 600
    },
    {
        id:6,
        ChefName: 'Malik Mudassir',
        name: 'Custard',
        cost: 200
    }
]

export const getProducts = () => {
    return food;
    
}