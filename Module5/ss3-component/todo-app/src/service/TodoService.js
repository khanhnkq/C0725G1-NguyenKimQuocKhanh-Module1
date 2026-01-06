const todo = [
    {
        id: 1,
        name:"Khanh",
        content: "do homework"
    },
    {
        id: 2,
        name:"Nam",
        content: "do household"
    }
]

export const findAll = () => [...todo]
export const add = ({id, name,content}) => {
    todo.push({id,name, content})
}