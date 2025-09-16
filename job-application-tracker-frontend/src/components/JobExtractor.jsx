import React, { useState } from 'react';
const JobExtractor = () => {
    const [jobUrl, setJobUrl] = useState('');
    const [extractedJob, setExtractedJob] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleExtractJob = async () => {
        if (!jobUrl.trim()) return;

        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setExtractedJob({
                company: 'Google',
                position: 'Senior Frontend Developer',
                location: 'Mountain View, CA',
                type: 'Full-time',
                salary: '$120k - $180k',
                description: 'We are looking for a Senior Frontend Developer to join our team...',
                requirements: [
                    '5+ years of React experience',
                    'TypeScript proficiency',
                    'Experience with state management (Redux/Context)',
                    'Knowledge of testing frameworks',
                    'GraphQL experience preferred'
                ],
                matchPercentage: 85
            });
            setLoading(false);
        }, 2000);
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">LinkedIn Job Extractor</h2>

            {/* URL Input */}
            <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    LinkedIn Job URL
                </label>
                <div className="flex space-x-4">
                    <input
                        type="url"
                        value={jobUrl}
                        onChange={(e) => setJobUrl(e.target.value)}
                        placeholder="https://www.linkedin.com/jobs/view/..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <button
                        onClick={handleExtractJob}
                        disabled={loading || !jobUrl.trim()}
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? 'Extracting...' : 'Extract Job'}
                    </button>
                </div>
            </div>

            {/* Extracted Job Info */}
            {extractedJob && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Job Details */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Details</h3>
                        <div className="bg-gray-50 rounded-lg p-6">
                            <h4 className="text-xl font-bold text-gray-900 mb-2">{extractedJob.position}</h4>
                            <p className="text-lg text-gray-700 mb-4">{extractedJob.company}</p>

                            <div className="space-y-2 text-sm text-gray-600 mb-4">
                                <p><span className="font-medium">Location:</span> {extractedJob.location}</p>
                                <p><span className="font-medium">Type:</span> {extractedJob.type}</p>
                                <p><span className="font-medium">Salary:</span> {extractedJob.salary}</p>
                            </div>

                            <div className="mb-4">
                                <h5 className="font-medium text-gray-900 mb-2">Requirements:</h5>
                                <ul className="space-y-1 text-sm text-gray-600">
                                    {extractedJob.requirements.map((req, index) => (
                                        <li key={index}>• {req}</li>
                                    ))}
                                </ul>
                            </div>

                            <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                                Save Application
                            </button>
                        </div>
                    </div>

                    {/* Match Analysis */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Match Analysis</h3>
                        <div className="bg-gray-50 rounded-lg p-6">
                            <div className="text-center mb-6">
                                <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-4">
                                    <span className="text-2xl font-bold text-green-600">{extractedJob.matchPercentage}%</span>
                                </div>
                                <p className="text-lg font-semibold text-gray-900">Great Match!</p>
                                <p className="text-sm text-gray-600">Your skills align well with this position</p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h5 className="font-medium text-gray-900 mb-2">Matching Skills:</h5>
                                    <div className="flex flex-wrap gap-2">
                                        {['React', 'JavaScript', 'HTML/CSS', 'Git'].map((skill) => (
                                            <span key={skill} className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h5 className="font-medium text-gray-900 mb-2">Missing Skills:</h5>
                                    <div className="flex flex-wrap gap-2">
                                        {['TypeScript', 'GraphQL'].map((skill) => (
                                            <span key={skill} className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-xs">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default JobExtractor;