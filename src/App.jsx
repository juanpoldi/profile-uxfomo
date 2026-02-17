import { useState, useEffect } from 'react'
import ProfileView from './components/ProfileView'
import ProfileEdit from './components/ProfileEdit'

// Estado inicial del perfil (vacío; los datos se guardan en localStorage)
const DEFAULT_PROFILE_DATA = {
    name: '',
    nick: '',
    bio: '',
    presentation: '',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=UX&backgroundColor=e5e7eb',
    stats: {
        followers: '0',
        following: '0',
        likes: '0'
    },
    links: {
        website: '',
        linkedin: '',
        github: '',
        behance: '',
        instagram: ''
    },
    linkNames: {
        website: 'Website',
        linkedin: 'LinkedIn',
        instagram: 'Instagram',
        github: 'GitHub',
        behance: 'Behance'
    },
    linksOrder: ['website', 'linkedin', 'instagram', 'github', 'behance'],
    featuredContent: []
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
                const featuredContent = Array.isArray(parsed.featuredContent) ? parsed.featuredContent : DEFAULT_PROFILE_DATA.featuredContent
                return {
                    ...DEFAULT_PROFILE_DATA,
                    ...parsed,
                    links: { ...DEFAULT_PROFILE_DATA.links, ...parsed.links },
                    linkNames: { ...DEFAULT_PROFILE_DATA.linkNames, ...parsed.linkNames },
                    stats: { ...DEFAULT_PROFILE_DATA.stats, ...parsed.stats },
                    featuredContent
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

    const clearStorageAndReset = () => {
        try {
            localStorage.removeItem(STORAGE_KEY)
            setProfileData(DEFAULT_PROFILE_DATA)
        } catch (error) {
            console.error('Error limpiando localStorage', error)
        }
    }

    return (
        <div className="min-h-screen bg-white">
            {!isEditing && (
                <div className="fixed top-4 left-4 z-50 flex items-center gap-2 flex-wrap">
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
                    <button
                        type="button"
                        onClick={clearStorageAndReset}
                        className="px-3 py-1 text-[10px] font-medium text-gray-400 hover:text-red-600 rounded-full border border-gray-200 hover:border-red-200 transition-all"
                        title="Borrar datos guardados y volver al perfil vacío"
                    >
                        Limpiar datos
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
