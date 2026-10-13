import React from 'react'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToPastes, updateToPastes } from '../Redux/PasteSlice'
import { useEffect } from 'react'
import toast from 'react-hot-toast'


const Home = () => {
  const [title, setTitle] = useState('')
  const [value, setValue] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const pasteId = searchParams.get('pasteId')
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes)


    useEffect(() => {
     if(pasteId){
      const paste = allPastes.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
     }
    }, [pasteId])

  function creatPaste(){

    // Check if title or content is empty
    if (!title.trim() || !value.trim()) {
      toast.error("Please fill in both title and content");
      return;
    }
    const paste = {
        title: title,
        content: value,
        _id: pasteId || Date.now().toString(36),
        createdAt: new Date().toISOString(),
    }

    if(pasteId){
        // update
        dispatch(updateToPastes(paste));
    }
    else{
        // create
        dispatch(addToPastes(paste));
    }

    // after creation or updation cleanning this input field
    setTitle('');
    setValue('');
    setSearchParams({});

  }


 

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-purple-950 to-indigo-950 px-4 py-10 text-white">
      <div className="mx-auto max-w-5xl rounded-2xl border border-purple-400/20 bg-white/5 p-6 shadow-2xl shadow-purple-900/30 backdrop-blur-xl sm:p-10">

        <div className="flex flex-col gap-5 sm:flex-row">
          <input
            className="min-w-0 flex-1 rounded-xl border border-purple-400/30 bg-slate-900/70 p-3 text-white outline-none transition placeholder:text-slate-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30"
            type="text"
            placeholder="Enter Title Here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button 
          className="rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-purple-900/40 transition hover:scale-105 hover:from-violet-500 hover:to-indigo-500"
          onClick={creatPaste}
          >
            {pasteId ? "Update My Paste" : "Create My Paste"}
          </button>
        </div>

        <div className="mt-8">
          <textarea
            className="min-h-87.5 w-full resize-y rounded-xl border border-purple-400/30 bg-slate-900/70 p-4 text-white outline-none transition placeholder:text-slate-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 sm:min-h-112.5"
            value={value}
            placeholder="Enter Content Here..."
            onChange={(e) => setValue(e.target.value)}
            rows={20}
          />
        </div>

      </div>
    </div>
  )
}

export default Home
