const ApplicationRow = (props) => {
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'interview': return 'bg-green-100 text-green-800';
            case 'applied': return 'bg-blue-100 text-blue-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{props.company}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{props.position}</td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(props.status)}`}>
                    {props.status}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{props.date}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">{props.match}</td>
        </tr>
    );
}

export default ApplicationRow;