import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

export default function VenturesSection() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
 const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${SERVER_URL}/projects`);
      setProjects(res.data || []);
      
    } catch (err) {
      toast.error('Failed to fetch Projects!');
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Loader
  if (loading) {
    return (
      <section className="flex items-center justify-center h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="relative w-14 h-14">
            <div className="absolute inset-0 border-4 border-gray-300 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-t-[#d4af37] border-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-lg font-semibold text-[#1e3a8a]">Loading Projects...</p>
        </div>
      </section>
    );
  }

  // Filter only Up-Coming and On-Going
  const availableProjects = projects.filter(project => 
    project.status === 'Up-Coming' || project.status === 'On-Going'
  );

  // Empty state
  if (!availableProjects.length) {
    return (
      <section className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-gray-700 text-lg font-medium">No projects available right now.</p>
      </section>
    );
  }

  // Sort projects: Up-Coming → On-Going
  const statusOrder = { "Up-Coming": 1, "On-Going": 2 };
  const sortedProjects = [...availableProjects].sort((a, b) => {
    return (statusOrder[a.status] || 3) - (statusOrder[b.status] || 3);
  });

  return (
    <section id="ventures" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4 text-[#1e3a8a]">Our Projects</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our premium residential projects with real-time availability status
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {sortedProjects.map((venture) => (
            <div 
              key={venture.id} 
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="relative h-64">
                <img
                  src={venture.mainImage.startsWith("http") 
                    ? venture.mainImage 
                    : `${SERVER_URL}${venture.mainImage}`
                  }
                  alt={venture.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
              </div>

              <div className="p-6">
                <h3 className="text-2xl mb-3 text-[#1e3a8a]">{venture.name}</h3>

                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-5 w-5 mr-2 text-[#d4af37]" />
                  <span className="text-lg">{venture.location}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center">
                    <div className="w-6 h-5 mr-2">
                      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-[#d4af37]">
                        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>
                    <p className="text-gray-700">Per Square Price {venture.pricePerSquareFoot} sq.ft</p>
                  </div>
                </div>

               {/* Status */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700 font-medium">Availability Status:</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        venture.status === 'Sold Out' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {venture.status}
                      </span>
                    </div>
                  </div>

                  <div className="text-lg mb-4">
                    <span className="text-gray-700 font-medium">Plot Type:</span>
                    <span className="ml-2 text-[#1e3a8a] font-semibold">{venture.plotType}</span>
                  </div>

                <Link 
                  to={`/project/${venture.id}`}
                  className="block w-full bg-gradient-to-r from-[#d4af37] to-[#ffd700] hover:from-[#b8941f] hover:to-[#e6c200] text-black font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 text-center"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
