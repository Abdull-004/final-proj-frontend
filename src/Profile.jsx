import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiRequest } from './api';
import { useAuth } from './AuthContext';

export default function Profile() {
    const { id } = useParams();
    const { user, token } = useAuth();
    const [profile, setProfile] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState({ name: '', location: '', bio: '', profileImage: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Add your Cloudinary unsigned upload preset and cloud name here
    const CLOUDINARY_UPLOAD_PRESET = 'market-hub-unsigned';
    const CLOUDINARY_CLOUD_NAME = 'dwtxstchf';

    const isOwner = user && user.id === id;

    useEffect(() => {
        fetchProfile();
        // eslint-disable-next-line
    }, [id]);

    const fetchProfile = async () => {
        setLoading(true); setError(null);
        try {
            const res = await apiRequest(`/auth/profile/${id}`, 'GET', null, token);
            setProfile(res);
            setForm({
                name: res.name || '',
                location: res.location || '',
                bio: res.bio || '',
                profileImage: res.profileImage || '',
            });
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError(null); setSuccess(false);
        try {
            await apiRequest(`/auth/profile/${id}`, 'PUT', form, token);
            setSuccess(true);
            setEditMode(false);
            fetchProfile();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setError(null);
        setSuccess(false);
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
            const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (data.secure_url) {
                setForm(f => ({ ...f, profileImage: data.secure_url }));
                setSuccess(true);
            } else {
                setError('Image upload failed.');
            }
        } catch (err) {
            setError('Image upload failed.');
        }
    };

    if (loading) return <div className="text-center py-8">Loading...</div>;
    if (error) return <div className="text-center text-red-600 py-8">{error}</div>;
    if (!profile) return null;

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-lg p-6 rounded-xl shadow-lg bg-white border border-gray-200">
                <div className="flex flex-col items-center mb-6">
                    <img
                        src={profile.profileImage || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(profile.name)}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border-2 border-green-700 mb-2"
                    />
                    <h2 className="text-2xl font-bold text-green-800 mb-1">{profile.name}</h2>
                    <div className="text-gray-600 mb-1">{profile.role}</div>
                    <div className="text-gray-500 text-sm">{profile.location}</div>
                </div>
                {editMode ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block mb-1 font-medium">Name</label>
                            <input
                                type="text"
                                name="name"
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Location</label>
                            <input
                                type="text"
                                name="location"
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={form.location}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Bio</label>
                            <textarea
                                name="bio"
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={form.bio}
                                onChange={handleChange}
                                rows={3}
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Profile Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                onChange={handleImageChange}
                            />
                            {form.profileImage && (
                                <img src={form.profileImage} alt="Preview" className="w-20 h-20 rounded-full mt-2 object-cover border-2 border-green-700" />
                            )}
                        </div>
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 font-semibold"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 font-semibold"
                                onClick={() => { setEditMode(false); setError(null); setSuccess(false); }}
                            >
                                Cancel
                            </button>
                        </div>
                        {error && <div className="text-red-600 text-center">{error}</div>}
                        {success && <div className="text-green-600 text-center">Profile updated!</div>}
                    </form>
                ) : (
                    <>
                        <div className="mb-4 text-gray-700 whitespace-pre-line">{profile.bio || <span className="italic text-gray-400">No bio provided.</span>}</div>
                        <div className="mb-2 text-gray-600"><span className="font-semibold">Email:</span> {profile.email}</div>
                        {isOwner && (
                            <button
                                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 font-semibold mt-2"
                                onClick={() => setEditMode(true)}
                            >
                                Edit Profile
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
} 