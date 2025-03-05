// Initialize Supabase
const SUPABASE_URL = "https://your-supabase-url.supabase.co"; // Replace with your Supabase project URL
const SUPABASE_ANON_KEY = "your-anon-key"; // Replace with your Supabase anon key

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const appointmentForm = document.getElementById("appointmentForm");

appointmentForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(appointmentForm);
    
    // Collect appointment details
    const appointmentDetails = {
        owner_name: formData.get("ownerName"),
        phone_number: formData.get("phoneNumber"),
        email: formData.get("emailAddress"),
        pet_name: formData.get("petName"),
        pet_type: formData.get("petType"),
        royal_grooming: formData.get("royalGrooming") ? "Yes" : "No",
        bath_blow_dry: formData.get("bathBlowDry") ? "Yes" : "No",
        sanitary_cut: formData.get("sanitaryCut") ? "Yes" : "No",
        face_trim: formData.get("faceTrim") ? "Yes" : "No",
        dematting: formData.get("dematting") ? "Yes" : "No",
        medicated_shampoo: formData.get("medicatedShampoo") ? "Yes" : "No",
        haircut: formData.get("haircut") ? "Yes" : "No",
        boarding_services: formData.get("boardingServices") ? "Yes" : "No",
        created_at: new Date().toISOString(),
    };

    // Insert data into Supabase
    const { data, error } = await supabase.from("appointments").insert([appointmentDetails]);

    if (error) {
        alert("Error booking appointment: " + error.message);
    } else {
        // Redirect to confirmation page with query parameters
        const queryString = new URLSearchParams(appointmentDetails).toString();
        window.location.href = `confirmation.html?${queryString}`;
    }
});
