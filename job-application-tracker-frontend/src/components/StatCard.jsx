const StatCard = (props) => {
    const colorClasses = {
        blue: 'bg-blue-100 text-blue-800',
        green: 'bg-green-100 text-green-800',
        yellow: 'bg-yellow-100 text-yellow-800',
        purple: 'bg-purple-100 text-purple-800'
    };

    return (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{props.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{props.value}</p>
                </div>
                <div className={`p-3 rounded-full ${colorClasses[props.color]}`}>
                    <props.icon className="h-6 w-6" />
                </div>
            </div>
        </div>
    );
}

export default StatCard;