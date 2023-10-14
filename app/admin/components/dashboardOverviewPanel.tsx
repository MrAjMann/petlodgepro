type Props = {};
export const DashboardOverviewPanel = (props: Props) => {
  return (
    <div className="my-14 flex  mx-48 2xl:mx-auto bg-white justify-between items-center  border border-slate-400 rounded-lg px-24 py-4 font-semibold text-gray-900">
      <div className="text-left space-y-1">
        <p className="text-2xl">
          {/* Active:Inactive */}
          <span>{15}</span> / <span className="text-red-300">{1}</span>
        </p>
        <h4 className="text-cyan-700">Tenants</h4>
      </div>
      <div className="text-left space-y-1">
        <p className="text-2xl">
          <span>{7}</span> / <span className="text-red-300">{0}</span>
        </p>
        <h4 className="text-cyan-700">Users</h4>
      </div>
      <div className="text-left space-y-1">
        <p className="text-2xl">
          <span>{17}</span>
        </p>
        <h4 className="text-cyan-700">Active Connections</h4>
      </div>
      <div className="text-left space-y-1">
        <p className="text-2xl">
          <span>{1}</span>
        </p>
        <h4 className="text-cyan-700">Support Tickets</h4>
      </div>
    </div>
  );
};
