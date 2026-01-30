import { useState, useEffect } from 'react'
import ProfileView from './components/ProfileView'
import ProfileEdit from './components/ProfileEdit'

// Datos iniciales por defecto (Mock)
const DEFAULT_PROFILE_DATA = {
    name: 'Juan Pérez',
    nick: 'juanuxdesign',
    bio: 'Explorando la intersección entre el diseño visual y la psicología del comportamiento. Amante del café y las interfaces limpias.',
    presentation: 'Actualmente diseñando el futuro de las comunidades digitales en UX fomo. Especializado en sistemas de diseño y tipografía aplicada.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    stats: {
        followers: '1.2k',
        following: '450',
        likes: '8.4k'
    },
    links: {
        website: 'https://juanperez.design',
        linkedin: 'https://linkedin.com/in/juanperez',
        github: '',
        behance: '',
        instagram: 'https://instagram.com/juanperez'
    },
    linkNames: {
        website: 'Website',
        linkedin: 'LinkedIn',
        instagram: 'Instagram',
        github: 'GitHub',
        behance: 'Behance'
    },
    linksOrder: ['website', 'linkedin', 'instagram', 'github', 'behance'],
    featuredContent: [
        { id: 1, url: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=400', caption: 'Rediseño Mobile App' },
        { id: 2, url: 'https://images.unsplash.com/photo-1561070791-26c145824a4d?auto=format&fit=crop&q=80&w=400', caption: 'Sistema de Diseño' },
    ]
}

const STORAGE_KEY = 'uxfomo_profile_data'

function App() {
    const [isEditing, setIsEditing] = useState(false)

    // Inicializar estado desde localStorage o usar DEFAULT_PROFILE_DATA
    const [profileData, setProfileData] = useState(() => {
        try {
            const savedData = localStorage.getItem(STORAGE_KEY)
            if (savedData) {
                const parsed = JSON.parse(savedData)
                // Mezcla profunda para asegurar que no falten claves nuevas
                return {
                    ...DEFAULT_PROFILE_DATA,
                    ...parsed,
                    links: { ...DEFAULT_PROFILE_DATA.links, ...parsed.links },
                    linkNames: { ...DEFAULT_PROFILE_DATA.linkNames, ...parsed.linkNames },
                    stats: { ...DEFAULT_PROFILE_DATA.stats, ...parsed.stats }
                }
            }
        } catch (error) {
            console.error("Error cargando datos de localStorage", error)
        }
        return DEFAULT_PROFILE_DATA
    })

    // Guardar en localStorage cada vez que profileData cambie
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(profileData))
        } catch (error) {
            console.error("Error guardando datos en localStorage", error)
        }
    }, [profileData])

    const [viewMode, setViewMode] = useState('owner') // 'public' | 'owner'

    return (
        <div className="min-h-screen bg-white">
            {!isEditing && (
                <div className="fixed top-4 left-4 z-50 flex gap-2">
                    <button
                        onClick={() => setViewMode('owner')}
                        className={`px-3 py-1 text-[10px] font-bold uppercase rounded-full border transition-all ${viewMode === 'owner' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-400 border-gray-200'}`}
                    >
                        Propietario
                    </button>
                    <button
                        onClick={() => setViewMode('public')}
                        className={`px-3 py-1 text-[10px] font-bold uppercase rounded-full border transition-all ${viewMode === 'public' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-400 border-gray-200'}`}
                    >
                        Público
                    </button>
                </div>
            )}

            {isEditing ? (
                <ProfileEdit
                    data={profileData}
                    onSave={(newData) => {
                        setProfileData(newData)
                        setIsEditing(false)
                    }}
                    onCancel={() => setIsEditing(false)}
                />
            ) : (
                <ProfileView
                    data={profileData}
                    onEdit={() => setIsEditing(true)}
                    isOwner={viewMode === 'owner'}
                />
            )}
        </div>
    )
}

export default App
