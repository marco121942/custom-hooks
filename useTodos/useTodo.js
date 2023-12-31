import {useEffect, useReducer} from "react";
import {TodoReducer} from "./todoReducer.js";
const initialState=[
    // {
    //     id:new Date().getTime(),
    //     description:'Recolectar la piedra del alma',
    //     done:false,
    // },

]
const init =()=>{
    return JSON.parse(localStorage.getItem('todos'))||[];
}
export const useTodo = () => {
    const [todos,dispatch ] = useReducer(TodoReducer,initialState,init);

    const todosCount= todos.length;
    const pendingTodosCount=todos.filter(todo=>!todo.done).length;

    useEffect(() => {
        localStorage.setItem('todos',JSON.stringify(todos));

    }, [todos]);

    const handleNewTodo=(todo)=>{
        const action ={
            type:'[TODO]] Add Todo',
            payload: todo,
        }
        dispatch(action);
    }

    const handleDeleteTodo=(id)=>{
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id
        })
    }
    const handleToggleTodo=(id)=>{
        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id
        })
    }

    return{
        todos,handleNewTodo,handleDeleteTodo,handleToggleTodo,todosCount,pendingTodosCount
    }
  
}