import { getDb } from '@/lib/db';
import { updateSettings, addBlog, deleteBlog } from '../actions';

export default function AdminPage() {
    const { settings, blogs } = getDb();

    return (
        <div className="admin-container">
            <div className="admin-sidebar glass-panel">
                <h3 className="gradient-text" style={{ marginBottom: '2rem' }}>Administration</h3>
                <a href="#settings" className="active">Paramètres Généraux</a>
                <a href="#blogs">Gestion des Blogs</a>
                <a href="/" style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                    Retour au Site
                </a>
            </div>

            <div className="admin-content">
                <div className="glass-panel" id="settings" style={{ marginBottom: '2rem' }}>
                    <h2 style={{ marginBottom: '1.5rem' }}>Informations de l'Entreprise</h2>
                    <form action={updateSettings}>
                        <div className="form-group">
                            <label className="form-label">Téléphone</label>
                            <input type="text" name="telephone" className="form-input" defaultValue={settings.telephone} required />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input type="email" name="email" className="form-input" defaultValue={settings.email} required />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Adresse de l'entreprise</label>
                            <input type="text" name="address" className="form-input" defaultValue={settings.address} required />
                        </div>
                        <button type="submit" className="btn btn-primary">Sauvegarder les paramètres</button>
                    </form>
                </div>

                <div className="glass-panel" id="blogs">
                    <h2 style={{ marginBottom: '1.5rem' }}>Ajouter un Article</h2>
                    <form action={addBlog}>
                        <div className="form-group">
                            <label className="form-label">Titre</label>
                            <input type="text" name="title" className="form-input" required />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Résumé (Excerpt)</label>
                            <input type="text" name="excerpt" className="form-input" required />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Contenu</label>
                            <textarea name="content" className="form-textarea" required />
                        </div>
                        <button type="submit" className="btn btn-primary">Publier l'article</button>
                    </form>
                </div>

                <h3 style={{ margin: '3rem 0 1rem' }}>Articles Existants</h3>
                <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                    {blogs.map(blog => (
                        <div key={blog.id} className="glass-panel" style={{ padding: '1.5rem' }}>
                            <h4 style={{ marginBottom: '0.5rem' }}>{blog.title}</h4>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>{blog.date}</p>
                            <form action={deleteBlog.bind(null, blog.id)}>
                                <button type="submit" className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                                    Supprimer
                                </button>
                            </form>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
