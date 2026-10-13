
import { useParams } from 'react-router-dom'
import {  useSelector } from 'react-redux'
import toast from 'react-hot-toast'

const ViewPaste = () => {

  const {id} = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.filter((p) => p._id === id)[0];


  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-purple-950 to-indigo-950 px-4 py-10 text-white">
      <div className="mx-auto max-w-5xl rounded-2xl border border-purple-400/20 bg-white/5 p-6 shadow-2xl shadow-purple-900/30 backdrop-blur-xl sm:p-10">

        <div className="flex flex-col gap-5 sm:flex-row">
          <input
            className="min-w-0 flex-1 rounded-xl border border-purple-400/30 bg-slate-900/70 p-3 text-white outline-none transition placeholder:text-slate-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30"
            type="text"
            placeholder="Enter Title Here"
            value={paste.title}
            disabled
            onChange={(e) => setTitle(e.target.value)}
          />

        </div>

        <div className="relative mt-8">
          {/* Copy Button */}
          <button
            onClick={() => {
              navigator.clipboard.writeText(paste.content)
                .then(() => toast.success("Copied To Clipboard"))
                .catch(() => toast.error("Unable to copy content"))
            }}
            className="absolute right-3 top-3 z-10 rounded-lg border border-purple-400/30 bg-purple-600/80 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-purple-500"
          >
            Copy
          </button>

          {/* Textarea */}
          <textarea
            className="min-h-87.5 w-full resize-y rounded-xl border border-purple-400/30 bg-slate-900/70 p-4 pt-14 text-white outline-none transition placeholder:text-slate-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 sm:min-h-112.5"
            value={paste.content}
            disabled
            placeholder="Enter Content Here..."
            rows={20}
            readOnly
          />
        </div>

      </div>
    </div>
  )
}

export default ViewPaste