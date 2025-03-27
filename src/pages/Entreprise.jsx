"use client"

import { useState } from "react"
import "./CompanyManagement.css"

// Company interface
/**
 * @typedef {Object} Company
 * @property {string} id
 * @property {string} name
 * @property {string} logo
 * @property {string} industry
 * @property {string} location
 * @property {string} website
 * @property {string} contactPerson
 * @property {string} contactEmail
 * @property {string} contactPhone
 * @property {"active" | "inactive" | "lead"} status
 * @property {string} description
 */

function CompanyManagement() {
  // Sample company data
  const [companies, setCompanies] = useState([
    {
      id: "1",
      name: "Acme Corporation",
      logo: "https://via.placeholder.com/40",
      industry: "Technology",
      location: "New York, USA",
      website: "https://acme.example.com",
      contactPerson: "John Smith",
      contactEmail: "john@acme.example.com",
      contactPhone: "+1 (555) 123-4567",
      status: "active",
      description: "A leading technology company specializing in innovative solutions.",
    },
    {
      id: "2",
      name: "Globex Industries",
      logo: "https://via.placeholder.com/40",
      industry: "Manufacturing",
      location: "Chicago, USA",
      website: "https://globex.example.com",
      contactPerson: "Jane Doe",
      contactEmail: "jane@globex.example.com",
      contactPhone: "+1 (555) 987-6543",
      status: "active",
      description: "Manufacturing company with global operations.",
    },
    {
      id: "3",
      name: "Initech Systems",
      logo: "https://via.placeholder.com/40",
      industry: "Software",
      location: "San Francisco, USA",
      website: "https://initech.example.com",
      contactPerson: "Michael Johnson",
      contactEmail: "michael@initech.example.com",
      contactPhone: "+1 (555) 456-7890",
      status: "inactive",
      description: "Software development and consulting services.",
    },
    {
      id: "4",
      name: "Umbrella Corporation",
      logo: "https://via.placeholder.com/40",
      industry: "Pharmaceuticals",
      location: "Boston, USA",
      website: "https://umbrella.example.com",
      contactPerson: "Sarah Williams",
      contactEmail: "sarah@umbrella.example.com",
      contactPhone: "+1 (555) 789-0123",
      status: "lead",
      description: "Pharmaceutical research and development company.",
    },
  ])

  // State for search functionality
  const [searchQuery, setSearchQuery] = useState("")

  // State for add company dialog
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newCompany, setNewCompany] = useState({
    name: "",
    logo: "https://via.placeholder.com/40",
    industry: "",
    location: "",
    website: "",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
    status: "lead",
    description: "",
  })

  // State for edit company dialog
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingCompany, setEditingCompany] = useState(null)

  // Filter companies based on search query
  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Handle adding a new company
  const handleAddCompany = () => {
    const company = {
      id: (companies.length + 1).toString(),
      ...newCompany,
    }

    setCompanies([...companies, company])
    setNewCompany({
      name: "",
      logo: "https://via.placeholder.com/40",
      industry: "",
      location: "",
      website: "",
      contactPerson: "",
      contactEmail: "",
      contactPhone: "",
      status: "lead",
      description: "",
    })
    setIsAddDialogOpen(false)
  }

  // Handle updating an existing company
  const handleUpdateCompany = () => {
    if (editingCompany) {
      setCompanies(companies.map((company) => (company.id === editingCompany.id ? editingCompany : company)))
      setIsEditDialogOpen(false)
      setEditingCompany(null)
    }
  }

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <span className="badge badge-active">Active</span>
      case "inactive":
        return <span className="badge badge-inactive">Inactive</span>
      case "lead":
        return <span className="badge badge-lead">Lead</span>
      default:
        return <span className="badge">{status}</span>
    }
  }

  return (
    <div className="company-management">
      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">Company Shortlist</h2>
            <p className="card-description">Manage your company partnerships and leads</p>
          </div>
          <button className="btn btn-primary" onClick={() => setIsAddDialogOpen(true)}>
            <span className="icon">+</span> Add Company
          </button>
        </div>
        <div className="card-content">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search companies..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>

          <div className="table-container">
            <table className="companies-table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Industry</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCompanies.length > 0 ? (
                  filteredCompanies.map((company) => (
                    <tr key={company.id}>
                      <td>
                        <div className="company-info">
                          <img src={company.logo || "/placeholder.svg"} alt={company.name} className="company-logo" />
                          <div>
                            <div className="company-name">{company.name}</div>
                            <div className="company-website">
                              <span className="icon">🌐</span>
                              <a href={company.website} target="_blank" rel="noopener noreferrer">
                                {company.website.replace(/^https?:\/\//, "")}
                              </a>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{company.industry}</td>
                      <td>
                        <div className="company-location">
                          <span className="icon">📍</span>
                          <span>{company.location}</span>
                        </div>
                      </td>
                      <td>{getStatusBadge(company.status)}</td>
                      <td>
                        <button
                          className="btn btn-icon"
                          onClick={() => {
                            setEditingCompany(company)
                            setIsEditDialogOpen(true)
                          }}
                        >
                          ✏️
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="no-results">
                      No companies found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Company Dialog */}
      {isAddDialogOpen && (
        <div className="dialog-overlay">
          <div className="dialog">
            <div className="dialog-header">
              <h3>Add New Company</h3>
              <button className="close-btn" onClick={() => setIsAddDialogOpen(false)}>
                ×
              </button>
            </div>
            <div className="dialog-content">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Company Name</label>
                  <input
                    id="name"
                    type="text"
                    value={newCompany.name}
                    onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                    placeholder="Acme Corporation"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="industry">Industry</label>
                  <input
                    id="industry"
                    type="text"
                    value={newCompany.industry}
                    onChange={(e) => setNewCompany({ ...newCompany, industry: e.target.value })}
                    placeholder="Technology"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="location">Location</label>
                  <input
                    id="location"
                    type="text"
                    value={newCompany.location}
                    onChange={(e) => setNewCompany({ ...newCompany, location: e.target.value })}
                    placeholder="New York, USA"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    type="text"
                    value={newCompany.website}
                    onChange={(e) => setNewCompany({ ...newCompany, website: e.target.value })}
                    placeholder="https://example.com"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contactPerson">Contact Person</label>
                  <input
                    id="contactPerson"
                    type="text"
                    value={newCompany.contactPerson}
                    onChange={(e) => setNewCompany({ ...newCompany, contactPerson: e.target.value })}
                    placeholder="John Smith"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contactEmail">Contact Email</label>
                  <input
                    id="contactEmail"
                    type="email"
                    value={newCompany.contactEmail}
                    onChange={(e) => setNewCompany({ ...newCompany, contactEmail: e.target.value })}
                    placeholder="john@example.com"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contactPhone">Contact Phone</label>
                  <input
                    id="contactPhone"
                    type="text"
                    value={newCompany.contactPhone}
                    onChange={(e) => setNewCompany({ ...newCompany, contactPhone: e.target.value })}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    value={newCompany.status}
                    onChange={(e) => setNewCompany({ ...newCompany, status: e.target.value })}
                  >
                    <option value="lead">Lead</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div className="form-group full-width">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    value={newCompany.description}
                    onChange={(e) => setNewCompany({ ...newCompany, description: e.target.value })}
                    placeholder="Brief description of the company"
                    rows={3}
                  />
                </div>
              </div>
            </div>
            <div className="dialog-footer">
              <button className="btn btn-secondary" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleAddCompany} disabled={!newCompany.name}>
                Add Company
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Company Dialog */}
      {isEditDialogOpen && editingCompany && (
        <div className="dialog-overlay">
          <div className="dialog">
            <div className="dialog-header">
              <h3>Edit Company</h3>
              <button className="close-btn" onClick={() => setIsEditDialogOpen(false)}>
                ×
              </button>
            </div>
            <div className="dialog-content">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="edit-name">Company Name</label>
                  <input
                    id="edit-name"
                    type="text"
                    value={editingCompany.name}
                    onChange={(e) => setEditingCompany({ ...editingCompany, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="edit-industry">Industry</label>
                  <input
                    id="edit-industry"
                    type="text"
                    value={editingCompany.industry}
                    onChange={(e) => setEditingCompany({ ...editingCompany, industry: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="edit-location">Location</label>
                  <input
                    id="edit-location"
                    type="text"
                    value={editingCompany.location}
                    onChange={(e) => setEditingCompany({ ...editingCompany, location: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="edit-website">Website</label>
                  <input
                    id="edit-website"
                    type="text"
                    value={editingCompany.website}
                    onChange={(e) => setEditingCompany({ ...editingCompany, website: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="edit-contactPerson">Contact Person</label>
                  <input
                    id="edit-contactPerson"
                    type="text"
                    value={editingCompany.contactPerson}
                    onChange={(e) => setEditingCompany({ ...editingCompany, contactPerson: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="edit-contactEmail">Contact Email</label>
                  <input
                    id="edit-contactEmail"
                    type="email"
                    value={editingCompany.contactEmail}
                    onChange={(e) => setEditingCompany({ ...editingCompany, contactEmail: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="edit-contactPhone">Contact Phone</label>
                  <input
                    id="edit-contactPhone"
                    type="text"
                    value={editingCompany.contactPhone}
                    onChange={(e) => setEditingCompany({ ...editingCompany, contactPhone: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="edit-status">Status</label>
                  <select
                    id="edit-status"
                    value={editingCompany.status}
                    onChange={(e) => setEditingCompany({ ...editingCompany, status: e.target.value })}
                  >
                    <option value="lead">Lead</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div className="form-group full-width">
                  <label htmlFor="edit-description">Description</label>
                  <textarea
                    id="edit-description"
                    value={editingCompany.description}
                    onChange={(e) => setEditingCompany({ ...editingCompany, description: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>
            </div>
            <div className="dialog-footer">
              <button className="btn btn-secondary" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleUpdateCompany}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CompanyManagement

