"use client";

import { useEffect } from "react";

export default function VisitorTracker() {
    useEffect(() => {
        fetch("/api/visitors", {
            method: "POST",
        }).catch((error) => {
            console.error("Visitor tracking failed:", error);
        });
    }, []);

    return null;
}