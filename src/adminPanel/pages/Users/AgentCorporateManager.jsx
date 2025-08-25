/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useMemo, useState } from "react";
import {
  useGetAgents,
  useApproveAgent,
  useDeleteAgent,
} from "../../../ApiHooks/useAgentHook";

/** Top tabs: All | Agents | Corporate */
const RoleTabs = ({ value, onChange }) => {
  const tabs = [
    { key: "all", label: "All" },
    { key: "agent", label: "Agents" },
    { key: "corporate", label: "Corporate" },
  ];
  return (
    <div className="inline-flex rounded-lg overflow-hidden border border-gray-200">
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          className={`px-4 py-2 text-sm font-medium transition ${
            value === t.key
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
};

const AgentRow = ({ row, onApprove, onDelete, approving, deleting }) => {
  return (
    <tr className="border-t hover:bg-[#ffff] transition duration-200">
      <td className="px-6 py-3 text-sm font-medium text-gray-800">{row.name}</td>
      <td className="px-6 py-3 text-sm text-gray-600">{row.phone}</td>
      <td className="px-6 py-3 text-sm text-gray-600">{row.email}</td>
      <td className="px-6 py-3 text-sm capitalize text-gray-700">{row.role}</td>
      <td className="px-6 py-3 text-sm">
        {row.approved ? (
          <span className="inline-flex items-center gap-2 text-green-700">
            <span className="w-2 h-2 rounded-full bg-green-500" /> Approved
          </span>
        ) : (
          <span className="inline-flex items-center gap-2 text-yellow-700">
            <span className="w-2 h-2 rounded-full bg-yellow-400" /> Pending
          </span>
        )}
      </td>
      <td className="px-6 py-3 text-sm text-gray-700">
        {new Date(row.createdAt).toLocaleString()}
      </td>
      <td className="px-6 py-3 text-sm flex gap-2">
        <button
          onClick={() => onApprove(row._id)}
          disabled={row.approved || approving}
          className={`px-3 py-1 rounded-md text-white ${
            row.approved || approving
              ? "bg-green-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
          title={row.approved ? "Already approved" : "Approve"}
        >
          {row.approved ? "Approved" : approving ? "..." : "Approve"}
        </button>
        <button
          onClick={() => onDelete(row._id, row.name)}
          disabled={deleting}
          className={`px-3 py-1 rounded-md text-white ${
            deleting ? "bg-red-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </td>
    </tr>
  );
};

const AgentCorporateManager = ({ defaultTab = "all" }) => {
  const [roleTab, setRoleTab] = useState(defaultTab); // 'all' | 'agent' | 'corporate'
  const params = useMemo(
    () => (roleTab === "all" ? {} : { role: roleTab }),
    [roleTab]
  );

  const { data, isLoading, error, refetch } = useGetAgents(params);
  const { mutate: approve, isPending: approving } = useApproveAgent();
  const { mutate: remove, isPending: deleting } = useDeleteAgent();

  const list = data || [];

  const handleApprove = (id) => {
    approve(id, {
      onSuccess: () => {
        // toast.success("Approved successfully");
        refetch();
      },
      onError: (err) => {
        console.error(err?.response?.data?.message || "Approval failed");
      },
    });
  };

  const handleDelete = (id, name) => {
    if (!window.confirm(`Delete ${name || "this record"}? This action cannot be undone.`)) return;
    remove(id, {
      onSuccess: (resp) => {
        // toast.success(resp?.message || "Deleted successfully");
        refetch();
      },
      onError: (err) => {
        console.error(err?.response?.data?.message || "Delete failed");
      },
    });
  };

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Agents & Corporate Users</h2>
        <RoleTabs value={roleTab} onChange={setRoleTab} />
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md bg-white">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">
            {error.message || "Failed to load"}
          </div>
        ) : list.length === 0 ? (
          <div className="p-8 text-center text-gray-600">No records found.</div>
        ) : (
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-50 text-gray-700">
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((row) => (
                <AgentRow
                  key={row._id}
                  row={row}
                  onApprove={handleApprove}
                  onDelete={handleDelete}
                  approving={approving}
                  deleting={deleting}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default AgentCorporateManager;
