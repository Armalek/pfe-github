"use client"

import { useState, useEffect } from "react"
import EnterpriseList from "@/components/enterprise-list"
import AddEnterpriseDialog from "@/components/add-enterprise-dialog"

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
    <main className="min-h-screen bg-gray-50">
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
