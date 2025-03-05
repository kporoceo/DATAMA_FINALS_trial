const supabaseUrl = 'https://zstptnblkfdpjnmvgeng.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzdHB0bmJsa2ZkcGpubXZnZW5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExNjg0ODYsImV4cCI6MjA1Njc0NDQ4Nn0.q78LYNBD6hApZnR7OpnCz4swAnEJNwx4-sYClwY6SQg';

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

if (!supabase) {
    console.error("Failed to initialize Supabase.");
}

const appointmentForm = document.getElementById("appointmentForm");

if (appointmentForm) {
    appointmentForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const formData = new FormData(appointmentForm);
        const appointmentDetails = {
            id: crypto.randomUUID(), 
            ownerName: formData.get("ownerName"),
            phoneNumber: formData.get("phoneNumber"),
            emailAddress: formData.get("emailAddress"),
            petName: formData.get("petName"),
            petType: formData.get("petType"),
            royalGrooming: formData.get("royalGrooming") || "None",
            bathBlowDry: formData.get("bathBlowDry") || "None",
            dematting: formData.get("dematting") || "None",
            medicatedShampoo: formData.get("medicatedShampoo") || "None",
            boardingServices: formData.get("boardingServices") || "None",
            createdAt: new Date().toISOString(),
        };

        try {
            const { data, error } = await supabase
                .from("appointments")
                .insert([appointmentDetails]);

            if (error) {
                console.error("Error booking appointment:", error);
                alert("There was an error booking your appointment. Please try again.");
                return;
            }

            const queryString = new URLSearchParams(
                Object.fromEntries(Object.entries(appointmentDetails).map(([k, v]) => [k, encodeURIComponent(v)])
                )
            ).toString();
            window.location.href = `confirmation.html?${queryString}`;
        } catch (err) {
            console.error("Unexpected error:", err);
            alert("An unexpected error occurred. Please try again.");
        }
    });
} else {
    console.error("appointmentForm not found. Ensure your form has the correct ID.");
}