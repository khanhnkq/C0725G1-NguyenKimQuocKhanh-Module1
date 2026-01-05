const customers = [
    {
        id:1,
        code:"KH-001",
        name:"Khanh",
        address:"HCM",
        type:"VIP"
    },
    {
        id:2,
        code:"KH-002",
        name:"Nam",
        address:"HCM",
        type:"STANDARD"
    },
    {
        id:3,
        code:"KH-003",
        name:"Viet",
        address:"HCM",
        type:"STANDARD"
    },
    {
        id:4,
        code:"KH-004",
        name:"Hoang",
        address:"HCM",
        type:"VIP"
    },{
        id:5,
        code:"KH-005",
        name:"Tung",
        address:"HCM",
        type:"NONE"
    }

]

export const getAll = ()=>[...customers]