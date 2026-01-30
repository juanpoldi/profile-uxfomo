import { useState } from 'react'

const ProfileEdit = ({ data, onSave, onCancel }) => {
    const [formData, setFormData] = useState(formDataWithDefaults(data))

    function formDataWithDefaults(d) {
        return {
            ...d,
            linksOrder: d.linksOrder || ['website', 'linkedin', 'instagram', 'github', 'behance'],
            linkNames: d.linkNames || { website: 'Website', linkedin: 'LinkedIn', instagram: 'Instagram', github: 'GitHub', behance: 'Behance' }
        }
    }

    const handleChange = (e) => {
        const { id, value } = e.target
        if (id === 'bio' && value.length > 100) return
        setFormData(prev => ({ ...prev, [id]: value }))
    }

    const handleLinkChange = (key, value) => {
        setFormData(prev => ({
            ...prev,
            links: { ...prev.links, [key]: value }
        }))
    }

    const handleLinkNameChange = (key, value) => {
        setFormData(prev => ({
            ...prev,
            linkNames: { ...prev.linkNames, [key]: value }
        }))
    }

    const MAX_FILE_SIZE = 1024 * 1024 // 1MB

    const validateAndProcessFile = (file, callback) => {
        if (file.size > MAX_FILE_SIZE) {
            alert("La imagen es demasiado grande. El límite es de 1MB para asegurar el guardado correcto.")
            return
        }
        const reader = new FileReader()
        reader.onloadend = () => callback(reader.result)
        reader.readAsDataURL(file)
    }

    const handleAvatarChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            validateAndProcessFile(file, (result) => {
                setFormData(prev => ({ ...prev, avatar: result }))
            })
        }
    }

    const handleAvatarUrlChange = (e) => {
        setFormData(prev => ({ ...prev, avatar: e.target.value }))
    }

    const handleFeaturedImageChange = (id, e) => {
        const file = e.target.files[0]
        if (file) {
            validateAndProcessFile(file, (result) => {
                setFormData(prev => ({
                    ...prev,
                    featuredContent: prev.featuredContent.map(item =>
                        item.id === id ? { ...item, url: result } : item
                    )
                }))
            })
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

    // Drag and Drop Logic
    const [draggedIndex, setDraggedIndex] = useState(null)
    const [draggedType, setDraggedType] = useState(null) // 'links' | 'featured'

    const handleDragStart = (e, index, type) => {
        setDraggedIndex(index)
        setDraggedType(type)
        e.dataTransfer.effectAllowed = 'move'
    }

    const handleDragOver = (e, index, type) => {
        e.preventDefault()
        if (draggedIndex === null || draggedIndex === index || draggedType !== type) return

        if (type === 'links') {
            const newOrder = [...formData.linksOrder]
            const item = newOrder.splice(draggedIndex, 1)[0]
            newOrder.splice(index, 0, item)
            setDraggedIndex(index)
            setFormData(prev => ({ ...prev, linksOrder: newOrder }))
        } else if (type === 'featured') {
            const newFeatured = [...formData.featuredContent]
            const item = newFeatured.splice(draggedIndex, 1)[0]
            newFeatured.splice(index, 0, item)
            setDraggedIndex(index)
            setFormData(prev => ({ ...prev, featuredContent: newFeatured }))
        }
    }

    const handleDragEnd = () => {
        setDraggedIndex(null)
        setDraggedType(null)
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
                    <div className="text-center">
                        <p className="text-[10px] text-gray-400 font-medium">JPG, PNG o SVG. Máximo 1MB.</p>
                    </div>
                    {!formData.avatar.startsWith('data:') && !formData.avatar.startsWith('blob:') && (
                        <div className="w-full max-w-xs space-y-1.5 text-center">
                            <label className="text-[10px] font-bold text-gray-400 uppercase">O usa una URL</label>
                            <input
                                type="text"
                                placeholder="https://..."
                                value={formData.avatar}
                                onChange={handleAvatarUrlChange}
                                className="w-full px-3 py-1.5 bg-gray-50 border-none rounded-md focus:ring-2 focus:ring-blue-500/20 text-xs text-gray-600"
                            />
                        </div>
                    )}
                    {(formData.avatar.startsWith('data:') || formData.avatar.startsWith('blob:')) && (
                        <button
                            onClick={() => setFormData(prev => ({ ...prev, avatar: '' }))}
                            className="text-[10px] font-bold text-red-500 uppercase hover:underline"
                        >
                            Quitar foto subida
                        </button>
                    )}
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
                            <div className="flex justify-between items-center">
                                <label htmlFor="bio" className="text-sm font-semibold text-gray-700">Bio corta</label>
                                <span className={`text-[10px] font-bold ${formData.bio.length >= 100 ? 'text-red-500' : 'text-gray-400'}`}>{formData.bio.length} / 100</span>
                            </div>
                            <input type="text" id="bio" value={formData.bio} onChange={handleChange} maxLength={100} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm" />
                            <p className="text-[10px] text-gray-400">Breve descripción que se muestra en tu perfil.</p>
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
                        {formData.linksOrder.map((key, index) => (
                            <div
                                key={key}
                                onDragOver={(e) => handleDragOver(e, index, 'links')}
                                className={`flex gap-3 items-start group/item p-3 rounded-xl border transition-all ${draggedIndex === index && draggedType === 'links' ? 'opacity-50 border-blue-500 bg-blue-50' : 'border-transparent hover:border-gray-100 hover:bg-gray-50/50'}`}
                            >
                                <div
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, index, 'links')}
                                    onDragEnd={handleDragEnd}
                                    className="cursor-grab active:cursor-grabbing p-2 text-gray-300 hover:text-gray-600 transition-colors mt-1"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16"></path></svg>
                                </div>

                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Nombre del enlace</label>
                                        <input
                                            type="text"
                                            placeholder="Ej: Portafolio, Twitter..."
                                            value={formData.linkNames[key] || ''}
                                            onChange={(e) => handleLinkNameChange(key, e.target.value)}
                                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                                        />
                                    </div>
                                    <div className="space-y-1 relative group/input">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">URL (https://...)</label>
                                        <input
                                            type="url"
                                            placeholder="https://perfil.com/usuario"
                                            value={formData.links[key] || ''}
                                            onChange={(e) => handleLinkChange(key, e.target.value)}
                                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                                        />
                                        {formData.links[key] && (
                                            <button
                                                onClick={() => handleLinkChange(key, '')}
                                                className="absolute right-2 top-[26px] p-1.5 text-gray-400 hover:text-red-500 transition-all opacity-0 group-hover/input:opacity-100 focus:opacity-100"
                                            >
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                            </button>
                                        )}
                                    </div>
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
                        {formData.featuredContent.map((item, index) => (
                            <div
                                key={item.id}
                                onDragOver={(e) => handleDragOver(e, index, 'featured')}
                                className={`p-4 bg-white border rounded-xl flex gap-4 transition-all ${draggedIndex === index && draggedType === 'featured' ? 'opacity-50 border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                            >
                                <div
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, index, 'featured')}
                                    onDragEnd={handleDragEnd}
                                    className="cursor-grab active:cursor-grabbing p-1 text-gray-300 hover:text-gray-600 transition-colors flex flex-col justify-center"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16"></path></svg>
                                </div>

                                <div className="flex-1 space-y-4">
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
                                                {!item.url.startsWith('data:') && !item.url.startsWith('blob:') && (
                                                    <input
                                                        type="text"
                                                        placeholder="URL de la imagen"
                                                        value={item.url}
                                                        onChange={(e) => handleFeaturedUrlChange(item.id, e.target.value)}
                                                        className="flex-1 px-3 py-1.5 bg-gray-50 border-none rounded-md focus:ring-2 focus:ring-blue-500/20 text-xs text-gray-600"
                                                    />
                                                )}
                                                {(item.url.startsWith('data:') || item.url.startsWith('blob:')) && (
                                                    <div className="flex-1 flex items-center px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md text-[10px] font-bold uppercase italic">
                                                        Imagen subida localmente
                                                    </div>
                                                )}
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
