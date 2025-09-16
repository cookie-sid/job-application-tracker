import { FileText } from "lucide-react";

const ResumeMatch = () => {
    <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Resume Match Analysis</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Current Resume Section */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Resume</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Upload your current resume to analyze skill matches</p>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                        Upload Resume
                    </button>
                </div>
            </div>

            {/* Job Comparison Section */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Comparison</h3>
                <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900">Google - Frontend Developer</h4>
                        <div className="mt-2">
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                                <span>Match Score</span>
                                <span>85%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                            </div>
                        </div>
                        <div className="mt-3">
                            <p className="text-xs text-gray-500">Missing skills: TypeScript, GraphQL</p>
                        </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900">Microsoft - Full Stack Engineer</h4>
                        <div className="mt-2">
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                                <span>Match Score</span>
                                <span>78%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                            </div>
                        </div>
                        <div className="mt-3">
                            <p className="text-xs text-gray-500">Missing skills: Azure, C#, .NET</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Suggestions */}
        <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Improvement Suggestions</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <ul className="space-y-2 text-sm text-blue-800">
                    <li>• Consider learning TypeScript to improve your frontend development skills</li>
                    <li>• Add GraphQL experience to increase compatibility with modern React positions</li>
                    <li>• Highlight your React expertise more prominently in your resume</li>
                    <li>• Consider adding cloud platform experience (AWS/Azure)</li>
                </ul>
            </div>
        </div>
    </div>
}

export default ResumeMatch;