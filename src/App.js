import './App.css';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [input, setInput] = useState('');
  const [todo, setTodo] = useState([])
  const [edit, setEdit] = useState('');
  const [ischeck, setIsCheck] = useState('')

  useEffect(() => {
    if (edit) {
      setInput(edit.title)
    } else {
      setInput('')
    }
  }, [setInput, edit])

  const onTextChange = (event) => {
    setInput(event.target.value)
  }

  const submitData = (event) => {
    event.preventDefault();
    if (!edit) {
      setTodo([...todo, { id: uuidv4(), title: input, ischecked: false }])
      setInput('');
    } else {
      updateData(input, edit.id, edit.ischecked)
    }
  }
   const handleEdit = ({ id }) => {
    const find = todo.find((d) => d.id === id);
    setEdit(find);
  }
  const updateData = (title, id, ischecked) => {
    const updatetodo = todo.map((data) => {
      return id === data.id ? { title, id, ischecked } : data
    })
    setTodo(updatetodo)
    setEdit('')
  }
  const handleDelete = ({ id }) => {
    setTodo(todo.filter((d) => d.id !== id))
  }
  const handleCheck = (d) => {
    setTodo(todo.map((item) => {
      if (item.id === d.id) {
        return { ...item, ischecked: !item.ischecked }
      }
      return item;
    }))
  }
 
  return (
    <div className="App">
      <div className='container' style={{border:'solid black', marginTop:'15px',padding:'10px'}}>
        <h2>To-Do List</h2>
        <div className='container' style={{ marginTop: '20px' }}>
          <div className='text text-center'>
            <div className='col-md-12'>
              <div className='col-md-2'></div>
              <div className='col-md-6'>
                <input className='form-control' type='text' placeholder='Enter a Todo List' value={input} required onChange={onTextChange}></input>
              </div>
              <div className='col-md-2'>
                <button className='btn btn-primary' onClick={submitData}>{edit ? "Ok" : 'Add'}</button>
              </div>
            </div>
          </div>
        </div>
        <br />
        {todo.map((data) => (
          <div className='container'>
            <div className='col-md-12'>
            <li class="list-group-item" key={todo.id} style={{ padding: '25px', marginTop: '5px' }}>
              <div className='col-md-12' style={{ marginTop: '-15px' }}>
                <div className='row'>
                  <div className='col-md-1'>
                    <input class="form-check-input" type="checkbox" id="check1" name="option1" value={ischeck} onClick={() => { handleCheck(data) }} />
                  </div>
                  <div className='col-md-7'>
                    <h4 className='text text-center'>{data.ischecked ? <strike style={{ color: 'red' }}>{data.title}</strike> : data.title}</h4>
                  </div>
                  <div className='col-md-1'>
                    <div className='text text-center'>
                      <button className='btn btn-danger' onClick={() => handleDelete(data)}>Delete</button>
                    </div>
                  </div>
                  <div className='col-md-1' >
                    <div className='text text-center'>
                      <button className='btn btn-warning' onClick={() => handleEdit(data)}>Edit</button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
