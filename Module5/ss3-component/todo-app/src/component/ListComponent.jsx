import {Component} from "react";
import React from 'react'
import {add, findAll} from "../service/TodoService.js";

class ListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todo: [],
            name:"",
            content:""
        }
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    };

    handleAdd = () => {
        const { name, content} = this.state;

        const newTodo = {
            id: Date.now(),
            name,
            content
        };
        add(newTodo)
        this.setState({
            todo: [...findAll()],
            name: "",
            content: ""
        });
    }



    componentDidMount() {
        this.setState({
            todo: [...findAll()]
        })
    }

    render() {
        return (<>
            <div className="flex gap-2">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={this.handleChange}
                    value={this.state.name}
                    className="w-32 rounded-md border px-3 py-2
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="content"
                    placeholder="Content"
                    onChange={this.handleChange}
                    value={this.state.content}
                    className="flex-1 rounded-md border px-3 py-2
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={this.handleAdd}
                    className="rounded-md bg-blue-600 px-4 py-2
                     text-white hover:bg-blue-700"
                >
                    Add
                </button>
            </div>
            <ul role="list" className="divide-y divide-gray-200">
                {this.state.todo.map((todo,i) => (
                    <li key={i} className="py-4">
                        <p className="font-semibold text-gray-900">{todo.name}</p>
                        <p className="text-sm text-gray-500">{todo.content}</p>
                    </li>
                ))}
            </ul>
        </>)
    }
}

export default ListComponent;