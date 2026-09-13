"use client";

import { useEffect, useMemo, useState } from "react";
import {
    Search,
    Mail,
    Phone,
    Calendar,
    Eye,
    EyeOff,
    Trash2,
    RefreshCw,
    X,
    MessageSquare,
    Loader2,
    AlertCircle,
    CheckCircle2,
    Inbox,
} from "lucide-react";

export default function ContactMessagesPage() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    const [selectedMessage, setSelectedMessage] = useState(null);

    const [error, setError] = useState("");

    const [deletingId, setDeletingId] = useState(null);
    const [updatingId, setUpdatingId] = useState(null);

    // ---------------------------------------------
    // Fetch messages
    // ---------------------------------------------

    const fetchMessages = async (showRefresh = false) => {
        try {
            if (showRefresh) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }

            setError("");

            const response = await fetch("/api/contact-messages", {
                method: "GET",
                cache: "no-store",
            });

            if (!response.ok) {
                throw new Error("Failed to fetch contact messages.");
            }

            const data = await response.json();

            setMessages(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error(error);

            setError(
                error.message || "Something went wrong while loading messages."
            );
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    // ---------------------------------------------
    // Filter messages
    // ---------------------------------------------

    const filteredMessages = useMemo(() => {
        let result = [...messages];

        // Status filter
        if (filter === "unread") {
            result = result.filter((message) => message.status === "unread");
        }

        if (filter === "read") {
            result = result.filter((message) => message.status === "read");
        }

        // Search
        if (search.trim()) {
            const searchValue = search.toLowerCase().trim();

            result = result.filter((message) => {
                return (
                    message.fullName?.toLowerCase().includes(searchValue) ||
                    message.email?.toLowerCase().includes(searchValue) ||
                    message.phone?.toLowerCase().includes(searchValue) ||
                    message.message?.toLowerCase().includes(searchValue)
                );
            });
        }

        return result;
    }, [messages, filter, search]);

    // ---------------------------------------------
    // Stats
    // ---------------------------------------------

    const totalMessages = messages.length;

    const unreadMessages = messages.filter(
        (message) => message.status === "unread"
    ).length;

    const readMessages = messages.filter(
        (message) => message.status === "read"
    ).length;

    // ---------------------------------------------
    // Mark read / unread
    // ---------------------------------------------

    const toggleReadStatus = async (message) => {
        try {
            setUpdatingId(getMessageId(message));

            const id = getMessageId(message);

            const newStatus =
                message.status === "unread" ? "read" : "unread";

            const response = await fetch("/api/contact-messages", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id,
                    status: newStatus,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.error || "Failed to update message status."
                );
            }

            setMessages((previousMessages) =>
                previousMessages.map((item) => {
                    if (getMessageId(item) === id) {
                        return {
                            ...item,
                            status: newStatus,
                        };
                    }

                    return item;
                })
            );

            // Also update selected message if it is open
            if (
                selectedMessage &&
                getMessageId(selectedMessage) === id
            ) {
                setSelectedMessage({
                    ...selectedMessage,
                    status: newStatus,
                });
            }
        } catch (error) {
            console.error(error);

            setError(
                error.message || "Failed to update message."
            );
        } finally {
            setUpdatingId(null);
        }
    };

    // ---------------------------------------------
    // Delete message
    // ---------------------------------------------

    const deleteMessage = async (message) => {
        const id = getMessageId(message);

        const confirmed = window.confirm(
            "Are you sure you want to delete this message? This action cannot be undone."
        );

        if (!confirmed) return;

        try {
            setDeletingId(id);

            const response = await fetch(
                `/api/contact-messages?id=${id}`,
                {
                    method: "DELETE",
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.error || "Failed to delete message."
                );
            }

            setMessages((previousMessages) =>
                previousMessages.filter(
                    (item) => getMessageId(item) !== id
                )
            );

            if (
                selectedMessage &&
                getMessageId(selectedMessage) === id
            ) {
                setSelectedMessage(null);
            }
        } catch (error) {
            console.error(error);

            setError(
                error.message || "Failed to delete message."
            );
        } finally {
            setDeletingId(null);
        }
    };

    // ---------------------------------------------
    // Open message
    // ---------------------------------------------

    const openMessage = async (message) => {
        setSelectedMessage(message);

        // Automatically mark unread message as read
        if (message.status === "unread") {
            await toggleReadStatus(message);
        }
    };

    return (
        <div className="min-h-screen w-full md:w-[80%]">
            {/* -----------------------------------------
          Header
      ------------------------------------------ */}

            <header className="border-b border-gray-200 bg-white">
                <div className="flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
                    <div className="relative left-12 md:left-0">
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Contact Messages
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Manage messages submitted through your website.
                        </p>
                    </div>

                    <button
                        onClick={() => fetchMessages(true)}
                        disabled={refreshing}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <RefreshCw
                            size={16}
                            className={refreshing ? "animate-spin" : ""}
                        />

                        {refreshing ? "Refreshing..." : "Refresh"}
                    </button>
                </div>
            </header>

            {/* -----------------------------------------
          Content
      ------------------------------------------ */}

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

                    {/* ---------------------------------------
              Stats
          ---------------------------------------- */}

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                        {/* Total */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Total Messages
                                    </p>

                                    <h2 className="mt-2 text-3xl font-semibold text-gray-900">
                                        {totalMessages}
                                    </h2>
                                </div>

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                                    <Inbox size={21} />
                                </div>
                            </div>
                        </div>

                        {/* Unread */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Unread
                                    </p>

                                    <h2 className="mt-2 text-3xl font-semibold text-gray-900">
                                        {unreadMessages}
                                    </h2>
                                </div>

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                    <Mail size={21} />
                                </div>
                            </div>
                        </div>

                        {/* Read */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Read
                                    </p>

                                    <h2 className="mt-2 text-3xl font-semibold text-gray-900">
                                        {readMessages}
                                    </h2>
                                </div>

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                                    <CheckCircle2 size={21} />
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* ---------------------------------------
              Main Card
          ---------------------------------------- */}

                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">

                        {/* Toolbar */}
                        <div className="flex flex-col gap-4 border-b border-gray-200 p-5 md:flex-row md:items-center md:justify-between">

                            {/* Search */}
                            <div className="relative w-full md:max-w-md">
                                <Search
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type="text"
                                    placeholder="Search messages..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
                                />
                            </div>

                            {/* Filters */}
                            <div className="flex items-center gap-1 rounded-xl bg-gray-100 p-1">

                                <FilterButton
                                    active={filter === "all"}
                                    onClick={() => setFilter("all")}
                                >
                                    All
                                </FilterButton>

                                <FilterButton
                                    active={filter === "unread"}
                                    onClick={() => setFilter("unread")}
                                >
                                    Unread
                                </FilterButton>

                                <FilterButton
                                    active={filter === "read"}
                                    onClick={() => setFilter("read")}
                                >
                                    Read
                                </FilterButton>

                            </div>
                        </div>

                        {/* -------------------------------------
                Loading
            -------------------------------------- */}

                        {loading ? (
                            <div className="flex min-h-[400px] items-center justify-center">
                                <div className="flex flex-col items-center gap-3">
                                    <Loader2
                                        size={28}
                                        className="animate-spin text-sky-500"
                                    />

                                    <p className="text-sm text-gray-500">
                                        Loading messages...
                                    </p>
                                </div>
                            </div>
                        ) : filteredMessages.length === 0 ? (
                            /* -----------------------------------
                               Empty State
                            ------------------------------------ */

                            <div className="flex min-h-[400px] flex-col items-center justify-center px-6 text-center">

                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                                    <MessageSquare size={25} />
                                </div>

                                <h3 className="mt-4 text-base font-semibold text-gray-900">
                                    {search || filter !== "all"
                                        ? "No messages found"
                                        : "No contact messages yet"}
                                </h3>

                                <p className="mt-1 max-w-sm text-sm text-gray-500">
                                    {search || filter !== "all"
                                        ? "Try changing your search or filter."
                                        : "Messages submitted through the contact form will appear here."}
                                </p>

                            </div>
                        ) : (
                            /* -----------------------------------
                               Message List
                            ------------------------------------ */

                            <div className="divide-y divide-gray-100">

                                {filteredMessages.map((message) => {
                                    const id = getMessageId(message);

                                    const isUnread =
                                        message.status === "unread";

                                    return (
                                        <div
                                            key={id}
                                            className={`group flex flex-col gap-4 px-5 py-5 transition hover:bg-gray-50 md:flex-row md:items-center ${isUnread ? "bg-sky-50/30" : ""
                                                }`}
                                        >
                                            {/* Main info */}
                                            <button
                                                onClick={() => openMessage(message)}
                                                className="min-w-0 flex-1 text-left"
                                            >
                                                <div className="flex items-start gap-3">

                                                    {/* Status dot */}
                                                    <div className="mt-2 shrink-0">
                                                        <div
                                                            className={`h-2.5 w-2.5 rounded-full ${isUnread
                                                                    ? "bg-sky-500"
                                                                    : "bg-gray-300"
                                                                }`}
                                                        />
                                                    </div>

                                                    <div className="min-w-0 flex-1">

                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <h3
                                                                className={`truncate text-sm ${isUnread
                                                                        ? "font-semibold text-gray-900"
                                                                        : "font-medium text-gray-800"
                                                                    }`}
                                                            >
                                                                {message.fullName ||
                                                                    "Unknown"}
                                                            </h3>

                                                            {isUnread && (
                                                                <span className="rounded-full bg-sky-100 px-2 py-0.5 text-xs font-medium text-sky-700">
                                                                    Unread
                                                                </span>
                                                            )}
                                                        </div>

                                                        <p className="mt-1 truncate text-sm text-gray-500">
                                                            {message.email}
                                                        </p>

                                                        <p className="mt-2 line-clamp-1 text-sm text-gray-600">
                                                            {message.message}
                                                        </p>

                                                    </div>
                                                </div>
                                            </button>

                                            {/* Date */}
                                            <div className="hidden shrink-0 items-center gap-2 text-xs text-gray-400 md:flex">
                                                <Calendar size={14} />
                                                {formatDate(message.createdAt)}
                                            </div>

                                            {/* Actions */}
                                            <div className="flex shrink-0 items-center gap-2">

                                                <button
                                                    onClick={() =>
                                                        openMessage(message)
                                                    }
                                                    title="View message"
                                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-600"
                                                >
                                                    <Eye size={16} />
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        toggleReadStatus(message)
                                                    }
                                                    disabled={
                                                        updatingId === id
                                                    }
                                                    title={
                                                        isUnread
                                                            ? "Mark as read"
                                                            : "Mark as unread"
                                                    }
                                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                                                >
                                                    {updatingId === id ? (
                                                        <Loader2
                                                            size={16}
                                                            className="animate-spin"
                                                        />
                                                    ) : isUnread ? (
                                                        <Eye size={16} />
                                                    ) : (
                                                        <EyeOff size={16} />
                                                    )}
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        deleteMessage(message)
                                                    }
                                                    disabled={
                                                        deletingId === id
                                                    }
                                                    title="Delete message"
                                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                                                >
                                                    {deletingId === id ? (
                                                        <Loader2
                                                            size={16}
                                                            className="animate-spin"
                                                        />
                                                    ) : (
                                                        <Trash2 size={16} />
                                                    )}
                                                </button>

                                            </div>
                                        </div>
                                    );
                                })}

                            </div>
                        )}

                        {/* Result count */}
                        {!loading &&
                            filteredMessages.length > 0 && (
                                <div className="border-t border-gray-100 px-5 py-3">
                                    <p className="text-xs text-gray-400">
                                        Showing {filteredMessages.length} of{" "}
                                        {totalMessages} messages
                                    </p>
                                </div>
                            )}
                    </div>
                </div>
            </main>

            {/* -----------------------------------------
          Message Details Modal
      ------------------------------------------ */}

            {selectedMessage && (
                <MessageModal
                    message={selectedMessage}
                    onClose={() => setSelectedMessage(null)}
                    onToggleStatus={() =>
                        toggleReadStatus(selectedMessage)
                    }
                    onDelete={() =>
                        deleteMessage(selectedMessage)
                    }
                    updating={
                        updatingId ===
                        getMessageId(selectedMessage)
                    }
                    deleting={
                        deletingId ===
                        getMessageId(selectedMessage)
                    }
                />
            )}
        </div>
    );
}

/* =================================================
   Filter Button
================================================= */

function FilterButton({ active, onClick, children }) {
    return (
        <button
            onClick={onClick}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${active
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-800"
                }`}
        >
            {children}
        </button>
    );
}

/* =================================================
   Message Modal
================================================= */

function MessageModal({
    message,
    onClose,
    onToggleStatus,
    onDelete,
    updating,
    deleting,
}) {
    const isUnread = message.status === "unread";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">

            <div
                className="absolute inset-0"
                onClick={onClose}
            />

            <div className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">

                {/* Modal Header */}
                <div className="flex items-start justify-between border-b border-gray-200 px-6 py-5">

                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-semibold text-gray-900">
                                Message Details
                            </h2>

                            <span
                                className={`rounded-full px-2.5 py-1 text-xs font-medium ${isUnread
                                        ? "bg-sky-100 text-sky-700"
                                        : "bg-gray-100 text-gray-600"
                                    }`}
                            >
                                {isUnread ? "Unread" : "Read"}
                            </span>
                        </div>

                        <p className="mt-1 text-sm text-gray-500">
                            Received {formatDate(message.createdAt)}
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                    >
                        <X size={20} />
                    </button>

                </div>

                {/* Modal Body */}
                <div className="max-h-[60vh] overflow-y-auto px-6 py-6">

                    {/* Contact information */}
                    <div className="grid gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4 sm:grid-cols-2">

                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                Full Name
                            </p>

                            <p className="mt-1 text-sm font-medium text-gray-900">
                                {message.fullName || "Not provided"}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                Email
                            </p>

                            <a
                                href={`mailto:${message.email}`}
                                className="mt-1 block text-sm font-medium text-sky-600 hover:underline"
                            >
                                {message.email || "Not provided"}
                            </a>
                        </div>

                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                Phone
                            </p>

                            {message.phone ? (
                                <a
                                    href={`tel:${message.phone}`}
                                    className="mt-1 flex items-center gap-1 text-sm font-medium text-gray-900 hover:text-sky-600"
                                >
                                    <Phone size={14} />
                                    {message.phone}
                                </a>
                            ) : (
                                <p className="mt-1 text-sm text-gray-500">
                                    Not provided
                                </p>
                            )}
                        </div>

                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                Date
                            </p>

                            <p className="mt-1 flex items-center gap-1 text-sm font-medium text-gray-900">
                                <Calendar size={14} />
                                {formatDate(message.createdAt)}
                            </p>
                        </div>

                    </div>

                    {/* Message */}
                    <div className="mt-6">

                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                            Message
                        </p>

                        <div className="mt-2 rounded-xl border border-gray-200 bg-white p-5">
                            <p className="whitespace-pre-wrap text-sm leading-7 text-gray-700">
                                {message.message || "No message provided."}
                            </p>
                        </div>

                    </div>

                </div>

                {/* Modal Footer */}
                <div className="flex flex-col-reverse gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">

                    <button
                        onClick={onDelete}
                        disabled={deleting}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {deleting ? (
                            <Loader2
                                size={16}
                                className="animate-spin"
                            />
                        ) : (
                            <Trash2 size={16} />
                        )}

                        Delete
                    </button>

                    <div className="flex flex-col gap-2 sm:flex-row">

                        <button
                            onClick={onToggleStatus}
                            disabled={updating}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {updating ? (
                                <Loader2
                                    size={16}
                                    className="animate-spin"
                                />
                            ) : isUnread ? (
                                <CheckCircle2 size={16} />
                            ) : (
                                <Mail size={16} />
                            )}

                            {isUnread
                                ? "Mark as Read"
                                : "Mark as Unread"}
                        </button>

                        <a
                            href={`mailto:${message.email}`}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-sky-600"
                        >
                            <Mail size={16} />
                            Reply by Email
                        </a>

                    </div>

                </div>

            </div>
        </div>
    );
}

/* =================================================
   Helpers
================================================= */

function getMessageId(message) {
    if (!message?._id) return "";

    // If API returns _id as a string
    if (typeof message._id === "string") {
        return message._id;
    }

    // If MongoDB returns {$oid: "..."}
    if (message._id.$oid) {
        return message._id.$oid;
    }

    // Fallback
    return String(message._id);
}

function formatDate(dateValue) {
    if (!dateValue) return "Unknown date";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
        return "Unknown date";
    }

    return date.toLocaleDateString("en-NP", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}