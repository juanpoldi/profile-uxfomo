import { useState } from 'react'
import ExportDataModal from './ExportDataModal'
import { downloadProfileJson, downloadProfileZip } from '../utils/exportProfile'

const ProfileView = ({ data, onEdit, isOwner }) => {
    const [activeTab, setActiveTab] = useState('hilos')
    const [showExportModal, setShowExportModal] = useState(false)

    const handleExportConfirm = async (config) => {
        setShowExportModal(false)
        if (config.format === 'zip') {
            await downloadProfileZip(data, {
                includeAvatarFile: config.includeAvatarFile,
                includeFeaturedImages: config.includeFeaturedImages,
            })
        } else {
            downloadProfileJson(data)
        }
    }

    const tabs = [
        { id: 'hilos', label: 'Hilos' },
        { id: 'respuestas', label: 'Respuestas' },
        { id: 'seguidores', label: 'Seguidores', ownerOnly: true },
        { id: 'siguiendo', label: 'Siguiendo', ownerOnly: true },
        { id: 'likes', label: 'Likes', ownerOnly: true },
        { id: 'recursos', label: 'Recursos' },
    ].filter(tab => !tab.ownerOnly || isOwner)

    return (
        <>
        <main className="max-w-3xl mx-auto px-4 py-8 md:py-12">
            {/* Profile Header */}
            <header className="flex flex-col md:flex-row md:items-start gap-6 mb-12">
                <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                    <img src={data.avatar} alt="Avatar" className="w-full h-full rounded-full border-2 border-gray-200 bg-white object-cover" />
                </div>

                <div className="flex-1 space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className={`text-2xl font-bold ${data.name ? 'text-gray-900' : 'text-gray-300'}`}>{data.name || 'Nombre'}</h1>
                            <p className={`font-medium ${data.nick ? 'text-gray-500' : 'text-gray-300'}`}>@{data.nick || 'usuario'}</p>
                        </div>
                        <div className="flex gap-3">
                            {!isOwner && (
                                <button className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
                                    Seguir
                                </button>
                            )}
                            {isOwner && (
                                <>
                                    <button
                                        onClick={onEdit}
                                        className="px-4 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Editar perfil
                                    </button>
                                    <button
                                        onClick={() => setShowExportModal(true)}
                                        title="Descargar mis datos"
                                        className="px-3 py-2 border border-gray-200 text-gray-500 text-sm font-medium rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors flex items-center gap-1.5"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        <span className="hidden sm:inline">Mis datos</span>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Bio */}
                    <div className="space-y-2">
                        <p className={`leading-relaxed ${data.bio ? 'text-gray-700' : 'text-gray-400 text-sm'}`}>{data.bio || 'Añade una breve bio en Editar perfil.'}</p>
                        <p className={`text-sm ${data.presentation ? 'text-gray-600' : 'text-gray-400'}`}>{data.presentation || ''}</p>
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
                    {(data.featuredContent || []).map((item) => (
                        <div key={item.id} className="group relative aspect-square bg-gray-100 rounded-xl overflow-hidden">
                            <img src={item.url} alt={item.caption || 'Contenido destacado'} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                                <p className="text-[10px] text-white font-medium truncate">{item.caption}</p>
                            </div>
                        </div>
                    ))}
                    {[...Array(Math.max(0, 4 - (data.featuredContent || []).length))].map((_, i) => (
                        <div key={`empty-${i}`} className="aspect-square bg-white border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center">
                            <span className="text-xs text-gray-400">Sin contenido</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Tabs */}
            <nav className="border-b border-gray-200 mb-8 overflow-x-auto scrollbar-hide" role="tablist" aria-label="Secciones del perfil">
                <ul className="flex gap-8 min-w-max">
                    {tabs.map((tab) => (
                        <li key={tab.id} className={`pb-4 border-b-2 transition-all ${activeTab === tab.id ? 'border-gray-900' : 'border-transparent'}`} role="presentation">
                            <button
                                type="button"
                                role="tab"
                                aria-selected={activeTab === tab.id}
                                aria-controls={`panel-${tab.id}`}
                                id={`tab-${tab.id}`}
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
            {activeTab === 'hilos' && (
                <div className="space-y-6 py-20 flex flex-col items-center text-center" role="tabpanel" id="panel-hilos" aria-labelledby="tab-hilos">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 00-2 2H6a2 2 0 00-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900">No hay contenido todavía</h3>
                    <p className="text-xs text-gray-500 mt-1 max-w-[200px]">Aún no hay publicaciones en la pestaña de hilos.</p>
                </div>
            )}
            {activeTab !== 'hilos' && (
                <div className="space-y-6 py-20 flex flex-col items-center text-center" role="tabpanel" id={`panel-${activeTab}`} aria-labelledby={`tab-${activeTab}`}>
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 00-2 2H6a2 2 0 00-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900">No hay contenido todavía</h3>
                    <p className="text-xs text-gray-500 mt-1 max-w-[200px]">Aún no hay publicaciones en la pestaña de {tabs.find(t => t.id === activeTab)?.label.toLowerCase()}.</p>
                </div>
            )}
        </main>

        {/* Modal de exportación de datos */}
        <ExportDataModal
            isOpen={showExportModal}
            onClose={() => setShowExportModal(false)}
            profileData={data}
            onConfirm={handleExportConfirm}
        />
        </>
    )
}

export default ProfileView
