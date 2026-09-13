"use client";

import { useEffect, useMemo, useState } from "react";
import {
    Search,
    RefreshCw,
    Loader2,
    AlertCircle,
    X,
    Eye,
    Calendar,
    CreditCard,
    User,
    Mail,
    Phone,
    Hash,
    CheckCircle2,
    Clock3,
    XCircle,
    Wallet,
} from "lucide-react";

export default function DonationsPage() {
    const [donations, setDonations] = useState([]);

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    const [selectedDonation, setSelectedDonation] = useState(null);

    const [error, setError] = useState("");

    // --------------------------------------------------
    // Fetch donations
    // --------------------------------------------------

    const fetchDonations = async (showRefresh = false) => {
        try {
            if (showRefresh) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }

            setError("");

            const response = await fetch("/api/donations", {
                method: "GET",
                cache: "no-store",
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "Failed to fetch donations."
                );
            }

            setDonations(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error(error);

            setError(
                error.message ||
                "Something went wrong while loading donations."
            );
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchDonations();
    }, []);

    // --------------------------------------------------
    // Statistics
    // --------------------------------------------------

    const completedDonations = donations.filter(
        (donation) =>
            donation.status?.toUpperCase() === "COMPLETE"
    );

    const pendingDonations = donations.filter(
        (donation) =>
            donation.status?.toUpperCase() === "PENDING"
    );

    const failedDonations = donations.filter((donation) =>
        ["FAILED", "CANCELED", "CANCELLED"].includes(
            donation.status?.toUpperCase()
        )
    );

    const totalAmount = completedDonations.reduce(
        (total, donation) =>
            total + Number(donation.amount || 0),
        0
    );

    // --------------------------------------------------
    // Filter + Search
    // --------------------------------------------------

    const filteredDonations = useMemo(() => {
        let result = [...donations];

        if (filter !== "all") {
            result = result.filter(
                (donation) =>
                    donation.status?.toUpperCase() ===
                    filter.toUpperCase()
            );
        }

        if (search.trim()) {
            const searchValue = search.toLowerCase().trim();

            result = result.filter((donation) => {
                return (
                    donation.fullName
                        ?.toLowerCase()
                        .includes(searchValue) ||
                    donation.name
                        ?.toLowerCase()
                        .includes(searchValue) ||
                    donation.email
                        ?.toLowerCase()
                        .includes(searchValue) ||
                    donation.phone
                        ?.toLowerCase()
                        .includes(searchValue) ||
                    donation.transaction_uuid
                        ?.toLowerCase()
                        .includes(searchValue) ||
                    donation.transactionId
                        ?.toLowerCase()
                        .includes(searchValue)
                );
            });
        }

        return result;
    }, [donations, filter, search]);

    return (
        <div className="min-h-screen w-full md:w-[80%]">

            {/* ================================================
          HEADER
      ================================================= */}

            <header className="border-b border-gray-200 bg-white">
                <div className="flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">

                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Donations
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            View and manage donations received through the website.
                        </p>
                    </div>

                    <button
                        onClick={() => fetchDonations(true)}
                        disabled={refreshing}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <RefreshCw
                            size={16}
                            className={
                                refreshing ? "animate-spin" : ""
                            }
                        />

                        {refreshing ? "Refreshing..." : "Refresh"}
                    </button>

                </div>
            </header>

            {/* ================================================
          MAIN
      ================================================= */}

            <main className="p-6">

                <div className="mx-auto max-w-7xl space-y-6">

                    {/* Error */}

                    {error && (
                        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">

                            <AlertCircle
                                size={20}
                                className="mt-0.5 shrink-0 text-red-500"
                            />

                            <div className="flex-1">
                                <p className="text-sm font-medium text-red-800">
                                    Something went wrong
                                </p>

                                <p className="mt-1 text-sm text-red-700">
                                    {error}
                                </p>
                            </div>

                            <button
                                onClick={() => setError("")}
                                className="text-red-500 hover:text-red-700"
                            >
                                <X size={18} />
                            </button>

                        </div>
                    )}

                    {/* ============================================
              STATISTICS
          ============================================ */}

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                        {/* Total Amount */}

                        <StatCard
                            title="Total Received"
                            value={`NPR ${formatAmount(totalAmount)}`}
                            icon={<Wallet size={21} />}
                            iconClass="bg-sky-50 text-sky-600"
                        />

                        {/* Completed */}

                        <StatCard
                            title="Completed"
                            value={completedDonations.length}
                            icon={<CheckCircle2 size={21} />}
                            iconClass="bg-green-50 text-green-600"
                        />

                        {/* Pending */}

                        <StatCard
                            title="Pending"
                            value={pendingDonations.length}
                            icon={<Clock3 size={21} />}
                            iconClass="bg-yellow-50 text-yellow-600"
                        />

                        {/* Failed */}

                        <StatCard
                            title="Failed"
                            value={failedDonations.length}
                            icon={<XCircle size={21} />}
                            iconClass="bg-red-50 text-red-600"
                        />

                    </div>

                    {/* ============================================
              DONATION TABLE
          ============================================ */}

                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">

                        {/* Toolbar */}

                        <div className="flex flex-col gap-4 border-b border-gray-200 p-5 lg:flex-row lg:items-center lg:justify-between">

                            {/* Search */}

                            <div className="relative w-full lg:max-w-md">

                                <Search
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type="text"
                                    placeholder="Search donors, email or transaction..."
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
                                />

                            </div>

                            {/* Filters */}

                            <div className="flex flex-wrap items-center gap-1 rounded-xl bg-gray-100 p-1">

                                <FilterButton
                                    active={filter === "all"}
                                    onClick={() => setFilter("all")}
                                >
                                    All
                                </FilterButton>

                                <FilterButton
                                    active={filter === "COMPLETE"}
                                    onClick={() =>
                                        setFilter("COMPLETE")
                                    }
                                >
                                    Completed
                                </FilterButton>

                                <FilterButton
                                    active={filter === "PENDING"}
                                    onClick={() =>
                                        setFilter("PENDING")
                                    }
                                >
                                    Pending
                                </FilterButton>

                                <FilterButton
                                    active={filter === "FAILED"}
                                    onClick={() =>
                                        setFilter("FAILED")
                                    }
                                >
                                    Failed
                                </FilterButton>

                            </div>

                        </div>

                        {/* ==========================================
                LOADING
            =========================================== */}

                        {loading ? (
                            <div className="flex min-h-[400px] items-center justify-center">

                                <div className="flex flex-col items-center gap-3">

                                    <Loader2
                                        size={28}
                                        className="animate-spin text-sky-500"
                                    />

                                    <p className="text-sm text-gray-500">
                                        Loading donations...
                                    </p>

                                </div>

                            </div>
                        ) : filteredDonations.length === 0 ? (

                            /* ========================================
                                EMPTY
                            ========================================= */

                            <div className="flex min-h-[400px] flex-col items-center justify-center px-6 text-center">

                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                                    <Wallet size={25} />
                                </div>

                                <h3 className="mt-4 text-base font-semibold text-gray-900">
                                    {search || filter !== "all"
                                        ? "No donations found"
                                        : "No donations yet"}
                                </h3>

                                <p className="mt-1 max-w-sm text-sm text-gray-500">
                                    {search || filter !== "all"
                                        ? "Try changing your search or filter."
                                        : "Donations received through the website will appear here."}
                                </p>

                            </div>

                        ) : (

                            /* ========================================
                                TABLE
                            ========================================= */

                            <div className="overflow-x-auto">

                                <table className="w-full min-w-[850px]">

                                    <thead>

                                        <tr className="border-b border-gray-200 text-left text-xs font-medium uppercase tracking-wide text-gray-400">

                                            <th className="px-5 py-4">
                                                Donor
                                            </th>

                                            <th className="px-5 py-4">
                                                Amount
                                            </th>

                                            <th className="px-5 py-4">
                                                Payment
                                            </th>

                                            <th className="px-5 py-4">
                                                Status
                                            </th>

                                            <th className="px-5 py-4">
                                                Date
                                            </th>

                                            <th className="px-5 py-4 text-right">
                                                Action
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody className="divide-y divide-gray-100">

                                        {filteredDonations.map(
                                            (donation) => {
                                                const id =
                                                    getDonationId(donation);

                                                return (
                                                    <tr
                                                        key={id}
                                                        className="transition hover:bg-gray-50"
                                                    >

                                                        {/* Donor */}

                                                        <td className="px-5 py-4">

                                                            <div className="flex items-center gap-3">

                                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sm font-semibold text-sky-600">
                                                                    {getInitial(
                                                                        donation
                                                                    )}
                                                                </div>

                                                                <div className="min-w-0">

                                                                    <p className="truncate text-sm font-medium text-gray-900">
                                                                        {getDonorName(
                                                                            donation
                                                                        )}
                                                                    </p>

                                                                    <p className="truncate text-xs text-gray-500">
                                                                        {donation.email ||
                                                                            "No email"}
                                                                    </p>

                                                                </div>

                                                            </div>

                                                        </td>

                                                        {/* Amount */}

                                                        <td className="px-5 py-4">

                                                            <span className="text-sm font-semibold text-gray-900">
                                                                NPR{" "}
                                                                {formatAmount(
                                                                    donation.amount
                                                                )}
                                                            </span>

                                                        </td>

                                                        {/* Payment */}

                                                        <td className="px-5 py-4">

                                                            <div className="flex items-center gap-2 text-sm text-gray-700">

                                                                <CreditCard
                                                                    size={15}
                                                                    className="text-gray-400"
                                                                />

                                                                {getPaymentMethod(
                                                                    donation
                                                                )}

                                                            </div>

                                                        </td>

                                                        {/* Status */}

                                                        <td className="px-5 py-4">

                                                            <StatusBadge
                                                                status={
                                                                    donation.status
                                                                }
                                                            />

                                                        </td>

                                                        {/* Date */}

                                                        <td className="px-5 py-4">

                                                            <div className="flex items-center gap-2 text-sm text-gray-500">

                                                                <Calendar
                                                                    size={14}
                                                                />

                                                                {formatDate(
                                                                    donation.createdAt
                                                                )}

                                                            </div>

                                                        </td>

                                                        {/* Action */}

                                                        <td className="px-5 py-4 text-right">

                                                            <button
                                                                onClick={() =>
                                                                    setSelectedDonation(
                                                                        donation
                                                                    )
                                                                }
                                                                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-600"
                                                                title="View donation"
                                                            >
                                                                <Eye size={16} />
                                                            </button>

                                                        </td>

                                                    </tr>
                                                );
                                            }
                                        )}

                                    </tbody>

                                </table>

                            </div>
                        )}

                        {/* Result count */}

                        {!loading &&
                            filteredDonations.length > 0 && (
                                <div className="border-t border-gray-100 px-5 py-3">

                                    <p className="text-xs text-gray-400">
                                        Showing{" "}
                                        {filteredDonations.length} of{" "}
                                        {donations.length} donations
                                    </p>

                                </div>
                            )}

                    </div>

                </div>

            </main>

            {/* ================================================
          DONATION DETAILS
      ================================================= */}

            {selectedDonation && (
                <DonationModal
                    donation={selectedDonation}
                    onClose={() =>
                        setSelectedDonation(null)
                    }
                />
            )}

        </div>
    );
}

/* =====================================================
   STAT CARD
===================================================== */

function StatCard({
    title,
    value,
    icon,
    iconClass,
}) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5">

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-sm text-gray-500">
                        {title}
                    </p>

                    <h2 className="mt-2 text-2xl font-semibold text-gray-900">
                        {value}
                    </h2>

                </div>

                <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
                >
                    {icon}
                </div>

            </div>

        </div>
    );
}

/* =====================================================
   FILTER BUTTON
===================================================== */

function FilterButton({
    active,
    onClick,
    children,
}) {
    return (
        <button
            onClick={onClick}
            className={`rounded-lg px-3.5 py-2 text-sm font-medium transition ${active
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-800"
                }`}
        >
            {children}
        </button>
    );
}

/* =====================================================
   STATUS BADGE
===================================================== */

function StatusBadge({ status }) {
    const normalizedStatus =
        status?.toUpperCase() || "UNKNOWN";

    if (normalizedStatus === "COMPLETE") {
        return (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                <CheckCircle2 size={13} />
                Completed
            </span>
        );
    }

    if (normalizedStatus === "PENDING") {
        return (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-50 px-2.5 py-1 text-xs font-medium text-yellow-700">
                <Clock3 size={13} />
                Pending
            </span>
        );
    }

    if (
        normalizedStatus === "FAILED" ||
        normalizedStatus === "CANCELED" ||
        normalizedStatus === "CANCELLED"
    ) {
        return (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700">
                <XCircle size={13} />
                {normalizedStatus === "FAILED"
                    ? "Failed"
                    : "Cancelled"}
            </span>
        );
    }

    return (
        <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
            {status || "Unknown"}
        </span>
    );
}

/* =====================================================
   DONATION MODAL
===================================================== */

function DonationModal({
    donation,
    onClose,
}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">

            {/* Overlay */}

            <div
                className="absolute inset-0"
                onClick={onClose}
            />

            {/* Modal */}

            <div className="relative z-10 max-h-[90vh] w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">

                {/* Header */}

                <div className="flex items-start justify-between border-b border-gray-200 px-6 py-5">

                    <div>

                        <div className="flex items-center gap-2">

                            <h2 className="text-xl font-semibold text-gray-900">
                                Donation Details
                            </h2>

                            <StatusBadge
                                status={donation.status}
                            />

                        </div>

                        <p className="mt-1 text-sm text-gray-500">
                            {formatDateTime(
                                donation.createdAt
                            )}
                        </p>

                    </div>

                    <button
                        onClick={onClose}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                    >
                        <X size={20} />
                    </button>

                </div>

                {/* Body */}

                <div className="max-h-[65vh] overflow-y-auto px-6 py-6">

                    {/* Amount */}

                    <div className="rounded-2xl bg-sky-50 p-5 text-center">

                        <p className="text-sm text-sky-600">
                            Donation Amount
                        </p>

                        <p className="mt-1 text-3xl font-semibold text-gray-900">
                            NPR{" "}
                            {formatAmount(
                                donation.amount
                            )}
                        </p>

                    </div>

                    {/* Donor */}

                    <div className="mt-6">

                        <h3 className="text-sm font-semibold text-gray-900">
                            Donor Information
                        </h3>

                        <div className="mt-3 divide-y divide-gray-100 rounded-xl border border-gray-200">

                            <DetailRow
                                icon={<User size={16} />}
                                label="Full Name"
                                value={getDonorName(
                                    donation
                                )}
                            />

                            <DetailRow
                                icon={<Mail size={16} />}
                                label="Email"
                                value={
                                    donation.email ||
                                    "Not provided"
                                }
                            />

                            <DetailRow
                                icon={<Phone size={16} />}
                                label="Phone"
                                value={
                                    donation.phone ||
                                    "Not provided"
                                }
                            />

                        </div>

                    </div>

                    {/* Payment */}

                    <div className="mt-6">

                        <h3 className="text-sm font-semibold text-gray-900">
                            Payment Information
                        </h3>

                        <div className="mt-3 divide-y divide-gray-100 rounded-xl border border-gray-200">

                            <DetailRow
                                icon={<CreditCard size={16} />}
                                label="Payment Method"
                                value={getPaymentMethod(
                                    donation
                                )}
                            />

                            <DetailRow
                                icon={<Hash size={16} />}
                                label="Transaction ID"
                                value={
                                    donation.transaction_uuid ||
                                    donation.transactionId ||
                                    donation.transaction_id ||
                                    "Not available"
                                }
                                breakValue
                            />

                            <DetailRow
                                icon={<Calendar size={16} />}
                                label="Date"
                                value={formatDateTime(
                                    donation.createdAt
                                )}
                            />

                        </div>

                    </div>

                </div>

                {/* Footer */}

                <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">

                    <button
                        onClick={onClose}
                        className="w-full rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                    >
                        Close
                    </button>

                </div>

            </div>
        </div>
    );
}

/* =====================================================
   DETAIL ROW
===================================================== */

function DetailRow({
    icon,
    label,
    value,
    breakValue = false,
}) {
    return (
        <div className="flex gap-4 px-4 py-3.5">

            <div className="mt-0.5 shrink-0 text-gray-400">
                {icon}
            </div>

            <div className="min-w-0 flex-1">

                <p className="text-xs text-gray-400">
                    {label}
                </p>

                <p
                    className={`mt-1 text-sm font-medium text-gray-800 ${breakValue
                            ? "break-all"
                            : ""
                        }`}
                >
                    {value}
                </p>

            </div>

        </div>
    );
}

/* =====================================================
   HELPERS
===================================================== */

function getDonationId(donation) {
    if (!donation?._id) {
        return Math.random().toString();
    }

    if (typeof donation._id === "string") {
        return donation._id;
    }

    if (donation._id.$oid) {
        return donation._id.$oid;
    }

    return String(donation._id);
}

function getDonorName(donation) {
    return (
        donation.fullName ||
        donation.donorName ||
        "Anonymous Donor"
    );
}

function getInitial(donation) {
    const name = getDonorName(donation);

    if (name === "Anonymous Donor") {
        return "A";
    }

    return name.charAt(0).toUpperCase();
}

function getPaymentMethod(donation) {
    return (
        donation.paymentMethod ||
        donation.payment_method ||
        donation.method ||
        "eSewa"
    );
}

function formatAmount(amount) {
    const number = Number(amount || 0);

    return number.toLocaleString("en-NP");
}

function formatDate(dateValue) {
    if (!dateValue) {
        return "Unknown";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
        return "Unknown";
    }

    return date.toLocaleDateString("en-NP", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

function formatDateTime(dateValue) {
    if (!dateValue) {
        return "Unknown";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
        return "Unknown";
    }

    return date.toLocaleString("en-NP", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });
}