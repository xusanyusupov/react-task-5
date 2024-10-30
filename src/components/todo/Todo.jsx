import React, { useState, useEffect } from 'react'
import { CiSaveDown2 } from "react-icons/ci"
import { v4 as uuidv4 } from 'uuid'
import { MdDelete } from "react-icons/md"
import { AiOutlineEdit, AiOutlineCheck } from "react-icons/ai"

const Todo = () => {
    const [text, setText] = useState("");
    const [data, setData] = useState([]);
    const [editId, setEditId] = useState(null); 
    const [editText, setEditText] = useState(""); 

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(data));
    }, [data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim() === "" && editId === null) return;

        if (editId) {
            setData(data.map(todo => todo.id === editId ? { ...todo, text: editText } : todo));
            setEditId(null);
            setEditText("");
        } else {
            let date = new Date();
            let hours = date.getHours();
            let minutes = date.getMinutes();

            let todo = {
                id: uuidv4(),
                text: text,
                time: `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`
            };
            setData([...data, todo]);
            setText("");
        }
    };

    const handleEdit = (todo) => {
        setEditId(todo.id);
        setEditText(todo.text);
    };

    const handleDelete = (id) => {
        setData(data.filter(item => item.id !== id));
    };

    return (
        <div className='container flex flex-col max-w-[660px] mx-auto mt-[30px] bg-blue-400 gap-20 p-5 rounded-2xl'>
            <strong className='absolute left-[47%] top-[150px] text-white text-2xl'>Todo-lists</strong>
            <div className='flex items-stretch gap-7 p-5'>
                <form onSubmit={handleSubmit} className='flex items-center w-full gap-2'>
                    <input 
                        value={editId ? editText : text} 
                        onChange={(e) => editId ? setEditText(e.target.value) : setText(e.target.value)} 
                        className='outline-none w-full flex-1 rounded-lg p-3 placeholder:text-blue-500' 
                        type="text" 
                        placeholder='Enter text' 
                    />
                    {
                        (editId ? editText : text).trim() && (
                            <button className='text-2xl text-black bg-white p-3 rounded-full'>
                                {editId ? <AiOutlineCheck /> : <CiSaveDown2 />}
                            </button>
                        )
                    }
                </form>
            </div>
            <div className='pl-5'>
                {data.map(todo => (
                    <div key={todo.id} className='p-4 text-white flex items-center justify-between text-2xl border-b-4 border-white'>
                        <p>{todo.text}</p>
                        <div className='flex items-center gap-3'>
                            <p className='text-sm'>{todo.time}</p>
                            <button 
                                onClick={() => handleEdit(todo)} 
                                className='text-2xl ease-in-out duration-300 transform hover:scale-110'
                            >
                                <AiOutlineEdit />
                            </button>


                            
                            <button 
                                onClick={() => handleDelete(todo.id)} 
                                className='text-2xl ease-in-out duration-300 transform hover:scale-110'
                            >
                                <MdDelete />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Todo;
