export async function trackVisitor() {
    try {
        await fetch("/api/visitors", {
            method: "POST",
        });
    } catch (error) {
        console.error("Failed to track visitor:", error);
    }
}