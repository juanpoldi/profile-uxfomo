import { useState } from 'react'

const ProfileView = ({ data, onEdit }) => {
    const [activeTab, setActiveTab] = useState('hilos')

    const tabs = [
        { id: 'hilos', label: 'Hilos' },
        { id: 'respuestas', label: 'Respuestas' },
        { id: 'seguidores', label: 'Seguidores' },
        { id: 'siguiendo', label: 'Siguiendo' },
        { id: 'likes', label: 'Likes' },
        { id: 'uxhub', label: 'UX Hub' },
    ]

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
                            <button className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
                                Seguir
                            </button>
                            <button onClick={onEdit} className="px-4 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                                Editar perfil
                            </button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-6 text-sm">
                        <div className="flex gap-1.5"><span className="font-bold text-gray-900">{data.stats.followers}</span><span className="text-gray-500">seguidores</span></div>
                        <div className="flex gap-1.5"><span className="font-bold text-gray-900">{data.stats.following}</span><span className="text-gray-500">siguiendo</span></div>
                        <div className="flex gap-1.5"><span className="font-bold text-gray-900">{data.stats.likes}</span><span className="text-gray-500">likes</span></div>
                    </div>

                    {/* Bio */}
                    <div className="space-y-2">
                        <p className="text-gray-700 leading-relaxed">{data.bio}</p>
                        <p className="text-gray-600 text-sm">{data.presentation}</p>
                    </div>

                    {/* Social Links */}
                    <div className="flex flex-wrap gap-4 pt-2">
                        {data.links.website && (
                            <a href={data.links.website} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-blue-500 transition-colors text-sm flex items-center gap-1.5">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                                Website
                            </a>
                        )}
                        {data.links.linkedin && (
                            <a href={data.links.linkedin} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-blue-700 transition-colors text-sm flex items-center gap-1.5">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                LinkedIn
                            </a>
                        )}
                        {data.links.instagram && (
                            <a href={data.links.instagram} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-pink-600 transition-colors text-sm flex items-center gap-1.5">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.351-.2 6.78-2.618 6.98-6.98.058-1.28.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.352-2.619-6.78-6.98-6.98C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                                Instagram
                            </a>
                        )}
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
