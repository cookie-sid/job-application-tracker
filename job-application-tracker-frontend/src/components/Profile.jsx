import React, { useState } from 'react';
const Profile = (props) => {
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: props.user.firstName,
        email: props.user.email,
        skills: props.user.skills.join(', ')
    });

    const handleSave = async () => {
        let payload = {
            id: props.user.id,
            firstName: formData.firstName,
            skills: formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill),
        };
        const response = await fetch(`http://localhost:5000/api/auth/profile`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();
        if (!response.ok) {
            console.error('Error updating profile:', data.message || 'Unknown error');
            return;
        }
        console.log('Profile updated successfully:', data);
        props.handleUserUpdate({...props.user,...data.user});
        setEditing(false);
    };

    return (
        <div className="p-6">
            <h2 className="max-w-4xl text-2xl mx-auto font-bold text-gray-900 mb-6">Profile</h2>

            <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-lg p-6 border border-gray-200">
                <div className="bg-gray-50 rounded-lg p-6">
                    {editing ? (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                <input
                                    type="text"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    disabled
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma-separated)</label>
                                <textarea
                                    value={formData.skills}
                                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                            </div>

                            <div className="flex space-x-3">
                                <button
                                    onClick={handleSave}
                                    className="!bg-green-50 !border-green-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    Save Changes
                                </button>
                                <button
                                    onClick={() => setEditing(false)}
                                    className="!bg-red-50 !border-red-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">First Name</label>
                                <p className="text-lg text-gray-900">{props.user.firstName}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <p className="text-lg text-gray-900">{props.user.email}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                                <div className="flex flex-wrap gap-2">
                                    {props.user.skills.map((skill, index) => (
                                        <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={() => setEditing(true)}
                                className="!bg-green-50 !border-green-200 text-green-800 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors"
                            >
                                Edit Profile
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;