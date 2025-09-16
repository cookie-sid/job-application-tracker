import { Briefcase, Calendar, Mail, Plus, TrendingUp } from "lucide-react";
import StatCard from "./StatCard";
import ApplicationRow from "./ApplicationRow";

const Dashboard = () => {
    return (<div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
                title="Total Applications"
                value="12"
                icon={Briefcase}
                color="blue"
            />
            <StatCard
                title="Interviews Scheduled"
                value="3"
                icon={Calendar}
                color="green"
            />
            <StatCard
                title="Follow-ups Due"
                value="5"
                icon={Mail}
                color="yellow"
            />
            <StatCard
                title="Response Rate"
                value="25%"
                icon={TrendingUp}
                color="purple"
            />
        </div>

        {/* Recent Applications */}
        <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Applications</h3>
                <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    <Plus className="h-4 w-4" />
                    <span>Add Application</span>
                </button>
            </div>

            <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Match</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        <ApplicationRow
                            company="Google"
                            position="Frontend Developer"
                            status="Interview"
                            date="2 days ago"
                            match="85%"
                        />
                        <ApplicationRow
                            company="Microsoft"
                            position="Full Stack Engineer"
                            status="Applied"
                            date="1 week ago"
                            match="78%"
                        />
                        <ApplicationRow
                            company="Meta"
                            position="React Developer"
                            status="Rejected"
                            date="2 weeks ago"
                            match="92%"
                        />
                    </tbody>
                </table>
            </div>
        </div>
    </div>);
}

export default Dashboard;