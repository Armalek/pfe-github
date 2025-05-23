

import { useState } from "react"
import { PlusCircle, Trash2, Eye, EyeOff, Search, Key } from "lucide-react"

export default function UserManagement() {
  const [users, setUsers] = useState([
    {
      id: "1",
      name: "ARAB MEHDI",
      email: "arabmalek@gmail.com",
      role: "visiteur",
      status: "active",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      name: "CHADI ZINEB",
      email: "chadizineb@gmail.com",
      role: "Admin",
      status: "active",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      name: "HASNAOUI TAHAR",
      email: "hasnaouitahar@gmail.com",
      role: "Resonsable",
      status: "inactive",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
  ])

  const [showUsers, setShowUsers] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Visiteur",
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  })

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddUser = () => {
    const user = {
      id: (users.length + 1).toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: "active",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    }

    setUsers([...users, user])
    setNewUser({ name: "", email: "", role: "Visiteur" })
    setIsDialogOpen(false)
  }

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  const toggleUserVisibility = () => {
    setShowUsers(!showUsers)
  }

  const handleChangePassword = (user) => {
    setSelectedUser(user)
    setPasswordData({ newPassword: "", confirmPassword: "" })
    setIsPasswordDialogOpen(true)
  }

  const handlePasswordSubmit = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords do not match!")
      return
    }
    if (passwordData.newPassword.length < 6) {
      alert("Password must be at least 6 characters long!")
      return
    }
    // Here you would typically make an API call to update the password
    console.log(`Password updated for user: ${selectedUser.name}`)
    setIsPasswordDialogOpen(false)
    setSelectedUser(null)
    setPasswordData({ newPassword: "", confirmPassword: "" })
  }

  return (
    <div className="flex-row w-full max-w-4xl mx-auto bg-white rounded-lg border shadow-sm">
      {/* Card Header */}
      <div className="p-6 flex flex-row items-center justify-between border-b">
        <div>
          <h2 className="text-2xl font-semibold">Users</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded-md border bg-transparent hover:bg-gray-100 transition-colors"
            onClick={toggleUserVisibility}
            aria-label={showUsers ? "Hide users" : "Show users"}
          >
            {showUsers ? <EyeOff className="h-4 w-4 " /> : <Eye className="h-4 w-4" />}
          </button>

          <button
            className="flex items-center gap-1 px-4 py-2 rounded-md bg-blue-800 text-white hover:bg-blue-700 transition-colors"
            onClick={() => setIsDialogOpen(true)}
          >
            <PlusCircle className="h-4 w-4" />
            <span>Ajouter Utilisateur</span>
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-8 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {showUsers && (
            <div className="rounded-md border">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-gray-50">
                      <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Utilisateur</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Role</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b transition-colors hover:bg-gray-50">
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-3">
                              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                                <img
                                  src={user.avatarUrl || "/placeholder.svg"}
                                  alt={user.name}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.target.style.display = "none"
                                    e.target.nextSibling.style.display = "flex"
                                  }}
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-600 font-medium hidden">
                                  {user.name.substring(0, 2).toUpperCase()}
                                </div>
                              </div>
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 align-middle">{user.role}</td>
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-2">
                              <button
                                className="p-2 rounded-md text-blue-500 hover:bg-blue-50 transition-colors"
                                onClick={() => handleChangePassword(user)}
                              >
                                <Key className="h-4 w-4" />
                                <span className="sr-only">Changer mot de passe</span>
                              </button>
                              <button
                                className="p-2 rounded-md text-red-500 hover:bg-red-50 transition-colors"
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Supprimer Utilisateur</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="h-24 text-center">
                          No users found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {!showUsers && (
            <div className="flex items-center justify-center h-24 border rounded-md bg-gray-50">
              <p className="text-gray-500">User list is hidden. Click the eye icon to show.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add User Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold">Ajouter un Nouveau Utilisateur</h3>
            </div>

            <div className="p-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Nom
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    placeholder="John Doe"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    placeholder="fullname@gmail.com"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="role" className="text-sm font-medium">
                    Role
                  </label>
                  <select
                    id="role"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Responsable">Responsable</option>
                    <option value="Visiteur">Visiteur</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-6 border-t flex justify-end gap-2">
              <button
                className="px-4 py-2 border rounded-md bg-red-700 hover:bg-red-600 text-white transition-colors"
                onClick={() => setIsDialogOpen(false)}
              >
                Annuler
              </button>
              <button
                className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleAddUser}
                disabled={!newUser.name || !newUser.email}
              >
                Ajouter Utilisateur
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Dialog */}
      {isPasswordDialogOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold">Changer Mot de Passe</h3>
              <p className="text-sm text-gray-500 mt-1">Changee Mot de Passe de {selectedUser.name}</p>
            </div>

            <div className="p-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label htmlFor="newPassword" className="text-sm font-medium">
                    Nouveau Mot de Passe
                  </label>
                  <input
                    id="newPassword"
                    type="password"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    placeholder="Entrer Nouveau Mot de Passe "
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium">
                    Confirmer Mot de Passe
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    placeholder="Confirmer Nouveau Mot de Passe"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t flex justify-end gap-2">
              <button
                className="px-4 py-2 border rounded-md bg-red-800 text-white hover:bg-red-700 transition-colors"
                onClick={() => setIsPasswordDialogOpen(false)}
              >
                Annuler
              </button>
              <button
                className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handlePasswordSubmit}
                disabled={!passwordData.newPassword || !passwordData.confirmPassword}
              >
                Changer Mot de Passe
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}