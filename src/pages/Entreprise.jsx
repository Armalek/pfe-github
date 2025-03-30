"use client"

import { useState, useEffect, useRef, useMemo } from "react" ;

export default function EnterprisePage() {
  const [enterprises, setEnterprises] = useState(() => {
    // Initialize with some sample data
    const savedEnterprises = typeof window !== "undefined" ? localStorage.getItem("enterprises") : null
    return savedEnterprises
      ? JSON.parse(savedEnterprises)
      : [
          { id: "1", name: "Enterprise A", note: 4.5, odn: "ODN001" },
          { id: "2", name: "Enterprise B", note: 3.2, odn: "ODN002" },
          { id: "3", name: "Enterprise C", note: 5.0, odn: "ODN003" },
          { id: "4", name: "Enterprise D", note: 2.8, odn: "ODN004" },
        ]
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Save enterprises to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("enterprises", JSON.stringify(enterprises))
  }, [enterprises])

  const addEnterprise = (enterprise) => {
    const newEnterprise = {
      ...enterprise,
      id: Date.now().toString(),
    }
    setEnterprises([...enterprises, newEnterprise])
    setIsDialogOpen(false)
  }

  const deleteEnterprise = (id) => {
    setEnterprises(enterprises.filter((enterprise) => enterprise.id !== id))
  }

  return (
    <main className="
    flex-row w-full max-w-4xl mx-auto
     rounded-lg border shadow-sm

    min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Enterprise Management</h1>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Enterprise
          </button>
        </div>

        <EnterpriseList enterprises={enterprises} onDelete={deleteEnterprise} />

        <AddEnterpriseDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} onAdd={addEnterprise} />
      </div>
    </main>
  )
}

// Enterprise List Component
function EnterpriseList({ enterprises, onDelete }) {
  // Group enterprises by rating category, always sorted by note in descending order
  const groupedEnterprises = useMemo(() => {
    const sorted = [...enterprises].sort((a, b) => b.note - a.note)

    return {
      excellent: sorted.filter((e) => e.note >= 4.5),
      good: sorted.filter((e) => e.note >= 3.5 && e.note < 4.5),
      average: sorted.filter((e) => e.note >= 2.5 && e.note < 3.5),
      poor: sorted.filter((e) => e.note < 2.5),
    }
  }, [enterprises])

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Enterprises List</h2>
      </div>

      <div className="divide-y divide-gray-200">
        {groupedEnterprises.excellent.length > 0 && (
          <div>
            <div className="bg-green-50 px-6 py-3">
              <h3 className="text-sm font-medium text-green-800">Excellent (4.5-5.0)</h3>
            </div>
            {groupedEnterprises.excellent.map((enterprise) => (
              <EnterpriseItem key={enterprise.id} enterprise={enterprise} onDelete={onDelete} />
            ))}
          </div>
        )}

        {groupedEnterprises.good.length > 0 && (
          <div>
            <div className="bg-blue-50 px-6 py-3">
              <h3 className="text-sm font-medium text-blue-800">Good (3.5-4.4)</h3>
            </div>
            {groupedEnterprises.good.map((enterprise) => (
              <EnterpriseItem key={enterprise.id} enterprise={enterprise} onDelete={onDelete} />
            ))}
          </div>
        )}

        {groupedEnterprises.average.length > 0 && (
          <div>
            <div className="bg-yellow-50 px-6 py-3">
              <h3 className="text-sm font-medium text-yellow-800">Average (2.5-3.4)</h3>
            </div>
            {groupedEnterprises.average.map((enterprise) => (
              <EnterpriseItem key={enterprise.id} enterprise={enterprise} onDelete={onDelete} />
            ))}
          </div>
        )}

        {groupedEnterprises.poor.length > 0 && (
          <div>
            <div className="bg-red-50 px-6 py-3">
              <h3 className="text-sm font-medium text-red-800">Poor (0-2.4)</h3>
            </div>
            {groupedEnterprises.poor.map((enterprise) => (
              <EnterpriseItem key={enterprise.id} enterprise={enterprise} onDelete={onDelete} />
            ))}
          </div>
        )}

        {enterprises.length === 0 && (
          <div className="px-6 py-8 text-center text-gray-500">
            No enterprises found. Add your first enterprise using the form.
          </div>
        )}
      </div>
    </div>
  )
}

// Enterprise Item Component
function EnterpriseItem({ enterprise, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false)

  const handleDelete = () => {
    if (showConfirm) {
      onDelete(enterprise.id)
    } else {
      setShowConfirm(true)
    }
  }

  // Function to get color based on note
  const getNoteColor = (note) => {
    if (note >= 4.5) return "text-green-600 bg-green-50"
    if (note >= 3.5) return "text-blue-600 bg-blue-50"
    if (note >= 2.5) return "text-yellow-600 bg-yellow-50"
    return "text-red-600 bg-red-50"
  }

  return (
    <div className="px-6 py-4 hover:bg-gray-50 transition-colors">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h4 className="text-lg font-medium text-gray-900 truncate">{enterprise.name}</h4>
          <p className="text-sm text-gray-500">ODN: {enterprise.odn}</p>
        </div>

        <div className="flex items-center gap-4">
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getNoteColor(enterprise.note)}`}>
            {enterprise.note.toFixed(1)}
          </div>

          {showConfirm ? (
            <div className="flex items-center gap-2">
              <button onClick={() => setShowConfirm(false)} className="text-sm text-gray-500 hover:text-gray-700">
                Cancel
              </button>
              <button onClick={handleDelete} className="text-sm font-medium text-red-600 hover:text-red-800">
                Confirm
              </button>
            </div>
          ) : (
            <button onClick={handleDelete} className="text-sm text-gray-500 hover:text-red-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// Add Enterprise Dialog Component
function AddEnterpriseDialog({ isOpen, onClose, onAdd }) {
  const [name, setName] = useState("")
  const [note, setNote] = useState("")
  const [odn, setOdn] = useState("")
  const [errors, setErrors] = useState({})

  const dialogRef = useRef(null)
  const initialFocusRef = useRef(null)

  // Handle escape key press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isOpen) {
        onClose()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target) && isOpen) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen, onClose])

  // Focus first input when dialog opens
  useEffect(() => {
    if (isOpen && initialFocusRef.current) {
      setTimeout(() => {
        initialFocusRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  // Reset form when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setName("")
      setNote("")
      setOdn("")
      setErrors({})
    }
  }, [isOpen])

  const validateForm = () => {
    const newErrors = {}

    if (!name.trim()) {
      newErrors.name = "Enterprise name is required"
    }

    if (!note.trim()) {
      newErrors.note = "Note is required"
    } else {
      const noteValue = Number.parseFloat(note)
      if (isNaN(noteValue) || noteValue < 0 || noteValue > 5) {
        newErrors.note = "Note must be a number between 0 and 5"
      }
    }

    if (!odn.trim()) {
      newErrors.odn = "ODN number is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      onAdd({
        name: name.trim(),
        note: Number.parseFloat(note),
        odn: odn.trim(),
      })
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div
        ref={dialogRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto animate-fadeIn"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        <div className="flex justify-between items-center p-6 border-b">
          <h2 id="dialog-title" className="text-xl font-semibold text-gray-800">
            Add New Enterprise
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-full"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Enterprise Name
            </label>
            <input
              type="text"
              id="name"
              ref={initialFocusRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.name ? "border-red-300 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
              }`}
              placeholder="Enter enterprise name"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
              Note (0-5)
            </label>
            <input
              type="number"
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              step="0.1"
              min="0"
              max="5"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.note ? "border-red-300 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
              }`}
              placeholder="Enter rating (0-5)"
            />
            {errors.note && <p className="mt-1 text-sm text-red-600">{errors.note}</p>}
          </div>

          <div>
            <label htmlFor="odn" className="block text-sm font-medium text-gray-700 mb-1">
              ODN Number
            </label>
            <input
              type="text"
              id="odn"
              value={odn}
              onChange={(e) => setOdn(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.odn ? "border-red-300 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
              }`}
              placeholder="Enter ODN number"
            />
            {errors.odn && <p className="mt-1 text-sm text-red-600">{errors.odn}</p>}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Add Enterprise
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

