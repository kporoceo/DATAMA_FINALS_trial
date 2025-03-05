const supabaseUrl = 'https://zstptnblkfdpjnmvgeng.supabase.co'; // Replace with your Supabase project URL
const supabaseKey = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzdHB0bmJsa2ZkcGpubXZnZW5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExNjg0ODYsImV4cCI6MjA1Njc0NDQ4Nn0.q78LYNBD6hApZnR7OpnCz4swAnEJNwx4-sYClwY6SQg.SUPABASE_KEY; // Replace with your Supabase anon key

const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Example: Test connection
async function testConnection() {
    const { data, error } = await supabase.from("appointments").select("*");
    if (error) {
        console.error("Error fetching data:", error.message);
    } else {
        console.log("Fetched data:", data);
    }
}

// Call the function to test if Supabase is connected
testConnection();

const appointmentForm = document.getElementById("appointmentForm");

appointmentForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(appointmentForm);
    const appointmentDetails = {
        ownerName: formData.get("ownerName"),
        phoneNumber: formData.get("phoneNumber"),
        emailAddress: formData.get("emailAddress"),
        petName: formData.get("petName"),
        petType: formData.get("petType"),
        royalGrooming: formData.get("royalGrooming") || "None",
        bathBlowDry: formData.get("bathBlowDry") || "None",
        sanitaryCut: formData.get("sanitaryCut") || "None",
        faceTrim: formData.get("faceTrim") || "None",
        dematting: formData.get("dematting") || "None",
        medicatedShampoo: formData.get("medicatedShampoo") || "None",
        haircut: formData.get("haircut") || "None",
        boardingServices: formData.get("boardingServices") || "None",
        createdAt: new Date().toISOString(),
    };

    // Insert data into Supabase
    const { data, error } = await supabase
        .from("appointments")
        .insert([appointmentDetails]);

    if (error) {
        console.error("Error booking appointment:", error);
        alert("There was an error booking your appointment. Please try again.");
        return;
    }

    // Redirect to confirmation page with query parameters
    const queryString = new URLSearchParams(appointmentDetails).toString();
    window.location.href = `confirmation.html?${queryString}`;
});
