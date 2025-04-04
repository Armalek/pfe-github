import React, { useState } from 'react';
import { 
  BarChart3, 
  Building2, 
  CheckCircle2, 
  Clock, 
  FileText, 
  ListFilter, 
  Search,
  Star,
  Trophy,
  Users,
  TrendingUp,
  Activity
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function App() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Installation Fibre Optique - Région Nord",
      budget: "2,500,000 DA",
      deadline: "2024-04-30",
      status: "En attente",
      priority: "Haute",
      location: "Alger",
      requirements: ["Équipement Fibre", "Équipe Technique", "Véhicules"],
      progress: 0
    },
    {
      id: 2,
      title: "Maintenance Réseau - Région Sud",
      budget: "1,800,000 DA",
      deadline: "2024-05-15",
      status: "En attente",
      priority: "Moyenne",
      location: "Ouargla",
      requirements: ["Outils Spécialisés", "Techniciens", "4x4"],
      progress: 0
    },
    {
      id: 3,
      title: "Déploiement 5G - Phase 1",
      budget: "5,000,000 DA",
      deadline: "2024-06-01",
      status: "En attente",
      priority: "Haute",
      location: "Oran",
      requirements: ["Équipement 5G", "Ingénieurs", "Certification"],
      progress: 0
    }
  ]);

  const [companies] = useState([
    {
      id: 1,
      name: "TechPro Algérie",
      points: 95,
      completedProjects: 28,
      speciality: "Fibre Optique",
      rating: 4.8,
      availability: "Disponible",
      monthlyProjects: [4, 5, 3, 6, 4, 5]
    },
    {
      id: 2,
      name: "NetworkSolutions DZ",
      points: 88,
      completedProjects: 23,
      speciality: "Maintenance Réseau",
      rating: 4.5,
      availability: "Disponible",
      monthlyProjects: [3, 4, 4, 5, 3, 4]
    },
    {
      id: 3,
      name: "AlgérieTech Solutions",
      points: 92,
      completedProjects: 25,
      speciality: "Installation 5G",
      rating: 4.7,
      availability: "En mission",
      monthlyProjects: [5, 4, 6, 3, 5, 4]
    }
  ]);

  const [selectedProject, setSelectedProject] = useState(null);

  // Chart Data
  const projectsProgressData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: companies.map(company => ({
      label: company.name,
      data: company.monthlyProjects,
      borderColor: company.id === 1 ? '#0066CC' : company.id === 2 ? '#FF6B00' : '#10B981',
      backgroundColor: company.id === 1 ? '#0066CC20' : company.id === 2 ? '#FF6B0020' : '#10B98120',
      tension: 0.4
    }))
  };

  const projectStatusData = {
    labels: ['En Attente', 'Attribués', 'Terminés'],
    datasets: [{
      data: [
        projects.filter(p => p.status === "En attente").length,
        projects.filter(p => p.status === "Attribué").length,
        2 // Example completed projects
      ],
      backgroundColor: ['#FCD34D', '#0066CC', '#10B981'],
      borderWidth: 0
    }]
  };

  const companyPerformanceData = {
    labels: companies.map(c => c.name),
    datasets: [{
      label: 'Performance',
      data: companies.map(c => c.points),
      backgroundColor: ['#0066CC', '#FF6B00', '#10B981'],
      borderColor: ['#0066CC', '#FF6B00', '#10B981'],
      borderWidth: 1
    }]
  };

  const handleAttribution = (projectId) => {
    const bestCompany = companies
      .filter(company => company.availability === "Disponible")
      .sort((a, b) => b.points - a.points)[0];

    if (bestCompany) {
      setProjects(projects.map(project => 
        project.id === projectId 
          ? { ...project, status: "Attribué", attributedTo: bestCompany.name }
          : project
      ));
    }
  };

  return (
    <div className="flex-row w-full max-w-7xl mx-auto rounded-lg border shadow-sm min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold ">Tableau de Bord</h1>
              <p className="text-blue-100">Système d'Attribution des Projets</p>
            </div>
            <div className="flex items-center space-x-4">
              
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileText className="h-6 w-6 text-[#0066CC]" />
              </div>
              <div className="ml-4">
                <p className="text-gray-500 text-sm">Projets en Attente</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {projects.filter(p => p.status === "En attente").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-gray-500 text-sm">Projets Attribués</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {projects.filter(p => p.status === "Attribué").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Building2 className="h-6 w-6 text-[#FF6B00]" />
              </div>
              <div className="ml-4">
                <p className="text-gray-500 text-sm">Entreprises</p>
                <p className="text-2xl font-semibold text-gray-900">{companies.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-gray-500 text-sm">Entreprises Disponibles</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {companies.filter(c => c.availability === "Disponible").length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-[#0066CC]" />
              Progression des Projets par Entreprise
            </h3>
            <Line 
              data={projectsProgressData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom'
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }}
            />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Activity className="h-5 w-5 mr-2 text-[#FF6B00]" />
              Performance des Entreprises
            </h3>
            <Bar 
              data={companyPerformanceData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Projects List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">Projets</h2>
                  <button className="flex items-center text-gray-600 hover:text-gray-900">
                    <ListFilter className="h-5 w-5 mr-2" />
                    Filtrer
                  </button>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {projects.map((project) => (
                  <div 
                    key={project.id} 
                    className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {project.title}
                        </h3>
                        <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {project.deadline}
                          </span>
                          <span>{project.location}</span>
                          <span>{project.budget}</span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {project.requirements.map((req, index) => (
                            <span 
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {req}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          project.status === "Attribué" 
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {project.status}
                        </span>
                        {project.status === "En attente" && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAttribution(project.id);
                            }}
                            className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#FF6B00] hover:bg-[#e65f00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B00] transform hover:scale-105 transition-transform duration-200"
                          >
                            Attribuer
                          </button>
                        )}
                        {project.attributedTo && (
                          <p className="mt-2 text-sm text-gray-500">
                            Attribué à: {project.attributedTo}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Companies Ranking and Status Chart */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">État des Projets</h3>
              <div className="aspect-square">
                <Doughnut 
                  data={projectStatusData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'bottom'
                      }
                    },
                    cutout: '70%'
                  }}
                />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Classement des Entreprises
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {companies
                  .sort((a, b) => b.points - a.points)
                  .map((company, index) => (
                    <div key={company.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <div className={`flex items-center justify-center h-8 w-8 rounded-full ${
                            index === 0 ? "bg-yellow-100 text-yellow-600" :
                            index === 1 ? "bg-gray-100 text-gray-600" :
                            index === 2 ? "bg-orange-100 text-orange-600" :
                            "bg-blue-100 text-blue-600"
                          }`}>
                            {index < 3 ? <Trophy className="h-4 w-4" /> : (index + 1)}
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-medium text-gray-900">
                              {company.name}
                            </h3>
                            <div className="mt-1 flex items-center space-x-2">
                              <Star className="h-4 w-4 text-yellow-400" />
                              <span className="text-sm text-gray-500">
                                {company.rating} ({company.completedProjects} projets)
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {company.points} points
                          </div>
                          <p className={`mt-1 text-sm ${
                            company.availability === "Disponible" 
                              ? "text-green-600" 
                              : "text-red-600"
                          }`}>
                            {company.availability}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;