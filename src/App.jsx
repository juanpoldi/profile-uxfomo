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
                return {
                    ...DEFAULT_PROFILE_DATA,
                    ...parsed,
                    // Aseguramos que los objetos anidados también conserven sus claves por defecto
                    links: { ...DEFAULT_PROFILE_DATA.links, ...parsed.links },
                    stats: { ...DEFAULT_PROFILE_DATA.stats, ...parsed.stats },
                    featuredContent: parsed.featuredContent || DEFAULT_PROFILE_DATA.featuredContent
                }
            }
            return DEFAULT_PROFILE_DATA
        } catch (error) {
            console.error("Error cargando datos de localStorage", error)
            return DEFAULT_PROFILE_DATA
        }
    })

    // Guardar en localStorage cada vez que profileData cambie
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(profileData))
        } catch (error) {
            console.error("Error guardando datos en localStorage", error)
        }
    }, [profileData])

    return (
        <div className="min-h-screen">
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
                />
            )}
        </div>
    )
}

export default App
