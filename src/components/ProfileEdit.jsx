import { useState } from 'react'

const ProfileEdit = ({ data, onSave, onCancel }) => {
    const [formData, setFormData] = useState(data)

    const handleChange = (e) => {
        const { id, value } = e.target
        setFormData(prev => ({ ...prev, [id]: value }))
    }

    const handleLinkChange = (key, value) => {
        setFormData(prev => ({
            ...prev,
            links: { ...prev.links, [key]: value }
        }))
    }

    const handleAvatarChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, avatar: reader.result }))
            }
            reader.readAsDataURL(file)
        }
    }

    const handleAvatarUrlChange = (e) => {
        setFormData(prev => ({ ...prev, avatar: e.target.value }))
    }

    const handleFeaturedImageChange = (id, e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    featuredContent: prev.featuredContent.map(item =>
                        item.id === id ? { ...item, url: reader.result } : item
                    )
                }))
            }
            reader.readAsDataURL(file)
        }
    }

    const handleFeaturedUrlChange = (id, value) => {
        setFormData(prev => ({
            ...prev,
            featuredContent: prev.featuredContent.map(item =>
                item.id === id ? { ...item, url: value } : item
            )
        }))
    }

    const handleFeaturedCaptionChange = (id, value) => {
        setFormData(prev => ({
            ...prev,
            featuredContent: prev.featuredContent.map(item =>
                item.id === id ? { ...item, caption: value } : item
            )
        }))
    }

    const removeFeatured = (id) => {
        setFormData(prev => ({
            ...prev,
            featuredContent: prev.featuredContent.filter(item => item.id !== id)
        }))
    }

    const addFeatured = () => {
        if (formData.featuredContent.length < 4) {
            setFormData(prev => ({
                ...prev,
                featuredContent: [
                    ...prev.featuredContent,
                    { id: Date.now(), url: '', caption: '' }
                ]
            }))
        }
    }

    return (
        <main className="max-w-2xl mx-auto px-4 py-8 md:py-12">
            {/* Header / Back */}
            <div className="flex items-center justify-between mb-10">
                <button onClick={onCancel} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors group">
                    <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Volver al perfil
                </button>
                <span className="u-label">Configuración</span>
            </div>

            <div className="space-y-12">
                {/* Avatar Edit */}
                <div className="flex flex-col items-center gap-6">
                    <div className="relative w-24 h-24 md:w-32 md:h-32">
                        <img src={formData.avatar} alt="Avatar" className="w-full h-full rounded-full border-2 border-gray-100 bg-white object-cover" />
                        <label className="absolute bottom-0 right-0 p-2 bg-gray-900 text-white rounded-full border-2 border-white hover:bg-gray-800 transition-colors cursor-pointer">
                            <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        </label>
                    </div>
                    <div className="w-full max-w-xs space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">O usa una URL</label>
                        <input
                            type="text"
                            placeholder="https://..."
                            value={formData.avatar}
                            onChange={handleAvatarUrlChange}
                            className="w-full px-3 py-1.5 bg-gray-50 border-none rounded-md focus:ring-2 focus:ring-blue-500/20 text-xs text-gray-600"
                        />
                    </div>
                </div>

                {/* Basic Info Form */}
                <section className="space-y-6">
                    <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Información Básica</h2>
                    <div className="grid gap-6">
                        <div className="space-y-1.5">
                            <label htmlFor="name" className="text-sm font-semibold text-gray-700">Nombre completo</label>
                            <input type="text" id="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm" />
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="nick" className="text-sm font-semibold text-gray-700">Nombre de usuario (Nick)</label>
                            <div className="relative">
                                <span className="absolute left-4 top-2.5 text-gray-400">@</span>
                                <input type="text" id="nick" value={formData.nick} onChange={handleChange} className="w-full pl-8 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm" />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="bio" className="text-sm font-semibold text-gray-700">Bio corta</label>
                            <input type="text" id="bio" value={formData.bio} onChange={handleChange} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm" />
                            <p className="text-[10px] text-gray-400">Máximo 100 caracteres. Se muestra en el resumen del perfil.</p>
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="presentation" className="text-sm font-semibold text-gray-700">Presentación</label>
                            <textarea id="presentation" rows="4" value={formData.presentation} onChange={handleChange} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"></textarea>
                        </div>
                    </div>
                </section>

                {/* Social Links Edit */}
                <section className="space-y-6">
                    <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Enlaces y Redes</h2>
                    <div className="grid gap-4">
                        {[
                            { id: 'website', label: 'Website', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg> },
                            { id: 'linkedin', label: 'LinkedIn', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg> },
                            { id: 'instagram', label: 'Instagram', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.351-.2 6.78-2.618 6.98-6.98.058-1.28.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.352-2.619-6.78-6.98-6.98C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg> },
                            { id: 'github', label: 'GitHub', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.419 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z" /></svg> },
                            { id: 'behance', label: 'Behance', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 13s-1.5 2-4.5 2-4.5-2-4.5-2V8s1.5-2 4.5-2 4.5 2 4.5 2v5zM17.5 10c.8 0 1.5.7 1.5 1.5S18.3 13 17.5 13 16 12.3 16 11.5 16.7 10 17.5 10zm-10.5 4c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3zm0-8c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5z" /></svg> },
                        ].map(link => (
                            <div key={link.id} className="flex gap-4">
                                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 flex-shrink-0">
                                    {link.icon}
                                </div>
                                <div className="flex-1 relative group">
                                    <input
                                        type="url"
                                        placeholder={link.label}
                                        value={formData.links[link.id] || ''}
                                        onChange={(e) => handleLinkChange(link.id, e.target.value)}
                                        className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                                    />
                                    {formData.links[link.id] && (
                                        <button
                                            onClick={() => handleLinkChange(link.id, '')}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                                            title="Limpiar"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Portfolio Edit */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                        <h2 className="text-lg font-bold text-gray-900">Contenido Destacado</h2>
                        <span className="text-[10px] font-bold text-gray-400 uppercase">{formData.featuredContent.length} / 4 Utilizados</span>
                    </div>
                    <div className="space-y-6">
                        {formData.featuredContent.map((item) => (
                            <div key={item.id} className="p-4 bg-white border border-gray-200 rounded-xl space-y-4">
                                <div className="flex flex-col md:flex-row gap-4">
                                    <div className="w-full md:w-32 aspect-video bg-gray-50 rounded-lg overflow-hidden relative flex-shrink-0">
                                        <img src={item.url} alt={item.caption} className="w-full h-full object-cover" />
                                        <label className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFeaturedImageChange(item.id, e)} />
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path></svg>
                                        </label>
                                    </div>
                                    <div className="flex-1 space-y-3">
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="URL de la imagen"
                                                value={item.url}
                                                onChange={(e) => handleFeaturedUrlChange(item.id, e.target.value)}
                                                className="flex-1 px-3 py-1.5 bg-gray-50 border-none rounded-md focus:ring-2 focus:ring-blue-500/20 text-xs text-gray-600"
                                            />
                                            <button onClick={() => removeFeatured(item.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Pie de foto (caption)"
                                            value={item.caption}
                                            onChange={(e) => handleFeaturedCaptionChange(item.id, e.target.value)}
                                            className="w-full px-3 py-1.5 bg-gray-50 border-none rounded-md focus:ring-2 focus:ring-blue-500/20 text-xs text-gray-600 font-medium"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        {formData.featuredContent.length < 4 && (
                            <button onClick={addFeatured} className="w-full py-8 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-blue-300 hover:bg-blue-50/30 transition-all group">
                                <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 group-hover:text-blue-500 transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                                </div>
                                <span className="text-xs font-medium text-gray-400 group-hover:text-blue-500 transition-colors">Añadir recurso destacado</span>
                            </button>
                        )}
                    </div>
                </section>

                {/* Buttons */}
                <div className="pt-10 flex gap-4">
                    <button onClick={() => onSave(formData)} className="flex-1 px-6 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200">
                        Guardar cambios
                    </button>
                    <button onClick={onCancel} className="px-6 py-3 border border-gray-200 text-gray-500 font-semibold rounded-xl hover:bg-gray-50 transition-colors">
                        Cancelar
                    </button>
                </div>
            </div>
            <div className="h-20 md:hidden"></div>
        </main>
    )
}

export default ProfileEdit
