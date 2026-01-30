import { useState } from 'react'

const ProfileView = ({ data, onEdit, isOwner }) => {
    const [activeTab, setActiveTab] = useState('hilos')

    const tabs = [
        { id: 'hilos', label: 'Hilos' },
        { id: 'respuestas', label: 'Respuestas' },
        { id: 'seguidores', label: 'Seguidores', ownerOnly: true },
        { id: 'siguiendo', label: 'Siguiendo', ownerOnly: true },
        { id: 'likes', label: 'Likes', ownerOnly: true },
        { id: 'recursos', label: 'Recursos' },
    ].filter(tab => !tab.ownerOnly || isOwner)

    return (
        <main className="max-w-3xl mx-auto px-4 py-8 md:py-12">
            {/* Profile Header */}
            <header className="flex flex-col md:flex-row md:items-start gap-6 mb-12">
                <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                    <img src={data.avatar} alt="Avatar" className="w-full h-full rounded-full border-2 border-gray-200 bg-white object-cover" />
                </div>

                <div className="flex-1 space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{data.name}</h1>
                            <p className="text-gray-500 font-medium">@{data.nick}</p>
                        </div>
                        <div className="flex gap-3">
                            {!isOwner && (
                                <button className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
                                    Seguir
                                </button>
                            )}
                            {isOwner && (
                                <button onClick={onEdit} className="px-4 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                                    Editar perfil
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Bio */}
                    <div className="space-y-2">
                        <p className="text-gray-700 leading-relaxed">{data.bio}</p>
                        <p className="text-gray-600 text-sm">{data.presentation}</p>
                    </div>

                    {/* Social Links */}
                    <div className="flex flex-wrap gap-4 pt-2">
                        {data.linksOrder?.map(key => {
                            const url = data.links[key]
                            if (!url) return null

                            const label = data.linkNames?.[key] || (key.charAt(0).toUpperCase() + key.slice(1))

                            return (
                                <a key={key} href={url} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-gray-900 transition-colors text-sm flex items-center font-medium">
                                    {label}
                                </a>
                            )
                        })}
                    </div>
                </div>
            </header>

            {/* Gallery */}
            <section className="mb-12">
                <h2 className="u-label mb-6">Contenido Destacado</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {data.featuredContent.map((item) => (
                        <div key={item.id} className="group relative aspect-square bg-gray-100 rounded-xl overflow-hidden">
                            <img src={item.url} alt={item.caption} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                                <p className="text-[10px] text-white font-medium truncate">{item.caption}</p>
                            </div>
                        </div>
                    ))}
                    {[...Array(4 - data.featuredContent.length)].map((_, i) => (
                        <div key={`empty-${i}`} className="aspect-square bg-white border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center">
                            <span className="text-xs text-gray-400">Sin contenido</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Tabs */}
            <nav className="border-b border-gray-200 mb-8 overflow-x-auto scrollbar-hide">
                <ul className="flex gap-8 min-w-max">
                    {tabs.map((tab) => (
                        <li key={tab.id} className={`pb-4 border-b-2 transition-all ${activeTab === tab.id ? 'border-gray-900' : 'border-transparent'}`}>
                            <button
                                onClick={() => setActiveTab(tab.id)}
                                className={`text-sm font-medium ${activeTab === tab.id ? 'text-gray-900 font-semibold' : 'text-gray-500 hover:text-gray-900'}`}
                            >
                                {tab.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Tab Content */}
            <div className="space-y-6">
                {activeTab === 'hilos' && (
                    <article className="p-6 bg-white border border-gray-100 rounded-2xl flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-400">Hace 2 horas</span>
                            <button className="text-gray-400 hover:text-gray-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                            </button>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 leading-snug">¿Cuál es vuestra herramienta favorita para prototipado rápido en 2024?</h3>
                        <p className="text-gray-600 text-sm line-clamp-3">Últimamente he estado probando varias alternativas a Figma para flujos que no requieren tanta fidelidad visual...</p>
                        <div className="flex gap-4 pt-2">
                            <span className="flex items-center gap-1.5 text-gray-500 text-xs">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                                24 respuestas
                            </span>
                            <span className="flex items-center gap-1.5 text-gray-500 text-xs">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                                156 likes
                            </span>
                        </div>
                    </article>
                )}
                {activeTab !== 'hilos' && (
                    <div className="py-20 flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 00-2 2H6a2 2 0 00-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
                        </div>
                        <h3 className="text-sm font-semibold text-gray-900">No hay contenido todavía</h3>
                        <p className="text-xs text-gray-500 mt-1 max-w-[200px]">Aún no hay publicaciones en la pestaña de {tabs.find(t => t.id === activeTab)?.label.toLowerCase()}.</p>
                    </div>
                )}
            </div>
        </main>
    )
}

export default ProfileView
