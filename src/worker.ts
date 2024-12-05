import publishOutboxEvents from "./publishOutboxEvents";
let workerInterval: NodeJS.Timeout;

export async function startWorker() {
    workerInterval = setInterval(async () => {
        try {
            await publishOutboxEvents();
            console.log("Outbox events processed successfully");
        } catch (error) {
            console.error("Error processing outbox events:", error);
        }
    }, 5000); // Run every 5 seconds
}

export function stopWorker() {
    if (workerInterval) clearInterval(workerInterval);
    console.log("Worker stopped gracefully.");
}
